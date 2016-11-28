<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Restore extends MY_Controller {

	public function __construct(){
		parent::__construct();
	}
		
	public function index(){
		$data = array();
		
		$this->twig->display('restore/restore.tpl', $data);
	}
	
	public function import(){
	
		$this->config =  array(
		  'upload_path'     => dirname($_SERVER["SCRIPT_FILENAME"])."/assets/import/",
		  'upload_url'      => base_url()."assets/import/",
		  'allowed_types'   => "sql",
		  'overwrite'       => TRUE,
		  'max_size'        => "50000KB"
		);
		
		$this->load->library('upload', $this->config);
		if($this->upload->do_upload())
		{
			
			$data['msg'] = "file upload success";
			$this->load->view('restore/restore.tpl');
			$this->twig->display('restore/restore.tpl', $data);
		}
		else
		{
		    $data['msg'] = "file upload failed";
			$this->load->view('restore/restore.tpl');
		    $this->twig->display('restore/restore.tpl', $data);
		}
	}
}