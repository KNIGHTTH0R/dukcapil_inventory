
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					$('#category').on('change', function(){
						if($(this).val() != 18){
							self._getSubDana();
							$('#subcategory').prop('disabled', true).trigger("liszt:updated");
						}else{
							self._getSubDana();
							$('#subcategory').prop('disabled', false).trigger("liszt:updated");
						}
					}).change();
				},
				
				_getSubDana: function(){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){
						if(response.status == 'OK'){
							
							var dt = response.sub,
								iLen = dt.length;
								
							if(iLen > 0){
								
								var opt = '<option value=""><option>';
								
								for(var i = 0; i < iLen; i++){
									var sel = '';
									if(options.subcategory_id.length > 0){
										if(options.subcategory_id == dt[i].subcategory_id)																				
											sel = 'selected';
									}
									opt += '<option value="'+dt[i].subcategory_id+'" '+sel+'>'+dt[i].name+'</option>';
								}
								
							}else{
								var opt = '<option value=""><option>';
							}
							
							$('#subcategory').html(opt);
							$('#subcategory').trigger("liszt:updated");
							
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
						category_id: $('#category').val(),
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/getSubCategory',
						postdata: postdata,
						success: success,
						error: error
					});
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
							location.href = options.baseUrl + 'perbendaharaan';
							
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
						subcategory_id: $('#subcategory').val(),
						nominal: $('#nominal').val(),
						month: $('#month').val(),
						year: $('#year').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'perbendaharaan/saveSaldo',
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
						month: $('#month').val(),
						year: $('#year').val(),
						category_id: $('#category').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'perbendaharaan/getYear',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					/*
					$('#category').on('change', function(){
						var ctrl = $(this);
						self._getYear();
					});
					
					$('#month').on('change', function(){
						var ctrl = $(this);
						self._getYear();
					}).change();
					
					$('#year').on('change', function(){
						var ctrl = $(this);
						self._getYear();
					});
					*/
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						self._save();
					});
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'perbendaharaan';
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