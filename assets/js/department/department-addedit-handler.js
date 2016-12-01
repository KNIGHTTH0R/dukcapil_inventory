
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable,
				MIN_PWD = 6;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				// _checkCode: function(){
				// 	var self = this;
					
				// 	var valid = self._validate();
				// 	if(!valid)
				// 		return false;
					
				// 	loading('Loading...',1);
				// 	var success = function(response){
				// 		if(response.status == 'OK'){
							
				// 			if (/\S/.test($('#code').val())) {
				// 				if(response.total > 0){
				// 					alertMessage('error', 'Kode ini sudah ada didatabase, mohon coba kode lainnya');
				// 					setTimeout(function(){
				// 						alertHide();
				// 					}, 1000);
				// 					setTimeout("unloading()",1500);
				// 					return false;
				// 				}
				// 			}
							
				// 			self._save();
							
				// 		}else{
				// 			if(response.message.length > 0){
				// 				alertMessage('error', response.message);
				// 				setTimeout("unloading()",1500);
				// 			}else{
				// 				alertMessage('error', 'Request Error');
				// 				setTimeout("unloading()",1500);
				// 			}
				// 		}
						
				// 		setTimeout(function(){
				// 			alertHide();
				// 		}, 1000);
				// 	}
					
				// 	var error = function(response){
				// 		setTimeout("unloading()",1500);
				// 		bootbox.alert(response.responseText);
				// 	}
					
				// 	var postdata = {
				// 		category_id: $('#category-id').val(),
				// 		code: $('#code').val()
				// 	}
					
				// 	LumiRequest.sendApi({
				// 		url: options.baseUrl + 'category/checkCode',
				// 		postdata: postdata,
				// 		success: success,
				// 		error: error
				// 	});
				// },
				
				// _validate: function(){
				// 	var self = this;
				// 	var bCheck = true;
					
				// 	if (!/\S/.test($('#name').val())) {
				// 		alertMessage('error', 'Nama harus diisi');
				// 		setTimeout(function(){
				// 			alertHide();
				// 		}, 1000);
				// 		return false;
				// 	}
					
				// 	if (!/\S/.test($('#Code').val())) {
				// 		alertMessage('error', 'Kode harus diisi');
				// 		setTimeout(function(){
				// 			alertHide();
				// 		}, 1000);
				// 		return false;
				// 	}
					
				// 	return bCheck;
				// },
				
				_save: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							alertMessage('success', 'Simpan department berhasil');
							location.href = options.baseUrl + 'department';
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									bootbox.alert(ERROR, response.message);
								}else{
									bootbox.alert(ERROR, 'Simpan department gagal');
								}
							}else{
								bootbox.alert(ERROR, 'Simpan department gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						setTimeout("unloading()",1500)
						bootbox.alert(response.responseText);
					}
					
					var sts = 'N';
						if($('#status').is(':checked'))
						sts = 'A';
					
					var postdata = {
						department_id: $('#department-id').val(),
						department_name: $('#department_name').val(),
						department_sort: $('#department_sort').val(),
						department_desc: $('#department_desc').val(),
						status: sts
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'department/save',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						// self._checkCode();

						self._save();
					});
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'department';
					});
				},
				
				init: function(){
					var self = this;
					
					self._initialize();
					self._clickListener();
				}
			}
			
			return handler;
		}
	}