<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends MY_Controller {

	public function __construct(){
		parent::__construct();
		
		$this->load->model('category_model');
	}
	
	public function index(){
		$data = array();
		
		$this->twig->display('category/category.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		
		$this->twig->display('category/add.edit.category.tpl', $data);
	}
	
	public function edit($id){
		$data = array();
		$id = intval($id);
		
		$data['category'] = $this->category_model->getEdit($id);
		
		$this->twig->display('category/add.edit.category.tpl', $data);
	}
	
	//REQUEST
	public function getCategoryList(){
		$result = array();
		$result = $this->category_model->getCategoryList();
		
		echo json_encode($result);
	}
	
	function delete(){
		$response = array();
		
		$post = array(
			'category_id' => filter_var($this->input->post('category_id'), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$response = $this->category_model->delete($post);
		echo json_encode($response);
	}
	
	function checkCode(){
		$response = array();
		
		$post = array(
			'category_id' 	=> filter_var($this->input->post('category_id'), FILTER_SANITIZE_NUMBER_INT),
			'code'			=> filter_var(trim($this->input->post('code')), FILTER_SANITIZE_STRING),
		);
		
		$response = $this->category_model->checkCode($post);
		echo json_encode($response);
	}
	
	function save(){
		$response = array();
    
		$post = array(
			'category_id'   => filter_var($this->input->post('category_id'), FILTER_SANITIZE_NUMBER_INT),
			'name'			=> filter_var(trim($this->input->post('name')), FILTER_SANITIZE_STRING),
            'code' 			=> filter_var(trim($this->input->post('code')), FILTER_SANITIZE_STRING),
			'status'		=> filter_var($this->input->post('status'), FILTER_SANITIZE_STRING)
		);
			
		$response = $this->category_model->save($post);
		echo json_encode($response);
	}
}