<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subcategory extends MY_Controller {

	public function __construct(){
		parent::__construct();
		
		$this->load->model('subcategory_model');
	}
	
	public function index(){
		$data = array();
		
		$this->twig->display('subcategory/subcategory.tpl', $data);
	}
	
	public function tambah(){
		$data = array();
		$data['category'] = $this->subcategory_model->getCategory();
		
		$this->twig->display('subcategory/add.edit.subcategory.tpl', $data);
	}
	
	public function edit($id){
		$data = array();
		$id = intval($id);
		
		$data['category'] = $this->subcategory_model->getCategory();
		$data['subcategory'] = $this->subcategory_model->getEdit($id);
		
		$this->twig->display('subcategory/add.edit.subcategory.tpl', $data);
	}
	
	//REQUEST
	public function getSubCategoryList(){
		$result = array();
		$result = $this->subcategory_model->getSubCategoryList();
		
		echo json_encode($result);
	}
	
	function delete(){
		$response = array();
		
		$post = array(
			'subcategory_id' => filter_var($this->input->post('subcategory_id'), FILTER_SANITIZE_NUMBER_INT)
		);
		
		$response = $this->subcategory_model->delete($post);
		echo json_encode($response);
	}
	
	function checkCode(){
		$response = array();
		
		$post = array(
			'subcategory_id' 	=> filter_var($this->input->post('subcategory_id'), FILTER_SANITIZE_NUMBER_INT),
			'code'				=> filter_var(trim($this->input->post('code')), FILTER_SANITIZE_STRING),
		);
		
		$response = $this->subcategory_model->checkCode($post);
		echo json_encode($response);
	}
	
	function save(){
		$response = array();
    
		$post = array(
			'subcategory_id'      	=> filter_var($this->input->post('subcategory_id'), FILTER_SANITIZE_NUMBER_INT),
			'category_id'      		=> filter_var($this->input->post('category_id'), FILTER_SANITIZE_NUMBER_INT),
			'name'					=> filter_var(trim($this->input->post('name')), FILTER_SANITIZE_STRING),
            'code' 					=> filter_var(trim($this->input->post('code')), FILTER_SANITIZE_STRING),
			'status'				=> filter_var($this->input->post('status'), FILTER_SANITIZE_STRING)
		);
			
		$response = $this->subcategory_model->save($post);
		echo json_encode($response);
	}
}