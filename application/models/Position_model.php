<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Position_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT 
					*
				FROM
					m_master_position
				WHERE 
					position_id=:position_id';
				
		$params = array(
			':position_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	protected function insert(array $post = array()){
		$result 	= array();
		$rectime 	= date('Y-m-d H:i:s');

		$sql = 'INSERT INTO m_master_position(
					position_name,
					position_desc
				)VALUES(
					:position_name,
					:position_desc
				)';
				
		$params = array(
			':position_name'	=> $post['position_name'],
			':position_desc'	=> $post['position_desc']
			// ':status' 				=> $post['status'],
			// ':created_by' 			=> $this->session->userdata('user_id'),
			// ':created_date'    	 	=> $rectime,
			// ':update_by'    		=> $this->session->userdata('user_id'),
			// ':modified_date'   	 	=> $rectime,
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$post['position_id']= $this->db->lastInsertId();
			
			$result['status'] 	= 'OK';
			$result['last_id'] 	= $post['position_id'];
			$result['message'] 	= '';
		}else{
			$result['status'] 	= 'ERR';
			$result['last_id'] 	= 0;
			$result['message'] 	= 'Simpan position gagal';
		}
		
		return $result;
	}
	
	public function update(array $post = array()){
		$result 	= array();
		$rectime 	= date('Y-m-d H:i:s');
		
		$sql 		= '	UPDATE m_master_position SET
							position_name=:position_name,
							position_desc=:position_desc
						WHERE position_id=:position_id'
					;
				
		$params = array(
			':position_id' 			=> $post['position_id'],
			':position_name' 		=> $post['position_name'],
			':position_desc' 		=> $post['position_desc']
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] 	= 'OK';
			$result['message'] 	= '';
		}else{
			$result['status'] 	= 'ERR';
			$result['message'] 	= 'Update position gagal';
		}
		
		return $result;
	}
	
	public function save(array $post = array()){
		$result = array();
		
		if($post['position_id'] != 0){
			$result = $this->update($post);
		}else{
			$result = $this->insert($post);
		}
		
		return $result;
	}
	
	// public function checkCode(array $post = array()){
	// 	$result = array();
		
	// 	$sql = 'SELECT COUNT(*) AS TOTAL 
	// 			FROM m_master_category
	// 			WHERE code=:code';
				
	// 	$params = array(
	// 		':code' => $post['code']
	// 	);
		
	// 	if($post['category_id'] != 0){
	// 		$sql = 'SELECT COUNT(*) AS TOTAL 
	// 				FROM m_master_category
	// 				WHERE code=:code
	// 				AND category_id !=:category_id';
					
	// 		$params = array(
	// 			':category_id' => $post['category_id'],
	// 			':code' => $post['code']
	// 		);
	// 	}
		
	// 	$row = $this->fetch($sql, $params);
		
	// 	$result['status'] = 'OK';
	// 	$result['total'] = $row['TOTAL'];
	// 	$result['message'] = '';
		
	// 	return $result;
	// }
	
	public function delete($post = array()){
		$result = array();
		
		$sql = 'DELETE FROM m_master_position WHERE position_id=:position_id';
		$params = array(
			'position_id' => $post['position_id']
		);
		
		$q = $this->exec($sql, $params);
		
		$result['status'] = 'OK';
		$result['message'] = '';
		
		return $result;
	}
	
	public function getPositionList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'position_id',
			1 => 'position_name',
			2 => 'position_desc'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(position_name) LIKE \'%'.$search.'%\' ';    
			$where .= ' OR LOWER(position_desc) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					*
				FROM 
					m_master_position
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['position_id'];
			$nested[] = $q[$i]['position_name'];
			$nested[] = $q[$i]['position_desc'];
			
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