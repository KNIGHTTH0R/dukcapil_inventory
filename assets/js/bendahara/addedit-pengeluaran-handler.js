
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					$('#category').on('change', function(){
						if($(this).val() != 1 && $(this).val() != 5){
							self._getSubCategory();
							$('#subcategory').prop('disabled', true).trigger("liszt:updated");
						}else{
							self._getSubCategory();
							$('#subcategory').prop('disabled', false).trigger("liszt:updated");
						}
					}).change();
				},
				
				_getSubCategory: function(){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){
						if(response.status == 'OK'){
							
							var dt = response.sub,
								iLen = dt.length;
								
							if(iLen > 0){
								
								var opt = '<option value=""><option>';
								
								if($('#category').val() == 1){
								
									for(var i = 9; i < 16; i++){
										var sel = '';
										if(options.subcategory_id.length > 0){
											if(options.subcategory_id == dt[i].subcategory_id)																				
												sel = 'selected';
										}
										opt += '<option value="'+dt[i].subcategory_id+'" '+sel+'>'+dt[i].name+'</option>';
									}
								
								}else{
									for(var i = 0; i < iLen; i++){
										var sel = '';
										if(options.subcategory_id.length > 0){
											if(options.subcategory_id == dt[i].subcategory_id)																				
												sel = 'selected';
										}
										opt += '<option value="'+dt[i].subcategory_id+'" '+sel+'>'+dt[i].name+'</option>';
									}
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
						url: options.baseUrl + 'kasir/getSubCategory',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_validate: function(){
					var self = this,
						bCheck = true;
					
					if (!/\S/.test($('#datepick').val())) {
						alertMessage('error', 'Mohon isi tanggal terlebih dahulu');
						setTimeout(function(){
							alertHide();
						}, 1000);
						
						return false;
					}
					
					if (!/\S/.test($('#nominal').val())) {
						alertMessage('error', 'Mohon isi jumlah nominal terlebih dahulu');
						setTimeout(function(){
							alertHide();
						}, 1000);
						
						return false;
					}
					
					return true;
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
							location.href = options.baseUrl + 'kasir/penerimaan#pengeluaran';
							
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
						pengeluaran_id: $('#pengeluaran-id').val(),
						year: $('#year').val(),
						date: $('#datepick').val(),
						category_id: $('#category').val(),
						subcategory_id: $('#subcategory').val(),
						nominal: $('#nominal').val(),
						keterangan: $('#ket').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'kasir/savePengeluaran',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('.cancel').on('click', function(){
						location.href = options.baseUrl + 'kasir/penerimaan#pengeluaran';
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