		
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
						<!-- Widget -->
						<div class="widget  span12 clearfix">
						
							<div class="widget-header">
								<span><i class="icon-align-left"></i>Input Data Group</span>
							</div><!-- End widget-header -->	
							
							<div class="widget-content">
								<!-- title box -->
								  <form id="demo" class="form-horizontal"> 
										<input type="hidden" id="group-id" value="{{ group.group_id }}" />
										<div class="form-wizard">
											<div class="form-body">
												<ul class="nav nav-pills nav-justified steps">
													<li class="active tab-1" data-tab="1">
														<a href="javascript:;" class="step">
														<span class="number">
														</span>
														<span class="desc">
														Group Pengguna</span>
														</a>
													</li>
													<li class="tab-2" data-tab="2">
														<a href="javascript:;" class="step active">
														<span class="number">
														</span>
														<span class="desc">
														Tambah Pengguna ke Group</span>
														</a>
													</li>
													<li class="tab-3" data-tab="3">
														<a href="javascript:;" class="step">
														<span class="number">
														</span>
														<span class="desc">
														Menu</span>
														</a>
													</li>
													<li class="tab-4" data-tab="4">
														<a href="javascript:;" class="step">
														<span class="number">
														</span>
														<span class="desc">
														Konfirmasi Group Pengguna</span>
														</a>
													</li>
												</ul>
												
												
												<div class="tab-content" style="min-height: 150px;margin-top: 50px;">
													
													<div class="tab-pane active" id="tab1">
														
														<div class="section">
															<label>Nama Group *</label>   
															<div> 
																<input type="text" class="form-control" id="groupname" maxLength="40" 
																	placeholder="Nama Group" value="{{ group.group_name }}">
															</div>
														</div>
														
														<div class="section">
															<label>Deskripsi Group</label>   
															<div>
																<textarea class="form-control" rows="3" id="desc" maxLength="500" style="resize: none;" 
																	placeholder="Deskripsi Group">{{ group.group_description }}</textarea>
															</div>
														</div>
														
													</div>

													<div class="tab-pane" id="tab2">
														<div class="table-responsive">
															<table id="table-list-user" class="table" style="margin-bottom: 40px;">
																<thead>
																	<tr>
																		<th style="max-width: 70px;">
																			<input type="checkbox" id="c-all" class="" />
																		</th>
																		<th>
																			Username
																		</th>
																		<th>
																			Email
																		</th>
																		<th>
																			Nama Lengkap
																		</th>
																	</tr>
																</thead>
																<tbody align="center">
																	
																</tbody>
															</table>
														</div>
													</div>
													
													<div class="tab-pane" id="tab3">
														<table id="table-list-menu" class="table" style="margin-bottom: 40px;">
															<thead>
																<tr>
																	<th>
																		Nama Menu
																	</th>
																	<th>
																		Role
																	</th>
																</tr>
															</thead>
															<tbody>
																
															</tbody>
														</table>
														
														
														<div class="table-clone"></div>
													</div>
													
													<div class="tab-pane" id="tab4">
														
														<div class="panel panel-default" style="">
															<div class="panel-body">
															
																<div class="section">
																	<label>Nama Group *</label>   
																	<div> 
																		<strong class="g-name"></strong>
																	</div>
																</div>
																
																<div class="section">
																	<label>Deskripsi Group</label>   
																	<div>
																		<strong class="g-desc"></strong>
																	</div>
																</div>
															
															</div>
														</div>
														<br><br>
														<h2>Users</h2>
														<div class="table-responsive">
															<table id="table-list-user-confirmation" class="table" style="margin-bottom: 40px;">
																<thead>
																	<tr>
																		<th style="max-width: 70px;">
																			#
																		</th>
																		<th>
																			Username
																		</th>
																		<th>
																			Email
																		</th>
																		<th>
																			Nama Lengkap
																		</th>
																	</tr>
																</thead>
																<tbody align="center">
																	
																</tbody>
															</table>
														</div>
														
														<h2>Menu</h2>
														<div class="table-responsive module-clone">
															
														</div>
														
													</div>
													
												</div>
											</div>
											<div class="form-actions">
												<div class="row" style="">
													<div class="col-md-7" style="width: 40%;display: inline-block">
														<button id="cancel" type="button" class="btn default" style="width: 120px;">Batal</button>
													</div>
													<div class="col-md-5" style="width: 50%;display: inline-block">
														<div class="">
															<button id="back" type="button" class="btn default" style="width: 120px;" disabled><i class="m-icon-swapleft"></i> Sebelumnya</button>
															<button id="next" type="button" class="btn blue" style="width: 120px;">Berikutnya <i class="m-icon-swapright m-icon-white"></i></button>
															
																<button id="save" type="button" class="btn green-haze" style="width: 120px; display: none;">Simpan</button>
															
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
							</div><!--  end widget-content -->
						</div><!-- widget  span12 clearfix-->

                    </div><!-- row-fluid -->
                  
                    {% include 'base/base.footer.tpl' %}
                    
                </div> <!--// End inner -->
              </div> <!--// End ID content --> 
		{% endblock %}
		
		{% block js %}
		<script src="{{ base_url() }}assets/js/group/group-addedit-handler.js"></script>
		<script>
			$(document).ready(function(){
				var handler = Handler.createIt({
					baseUrl: '{{ base_url() }}',
					role: '{{ role }}'
				});			
				
				handler.init();
			});
		</script>
		{% endblock %}