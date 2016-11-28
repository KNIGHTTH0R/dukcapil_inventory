<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
	
	public $role;
	public $menu;
	public $year;
	public $month;
	
	function __construct(){
		parent::__construct();
		
		header("cache-Control: no-store, no-cache, must-revalidate");
		header("cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache");
		
		$this->load->library('my_auth');
		$this->role = $this->my_auth->secure();
		
		$this->twig->add_global('role', $this->role);
		$this->twig->add_function('base_url'); 
		
		//CHECK ACTIVE SESSION FOR AJAX REQUEST
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if(!$this->session->userdata('logged')){
				$response['status'] = 'ERR';
				$response['message'] = 'Not Authorized';
				
				set_status_header(401);
				echo json_encode($response);
				exit();
			}
		}
		
		$this->load->model('menu_model');
		$this->twig->add_global('menu', $this->menu_model->buildMenu());
		
		$current = date('Y');
		$years = array();
		
		for($i = $current; $i >= ($current - 2); $i--){
			$years[] = $i;
		}
		
		$this->year = $years;
		$this->twig->add_global('year', $years);
		
		$this->month = array(
							01 => 'Januari', 
							02 => 'Februari', 
							03 => 'Maret', 
							04 => 'April', 
							05 => 'Mei', 
							06 => 'Juni', 
							07 => 'Juli', 
							08 => 'Agustus', 
							09 => 'September', 
							10 => 'Oktober', 
							11 => 'November', 
							12 => 'Desember'
						);
		$this->twig->add_global('month', $this->month);
	}
}