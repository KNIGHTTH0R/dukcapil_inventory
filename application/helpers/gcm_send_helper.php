<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('gcmSend'))
{
	function gcmSend($post = array()){
		$ci = &get_instance();
	
		$headers = array("Content-Type:" . "application/json", "Authorization:" . "key=" . $ci->config->item('gcm_key'));
		$data = array(
			'refresh_key' => $post['refresh_key'],
			'title'		  => $post['title'],
			'message'	  => $post['message']
		);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 
		curl_setopt($ch, CURLOPT_URL, "https://android.googleapis.com/gcm/send");
		curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		
		error_log(json_encode($data));
		$response = curl_exec($ch);
		
		curl_close($ch);
		error_log($response);
		
		return $response;
	}
}