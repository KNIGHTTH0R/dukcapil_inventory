<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('genPassword'))
{
	/**
	* Replace String by given array params
	* eq:
	*     $value = "my name is {0}. I want to {1}";
	*     $replacements = array("Adji","Eat");  
	*     stringReplacer($value, $replacements);
	*     
	* result: "my name is Adji. I want to Eat"
	*
	*/
	
	function genPassword(){
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); 
		$alphaLength = strlen($alphabet) - 1;
		
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		
		$pass = implode($pass);
		
		return $pass;
	}
}
