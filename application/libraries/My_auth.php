<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

class My_auth extends Base_Model{
	var $CI;
	
	function __construct(){
		parent::__construct();
		$this->CI = &get_instance();
	}
	
	public function secure(){
		
		$result = array();
		
		$a = filter_var(trim($this->CI->uri->segment(1)), FILTER_SANITIZE_STRING);
		$b = filter_var(trim($this->CI->uri->segment(2)), FILTER_SANITIZE_STRING);
		
		if(strlen($b) > 0)
			$link = sprintf('%s/%s', $a, $b);
		else
			$link = sprintf('%s', $a);

		if(!$this->isLogged()){
			$this->CI->session->sess_destroy();
			redirect(base_url().'login/expired', 'refresh');
		}else{
			
			$sql = 'SELECT 
						MAX(pmr.role) AS role
					FROM 
						m_master_role pmr
					JOIN m_group_role_menu pglm 
						ON pglm.role = pmr.role
					JOIN m_menu pm 
						ON pm.menu_id = pglm.menu_id
					JOIN m_group_role pgl 
						ON pgl.group_id = pglm.group_id
					JOIN m_group_role_user pglu 
						ON pglu.group_id = pgl.group_id
					JOIN m_master_user pmu 
						ON pmu.user_id = pglu.user_id
					WHERE 
						(menu_link=:link OR menu_link=:link2)
					AND pmu.user_id=:user_id';
					
			$params = array(
				':link' 	=> $link,
				':link2' 	=> $a,
				':user_id'	=> $this->CI->session->userdata('user_id')
			);
			
			$q = $this->fetch($sql, $params);
			
			if($q){
				$role = $q['role'];

				if($role == '0')
					if($a == 'users')
						redirect(base_url().'dashboard', 'refresh');
					else
						redirect(base_url().'notauthorized', 'refresh');
				else
					$result = $role;
			}
		}
		
		return $result;
	}
	
	public function isLogged(){
		return $this->CI->session->userdata('logged');
	}
		
	public function hash1($pass){
		return hash('sha256', $pass);
	}
	
	public function hash2($usr,$pass){
		$char = substr($usr,0,2);
		return md5(sha1(base64_encode($pass.$char)));
	}
	
	public function authenticate($usr = FALSE,$pwd = FALSE){ 
		$result = array();
		
		$sql = 'SELECT 
					user_id 
				FROM 
					m_master_user
				WHERE username=:username';
		
		$params = array(
			':username' => $usr
		);
		
		$q = $this->fetch($sql, $params);
		
		if($q){
			$first_hash = $this->hash1(trim($pwd));
			$second_hash = $this->hash2(trim($usr),trim($pwd));
			
			$sql = 'SELECT 
						pmu.user_id, user_fullname
					FROM 
						m_master_user pmu
					JOIN m_master_user_security pmus 
						ON pmus.user_id = pmu.user_id
					WHERE 
						username=:username
					AND 
						hash_1=:hash_1
					AND 
						hash_2=:hash_2 
					AND 
						pmu.status=:status'; 
			
			$params = array(
				':username' => $usr,
				':hash_1'	=> $first_hash,
				':hash_2'	=> $second_hash,
				':status'	=> 'A'
			);
			
			$row = $this->fetch($sql, $params);

			if($row){ 
				$sess = array( 
					'user_id' => $row['user_id'], 
					'user_fullname' => $row['user_fullname'], 
					'logged' => TRUE
				);
						
				$this->CI->session->set_userdata($sess); 
				
				$result['status'] = 'OK';
				$result['message'] = '';
			}else{ 
				$result['status'] = 'ERR';
				$result['message'] = 'Username atau password tidak valid';
			} 
		}else{
			$result['status'] = 'ERR';
			$result['message'] = 'Username tidak ada';
		}
		
		return $result;
	}
}
