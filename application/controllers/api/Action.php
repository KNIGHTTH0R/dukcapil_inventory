<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Action extends REST_Controller{
	
	function __construct(){
        parent::__construct();
		$this->load->model('token_model');
    }
	
	function request_token_post(){
		$response = array();
		$this->load->helper('token_helper');
		
		$response = $this->token_model->generateToken();
		$this->response($response, 200);
	}

	public function send_post(){
		var_dump($this->request->body);
	}

	public function send_put(){
		var_dump($this->put('foo'));
	}
}