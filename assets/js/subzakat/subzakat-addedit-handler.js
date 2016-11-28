
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				_checkCode: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							if (/\S/.test($('#code').val())) {
								if(response.total > 0){
									alertMessage('error', 'Kode ini sudah ada didatabase, mohon coba kode lainnya');
									setTimeout(function(){
										alertHide();
									}, 1000);
									
									return false;
								}
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
						subzakat_id: $('#subzakat-id').val(),
						code: $('#code').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'sub_zakat/checkCode',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_validate: function(){
					var self = this;
					var bCheck = true;
					
					if (!/\S/.test($('#name').val())) {
						alertMessage('error', 'Nama harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}
					
					if (!/\S/.test($('#Code').val())) {
						alertMessage('error', 'Kode harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
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
							
							location.href = options.baseUrl + 'sub_zakat';
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									bootbox.alert(ERROR, response.message);
								}else{
									bootbox.alert(ERROR, 'Simpan zakat failed');
								}
							}else{
								bootbox.alert(ERROR, 'Simpan zakat failed');
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
						subzakat_id: $('#subzakat-id').val(),
						zakat_id: $('#zakat').val(),
						name: $('#name').val(),
						code: $('#code').val(),
						status: sts
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'sub_zakat/save',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._checkCode();
					});
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'sub_zakat';
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