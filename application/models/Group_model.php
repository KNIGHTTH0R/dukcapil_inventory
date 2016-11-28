<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Group_model extends Base_Model {

	public function __construct(){
		parent::__construct();
	}
	
	public function delete($post = array()){
		$result = array();
		
		$sql = 'DELETE FROM m_group_role WHERE group_id=:group_id';
		$params = array(
			':group_id'	=> $post['group_id']
		);
		
		$this->exec($sql, $params);
		
		$sql = 'DELETE FROM m_group_role_user WHERE group_id=:group_id';
		$params = array(
			':group_id'	=> $post['group_id']
		);
		
		$this->exec($sql, $params);
		
		$sql = 'DELETE FROM m_group_role_menu WHERE group_id=:group_id';
		$params = array(
			':group_id'	=> $post['group_id']
		);
		
		$q = $this->exec($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['message'] = 'Delete success';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Delete failed';
		}
		
		return $result;
	}
	
	public function getEdit($id){
		$result = array();
		
		$sql = 'SELECT
					group_id, group_name, group_description
				FROM 
					m_group_role
				WHERE group_id=:group_id';
				
		$params = array(
			':group_id' => $id
		);
		
		$result = $this->fetch($sql, $params);
		
		return $result;
	}
	
	private function updateDetailGroup($post = array()){
		$result = array();
		
		$sql = 'DELETE FROM m_group_role_menu WHERE group_id=:group_id';
		$params = array(
			':group_id' => $post['group_id']
		);
		
		$q = $this->exec($sql, $params);
		
		$iLen = count($post['menus']);
		
		for($i=0;$i<$iLen;$i++){
			$sql = 'INSERT INTO m_group_role_menu(
						group_id,
						menu_id,
						role
					)VALUES(
						:group_id,
						:menu_id,
						:role
					)';
					
			$params = array(
				':group_id'	=> $post['group_id'],
				':menu_id'	=> $post['menus'][$i]['menu_id'],
				':role'		=> $post['menus'][$i]['role']
			);
			
			$this->exec($sql, $params);
		}
		
		$iLen = count($post['users']);
		
		$sql = 'DELETE FROM m_group_role_user WHERE group_id=:group_id';
		$params = array(
			':group_id' => $post['group_id']
		);
		
		$q = $this->exec($sql, $params);
		
		for($i=0;$i<$iLen;$i++){
			$sql = 'INSERT INTO m_group_role_user(
						group_id,
						user_id
					)VALUES(
						:group_id,
						:user_id
					)';
					
			$params = array(
				':group_id'	=> $post['group_id'],
				':user_id'	=> $post['users'][$i]
			);
			
			$this->exec($sql, $params);
		}
		
		return $result;
	}
	
	private function update($post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		$sql = 'UPDATE 
					m_group_role
				SET 
					group_name=:group_name,
					group_description=:group_description,
					update_by=:update_by,
					modified_date=:modified_date
				WHERE
					group_id=:group_id';
					
		$params = array(
			':group_id'				=> $post['group_id'],
			':group_name'			=> $post['group_name'],
			':group_description'	=> $post['group_description'],
			':update_by'			=> $this->session->userdata('user_id'),
			':modified_date'		=> $rectime
		);
		
		$q = $this->exec($sql, $params);
		if($q){
			
			$this->updateDetailGroup($post);
			
			$result['status'] = 'OK';
			$result['message'] = 'Update group berhasil';
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Update group gagal';
		}
		
		return $result;
	}
	
	private function insert($post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		$sql = 'INSERT INTO m_group_role(
					group_name,
					group_description,
					created_by,
					created_date,
					update_by,
					modified_date
				)VALUES(
					:group_name,
					:group_description,
					:created_by,
					:created_date,
					:update_by,
					:modified_date
				)';
				
		$params = array(
			':group_name'			=> $post['group_name'],
			':group_description'	=> $post['group_description'],
			':created_by'			=> $this->session->userdata('user_id'),
			':created_date'			=> $rectime,
			':update_by'			=> $this->session->userdata('user_id'),
			':modified_date'		=> $rectime
		);
		
		$q = $this->exec($sql, $params);
		if($q){
			$post['group_id'] = $this->db->lastInsertId();
			$this->updateDetailGroup($post);
			
			$result['status'] = 'OK';
			$result['message'] = 'Simpan group berhasil';
		}else{
			
			$result['status'] = 'ERR';
			$result['message'] = 'Simpan group gagal';
		}
		
		return $result;
	}
	
	public function save($post = array()){
		$result = array();
		
		if($post['group_id']){
			$result = $this->update($post);
		}else{
			$result = $this->insert($post);
		}		
		
		return $result;
	}
	
	public function getRole(){
		$result = array();
		
		$sql = 'SELECT role_id, role_name, role
				FROM m_master_role';
		
		$result['status'] = 'OK';
		$result['role'] = $this->fetchAll($sql);
			
		return $result;
	}
	
	public function getMenu(){
		$result = array();
		$status = 'A';
		
		$sql = 'SELECT 
					menu_id, menu_name, menu_link, menu_type, parent_id
				FROM 
					m_menu
				WHERE status=:status
				ORDER BY menu_id ASC';
				
		$params = array(
			':status' => $status
		);
		
		$q = $this->fetchAll($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['menu_list'] = $q;
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['menu_list'] = array();
			$result['message'] = 'Get menu list failed';
		}
		
		return $result;
	}
	
	public function getModuleEdit($post = array()){
		$result = array();
		
		$sql = 'SELECT 
					menu_id, role
				FROM 
					m_group_role pgr
				JOIN m_group_role_menu pgrm
					ON pgrm.group_id=pgr.group_id
				WHERE pgr.group_id=:group_id';
		
		$params = array(
			':group_id' => $post['group_id']
		);
		
		$q = $this->fetchAll($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['menu_list'] = $q;
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['menu_list'] = array();
			$result['message'] = 'Get edit group menu failed';
		}
		
		return $result;
	}
	
	public function getEditGroupUser($post = array()){
		$result = array();
		
		$sql = 'SELECT 
					user_id
				FROM 
					m_group_role pgr
				JOIN m_group_role_user pgrl
					ON pgrl.group_id=pgr.group_id
				WHERE pgr.group_id=:group_id';
		
		$params = array(
			':group_id' => $post['group_id']
		);
		
		$q = $this->fetchAll($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['user_list'] = $q;
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['user_list'] = array();
			$result['message'] = 'Get edit group user failed';
		}
		
		return $result;
	}
	
	public function getUserList(){
		$result = array();
		$where = '';
			
		$sql = 'SELECT 
					pmo.user_id, username, user_email, user_fullname, user_phone_number, description, 
					IFNULL(group_name, \'\') AS group_name
				FROM 
					m_master_user pmo
				LEFT JOIN m_group_role_user pgru 
					ON pgru.user_id = pmo.user_id
				LEFT JOIN m_group_role pgr 
					ON pgr.group_id = pgru.group_id
				WHERE 
					pmo.status=:status'.$where.'
				GROUP BY
					pmo.user_id
				ORDER BY 
					pmo.user_id ASC';
		
		$params = array(
			':status' => 'A'
		);
		
		$q = $this->fetchAll($sql, $params);
		
		if($q){
			$result['status'] = 'OK';
			$result['user_list'] = $q;
			$result['message'] = '';
		}else{
			$result['status'] = 'ERR';
			$result['user_list'] = array();
			$result['message'] = 'Get user list failed';
		}
		
		return $result;
	}
	
	public function getGroupList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'group_id',
			1 => 'group_name',
			2 => 'group_description',
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( group_name LIKE \''.$search.'%\' ';    
			$where .= ' OR group_description LIKE \''.$search.'%\' )';
		}
		
		$sql = 'SELECT 
					group_id, group_name, group_description
				FROM 
					m_group_role 
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['group_id'];
			$nested[] = $q[$i]['group_name'];
			$nested[] = $q[$i]['group_description'];
			
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