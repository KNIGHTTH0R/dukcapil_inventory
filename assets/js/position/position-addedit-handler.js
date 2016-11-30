
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
							
							alertMessage('success', 'Simpan position berhasil');
							location.href = options.baseUrl + 'position';
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									bootbox.alert(ERROR, response.message);
								}else{
									bootbox.alert(ERROR, 'Simpan position gagal');
								}
							}else{
								bootbox.alert(ERROR, 'Simpan position gagal');
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
					
					// var sts = 'N';
					// 	if($('#status').is(':checked'))
					// 	sts = 'A';
					
					var postdata = {
						position_id: $('#position-id').val(),
						position_name: $('#position_name').val(),
						position_desc: $('#position_desc').val(),
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'position/save',
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
						location.href = options.baseUrl + 'position';
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