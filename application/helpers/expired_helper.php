<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('checkExpired'))
{
	function checkExpired($timestamp){
		$rectime = date('Y-m-d H:i:s');
		/*
		$current = new DateTime($rectime);
		$lastUpdate = new DateTime($timestamp);
		
		$diff = $lastUpdate->diff($current);
		$days = intval($diff->format('%d'));
		
		if($days > 0){
			$days = $days * 24;
		}
		
		$inHour = $days + intval($diff->format('%h'));
		//var_dump($diff);
		*/
		$hourdiff = round((strtotime($rectime) - strtotime($timestamp))/3600, 1);
		
		return $hourdiff;
	}
}