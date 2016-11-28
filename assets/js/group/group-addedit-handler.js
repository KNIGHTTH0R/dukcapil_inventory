
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var tabPosition = 1,
				maxTab = 4,
				role = [],
				row = '<tr>'+
					  '		<td>{{ menu_name }}</td>'+
					  '		<td align="">'+
					  '			<div class="pull-right">' +
					  '				<select class="role-access form-control" name="role-access" data-id="{{ menu_id }}" data-parent="{{ parent_id }}" data-link="{{ menu_link }}" style="width: 220px !important;">'+
					  '					{{ options }}'+
					  '				<select>'+
					  '			</div>' +
					  '		</td>'+
					  '</tr>',
				mpl = '';
			
			var handler = {
				_initialize: function(){
					var self = this;
					
					self._getUsers();
					self._getRole();
				},
				
				_getRole: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							var data = response.role,
								iLen = data.length;
								
							for(var i=0;i<iLen;i++){
								role.push({role_id: data[i].role_id, role_name: data[i].role_name, role: data[i].role});
							}
							
							self._getModuleManager();
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Get role failed');
								}
							}else{
								alertMessage('error', 'Get role failed');
							}
							
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
						setTimeout("unloading()",1500)
					}
					
					var error = function(response){
						setTimeout("unloading()",1500)
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/getRole',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_findMaxValue: function(element) {
					var maxValue = undefined;
					$('option', element).each(function() {
						var val = $(this).attr('value');
						val = parseInt(val, 10);
						if (maxValue === undefined || maxValue < val) {
							maxValue = val;
						}
					});
					return maxValue;
				},
				
				_getModuleEdit: function(){
					var self = this;
					
					var success = function(response){
						
						if(response.status == 'OK'){
							
							var data = response.menu_list,
								iLen = data.length;
							
							$('#table-list-menu .role-access').each(function(){
								var ctrl = $(this),
									id = ctrl.attr('data-id');
									
								for(var i = 0; i < iLen; i++){
									
									if(parseInt(data[i].menu_id) === parseInt(id)){
										console.log('selected');
										
										var max = self._findMaxValue(ctrl);
										
										if(id == 2 && max == 1)
											ctrl.val(max);
										else
											ctrl.val(data[i].role);
									}
								}
							});
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Get edit group menu failed');
								}
							}else{
								alertMessage('error', 'Get edit group menu failed');
							}
							
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
						setTimeout("unloading()",1500);
						//Metronic.init(options.baseUrl);
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						group_id: $('#group-id').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/getModuleEdit',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				 _loadMenu: function(menu, i){
					var self = this;
					
					for (var k in menu) {
						
						if (menu.hasOwnProperty(k)) {
							
							if(menu[k] != null){
							
								if(typeof menu[k]['submenu'] != 'undefined'){
									
									var blank = '';
									for(var j = 0; j < (i * 5); j++){
										blank += '&nbsp;';
									}
									
									mpl += row;
									mpl = mpl.replace(/{{ menu_name }}/gi, blank + menu[k]['menu_name']);
									mpl = mpl.replace(/{{ menu_id }}/gi, menu[k]['menu_id']);
									mpl = mpl.replace(/{{ parent_id }}/gi, menu[k]['parent_id']);
									mpl = mpl.replace(/{{ menu_link }}/gi, menu[k]['menu_link']);
									
									
									var link = menu[k].menu_link;
									if(link == 'javascript:;'){									
										var opt = '';
												  
										for(var j = 0; j < 2; j++){
											opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
										}
												  
										mpl = mpl.replace(/{{ options }}/gi, opt);
									}else{
										var opt = '',
											rLen = role.length;
										
										for(var j = 0; j < rLen; j++){
											opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
										}
												  
										mpl = mpl.replace(/{{ options }}/gi, opt);
									}
									
									self._loadMenu(menu[k]['submenu'], (i+1));
									
								}else{
									
									var blank = '';
									for(var j = 0; j < (i * 5); j++){
										blank += '&nbsp;';
									}
									
									mpl += row;
									mpl = mpl.replace(/{{ menu_name }}/gi, blank + menu[k]['menu_name']);
									mpl = mpl.replace(/{{ menu_id }}/gi, menu[k]['menu_id']);
									mpl = mpl.replace(/{{ parent_id }}/gi, menu[k]['parent_id']);
									mpl = mpl.replace(/{{ menu_link }}/gi, menu[k]['menu_link']);
									
									var link = menu[k].menu_link;
									if(link == 'javascript:;'){
										var opt = '';
												  
										for(var j = 0; j < 2; j++){
											opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
										}
												  
										mpl = mpl.replace(/{{ options }}/gi, opt);
									}else{
										var opt = '',
											rLen = role.length;
										
										for(var j = 0; j < rLen; j++){
											opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
										}
												  
										mpl = mpl.replace(/{{ options }}/gi, opt);
									}
								}
							}
						}
					}
					
					setTimeout(function(){
						$('#table-list-menu select[data-id="1"]').val(1);
						$('#table-list-menu select[data-id="1"]').attr('disabled', '');
					}, 300);
				},
				
				_getModuleManager: function(){
					var self = this;
					
					var success = function(response){
						if(response.status == 'OK'){
							
							var data = response.menu_list;
							mpl = '';
							self._loadMenu(data, 0);
							
							$('#table-list-menu').html(mpl);
							//$('.role-access').select2();
							
							if($('#group-id').val().length > 0)
								self._getModuleEdit();
							
							return false;
							//ends here
							
							var data = response.menu_list,
								iLen = data.length,
								row = '',
								tpl = '<tr>'+
									  '		<td>{{ menu_name }}</td>'+
									  '		<td align="right">'+
									  '			<select class="role-access form-control" name="role-access" data-id="{{ menu_id }}" data-level="{{ menu_level }}" data-type="{{ menu_link }}" style="max-width: 160px;">'+
									  '				{{ options }}'+
									  '			<select>'+
									  '		</td>'+
									  '</tr>';
									  
							for(var i=0;i<iLen;i++){
								
								var pad = data[i].parent_id.length,
									pad = pad * 2,
									arrPad = [];
								
								for(var j=0; j < pad; j++){
									arrPad.push('&nbsp;');
								}
								
								console.log('pad', arrPad);
								
								row += tpl;
								row = row.replace(/{{ menu_id }}/gi, data[i].menu_id);
								row = row.replace(/{{ menu_name }}/gi, arrPad.join(',').replace(/\,/gi, '') + data[i].menu_name);
								row = row.replace(/{{ menu_level }}/gi, data[i].menu_level.replace(/\./gi, ''));
								row = row.replace(/{{ menu_link }}/gi, data[i].menu_link);
								
								var link = data[i].menu_link;
								if(link == 'javascript:;'){									
									var opt = '';
											  
									for(var j = 0; j < 2; j++){
										opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
									}
											  
									row = row.replace(/{{ options }}/gi, opt);
								}else{
									var opt = '',
										rLen = role.length;
									
									for(var j = 0; j < rLen; j++){
										opt += '<option value="'+role[j].role+'">'+role[j].role_name+'</option>';
									}
											  
									row = row.replace(/{{ options }}/gi, opt);
								}
								
							}
							
							$('#table-list-menu').html(row);
							$('.role-access').each(function(){
								var ctrl = $(this);
								
								if(ctrl.attr('data-level') == 1){
									ctrl.val(1);
									ctrl.attr('disabled', '');
								}
							});
							
							if($('#group-id').val().length > 0)
								self._getModuleEdit();
							//$('.role-access').select2();
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Get menu failed');
								}
							}else{
								alertMessage('error', 'Get menu failed');
							}
							
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/getMenu',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_getEditUserGroup: function(){
					var self = this;
					
					var success = function(response){
						
						if(response.status == 'OK'){
							
							var data = response.user_list,
								iLen = data.length;
							
							$('#table-list-user .usr').each(function(){
								var ctrl = $(this),
									id = ctrl.attr('data-id');
									
								for(var i = 0; i < iLen; i++){
									if(data[i].user_id === id){
										ctrl.prop('checked', true);
										//ctrl.parent().addClass('checked');
									}
								}
							});
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Get edit user group failed');
								}
							}else{
								alertMessage('error', 'Get edit user group failed');
							}
							
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
						
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						group_id: $('#group-id').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/getEditGroupUser',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_getUsers: function(){
					var self = this;
					
					loading('Loading...',1);
					
					var success = function(response){
						
						if(response.status == 'OK'){
							
							var data = response.user_list,
								iLen = data.length,
								row = '',
								tpl = '<tr class="{{ user_id }}">'+
									  '		<td class="numb"><input type="checkbox" id="usr-id" data-id="{{ user_id }}" value="{{ user_id }}" class="usr" /></td>'+
									  '		<td>{{ username }}</td>'+
									  '		<td>{{ user_email }}</td>'+
									  '		<td>{{ user_fullname }}</td>'+
									  '</tr>';
							
							if(iLen > 0){
								for(var i=0;i<iLen;i++){
									
									var label = 'info';
									if(data[i].type == 'Admin')
										label = 'success';
									
									row += tpl;
									row = row.replace(/{{ user_id }}/gi, data[i].user_id);
									row = row.replace(/{{ username }}/gi, data[i].username);
									row = row.replace(/{{ user_email }}/gi, data[i].user_email || '-');
									row = row.replace(/{{ user_fullname }}/gi, data[i].user_fullname || '-');
								}
							}else{
								row += '<tr><td colspan="4"><div align="center">No user data</div></td></tr>';
							}
							
							$('#table-list-user tbody').html(row);
							if($('#group-id').val().length <= 0){
								//Metronic.init(options.baseUrl);
							}else{
								self._getEditUserGroup();
							}
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Get user list failed');
								}
							}else{
								alertMessage('error', 'Get user list failed');
							}
							
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
						setTimeout("unloading()",1500);
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/getUserList',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_save: function(){
					var self = this;
					
					loading('Loading...', 1);
					var success = function(response){
						
						if(response.status == 'OK'){
							
							alertMessage('success', response.message);
							setTimeout(function(){
								alertHide();
								location.href = options.baseUrl + 'group';
							}, 300);
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Simpan group gagal');
								}
							}else{
								alertMessage('error', 'Simpan group gagal');
							}
							setTimeout(function(){
								alertHide();
							}, 1000);
						}
						setTimeout("unloading()",1500);
					}
					
					var error = function(response){
						setTimeout("unloading()",1500);
						bootbox.alert(response.responseText);
					}
					
					var users = [],
						menus = [];
						
					$('#table-list-user .usr').each(function(){
						var ctrl = $(this);
						
						if(ctrl.is(':checked'))
							users.push(ctrl.val());
					});
					
					$('#tab3 #table-list-menu .role-access').each(function(){
						var ctrl = $(this),
							menuId = ctrl.attr('data-id'),
							role = ctrl.val();
						
						menus.push({menu_id: menuId, role: role});
					});
					
					var postdata = {
						group_id: $('#group-id').val(),
						group_name: $('#groupname').val(),
						group_description: $('#desc').val(),
						users: users,
						menus: menus
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'group/save',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_back: function(){
					var self = this;
					
					tabPosition = parseInt(tabPosition) - 1
					$('#tab' + tabPosition).show();
					$('.tab-' + tabPosition).addClass('active');
					
					for(var i = 1; i <= maxTab; i++){
						if(i != tabPosition){
							$('.tab-' + i).removeClass('active');
							$('#tab' + i).hide();
						}
					}
					
					if(tabPosition == 1)
						$('#back').attr('disabled', '');
					
					if(tabPosition < maxTab){
						$('#next').removeAttr('disabled');
						$('#save').hide();
					}
				},
				
				_validateUser: function(){
					var self = this;
					
					var temp = [];
					
					$('#table-list-user tbody .usr').each(function(){
						var ctrl = $(this);
						if(ctrl.is(':checked')){
							console.log('checked');
							temp.push(1);
						}
					});
					
					if(temp.length <= 0){
						alertMessage('error', 'Pilih pengguna terlebih dahulu');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}
					
					return true;
				},
				
				_validateGroup: function(){
					var self = this;
					
					if (!/\S/.test($('#groupname').val())) {
						alertMessage('error', 'Nama group harus diisi');
						setTimeout(function(){
							alertHide();
						}, 1000);
						return false;
					}
					
					return true;
				},
				
				_confirmRole: function(){
					var self = this;
					
					$('.g-name').html($('#groupname').val());
					$('.g-desc').html($('#desc').val() || '-');
					
					
					var temp = [],
						row = '';
					$('#table-list-user .usr').each(function(){
						if($(this).is(':checked')){
							temp.push($(this).attr('data-id'));
							row += '<tr>'+$('#table-list-user tr.'+$(this).attr('data-id')).html()+'</tr>';
						}
					});
					
					$('#table-list-user-confirmation tbody').html(row);
					$('#table-list-user-confirmation .usr').prop('checked', true);
					$('#table-list-user-confirmation .usr').attr('disabled', '');
					$('.module-clone').html('');
					
					var $orginalDiv = $('#table-list-menu');
					var $clonedDiv = $orginalDiv.clone();

					//get original selects into a jq object
					var $originalSelects = $orginalDiv.find('select');

					$clonedDiv.find('select').each(function(index, item) {

						 //set new select to value of old select
						 $(item).val( $originalSelects.eq(index).val() );

					});
					
					$('.module-clone').html($clonedDiv);
					$('.module-clone').find('select').each(function(){
						$(this).attr('disabled', '');
					});
					
					//$('#table-list-menu').clone().appendTo($('.module-clone'));
				},
				
				_next: function(){
					var self = this;
					
					if(tabPosition == 1){
						if(!self._validateGroup())
							return false;
					}

					if(tabPosition == 2){
						if(!self._validateUser())
							return false;
					}
					
					if(tabPosition == 3){
						self._confirmRole();
					}
					
					tabPosition = parseInt(tabPosition) + 1
					
					$('#tab' + tabPosition).show();
					$('.tab-' + tabPosition).addClass('active');
					
					for(var i = 1; i <= maxTab; i++){
						if(i != tabPosition){
							$('.tab-' + i).removeClass('active');
							$('#tab' + i).hide();
						}
					}
					
					if(tabPosition > 1)
						$('#back').removeAttr('disabled');
					
					if(tabPosition == maxTab){
						$('#next').attr('disabled', '');
						$('#save').show();
					}
				},
				
				_steps: function(position){
					var self = this;
					
					if(position >= 2){
						if(!self._validateGroup())
							return false;
					}

					if(position >= 3){
						if(!self._validateUser())
							return false;
					}
					
					if(position >= 4){
						self._confirmRole();
					}
					
					tabPosition = position;
					
					$('#tab' + tabPosition).show();
					$('.tab-' + tabPosition).addClass('active');
					
					for(var i = 1; i <= maxTab; i++){
						if(i != tabPosition){
							$('.tab-' + i).removeClass('active');
							$('#tab' + i).hide();
						}
					}
					
					if(tabPosition == 1)
						$('#back').attr('disabled', '');
					else
						$('#back').removeAttr('disabled');
					
					if(tabPosition == maxTab){
						$('#next').attr('disabled', '');
						$('#save').show();
					}else{
						$('#next').removeAttr('disabled');
						$('#save').hide();
						
					}
				},
				
				_parentMenuChange: function(parentId, val){
					var self = this;
					
					$('select[data-parent="'+parentId+'"]').each(function(){
						$(this).val(val);
						self._parentMenuChange($(this).attr('data-id'), val);
					});
				},
				
				_childMenuChange: function(menuId, val){
					var self = this;
					
					$('select[data-id="'+menuId+'"]').each(function(){
						
						if(val > 1)
							val = 1;
						
						if(val == 0){
							
							var arr = [];
							$('select[data-parent="'+menuId+'"]').each(function(){
								
								if($(this).val() == val)
									arr.push(1);
							});
							
							if($('select[data-parent="'+menuId+'"]').length == arr.length)
								$(this).val(val);
									
						}else{
							$(this).val(val);
						}
						
						self._childMenuChange($(this).attr('data-parent'), val);
					});
				},
				
				_clickListener: function(){
					var self = this;
					
					$('#save').on('click', function(){
						self._save();
					});
					
					$('#groupname').on('keyup', function(){
						var ctrl = $(this);
						
						if(ctrl.val().length > 0){
							
						}
					});
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
					});
					
					$('#table-list-menu').on('change', '.role-access', function(){
						var ctrl = $(this),
							menuId = ctrl.attr('data-id'),
							parentId = ctrl.attr('data-parent'),
							dLink = ctrl.attr('data-link'),
							val = ctrl.val();
							
						if(dLink == 'javascript:;'){
							//WITH SUB MENU
							self._parentMenuChange(menuId, val);
							
						}else{
							//SINGLE MENU
							self._childMenuChange(parentId, val);
							
						}
					});
					
					$('#c-all').on('change', function(){
						var ctrl = $(this);
						if(ctrl.is(':checked')){
							$('#table-list-user .usr').each(function(){							
								$(this).prop('checked', true);
								$(this).parent().addClass('checked');
							});
						}else{
							$('#table-list-user .usr').each(function(){							
								$(this).prop('checked', false);
								$(this).parent().removeClass('checked');
							});
						}
					});
					
					$('ul.steps li').on('click', function(){
						var ctrl = $(this),
							position = ctrl.attr('data-tab');
							
						self._steps(position);
					});
					
					$('#back').on('click', function(){
						self._back();
					});
					
					$('#next').on('click', function(){
						self._next();
					});
					
					$('#cancel').on('click', function(){
						location.href = options.baseUrl + 'group';
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