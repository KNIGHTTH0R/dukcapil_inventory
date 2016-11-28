<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menu_model extends Base_model {
	
	protected $menu;
	protected $row;
	
	public function __construct(){
		parent::__construct();
	}
	
	public function buildMenu($front = false, $type = false){
		$menu = '';
		
		$this->menu = '';
		$params = array();
		if($type)
			$params['type'] = $type;
		
		$data = $this->getMenu($params);
		//$data = $data['menu'];
		
		$this->renderMenu($data, 0);

		return $this->menu;
	}
	
	public function getMenuAll(){
		$sql = 'SELECT 
					* 
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
					pm.status=:status
			   ORDER BY 
					pm.menu_id ASC';
						
		$params = array(
			':status'	=> 'A'
		);
		
		$row = $this->fetchAll($sql, $params);
		$menu = $this->buildTree($row, 0);
		
		return $menu;
	}
	
	public function getMenu(){
		$sql = 'SELECT 
					* 
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
					pmu.user_id=:user_id
			   AND 
					pm.status=:status
			   AND 
					pmr.role!=:role
			   ORDER BY 
					pm.menu_id ASC';
						
		$params = array(
			':user_id'	=> $this->session->userdata('user_id'),
			':status'	=> 'A',
			':role'		=> 0
		);
		
		$row = $this->fetchAll($sql, $params);
		$menu = $this->buildTree($row, 0);
		
		return $menu;
	}
	
	private function buildTree($ar, $pid){
		$op = array();
		foreach( $ar as $item ) {
			if( $item['parent_id'] == $pid ) {
				$op[$item['menu_id']] = array(
					'menu_name' => $item['menu_name'],
					'menu_link' => $item['menu_link'],
					'menu_icon' => $item['menu_icon'],
					'parent_id' => $item['parent_id'],
					'menu_id' => $item['menu_id'],
					'type' => $item['menu_type']
				);
				// using recursive
				$reply =  $this->buildTree( $ar, $item['menu_id'] );
				if( $reply ) {
					$op[$item['menu_id']]['submenu'] = $reply;
				}
			}
		}
		return $op;
	}
	
	private function renderMenu($data, $i){
		
		foreach($data as $r){
			if(isset($r['submenu'])){
				
				$this->menu .= '<li>
									<a href="javascript:;">
										<span class="ico gray '.$r['menu_icon'].'" ></span>'.$r['menu_name'].'
									</a>
									<ul class="sub-menu">';
				
				$this->renderMenu($r['submenu'], ($i + 1));
				
				$this->menu .= '</ul>';
				
			}else{
				
				if($r['menu_link'] != 'javascript:;' && $r['parent_id'] == 0){
				
					$this->menu .= '<li>
										<a href="'.base_url().$r['menu_link'].'">
											<span class="ico gray '.$r['menu_icon'].'" ></span>'.$r['menu_name'].'
										</a>
									</li>';
								
				}else{
				
					$this->menu .= '<li>
										<a href="'.base_url().$r['menu_link'].'">
											'.$r['menu_name'].'
										</a>
									</li>';

				}
			}
		}
	}
}