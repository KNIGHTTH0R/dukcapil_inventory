<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('createVerificationCode'))
{
	function createVerificationCode(){
		$ci = &get_instance();
		
		$digits = $ci->config->item('digit_verification_code');
		return rand(pow(10, $digits-1), pow(10, $digits)-1);
	}
}