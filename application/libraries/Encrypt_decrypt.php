<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

class Encrypt_decrypt extends Base_Model{
	var $CI;
	
	function __construct(){
		parent::__construct();
		$this->CI = &get_instance();
	}
	
	public function encrypt($str, $key, $iv)
	{/*  -- mcrypt_encrypt --  */
		$bad = array('\\n', '\\r');
		$trim = str_replace($bad, '', (String)$str);
		
		//ADD PKCS#7 PAD
		$pad = 16 - (strlen($trim) % 16);
		$trim = $trim . str_repeat(chr($pad), $pad);
		
		$message = mcrypt_encrypt( MCRYPT_RIJNDAEL_128, $key, $trim, MCRYPT_MODE_CBC, $iv );
		$message = base64_encode($message);
		
		return $message;
	}
	
	public function decrypt($str, $key, $iv)
	{/*  -- mcrypt_decrypt --  */
		$message = mcrypt_decrypt( MCRYPT_RIJNDAEL_128, $key, base64_decode($str), MCRYPT_MODE_CBC, $iv );
		
		return $message;
	}
	
	public function generateKey($val){
		return md5($val.uniqid());
	}
	
	public function generateIv(){
		return bin2hex(mcrypt_create_iv(11, MCRYPT_DEV_URANDOM));
	}
	
}