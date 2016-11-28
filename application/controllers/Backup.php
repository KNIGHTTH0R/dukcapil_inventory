<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Backup extends MY_Controller {

	public function __construct(){
		parent::__construct();
	}
		
	public function index(){
		$data = array();
		$this->twig->display('backup/backup.tpl', $data);
	}
	
	public function download(){
		$this->load->library('baznasbackup');
		$this->load->helper('download');

		$sql = $this->baznasbackup->runBackup();
		$db_name = 'baznas-backup-'. date("YmdHis") .'.sql';
		
		force_download($db_name, $sql); 
	}
}