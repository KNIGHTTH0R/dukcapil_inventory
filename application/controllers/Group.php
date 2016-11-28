<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Group extends MY_Controller {

	public function __construct(){
		parent::__construct();
		
		$this->load->model('group_model');
	}
	
	//GROUP
	public function index(){
		$data = array();
		
		$this->twig->display('group/group.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		
		$this->twig->display('group/add.edit.group.tpl', $data);
	}
	
	public function edit($id){
		$data = array();
		$id = intval($id);
		
		$data['group'] = $this->group_model->getEdit($id);
		
		$this->twig->display('group/add.edit.group.tpl', $data);
	}
	
	//REQUEST
	public function getModuleEdit(){
		$result = array();
		$params = array(
			'group_id' 	=> filter_var(trim($this->input->post('group_id')), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$result = $this->group_model->getModuleEdit($params);
		
		echo json_encode($result);
	}
	
	public function getEditGroupUser(){
		$result = array();
		$params = array(
			'group_id' 	=> filter_var(trim($this->input->post('group_id')), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$result = $this->group_model->getEditGroupUser($params);
		
		echo json_encode($result);
	}
	
	public function save(){
		$result = array();
		$params = array(
			'group_id' 			=> filter_var(trim($this->input->post('group_id')), FILTER_SANITIZE_NUMBER_INT),
			'group_name' 		=> filter_var(trim($this->input->post('group_name')), FILTER_SANITIZE_STRING),
			'group_description'	=> filter_var(trim($this->input->post('group_description')), FILTER_SANITIZE_STRING),
			'users'				=> $this->input->post('users'),
			'menus'				=> $this->input->post('menus')
		);
		
		$result = $this->group_model->save($params);
		
		echo json_encode($result);
	}
	
	public function getRole(){
		$result = array();
		$result = $this->group_model->getRole();
		
		echo json_encode($result);
	}
	
	public function getMenu(){
		$result = array();
		$result = $this->menu_model->getMenuAll();		
		
		$result = array(
			"status" 		=> "OK", 
			"menu_list"		=> $result
		);
		
		echo json_encode($result);
	}
	
	public function getUserList(){
		$result = array();
		$result = $this->group_model->getUserList();
		
		echo json_encode($result);
	}	
	
	public function getGroupList(){
		$result = array();
		$result = $this->group_model->getGroupList();
		
		echo json_encode($result);
	}
	
	public function delete(){
		$result = array();
		$params = array(
			'group_id' => filter_var($this->input->post('group_id'), FILTER_SANITIZE_NUMBER_INT)
		);		
		
		$result = $this->group_model->delete($params);
		
		echo json_encode($result);
	}
}