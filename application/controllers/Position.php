<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Position extends MY_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('position_model');
	}

	//USER
	public function index(){
		$data = array();
		
		$this->twig->display('position/position.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		
		$this->twig->display('position/add.edit.position.tpl', $data);
	}
	
	public function edit($id){
		$data = array();
		
		$id = intval($id);
		$data['user'] = $this->user_model->getEdit($id);
		
		$this->twig->display('user/add.edit.user.tpl', $data);
	}
	
	//REQUEST
	public function getPositionList(){
		$result = array();
		$result = $this->position_model->getPositionList();
		
		echo json_encode($result);
	}
	
	function delete(){
		$response = array();
		
		$post = array(
			'user_id' => filter_var($this->input->post('user_id'), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$response = $this->user_model->delete($post);
		echo json_encode($response);
	}
	
	function save(){
		$response = array();
    
		$post = array(
			'user_id'       => filter_var($this->input->post('user_id'), FILTER_SANITIZE_NUMBER_INT),
			'username'		=> filter_var(trim($this->input->post('username')), FILTER_SANITIZE_STRING),
            'user_fullname' => filter_var(trim($this->input->post('user_fullname')), FILTER_SANITIZE_STRING),
            'user_email'    => filter_var(trim($this->input->post('user_email')), FILTER_SANITIZE_STRING),
            'user_phone'    => filter_var(trim($this->input->post('user_phone')), FILTER_SANITIZE_STRING),
			'position'    	=> filter_var(trim($this->input->post('position')), FILTER_SANITIZE_STRING),
            'description'   => filter_var(trim($this->input->post('description')), FILTER_SANITIZE_STRING),
            'user_password' => filter_var(trim($this->input->post('user_password')), FILTER_SANITIZE_STRING),
			'status'		=> filter_var($this->input->post('status'), FILTER_SANITIZE_STRING)
		);
			
		$response = $this->user_model->save($post);
		echo json_encode($response);
	}
}
