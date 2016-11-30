		
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-align-left"></i>Input Data Kategori {{ role }}</span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
                                    <!-- title box -->
                                      <form id="form-action" /> 
											<input type="hidden" id="category-id" name="category_id" value="{{ category.category_id }}" />
											<div class="section">
                                                <label>Nama</label>   
                                                <div> <input type="text" class=" medium" id="name" placeholder="Nama" value="{{ category.name }}" /></div>
                                            </div>
											<div class="section">
                                                <label>Kode<small>untuk kode kategori</small></label>   
                                                <div> <input type="text" class=" xsmall" id="code" placeholder="Kode" value="{{ category.code }}" /></div>
                                            </div>
											
                                            
											<div class="section">
                                                <label>Status<small>status master kategori</small></label>
                                                
                                                <div>
                                                         <input type="checkbox" class="on_off_checkbox" value="1" id="status" {% if category.status == 'A' %}checked{% endif %} />
                                                        <span class="f_help">Aktif / Tidak Aktif  </span> 
                                               </div>
                                                
                                           </div> 
                                            
                                            <div class="section last">
                                                <div>
													<button type="button" class="uibutton special cancel">Batal</button>
													{% if role == 2 %}
														<button type="submit" class="uibutton loading" title="Loading..." rel="1">Simpan</button>
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
			<script src="{{ base_url() }}assets/js/category/category-addedit-handler.js"></script>
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