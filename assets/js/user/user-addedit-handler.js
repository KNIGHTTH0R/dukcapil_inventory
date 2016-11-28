
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable,
				MIN_PWD = 6;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				_delete: function(id){
					var self = this;
					
					Metronic.blockUI();
					var success = function(response){ 
						if(response.status == 'OK'){
							notific(SUCCESS, 'Delete Success');
							dataTable.draw();
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									notific(ERROR, response.message);
								}else{
									notific(ERROR, 'Delete pengguna gagal');
								}
							}else{
								notific(ERROR, 'Delete pengguna gagal');
							}
						}
						Metronic.unblockUI();
					}
					
					var error = function(response){
						Metronic.unblockUI();
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						user_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'pengguna/delete',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_checkUsername: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							if(response.total > 0){
								alertMessage('error', 'Username ini sudah ada di database, mohon coba username lainnya');
								setTimeout(function(){
									alertHide();
								}, 1000);
								
								return false;
							}
							
							self._checkEmail();
							
						}else{
							if(response.message.length > 0){
								alertMessage('error', response.message);
							}else{
								alertMessage('error', 'Request Error');
							}
						}
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						user_id: $('#user-id').val(),
						username: $('#username').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'pengguna/check_username',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_checkEmail: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							if(response.total > 0){
								alertMessage('error', 'Email ini sudah ada di database, mohon coba email lainnya');
								setTimeout(function(){
									alertHide();
								}, 1000);
								return false;
							}
							
							self._save();
							
						}else{
							if(response.message.length > 0){
								alertMessage('error', response.message);
							}else{
								alertMessage('error', 'Request Error');
							}
						}
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						user_id: $('#user-id').val(),
						user_email: $('#email').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'pengguna/check_email',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_validate: function(){
					var self = this;
					var bCheck = true;
					
					if($('#username').val().length == 0){
						alertMessage('error', 'Username harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}
					
					if($('#email').val().length == 0){
						alertMessage('error', 'Email harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}else{
						if(!isEmail($('#email').val())){
							alertMessage('error', 'Mohon masukkan email yang valid');
							setTimeout(function(){
								alertHide();
							}, 1000);
							return false;
						}
					}
					
					if($('#name').val().length == 0){
						alertMessage('error', 'Nama lengkap harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}

					if($('#user-id').val().length <= 0){

						if($('#password').val().length == 0){
							alertMessage('Password harus diisi');
							setTimeout(function(){
								alertHide();
							}, 1000);
							return false;
						}
						
						if($('#password').val().length > 0){
							
							if($('#password').val().length < MIN_PWD){
								alertMessage('error', 'Min. Password : ' + MIN_PWD);
								setTimeout(function(){
									alertHide();
								}, 1000);
								return false;
							}
							
							if($('#password').val() != $('#copass').val()){
								alertMessage('error', 'Password tidak cocok');
								setTimeout(function(){
									alertHide();
								}, 1000);
								return false;
							}
						}

					}else{
						if($('#password').val().length > 0){
							
							if($('#password').val().length < MIN_PWD){
								alertMessage('error', 'Min. Password : ' + MIN_PWD);
								setTimeout(function(){
									alertHide();
								}, 1000);
								return false;
							}
							
							if($('#password').val() != $('#copass').val()){
								alertMessage('error', 'Password tidak cocok');
								setTimeout(function(){
									alertHide();
								}, 1000);
								return false;
							}
						}
					}
					
					return bCheck;
				},
				
				_save: function(){
					var self = this;
					
					var valid = self._validate();
					if(!valid)
						return false;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							location.href = options.baseUrl + 'pengguna';
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									bootbox.alert(ERROR, response.message);
								}else{
									bootbox.alert(ERROR, 'Simpan pengguna gagal');
								}
							}else{
								bootbox.alert(ERROR, 'Simpan pengguna gagal');
							}
						}
					}
					
					var error = function(response){
						setTimeout("unloading()",1500)
						bootbox.alert(response.responseText);
					}
					
					var sts = 'N';
					if($('#status').is(':checked'))
						sts = 'A';
					
					var postdata = {
						user_id: $('#user-id').val(),
						username: $('#username').val(),
						user_password: $('#password').val(),
						user_fullname: $('#name').val(),
						user_email: $('#email').val(),
						user_phone: $('#phone').val(),
						position: $('#position').val(),
						status: sts,
						description: $('#desc').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'pengguna/save',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._checkUsername();
					});
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'pengguna';
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