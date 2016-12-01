<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Department_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT 
					*
				FROM
					m_master_department
				WHERE 
					department_id=:department_id';
				
		$params = array(
			':department_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	protected function insert(array $post = array()){
		$result 	= array();
		$rectime 	= date('Y-m-d H:i:s');

		$sql = 'INSERT INTO m_master_department(
					department_name,
					department_sort,
					department_desc,
					status,
					create_by,
					create_date
				)VALUES(
					:department_name,
					:department_sort,
					:department_desc,
					:status,
					:create_by,
					:create_date
				)';
				
		$params = array(
			':department_name'		=> $post['department_name'],
			':department_sort'		=> $post['department_sort'],
			':department_desc'		=> $post['department_desc'],
			':status' 				=> $post['status'],
			':create_by' 			=> $this->session->userdata('user_id'),
			':create_date'    		=> $rectime
		);

		$params = array(
			':department_name'		=> $post['department_name'],
			':department_sort'		=> $post['department_sort'],
			':department_desc'		=> $post['department_desc'],
			':status' 				=> $post['status'],
			':create_by' 			=> $this->session->userdata('user_id'),
			':create_date'    	 	=> $rectime
		);

		$q = $this->exec($sql, $params);
		
		if($q){
			$post['department_id']= $this->db->lastInsertId();
			
			$result['status'] 	= 'OK';
			$result['last_id'] 	= $post['department_id'];
			$result['message'] 	= '';
		}else{
			$result['status'] 	= 'ERR';
			$result['last_id'] 	= 0;
			$result['message'] 	= 'Simpan department gagal';
		}
		
		return $result;
	}
	
	public function update(array $post = array()){
		$result 	= array();
		$rectime 	= date('Y-m-d H:i:s');
		
		$sql 		= '	UPDATE m_master_department SET
							department_name =:department_name,
							department_sort =:department_sort,
							department_desc =:department_desc,
							status 			=:status,
							update_by 		=:update_by,
							modified_date 	=:modified_date
						WHERE department_id=:department_id'
					;
				
		$params = array(
			':department_id' 		=> $post['department_id'],
			':department_name' 		=> $post['department_name'],
			':department_sort' 		=> $post['department_sort'],
			':department_desc' 		=> $post['department_desc'],
			':status' 				=> $post['status'],
			':update_by' 			=> $this->session->userdata('user_id'),
			':modified_date' 		=> $rectime
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] 	= 'OK';
			$result['message'] 	= '';
		}else{
			$result['status'] 	= 'ERR';
			$result['message'] 	= 'Update department gagal';
		}
		
		return $result;
	}
	
	public function save(array $post = array()){
		$result = array();
		
		if($post['department_id'] != 0){
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
		
		$sql = 'DELETE FROM m_master_department WHERE department_id=:department_id';
		$params = array(
			'department_id' => $post['department_id']
		);
		
		$q = $this->exec($sql, $params);
		
		$result['status'] = 'OK';
		$result['message'] = '';
		
		return $result;
	}
	
	public function getDepartmentList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'department_id',
			1 => 'department_name',
			2 => 'department_sort',
			3 => 'department_desc',
			4 => 'status',
			5 => 'create_by',
			6 => 'create_date',
			7 => 'update_by',
			8 => 'modified_date'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(x1.department_name) LIKE \'%'.$search.'%\' ';   
			$where .= ' OR LOWER(x1.department_sort) LIKE \'%'.$search.'%\' '; 
			$where .= ' OR LOWER(x1.department_desc) LIKE \'%'.$search.'%\' ';
			$where .= ' OR CASE LOWER(x1.status) WHEN \'A\' THEN \'Aktif\' ELSE \'Tidak Aktif\' END LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(x1.create_by) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(x1.create_date) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					x1.department_id
					, x1.department_name
					, x1.department_sort
					, x1.department_desc
					, x2.user_fullname create_by
					, x1.create_date
					, (
						CASE x1.status
							WHEN \'A\'
								THEN \'Aktif\'
							ELSE \'Tidak Aktif\'
						END
					) AS status
				FROM 
					m_master_department x1
				LEFT JOIN 
					m_master_user x2
				ON x1.create_by = x2.user_id
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['department_id'];
			$nested[] = $q[$i]['department_name'];
			$nested[] = $q[$i]['department_sort'];
			$nested[] = $q[$i]['department_desc'];
			$nested[] = $q[$i]['status'];
			$nested[] = $q[$i]['create_by'];
			$nested[] = $q[$i]['create_date'];
			
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