		
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-align-left"></i>Input Data Pengguna</span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
                                    <!-- title box -->
                                      <form id="form-action"> 
											<input type="hidden" id="user-id" name="user_id" value="{{ user.user_id }}" />
											<div class="section">
                                                <label>Username *<small>username untuk login</small></label>   
                                                <div> <input type="text" class=" medium" id="username" placeholder="Username" value="{{ user.username }}" /></div>
                                            </div>
											<div class="section">
                                                <label>Password *<small>password untuk login</small></label>   
                                                <div> <input type="password" class=" small" id="password" placeholder="Password" value="" /></div>
                                            </div>
											<div class="section">
                                                <label>Konfirmasi Password *</label>   
                                                <div> <input type="password" class=" small" id="copass" placeholder="Konfirmasi Password" /></div>
                                            </div>
											<div class="section">
                                                <label>Nama Lengkap *</label>   
                                                <div> <input type="text" class=" medium" id="name" placeholder="Nama Lengkap" value="{{ user.user_fullname }}" /></div>
                                            </div>
                                            <div class="section">
                                                <label>Email *</label>   
                                                <div> <input type="text" class=" medium" id="email" placeholder="Email" value="{{ user.user_email }}" /></div>
                                            </div>
											<div class="section">
                                                <label>Telepon</label>   
                                                <div> <input type="text" class="small" id="phone" placeholder="Telepon" value="{{ user.user_phone_number }}" /></div>
                                            </div>
											<div class="section">
                                                <label>Posisi</label>   
                                                <div> <input type="text" class="medium" id="position" placeholder="Posisi" value="{{ user.position }}" /></div>
                                            </div>
											{#
                                            <div class="section">
												<label>Level<small>For Menu Permission</small></label>   
												<div>
													<select class="small">
													   <option value="1" />Administrator
													   <option value="2" />Support
													   <option value="3" />Report
													   <option value="4" />Teller
													   <option value="5" />Kasir
													   <option value="5" />Bendahara
													   <option value="5" />Anggaran
													   <option value="5" />Back Office
												  </select>       
												</div>
											</div>
											#}
											<div class="section">
                                                <label>Status<small>user aktif atau tidak aktif</small></label>
                                                
                                                <div>
													<input type="checkbox" class="on_off_checkbox" {% if user.status == 'A' %}checked{% endif %} id="status" />
                                                    <span class="f_help">Aktif / Tidak Aktif  </span> 
												</div>
                                                
											</div> 
                                             <div class="section">
                                                 <label> Keterangan</label>   
                                                <div> 
													<textarea name="Textareaelastic" id="desc" class="large" cols="" rows="" placeholder="Keterangan">{{ user.description }}</textarea>
												</div>
                                             </div>
                                 
                                            <div class="section last">
                                                <div>
													<button type="button" class="uibutton special cancel">Batal</button>
													{% if role == 2 %}
														<button type="submit" class="uibutton loading" title="Menyimpan" rel="1">Simpan</button> 
													{% endif %}
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
			<script src="{{ base_url() }}assets/js/user/user-addedit-handler.js"></script>
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