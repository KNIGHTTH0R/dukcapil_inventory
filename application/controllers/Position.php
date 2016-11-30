<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Position extends MY_Controller {

	public function __construct(){
		parent::__construct();
		
		$this->load->model('position_model');
	}
	
	public function index(){
		$data = array();
		
		$this->twig->display('position/position.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		
		$this->twig->display('position/add.edit.position.tpl', $data);
	}
	
	public function edit($id){
		$data 	= array();
		$id 	= intval($id);
		
		$data['position'] 	= $this->position_model->getEdit($id);
		
		$this->twig->display('position/add.edit.position.tpl', $data);
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
			'position_id' => filter_var($this->input->post('position_id'), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$response = $this->position_model->delete($post);
		echo json_encode($response);
	}
	
	// function checkCode(){
	// 	$response = array();
		
	// 	$post = array(
	// 		'category_id' 	=> filter_var($this->input->post('category_id'), FILTER_SANITIZE_NUMBER_INT),
	// 		'code'			=> filter_var(trim($this->input->post('code')), FILTER_SANITIZE_STRING),
	// 	);
		
	// 	$response = $this->category_model->checkCode($post);
	// 	echo json_encode($response);
	// }
	
	function save(){
		$response 	= array();
    	
		$post 		= array(
			'position_id'   => filter_var($this->input->post('position_id'), FILTER_SANITIZE_NUMBER_INT),
			'position_name'	=> filter_var(trim($this->input->post('position_name')), FILTER_SANITIZE_STRING),
            'position_desc' => filter_var(trim($this->input->post('position_desc')), FILTER_SANITIZE_STRING)
		);
		
		$response 	= $this->position_model->save($post);
		echo json_encode($response);
	}
}