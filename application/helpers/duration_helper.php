<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('checkDuration'))
{
	function checkDuration($startTime, $endTime){
		
		list($hours, $minutes, $seconds) = explode(':', $startTime);
		$startTimestamp = mktime($hours, $minutes, $seconds);

		list($hours, $minutes, $seconds) = explode(':', $endTime);
		$endTimestamp = mktime($hours, $minutes, $seconds);

		$seconds = $endTimestamp - $startTimestamp;
		//$minutes = ($seconds / 60) % 60;
		//$hours = floor($seconds / (60 * 60));		
		
		return gmdate('H:i:s', $seconds);
		
		//return $hours.':'.$minutes.':'.$seconds;
	}
}