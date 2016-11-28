<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}

	/* ADJ */
	
	require_once 'PHPMailer/PHPMailerAutoload.php';

	class Send_email{
		
		var $CI;
		
		//DEFAULT
		var $smtpHostname = 'smtp.gmail.com';
		var $smtpPort = '587';
		var $smtpEmailAddr = 'bluejiens@gmail.com';
		var $smtpUsername = 'bluejiens@gmail.com';
		var $smtpPassword = 'Mbul200214';
		var $smtpAuth = 'N';
		var $smtpTslRequired = 'N';
		var $smtpSslTrust = 'N';
		var $smtpAuthMechanism = '';
		
		var $sender = '';
		var $senderName = '';
		var $addReply = '';
		var $to = array();
		var $cc = array();
		var $bcc = array();
		var $subject = '';
		var $message = '';
		var $htmlFile = '';
		var $dir = '';
		var $attachment = array();
		
		function __construct(array $params = array()){
			$CI = &get_instance();
		}
		
		public function send(array $params = array()){

			if(!empty($params['settings']['smtp_hostname']))
				$this->smtpHostname = $params['settings']['smtp_hostname'];
			
			if(!empty($params['settings']['smtp_port']))
				$this->smtpPort = $params['settings']['smtp_port'];
			
			if(!empty($params['settings']['smtp_email_address']))
				$this->smtpEmailAddr = $params['settings']['smtp_email_address'];
			
			if(!empty($params['settings']['smtp_username']))
				$this->smtpUsername = $params['settings']['smtp_username'];
			
			if(!empty($params['settings']['smtp_password']))
				$this->smtpPassword = $params['settings']['smtp_password'];
			
			if(!empty($params['settings']['smtp_auth']))
				$this->smtpAuth = $params['settings']['smtp_auth'];
			
			if(!empty($params['settings']['smtp_ssl_trust']))
				$this->smtpSslTrust = $params['settings']['smtp_ssl_trust'];
			
			if(!empty($params['email_sender']))
				$this->sender = $params['email_sender'];
			else
				$this->sender = $params['settings']['smtp_email_address'];
			
			$this->senderName = $params['email_sender_name'];
			
			$this->addReply = $params['add_reply_to'];
			$this->to = $params['to'];
			$this->cc = $params['cc'];
			$this->bcc = $params['bcc'];
			$this->subject = $params['subject'];
			$this->message = $params['message'];
			$this->htmlFile = $params['html_file'];
			$this->dir = $params['dir'];
			$this->attachment = $params['attachment'];
			
			return $this->sendMail();
		}
		
		protected function sendMail(){
			$result = array();
			
			$mail = new PHPMailer;
			$mail->isSMTP();
			//Enable SMTP debugging
			// 0 = off (for production use)
			// 1 = client messages
			// 2 = client and server messages
			$mail->SMTPDebug = 0;
			//Ask for HTML-friendly debug output
			$mail->Debugoutput = 'html';

			$mail->Host = trim($this->smtpHostname);
			// use
			// $mail->Host = gethostbyname('smtp.gmail.com');
			// if your network does not support SMTP over IPv6
			$mail->Port = intval(trim($this->smtpPort));
			
			$mail->SMTPOptions = array(
				'ssl' => array(
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true
				)
			);
			
			//Set the encryption system to use - ssl (deprecated) or tls
			if(strtoupper($this->smtpSslTrust) == 'Y'){
				$mail->SMTPSecure = 'tls';
				$mail->SMTPAuth = true;
				$mail->Username = trim($this->smtpUsername);
				$mail->Password = trim($this->smtpPassword);
			}else{
				if(strtoupper($this->smtpAuth) == 'Y'){
					$mail->SMTPAuth = true;
					$mail->Username = trim($this->smtpUsername);
					$mail->Password = trim($this->smtpPassword);	
				}else{
					$mail->SMTPAuth = false;
				}
			}
			
			$mail->setFrom(trim($this->sender), $this->senderName);
			$mail->addReplyTo(trim($this->addReply), '');
			
			if(!empty($this->to)){
				if(strpos($this->to, ',')){
					$rows = explode(',', $this->to);
					foreach($rows as $v){
						$mail->addAddress(trim($v), '');
					}
				}else{
					$mail->addAddress(trim($this->to), '');
				}
			}
			
			if(!empty($this->cc)){
				if(strpos($this->cc, ',')){
					$rows = explode(',', $this->cc);
					foreach($rows as $v){
						$mail->AddCC(trim($v), '');
					}
				}else{
					$mail->AddCC(trim($this->cc), '');
				}
			}
			
			if(!empty($this->bcc)){
				if(strpos($this->bcc, ',')){
					$rows = explode(',', $this->bcc);
					foreach($rows as $v){
						$mail->AddBCC(trim($v), '');
					}
				}else{
					$mail->AddBCC(trim($this->bcc), '');
				}
			}
			
			$mail->Subject = trim($this->subject);
			$mail->Body = $this->message; 
			$mail->IsHTML(true);    
			
			if(!empty($this->htmlFile))
				$mail->msgHTML(file_get_contents($this->htmlFile), dirname(__FILE__));
			
			//$mail->AltBody = $this->message;
			
			if(count($this->attachment) > 0){
				
				foreach($this->attachment as $f){
					$mail->addAttachment($this->dir . $f);
				}
			}
			
			//send the message, check for errors
			if (!$mail->send()) {
				$result['status'] = 'ERR';
				$result['message'] = 'Mailer Error: ' . $mail->ErrorInfo;
			} else {
				$result['status'] = 'OK';
				$result['message'] = '';
			}
			
			return $result;
		}
	}