
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				_checkRek: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							if(response.total > 0){
								alertMessage('error', 'No. rekening ini sudah ada didatabase, mohon coba nomor lainnya');
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
						bank_id: $('#bank-id').val(),
						rek_number: $('#rek-number').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'bank/checkRek',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_validate: function(){
					var self = this;
					var bCheck = true;
					
					if (!/\S/.test($('#name').val())) {
						alertMessage('error', 'Nama Bank harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}
					
					if (!/\S/.test($('#rek-number').val())) {
						alertMessage('error', 'No rekening harus diisi');
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
							
							location.href = options.baseUrl + 'bank';
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									bootbox.alert(ERROR, response.message);
								}else{
									bootbox.alert(ERROR, 'Simpan bank gagal');
								}
							}else{
								bootbox.alert(ERROR, 'Simpan bank gagal');
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
						bank_id: $('#bank-id').val(),
						bank_name: $('#name').val(),
						rek_number: $('#rek-number').val(),
						account_name: $('#account-name').val(),
						status: sts
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'bank/save',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._checkRek();
					});
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'bank';
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