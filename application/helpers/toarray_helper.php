<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('toArray'))
{
	function toArray($str){
		$str = trim($str);
		$arr = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $str), true);

		return $arr;
	}
	
}