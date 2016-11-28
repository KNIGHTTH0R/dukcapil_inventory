<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Base_model extends CI_Model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function fetch($sql, $params = false){
		try{
			$q = $this->db->prepare($sql);
			
			if($params){
				foreach($params as $k => $v){
					$q->bindParam($k, $params[$k]);
				}
			}
			
			$q->execute();
			
			return $q->fetch(PDO::FETCH_ASSOC);
			
		}catch(Exception $e){
			echo 'ERROR : ' . $e->getMessage() . '  IN QUERY : ' . $sql;
		}
	}
	
	public function fetchAll($sql, $params = false){
		try{
			$q = $this->db->prepare($sql);
			
			if($params){
				foreach($params as $k => $v){
					$q->bindParam($k, $params[$k]);
				}
			}
			
			$q->execute();
			
			return $q->fetchall(PDO::FETCH_ASSOC);
			
		}catch(Exception $e){
			echo 'ERROR : ' . $e->getMessage() . '  IN QUERY : ' . $sql;
		}
	}
	
	public function exec($sql, $params = false){
		try{
			$q = $this->db->prepare($sql);
			
			if($params){
				foreach($params as $k => $v){
					$q->bindParam($k, $params[$k]);
				}
			}
			
			return $q->execute();
			
		}catch(Exception $e){
			echo 'ERROR : ' . $e->getMessage() . '  IN QUERY : ' . $sql;
		}
	}
}