<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Position_model extends Base_model {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getPositionList(){
		$result = array();
		$requestData = $_REQUEST;
		
		$columns = array(
			0 => 'position_id',
			1 => 'position_name',
		);
		
		$where = '';
		$search = filter_var(trim($_POST['search']['value']), FILTER_SANITIZE_STRING);
		
		if(!empty($search)){
			$where .= ' AND ( LOWER(position_name) LIKE \'%'.$search.'%\' ';    
		}
		
		$sql = 'SELECT 
					*
				FROM 
					m_master_position
				WHERE 1=1'.$where;
				
		$q = $this->fetchAll($sql);
		$totalData = count($q);
		
		$sql.=" LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
		
		$q = $this->fetchAll($sql);
		$totalFiltered = count($q);
		
		$data = array();
		for($i=0;$i<$totalFiltered;$i++){
			$nested = array();
			$nested[] = $q[$i]['position_id'];
			$nested[] = $q[$i]['position_name'];
			$nested[] = $q[$i]['position_desc'];
			
			$data[] = $nested;
		}

		$result = array(
			"draw"            => intval( $requestData['draw'] ),
			"recordsTotal"    => intval( $totalData ),
			"recordsFiltered" => intval( $totalData ),
			"data"            => $data
		);
		
		return $result;
	}
}