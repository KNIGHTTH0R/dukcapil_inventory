<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Category_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT 
					pmu.category_id, name, code, status
				FROM 
					m_master_category pmu
				WHERE 
					pmu.category_id=:category_id';
				
		$params = array(
			':category_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	protected function insert(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');

		$sql = 'INSERT INTO m_master_category(
					name,
					code,
					status,
					created_by,
					created_date,
					update_by,
					modified_date
				)VALUES(
					:name,
					:code,
					:status,
					:created_by,
					:created_date,
					:update_by,
					:modified_date
				)';
				
		$params = array(
			':name'		 			=> $post['name'],
			':code'		 			=> $post['code'],
			':status' 				=> $post['status'],
			':created_by' 			=> $this->session->userdata('user_id'),
			':created_date'    	 	=> $rectime,
			':update_by'    		=> $this->session->userdata('user_id'),
			':modified_date'   	 	=> $rectime,
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			
			$post['category_id'] = $this->db->lastInsertId();
			
			$result['status'] = 'OK';
			$result['last_id'] = $post['category_id'];
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['last_id'] = 0;
			$result['message'] = 'Simpan kategori gagal';
		}
		
		return $result;
	}
	
	public function update(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
			
		$sql = 'UPDATE m_master_category SET
					name=:name,
					code=:code,
					status=:status,
					update_by=:update_by,
					modified_date=:modified_date
				WHERE category_id=:category_id';
				
		$params = array(
			':category_id' 			=> $post['category_id'],
			':name' 				=> $post['name'],
			':code' 				=> $post['code'],
			':status' 				=> $post['status'],
			':update_by'			=> $this->session->userdata('user_id'),
			':modified_date'		=> $rectime
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Update kategori gagal';
		}
		
		return $result;
	}
	
	public function save(array $post = array()){
		$result = array();
		
		if($post['category_id'] != 0){
			$result = $this->update($post);
		}else{
			$result = $this->insert($post);
		}
		
		return $result;
	}
	
	public function checkCode(array $post = array()){
		$result = array();
		
		$sql = 'SELECT COUNT(*) AS TOTAL 
				FROM m_master_category
				WHERE code=:code';
				
		$params = array(
			':code' => $post['code']
		);
		
		if($post['category_id'] != 0){
			$sql = 'SELECT COUNT(*) AS TOTAL 
					FROM m_master_category
					WHERE code=:code
					AND category_id !=:category_id';
					
			$params = array(
				':category_id' => $post['category_id'],
				':code' => $post['code']
			);
		}
		
		$row = $this->fetch($sql, $params);
		
		$result['status'] = 'OK';
		$result['total'] = $row['TOTAL'];
		$result['message'] = '';
		
		return $result;
	}
	
	public function delete($post = array()){
		$result = array();
		
		$sql = 'DELETE FROM m_master_category WHERE category_id=:category_id';
		$params = array(
			'category_id' => $post['category_id']
		);
		
		$q = $this->exec($sql, $params);
		
		$result['status'] = 'OK';
		$result['message'] = '';
		
		return $result;
	}
	
	public function getCategoryList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'category_id',
			1 => 'name',
			2 => 'code',
			3 => 'status'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(name) LIKE \'%'.$search.'%\' ';    
			$where .= ' OR LOWER(code) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(status) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					category_id, name, code, 
					(
						CASE status
							WHEN \'A\'
								THEN \'Aktif\'
							ELSE \'Tidak Aktif\'
						END
					) AS status
				FROM 
					m_master_category
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['category_id'];
			$nested[] = $q[$i]['name'];
			$nested[] = $q[$i]['code'];
			$nested[] = $q[$i]['status'];
			
			$data[] = $nested;
		}

		$result = array(
			"draw"            => intval( $requestData['draw'] ),
			"recordsTotal"    => intval( $totalData ),
			"recordsFiltered" => intval( $totalData ),
			"data"            => $data
		);
		
		return $result;
	}
}