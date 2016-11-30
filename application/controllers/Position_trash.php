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
	
	//REQUEST
	public function getPositionList(){
		$result = array();
		$result = $this->position_model->getPositionList();
		
		echo json_encode($result);
	}
}