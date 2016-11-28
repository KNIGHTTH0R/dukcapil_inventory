
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable,
				dataTable2;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					var hash = window.location.hash;
					/*
					console.log(hash);
					
					if(hash == '#penerimaan'){
						$('#tabs-1').trigger('click');
					}else{
						$('#tabs-2').trigger('click');
					}
					*/
					self._initTablePenerimaan();
					self._initTablePenyetoran();
					
					setTimeout(function(){
						$('table').css('width', '100%');
					}, 500);
				},
				
				_initTablePenerimaan: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable = $('#penerimaan-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "teller/getPenerimaanList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#penerimaan-list tbody").remove();
									$("#penerimaan-list").append('<tbody class="employee-grid-error"><tr><th colspan="6">No data found in the server</th></tr></tbody>');
									$("#penerimaan-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'teller/edit_penerimaan/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data, 2)+'</div>';
								},
								"targets": 5
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="center">'+data+'</div>';
								},
								"targets": 6
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
				
				_initTablePenyetoran: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable2 = $('#penyetoran-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "teller/getPenyetoranList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#penyetoran-list tbody").remove();
									$("#penyetoran-list").append('<tbody class="employee-grid-error"><tr><th colspan="4">No data found in the server</th></tr></tbody>');
									$("#penyetoran-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'teller/edit_penyetoran/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data, 2)+'</div>';
								},
								"targets": 3
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="center">'+data+'</div>';
								},
								"targets": 4
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
				
				_deletePenyetoran: function(id){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', 'Hapus data berhasil');
							dataTable2.draw();
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Hapus data gagal');
								}
							}else{
								alertMessage('error', 'Hapus data gagal');
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
						penyetoran_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'teller/deletePenyetoran',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_delete: function(id){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', 'Hapus data berhasil');
							dataTable.draw();
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Hapus data gagal');
								}
							}else{
								alertMessage('error', 'Hapus data gagal');
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
						penerimaan_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'teller/deletePenerimaan',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#penyetoran-list').on('click', '.delete', function(){
						var rowdata = dataTable2.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._deletePenyetoran(rowdata[0]);
							}
						});
					});
					
					$('#penyetoran-list').on('click', '.edit', function(){
						var rowdata = dataTable2.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'teller/edit_penyetoran/'+rowdata[0];
					});
					
					$('#penerimaan-list').on('click', '.delete', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._delete(rowdata[0]);
							}
						});
					});
					
					$('#penerimaan-list').on('click', '.edit', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'teller/edit_penerimaan/'+rowdata[0];
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