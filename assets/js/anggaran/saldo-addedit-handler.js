
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
					
					if (!/\S/.test($('#anggaran').val())) {
						alertMessage('error', 'Mohon isi anggaran terlebih dahulu');
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
							location.href = options.baseUrl + 'input_anggaran#saldo';
							
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
						anggaran: $('#anggaran').val(),
						keterangan: $('#ket').val(),
						year: $('#year').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/saveSaldo',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'input_anggaran#saldo';
					});
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._save();
					});
					
					$('#anggaran').on('keydown', function(e){
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