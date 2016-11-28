<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT 
					pmu.user_id, username, user_email, user_fullname, 
					user_phone_number, description, position, status
				FROM 
					m_master_user pmu
				WHERE 
					pmu.user_id=:user_id';
				
		$params = array(
			':user_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	protected function insert(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');

		$sql = 'INSERT INTO m_master_user(
					username,
					user_email,
					user_fullname,
					user_phone_number,
					description,
					position,
					status,
					created_by,
					created_date,
					update_by,
					modified_date
				)VALUES(
					:username,
					:user_email,
					:user_fullname,
					:user_phone_number,
					:description,
					:position,
					:status,
					:created_by,
					:created_date,
					:update_by,
					:modified_date
				)';
				
		$params = array(
			':username' 			=> $post['username'],
			':user_email' 			=> $post['user_email'],
			':user_fullname' 		=> $post['user_fullname'],
			':user_phone_number' 	=> $post['user_phone'],
			':description'	 		=> $post['description'],
			':position'	 			=> $post['position'],
			':status' 				=> $post['status'],
			':created_by' 			=> $this->session->userdata('user_id'),
			':created_date'    	 	=> $rectime,
			':update_by'    		=> $this->session->userdata('user_id'),
			':modified_date'   	 	=> $rectime,
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			
			$post['user_id'] = $this->db->lastInsertId();
			$this->insertPassword($post);
			
			$result['status'] = 'OK';
			$result['last_id'] = $post['user_id'];
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['last_id'] = 0;
			$result['message'] = 'Insert user gagal';
		}
		
		return $result;
	}
	
	private function insertPassword($post = array()){
		$result = array();
		
		$sql = 'INSERT INTO m_master_user_security(
					user_id,
					hash_1,
					hash_2
				)VALUES(
					:user_id,
					:hash_1,
					:hash_2
				)';
				
		$params = array(
			':user_id'  => $post['user_id'],
			':hash_1'	=> $this->my_auth->hash1($post['user_password']),
			':hash_2'	=> $this->my_auth->hash2($post['username'], $post['user_password'])
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Insert password gagal';
		}
		
		return $result;
	}
	
	private function updatePassword($post = array()){
		$result = array();
		
		$sql = 'UPDATE m_master_user_security SET 
					hash_1=:hash_1,
					hash_2=:hash_2
				WHERE user_id=:user_id';
				
		$params = array(
			':user_id' => $post['user_id'],
			':hash_1'  => $this->my_auth->hash1($post['user_password']),
			':hash_2'  => $this->my_auth->hash2($post['username'], $post['user_password'])
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Update password gagal';
		}
		
		return $result;
	}
	
	public function update(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		$sql = '';
		$params = array();
		
		if(!empty($post['user_password'])){
		
			$sql = 'UPDATE m_master_user SET
						username=:username,
						user_email=:user_email,
						user_fullname=:user_fullname,
						user_phone_number=:user_phone_number,
						description=:description,
						position=:position,
						status=:status,
						update_by=:update_by,
						modified_date=:modified_date
					WHERE user_id=:user_id';
					
			$params = array(
				':user_id' 		 		=> $post['user_id'],
				':username'      		=> $post['username'],
				':user_email' 	 		=> $post['user_email'],
				':user_fullname' 		=> $post['user_fullname'],
				':user_phone_number' 	=> $post['user_phone'],
				':description'	 		=> $post['description'],
				':position'	 			=> $post['position'],
				':status' 		 		=> $post['status'],
				':update_by'	 		=> $this->session->userdata('user_id'),
				':modified_date' 		=> $rectime
			);
			
			$this->updatePassword($post);
			
		}else{
			
			$sql = 'UPDATE m_master_user SET
						username=:username,
						user_email=:user_email,
						user_fullname=:user_fullname,
						user_phone_number=:user_phone_number,
						description=:description,
						position=:position,
						status=:status,
						update_by=:update_by,
						modified_date=:modified_date
					WHERE user_id=:user_id';
					
			$params = array(
				':user_id' 				=> $post['user_id'],
				':username' 			=> $post['username'],
				':user_email' 			=> $post['user_email'],
				':user_fullname' 		=> $post['user_fullname'],
				':user_phone_number' 	=> $post['user_phone'],
				':description'	 		=> $post['description'],
				':position'	 			=> $post['position'],
				':status' 				=> $post['status'],
				':update_by'			=> $this->session->userdata('user_id'),
				':modified_date'		=> $rectime
			);
			
		}
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Update user gagal';
		}
		
		return $result;
	}
	
	public function save(array $post = array()){
		$result = array();
		
		if($post['user_id'] != 0){
			$result = $this->update($post);
		}else{
			$result = $this->insert($post);
		}
		
		return $result;
	}
	
	public function checkUserEmail(array $post = array()){
		$result = array();
		
		$sql = 'SELECT COUNT(*) AS TOTAL 
				FROM m_master_user
				WHERE user_email=:user_email';
				
		$params = array(
			':user_email' => $post['user_email']
		);
		
		if($post['user_id'] != 0){
			$sql = 'SELECT COUNT(*) AS TOTAL 
					FROM m_master_user
					WHERE user_email=:user_email
					AND user_id !=:user_id';
					
			$params = array(
				':user_id' => $post['user_id'],
				':user_email' => $post['user_email']
			);
		}
		
		$row = $this->fetch($sql, $params);
		
		$result['status'] = 'OK';
		$result['total'] = $row['TOTAL'];
		$result['message'] = '';
		
		return $result;
	}
	
	public function checkEmail(array $post = array()){
		$result = array();
		
		if(empty($post['user_id'])){
			$sql = 'SELECT COUNT(*) AS total 
				    FROM m_master_user
				    WHERE LOWER(user_email)=:user_email';
			
			$params = array(
				':user_email' => $post['user_email']
			);
			
		}else{
			$sql = 'SELECT COUNT(*) AS total 
				    FROM m_master_user
				    WHERE LOWER(user_email)=:user_email
				    AND user_id!=:user_id';
			
			$params = array(
				':user_id' 		=> $post['user_id'],
				':user_email'	=> $post['user_email']
			);
		}
		
		$row = $this->fetch($sql, $params);
		
		$result['status'] = 'OK';
		$result['total'] = $row['total'];
		$result['message'] = '';
		
		return $result;
	}
	
	public function checkUserName(array $post = array()){
		$result = array();
		
		$sql = 'SELECT COUNT(*) AS TOTAL 
				FROM m_master_user
				WHERE username=:username';
				
		$params = array(
			':username' => $post['username']
		);
		
		if($post['user_id'] != 0){
			$sql = 'SELECT COUNT(*) AS TOTAL 
					FROM m_master_user
					WHERE username=:username
					AND user_id !=:user_id';
					
			$params = array(
				':user_id' => $post['user_id'],
				':username' => $post['username']
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
		
		$sql = 'DELETE FROM m_master_user WHERE user_id=:user_id';
		$params = array(
			'user_id' => $post['user_id']
		);
		
		$this->exec($sql, $params);
		
		$sql = 'DELETE FROM m_master_user_security WHERE user_id=:user_id';
		$this->exec($sql, $params);
		
		$sql = 'DELETE FROM m_group_role_user WHERE user_id=:user_id';
		$q = $this->exec($sql, $params);
		
		$result['status'] = 'OK';
		$result['message'] = '';
		
		return $result;
	}
	
	public function getUserList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'user_id',
			1 => 'username',
			2 => 'user_fullname',
			3 => 'user_email',
			4 => 'user_phone_number',
			5 => 'position',
			6 => 'group_name',
			7 => 'status'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(username) LIKE \'%'.$search.'%\' ';    
			$where .= ' OR LOWER(user_email) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(user_phone_number) LIKE \'%'.$search.'%\' ';
			$where .= ' OR LOWER(user_fullname) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					pmu.user_id, username, user_fullname, user_email, user_phone_number, position, group_name, 
					(
						CASE pmu.status
							WHEN \'A\'
								THEN \'Aktif\'
							ELSE \'Tidak Aktif\'
						END
					) AS status
				FROM 
					m_master_user pmu
				LEFT JOIN m_group_role_user bgru 
					ON bgru.user_id=pmu.user_id 
				LEFT JOIN m_group_role bgr 
					ON bgr.group_id=bgru.group_id 
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['user_id'];
			$nested[] = $q[$i]['username'];
			$nested[] = $q[$i]['user_fullname'];
			$nested[] = $q[$i]['user_email'];
			$nested[] = $q[$i]['user_phone_number'];
			$nested[] = $q[$i]['position'];
			$nested[] = $q[$i]['group_name'];
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