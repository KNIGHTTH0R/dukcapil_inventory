
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable,
				dataTable1,
				dataTable2,
				dataTable3,
				dataTable4;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					var hash = window.location.hash;
					if(hash == '#saldo'){
						$('.saldo-section').trigger('click');
					}else if(hash == '#pengumpulan'){
						$('.pengumpulan-section').trigger('click');
					}else if(hash == '#pendistribusian'){
						$('.pendistribusian-section').trigger('click');
					}else if(hash == '#pengelolaan'){
						$('.pengelolaan-section').trigger('click');
					}else if(hash == '#apbn'){
						$('.apbn-section').trigger('click');
					}else if(hash == '#apbd'){
						$('.apbd-section').trigger('click');
					}else{
						$('.saldo-section').trigger('click');
					}
					
					self._initTableSaldo();
					self._initTablePengumpulan();
					self._initTablePendistribusian();
					self._initTablePengelolaan();
					
					setTimeout(function(){
						$('table').css('width', '100%');
					}, 500);
				},
				
				_initTableSaldo: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable = $('#saldo-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "input_anggaran/getSaldoList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#saldo-list tbody").remove();
									$("#saldo-list").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
									$("#saldo-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'input_anggaran/edit_saldo/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data,2)+'</div>';
								},
								"targets": 2
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="center">'+data+'</div>';
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
				
				_initTablePendistribusian: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable2 = $('#pendistribusian-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "input_anggaran/getPendistribusianList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#pendistribusian-list tbody").remove();
									$("#pendistribusian-list").append('<tbody class="employee-grid-error"><tr><th colspan="4">No data found in the server</th></tr></tbody>');
									$("#pendistribusian-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'input_anggaran/edit_pendistribusian/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data,2)+'</div>';
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
				
				_initTablePengumpulan: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable1 = $('#pengumpulan-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "input_anggaran/getPengumpulanList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#pengumpulan-list tbody").remove();
									$("#pengumpulan-list").append('<tbody class="employee-grid-error"><tr><th colspan="4">No data found in the server</th></tr></tbody>');
									$("#pengumpulan-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'input_anggaran/edit_pengumpulan/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data,2)+'</div>';
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
				
				_initTablePengelolaan: function(){
					
					var btn = "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a>";
							  
					if(options.role != 2){
						var btn = "<a href='javascript:;' class='edit'>Edit</a>";
					}
					
					dataTable3 = $('#pengelolaan-list').DataTable({
						"processing": true,
						"serverSide": true,
						"ajax":{
							url : options.baseUrl + "input_anggaran/getPengelolaanList",
							type: "POST",
							error: function(response){
								if(response.status == 401)
									location.href = BASE_URL + 'login/expired'
								else{
									$("#pengelolaan-list tbody").remove();
									$("#pengelolaan-list").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
									$("#pengelolaan-list_processing").css("display","none");
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
     								return '<a href="' + options.baseUrl + 'input_anggaran/edit_pengelolaan/' + row[0] + '">'+data+'</a>';
								},
								"targets": 1
							},
							{
								"render": function ( data, type, row ) {
     								return '<div align="right">'+formatMoney(data,2)+'</div>';
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
				
				_deletePendistribusian: function(id){
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
						pendistribusian_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/deletePendistribusian',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_deletePengumpulan: function(id){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', 'Hapus data berhasil');
							dataTable1.draw();
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
						pengumpulan_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/deletePengumpulan',
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
						saldo_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/deleteSaldo',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_deletePengelolaan: function(id){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', 'Hapus data berhasil');
							dataTable3.draw();
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
						pengelolaan_dana_id: id
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/deletePengelolaan',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_saveDana: function(type){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							alertMessage('success', response.message);
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Proses simpan gagal');
								}
							}else{
								alertMessage('error', 'Proses simpan gagal');
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
					
					var dana_id = $('#apbn-id').val();
					if(type == 'D')
						dana_id = $('#apbd-id').val();
					
					var anggaran = $('#apbn').val();
					if(type == 'D')
						anggaran = $('#apbd').val();
					
					var year = $('#year-apbn').val();
					if(type == 'D')
						year = $('#year-apbd').val();
					
					var postdata = {
						dana_id: dana_id,
						year: year,
						anggaran: anggaran,
						type: type
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/saveDana',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_getYear: function(year, type){
					var self = this;
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							
							if(type == 'D'){
								$('#apbd-id').val(response.dana.dana_id);
								$('#apbd').val(response.dana.anggaran);
							}else{
								$('#apbn-id').val(response.dana.dana_id);
								$('#apbn').val(response.dana.anggaran);
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
					
					var dana_id = $('#apbn-id').val();
					if(type == 'D')
						dana_id = $('#apbd-id').val();
					
					var anggaran = $('#apbn').val();
					if(type == 'D')
						anggaran = $('#apbd').val();
					
					var postdata = {
						year: year,
						type: type
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'input_anggaran/getYear',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#year-apbn').on('change', function(){
						var ctrl = $(this);
						self._getYear(ctrl.val(), 'N')
					}).change();
					
					$('#year-apbd').on('change', function(){
						var ctrl = $(this);
						self._getYear(ctrl.val(), 'D')
					}).change();
					
					$('#apbn, #apbd').on('keydown', function(e){
						return isNumeric(e);
					});
					
					$('#form-apbn').on('submit', function(e){
						e.preventDefault();
						if (!/\S/.test($('#apbn').val())) {
							alertMessage('error', 'Mohon isi anggaran APBN terlebih dahulu');
							setTimeout(function(){
								alertHide();
							}, 1000);
							
							return false;
						}
						
						self._saveDana('N');
					});
					
					$('#form-apbd').on('submit', function(e){
						e.preventDefault();
						if (!/\S/.test($('#apbd').val())) {
							alertMessage('error', 'Mohon isi anggaran APBD terlebih dahulu');
							setTimeout(function(){
								alertHide();
							}, 1000);
							
							return false;
						}
						
						self._saveDana('D');
					});
					
					$('#pengelolaan-list').on('click', '.delete', function(){
						var rowdata = dataTable3.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._deletePengelolaan(rowdata[0]);
							}
						});
					});
					
					$('#pengelolaan-list').on('click', '.edit', function(){
						var rowdata = dataTable3.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'input_anggaran/edit_pengelolaan/'+rowdata[0];
					});
					
					$('#pendistribusian-list').on('click', '.delete', function(){
						var rowdata = dataTable2.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._deletePendistribusian(rowdata[0]);
							}
						});
					});
					
					$('#pendistribusian-list').on('click', '.edit', function(){
						var rowdata = dataTable2.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'input_anggaran/edit_pendistribusian/'+rowdata[0];
					});
					
					$('#pengumpulan-list').on('click', '.delete', function(){
						var rowdata = dataTable1.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._deletePengumpulan(rowdata[0]);
							}
						});
					});
					
					$('#pengumpulan-list').on('click', '.edit', function(){
						var rowdata = dataTable1.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'input_anggaran/edit_pengumpulan/'+rowdata[0];
					});
					
					$('#saldo-list').on('click', '.delete', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						bootbox.confirm('Anda yakin ingin menghapus data ini ?', function(result){
							if(result){
								self._delete(rowdata[0]);
							}
						});
					});
					
					$('#saldo-list').on('click', '.edit', function(){
						var rowdata = dataTable.row($(this).parents('tr')).data();
						location.href = options.baseUrl + 'input_anggaran/edit_saldo/'+rowdata[0];
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