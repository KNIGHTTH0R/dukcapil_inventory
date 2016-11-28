<?php

include_once APPPATH.'/libraries/class.upload.php';
class UploadFile extends Base_model
{
	var $CI;
	
	public function __construct(){
		$this->CI = &get_instance();
	}
	
	public function uploadIt(array $params = array()){
		$result = array();
		
		try{

			$name = $params['file']['name'];
			$sufiks = sprintf('_%s', date('dmYHis'));
			$ext = explode('|', $this->CI->config->item('img_ext'));
			$tmp = explode('.', $name);
			$type = end($tmp);
			$type = strtolower($type);
			
			if(isset($params['extension'])){
				
				//FILE HANDLER LIKE PDF, DOC, XLS
				$bad = array('(',')','?','&','*','%','@','^','!','~','+','-','|');
				
				$newName = str_replace(' ', '_', str_replace($bad, '', $name));
				$ex = explode('.', $newName);
				$ext = end($ex);
				$newName = $ex[0].'_'.date('YmdHis').'.'.$ext;
				
				if(strpos('|', $params['extension']) > 0){
					$ext = explode('|', $params['extension']);
					
					if(in_array($type, $ext)){
						if(!file_exists($params['dir'])){
							mkdir($params['dir'], 0777, true);
						}
						
						if(!is_writable($params['dir'])){
							$result['status'] = 'ERR';
							$result['message'] = 'The directory for upload file not accessible ( Permission Denied )';
							
							return $result;
						}
						
						$upl = new upload($params['file']);
						$upl->file_new_name_body   = $newName;
						$upl->file_max_size 	   = $this->CI->config->item('img_max_size');
						$upl->file_new_name_ext    = '';
						$upl->process($params['dir']);
						
						if($upl->processed){
							$result['status'] = 'OK';
							$result['message'] = 'File uploaded';
							
							$params['new_name'] = $newName;
							$params['type'] = $type;
							
							$result = $this->insertFile($params);
							$upl->clean();
						}else{
							$result['status'] = 'ERR';
							$result['message'] = 'Error : ' . $upl->error;
						}
					}
					
				}else{
					
					$ext = $params['extension'];

					if(!file_exists($params['dir'])){
						mkdir($params['dir'], 0777, true);
					}
					
					if(!is_writable($params['dir'])){
						$result['status'] = 'ERR';
						$result['message'] = 'The directory for upload file not accessible ( Permission Denied )';
						
						return $result;
					}
					
					$upl = new upload($params['file']);
					$upl->file_new_name_body   = $newName;
					$upl->file_max_size 	   = $this->CI->config->item('img_max_size');
					$upl->file_new_name_ext    = '';
					$upl->process($params['dir']);
					
					if($upl->processed){
						$result['status'] = 'OK';
						$result['message'] = 'File uploaded';
						
						$params['new_name'] = $newName;
						$params['type'] = $type;
						
						$result = $this->insertFile($params);
						$upl->clean();
					}else{
						$result['status'] = 'ERR';
						$result['message'] = 'Error : ' . $upl->error;
					}

				}
				
			}else{
				
				//IMAGE HANDLER HERE
				if(in_array($type, $ext)){
				
					if(!file_exists($params['dir'])){
						mkdir($params['dir'], 0777, true);
					}
					
					if(!is_writable($params['dir'])){
						$result['status'] = 'ERR';
						$result['message'] = 'The directory for upload file not accessible ( Permission Denied )';
						
						return $result;
					}
				
					$newName = md5($name) .$sufiks.'.' . $type;
					$upl = new upload($params['file']);
					
					$upl->allowed = array('application/pdf','application/msword', 'image/*');
					
					$upl->file_new_name_body   = $newName;
					$upl->image_resize         = $params['image_resize'];
					$upl->file_max_size 	   = $this->CI->config->item('img_max_size');
					
					if(isset($params['resize_width_to']))
						$upl->image_x = $params['resize_width_to'];
					
					if(isset($params['resize_height_to']))
						$upl->image_y = $params['resize_height_to'];
						
					//$upl->image_ratio_y        = true;
					$upl->file_new_name_ext    = '';
					$upl->process($params['dir']);
					
					if($upl->processed){
						$result['status'] = 'OK';
						$result['message'] = 'Image uploaded';
						
						$params['new_name'] = $newName;
						$params['type'] = $type;
						
						$result = $this->insertFile($params);
						
						if(isset($params['create_thumbnail']))
							if($params['create_thumbnail'] == true)
								$this->createThumbnail($params, $newName);
						
						$upl->clean();
					}else{
						$result['status'] = 'ERR';
						$result['message'] = 'Error : ' . $upl->error;
					}
					
				}else{
					
					$result['status'] = 'ERR';
					$result['message'] = 'Error : Extension file you are trying to upload not allowed. Allowed extension is : '.$this->CI->config->item('img_ext');
					
				}
			}
			
		}catch(Exception $e){
			
			$result['status'] = 'ERR';
			$result['message'] = $e->getMessage();
			
		}
		
		return $result;
	}
	
	protected function createThumbnail($post = array(), $newName){
		$result = array();
		
		try{
			
			if(!file_exists($post['dir'].'thumbs/')){
				mkdir($post['dir'].'thumbs/', 0777, true);
			}
			
			if(!is_writable($post['dir'].'thumbs/')){
				$result['status'] = 'ERR';
				$result['message'] = 'The directory for create thumbnail not accessible ( Permission Denied )';
				
				return $result;
			}
			
			$handle = new upload($post['file']);
			if($handle->uploaded){
				
				$handle->file_name_body_pre	  = 'thumb_';
				$handle->file_new_name_body   = $newName;
				$handle->file_new_name_ext    = '';
				$handle->image_resize         = true;
				
				if(isset($post['thumbnail_width']) && isset($post['thumbnail_height'])){
					$handle->image_x          = $post['thumbnail_width'];
					$handle->image_y          = $post['thumbnail_height'];
				}else{
					$handle->image_x          = $this->CI->config->item('thumb_width');
					$handle->image_y          = $this->CI->config->item('thumb_height');
				}
				
				$handle->process($post['dir'].'thumbs/');
				
				if($handle->processed){
					$result['status'] = 'OK';
					$result['message'] = '';
					$handle->clean();
				}else{
					$result['status'] = 'ERR';
					$result['message'] = $handle->error;
				}
			}
			
		}catch(Exception $e){
			$result['statuss'] = 'ERR';
			$result['message'] = $e->getMessage();
		}
		
		return $result;
	}
	
	public function removeOlderFile($post = array()){
		$result = array();
		
		$sql = 'SELECT 
					new_name
				FROM 
					street_file
				WHERE
					reff_id=:reff_id
				AND
					milestone_name=:milestone_name';
					
		$params = array(
			':reff_id' 			=> $post['reff_id'],
			':milestone_name'	=> $post['milestone']
		);
		
		$row = $this->fetch($sql, $params);
		if($row){
			$name = $row['new_name'];
			
			$sql = 'DELETE FROM street_file WHERE reff_id=:reff_id AND milestone_name=:milestone_name';
			$params = array(
				':reff_id' 			=> $post['reff_id'],
				':milestone_name'	=> $post['milestone']
			);
			
			$this->exec($sql, $params);
			$result = $this->removeFile($post, $name);
		}
		
		/*
		try{
			
			$this->CI->db->where('reff_id', $post['reff_id']);
			$this->CI->db->where('milestone_name', $post['milestone']);
			$this->CI->db->select('name');
			$q = $this->CI->db->get('street_file');
			
			if($q->num_rows() > 0){
				$name = $q->row()->name;
				
				$this->CI->db->where('reff_id', $post['reff_id']);
				$this->CI->db->where('milestone_name', $post['milestone']);
				$this->CI->db->delete('street_file');
				
				$result = $this->removeFile($post, $name);
			}else{
				$result['status'] = 'OK';
				$result['message'] = 'Older file name not found for removal';
			}
			
		}catch(Exception $e){
			
			$result['status'] = 'ERR';
			$result['message'] = $e->getMessage();
			
		}
		*/
		return $result;
	}
	
	public function updateFile($post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		try{
			
			$ret = $this->removeOlderFile($post);
			
			if($ret['status'] == 'OK'){
				$sql = 'UPDATE
							street_file
						SET 
							orig_name=:orig_name,
							new_name=:new_name,
							type=:type,
							size=:size,
							created_by=:created_by,
							created_date=:created_date
						WHERE
							reff_id=:reff_id
						AND
							milestone_name=:milestone_name';
				
				$params = array(
					':reff_id' 			=> $post['reff_id'],
					':milestone_name'	=> $post['milestone'],
					':orig_name'		=> $post['name'],
					':new_name'			=> $post['new_name'],
					':type'				=> $post['type'],
					':size'				=> $post['file']['size'],
					':created_by'		=> $this->CI->session->userdata('user_id'),
					':created_date'	=> $rectime
				);
				
				$q = $this->exec($sql, $params);
				
				if($q){
					$result['status'] = 'OK';
					$result['message'] = '';
				}else{
					$result['status'] = 'ERR';
					$result['message'] = 'Insert to table street_file failed';
				}
				
				/*
				$this->CI->db->where('reff_id', $post['reff_id']);
				$this->CI->db->where('milestone_name', $post['milestone']);
				
				$this->CI->db->set('orig_name', $post['file']['name']);
				$this->CI->db->set('name', $post['new_name']);
				$this->CI->db->set('type', $post['type']);
				$this->CI->db->set('size', $post['file']['size']);
				$this->CI->db->set('created_by', $this->CI->session->userdata('user_id'));
				$this->CI->db->set('last_modified', $rectime);
				
				$q = $this->CI->db->update('street_file');
				
				if($q){
					$result['status'] = 'OK';
					$result['message'] = '';
				}else{
					$result['status'] = 'ERR';
					$result['message'] = 'Insert to table street_file failed';
				}
				*/
			}else{
				//$result = $ret;
				$result = $this->insertFile($post);
			}
				
		}catch(Exception $e){
			
			$result['status'] = 'ERR';
			$result['message'] = $e->getMessage();
			
		}
		
		return $result;
	}
	
	public function insertFile($post = array()){
		$result = array();
		$rectime = date('Y-m-d H:i:s');
		
		try{
			
			if(isset($post['multiple'])){
				if(!$post['multiple'])
					$ret = $this->removeOlderFile($post);
			}else{
				$ret = $this->removeOlderFile($post);
			}
			
			$sql = 'INSERT INTO street_file(
						reff_id,
						milestone_name,
						orig_name,
						new_name,
						type,
						size,
						created_by,
						created_date
					)VALUES(
						:reff_id,
						:milestone_name,
						:orig_name,
						:new_name,
						:type,
						:size,
						:created_by,
						:created_date
					)';
			
			$params = array(
				':reff_id' 			=> $post['reff_id'],
				':milestone_name'	=> $post['milestone'],
				':orig_name'		=> $post['file']['name'],
				':new_name'			=> $post['new_name'],
				':type'				=> $post['type'],
				':size'				=> $post['file']['size'],
				':created_by'		=> $this->CI->session->userdata('user_id'),
				':created_date'	=> $rectime
			);
			
			$q = $this->exec($sql, $params);
			
			if($q){
				$result['status'] = 'OK';
				$result['new_name'] = $post['new_name'];
				$result['message'] = '';
			}else{
				$result['status'] = 'ERR';
				$result['message'] = 'Insert to table street_file failed';
			}
			
			/*
			$this->CI->db->set('reff_id', $post['reff_id']);
			$this->CI->db->set('milestone_name', $post['milestone']);
			$this->CI->db->set('orig_name', $post['file']['name']);
			$this->CI->db->set('name', $post['new_name']);
			$this->CI->db->set('type', $post['type']);
			$this->CI->db->set('size', $post['file']['size']);
			$this->CI->db->set('created_by', $this->CI->session->userdata('user_id'));
			$this->CI->db->set('last_modified', $rectime);
			
			$q = $this->CI->db->insert('street_file');
			
			if($q){
				$result['status'] = 'OK';
				$result['new_name'] = $post['new_name'];
				$result['message'] = '';
			}else{
				$result['status'] = 'ERR';
				$result['message'] = 'Insert to table street_file failed';
			}
			*/
		}catch(Exception $e){
			
			$result['status'] = 'ERR';
			$result['message'] = $e->getMessage();
			
		}
		
		return $result;
	}
	
	public function removeFile($post = array(), $name = ''){
		$result = array();
		
		try{
			if($name){
				if(file_exists($post['dir'].$name)){
					unlink($post['dir'].$name);
				}
				
				if(file_exists($post['dir'].'thumbs/thumb_'.$name)){
					unlink($post['dir'].'thumbs/thumb_'.$name);
				}
			}
			
			$result['status'] = 'OK';
			$result['message'] = '';
			
		}catch(Exception $e){
			
			$result['status'] = 'ERR';
			$result['message'] = $e->getMessage();
			
		}
		
		return $result;
	}
}