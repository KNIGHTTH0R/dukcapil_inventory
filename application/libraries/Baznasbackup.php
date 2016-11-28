<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

include 'DBBackup.class.php';

class Baznasbackup{
	var $CI;
	
	function __construct(){
		$this->CI = &get_instance();
	}
	
	function runBackup(){
		
		$this->CI->load->database();
		
		$db = new DBBackup(array(
			'driver' => $this->CI->db->dbdriver,
			'host' => $this->CI->db->hostname,
			'user' => $this->CI->db->username,
			'password' => $this->CI->db->password,
			'database' => $this->CI->db->database,
		));
		$backup = $db->backup();
		if(!$backup['error']){
			// If there isn't errors, show the content
			// The backup will be at $var['msg']
			// You can do everything you want to. Like save in a file.
			// $fp = fopen('file.sql', 'a+');fwrite($fp, $backup['msg']);fclose($fp);
			return $backup['msg'];
		} else {
			echo 'An error has ocurred.';
		}
	}
}