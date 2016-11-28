<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Notauthorized extends My_Controller {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function index(){
		$data = array();
		
		$this->twig->display('notauthorized/notauthorized.tpl', $data);
	}
}
