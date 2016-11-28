<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('generateUserKey'))
{
	function generateUserKey(){
		$key = md5(microtime().rand());
		
		usleep(100);
		
		$uuid = '';
		
		$t = microtime(true);
		$micro = sprintf("%06d",($t - floor($t)) * 1000000);
		$d = new DateTime( date('Y-m-d H:i:s.'.$micro, $t) );

		$str = $d->format("YmdHisu");
		
		for($i=0;$i<3;$i++){
			$int = rand(0,25);
			$a_z = "abcdefghijklmnopqrstuvwxyz";
		
			if($i == 0)
				$uuid .= substr($str, 0, 2).$a_z[$int];
			
			if($i == 1)
				$uuid .= substr($str, 2, 2).$a_z[$int];
			
			if($i == 2)
				$uuid .= substr($str, 4, 2).$a_z[$int];
			
			if($i == 4)
				$uuid .= substr($str, 6, 2).$a_z[$int];
		}
		
		$uuid .= substr($str, 8, 12);
		
		return trim($key.$uuid);
	}
}