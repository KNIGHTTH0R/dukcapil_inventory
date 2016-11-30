
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
					
					//var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
					var btn = "<a href='javascript:;' class='edit'>Edit</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable = $('#table-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "position/getPositionList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#table-list tbody").remove();
									$("#table-list").append('<tbody class="employee-grid-error"><tr><th colspan="4">No data found in the server</th></tr></tbody>');
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
     								return '<a href="' + options.baseUrl + 'position/edit/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="center"><span class="label label-sm label-default">'+data+'</span></div>';
								},
								"targets": 3
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
				
				init: function(){
					var self = this;
					
					self._initialize();
				}
			}
			
			return handler;
		}
	}