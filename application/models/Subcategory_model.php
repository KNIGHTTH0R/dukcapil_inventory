<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Subcategory_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getCategory(){
		$result = array();
		
		$sql = 'SELECT 
					category_id, name
				FROM 
					m_master_category
				WHERE 
					status=:status
				ORDER BY 
					category_id ASC';
		
		$params = array(
			':status'	=> 'A'
		);
					
		$result = $this->fetchAll($sql, $params);
		
		return $result;
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT 
					pmu.subcategory_id, category_id, name, code, status
				FROM 
					m_master_subcategory pmu
				WHERE 
					pmu.subcategory_id=:subcategory_id';
				
		$params = array(
			':subcategory_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	protected function insert(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');

		$sql = 'INSERT INTO m_master_subcategory(
					category_id, 
					name,
					code,
					status,
					created_by,
					created_date,
					update_by,
					modified_date
				)VALUES(
					:category_id, 
					:name,
					:code,
					:status,
					:created_by,
					:created_date,
					:update_by,
					:modified_date
				)';
				
		$params = array(
			':category_id'		 	=> $post['category_id'],
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
			
			$post['subcategory_id'] = $this->db->lastInsertId();
			
			$result['status'] = 'OK';
			$result['last_id'] = $post['subcategory_id'];
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['last_id'] = 0;
			$result['message'] = 'Simpan sub zakat gagal';
		}
		
		return $result;
	}
	
	public function update(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
			
		$sql = 'UPDATE m_master_subcategory SET
					category_id=:category_id, 
					name=:name,
					code=:code,
					status=:status,
					update_by=:update_by,
					modified_date=:modified_date
				WHERE subcategory_id=:subcategory_id';
				
		$params = array(
			':subcategory_id' 		=> $post['subcategory_id'],
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
			$result['message'] = 'Update sub kategori gagal';
		}
		
		return $result;
	}
	
	public function save(array $post = array()){
		$result = array();
		
		if($post['subcategory_id'] != 0){
			$result = $this->update($post);
		}else{
			$result = $this->insert($post);
		}
		
		return $result;
	}
	
	public function checkCode(array $post = array()){
		$result = array();
		
		$sql = 'SELECT COUNT(*) AS TOTAL 
				FROM m_master_subcategory
				WHERE code=:code';
				
		$params = array(
			':code' => $post['code']
		);
		
		if($post['subcategory_id'] != 0){
			$sql = 'SELECT COUNT(*) AS TOTAL 
					FROM m_master_subcategory
					WHERE code=:code
					AND subcategory_id !=:subcategory_id';
					
			$params = array(
				':subcategory_id' => $post['subcategory_id'],
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
		
		$sql = 'DELETE FROM m_master_subcategory WHERE subcategory_id=:subcategory_id';
		$params = array(
			'subcategory_id' => $post['subcategory_id']
		);
		
		$q = $this->exec($sql, $params);
		
		$result['status'] = 'OK';
		$result['message'] = '';
		
		return $result;
	}
	
	public function getSubCategoryList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'subcategory_id',
			1 => 'name',
			2 => 'code',
			3 => 'category',
			4 => 'status'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(bmsz.name) LIKE \'%'.$search.'%\' ';    
			$where .= ' OR LOWER(bmsz.code) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(bmz.name) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(bmsz.status) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					bmsz.subcategory_id, bmsz.name, bmsz.code, bmz.name AS category,  
					(
						CASE bmsz.status
							WHEN \'A\'
								THEN \'Aktif\'
							ELSE \'Tidak Aktif\'
						END
					) AS status
				FROM 
					m_master_category bmz
				JOIN m_master_subcategory bmsz 
					ON bmsz.category_id=bmz.category_id
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['subcategory_id'];
			$nested[] = $q[$i]['name'];
			$nested[] = $q[$i]['code'];
			$nested[] = $q[$i]['category'];
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