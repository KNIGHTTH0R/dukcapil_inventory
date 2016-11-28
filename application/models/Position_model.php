<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Position_model extends Base_model {
	
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
	
	public function update(array $post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		$sql = '';
		$params = array();
		
		if(!empty($post['user_password'])){
		
			$sql = 'UPDATE m_master_user SET
						username 			=:username,
						user_email			=:user_email,
						user_fullname 		=:user_fullname,
						user_phone_number	=:user_phone_number,
						description 		=:description,
						position 			=:position,
						status 				=:status,
						update_by 			=:update_by,
						modified_date 		=:modified_date
					WHERE user_id 			=:user_id';
					
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
						username 			=:username,
						user_email 			=:user_email,
						user_fullname 		=:user_fullname,
						user_phone_number	=:user_phone_number,
						description 		=:description,
						position 			=:position,
						status 				=:status,
						update_by 			=:update_by,
						modified_date 		=:modified_date
					WHERE user_id 			=:user_id';
					
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
			$result['status'] 	= 'OK';
			$result['message'] 	= '';
		}else{
			$result['status'] 	= 'ERR';
			$result['message'] 	= 'Update user gagal';
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
	
	public function getPositionList(){
		$result 		= array();
		$requestData 	= $_REQUEST;
		
		$columns = array(
			0 => 'id',
			1 => 'name',
			2 => 'desc'
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(name) LIKE \'%'.$search.'%\' ';    
			$where .= ' OR LOWER(desc) LIKE \'%'.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					mmp.id, mmp.name, mmp.desc
				FROM 
					m_master_position mmp
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['id'];
			$nested[] = $q[$i]['name'];
			$nested[] = $q[$i]['desc'];
			
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