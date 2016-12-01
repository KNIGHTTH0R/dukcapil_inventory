<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Department extends MY_Controller {

	public function __construct(){
		parent::__construct();
		
		$this->load->model('department_model');
	}
	
	public function index(){
		$data = array();
		
		$this->twig->display('department/department.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		
		$this->twig->display('department/add.edit.department.tpl', $data);
	}
	
	public function edit($id){
		$data 	= array();
		$id 	= intval($id);
		
		$data['department'] 	= $this->department_model->getEdit($id);
		
		$this->twig->display('department/add.edit.department.tpl', $data);
	}
	
	//REQUEST
	public function getDepartmentList(){
		$result = array();
		$result = $this->department_model->getDepartmentList();
		
		echo json_encode($result);
	}
	
	function delete(){
		$response = array();
		
		$post = array(
			'department_id' => filter_var($this->input->post('department_id'), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$response = $this->department_model->delete($post);
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
			'department_id'   	=> filter_var($this->input->post('department_id'), FILTER_SANITIZE_NUMBER_INT),
			'department_name'	=> filter_var(trim($this->input->post('department_name')), FILTER_SANITIZE_STRING),
            'department_sort' 	=> filter_var(trim($this->input->post('department_sort')), FILTER_SANITIZE_STRING),
            'department_desc' 	=> filter_var(trim($this->input->post('department_desc')), FILTER_SANITIZE_STRING),
            'status' 			=> filter_var(trim($this->input->post('status')), FILTER_SANITIZE_STRING),
            'update_by' 		=> filter_var(trim($this->input->post('update_by')), FILTER_SANITIZE_STRING),
            'modified_date' 	=> filter_var(trim($this->input->post('modified_date')), FILTER_SANITIZE_STRING)
		);
		
		$response 	= $this->department_model->save($post);
		echo json_encode($response);
	}
}