
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				_validate: function(){
					var self = this,
						bCheck = true;
					
					if (!/\S/.test($('#nominal').val())) {
						alertMessage('error', 'Mohon isi nominal terlebih dahulu');
						setTimeout(function(){
							alertHide();
						}, 1000);
						
						bCheck = false;
					}
					
					return bCheck;
				},
				
				_save: function(){
					var self = this;
					
					var valid = self._validate();
					if(!valid)
						return false;
					
					loading('Loading...',1);
					var success = function(response){
						if(response.status == 'OK'){
							
							alertMessage('success', response.message);
							
						}else{
							if(response.message.length > 0){
								alertMessage('error', response.message);
							}else{
								alertMessage('error', 'Request Error');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						saldo_id: $('#saldo-id').val(),
						category_id: $('#category').val(),
						nominal: $('#nominal').val(),
						year: $('#year').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'teller/saveSaldo',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_getYear: function(){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							
							var data = response.saldo;
							if(data){
								$('#saldo-id').val(data.saldo_id);
								$('#nominal').val(data.nominal);
							}else{
								$('#saldo-id').val('');
								$('#nominal').val('');
							}
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Request data gagal');
								}
							}else{
								alertMessage('error', 'Request data gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}

					var postdata = {
						year: $('#year').val(),
						category_id: $('#category').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'teller/getYear',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#category').on('change', function(){
						var ctrl = $(this);
						self._getYear();
					});
					
					$('#year').on('change', function(){
						var ctrl = $(this);
						self._getYear();
					}).change();
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'input_anggaran#saldo';
					});
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._save();
					});
					
					$('#nominal').on('keydown', function(e){
						return isNumeric(e);
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