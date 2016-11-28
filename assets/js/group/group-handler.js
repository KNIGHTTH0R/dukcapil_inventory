
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					self._initTable();
				},
				
				_initTable: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable = $('#table-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "group/getGroupList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#table-list tbody").remove();
									$("#table-list").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
									$("#table-list_processing").css("display","none");
								}
							}
						},
						"columnDefs": [
							{
								"targets": [ 0 ],
								"visible": false,
								"searchable": false
							},
							{
								"render": function ( data, type, row ) {
     								return '<a href="' + options.baseUrl + 'group/edit/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"targets": -1,
								"data": null,
								"defaultContent": "<div align='center'>"+btn+"</div>",
								"orderable": false
							}
						]
					});
				},
				
				_delete: function(id){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', response.message);
							dataTable.draw();
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Hapus group gagal');
								}
							}else{
								alertMessage('Hapus group gagal');
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
						group_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/delete',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#table-list').on('click', '.delete', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._delete(rowdata[0]);
							}
						});
					});
					
					$('#table-list').on('click', '.edit', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'group/edit/'+rowdata[0];
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