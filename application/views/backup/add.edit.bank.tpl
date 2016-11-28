		
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content">
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-align-left"></i>Input Data Bank</span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
                                    <!-- title box -->
                                      <form id="form-action" /> 
										<input type="hidden" id="bank-id" name="bank_id" value="{{ bank.bank_id }}" />
											<div class="section">
                                                <label>Nama Bank</label>   
                                                <div> <input type="text" class=" medium" id="name" placeholder="Nama Bank" value="{{ bank.bank_name }}" /></div>
                                            </div>
											<div class="section">
                                                <label>No.Rekening<small>nomor rekening</small></label>   
                                                <div> <input type="text" class=" medium" id="rek-number" placeholder="No. Rekening" value="{{ bank.rek_number }}" /></div>
                                            </div>
											<div class="section">
                                                <label>Atas Nama</label>   
                                                <div> <input type="text" class=" medium" id="account-name" placeholder="Atas Nama" value="{{ bank.account_name }}" /></div>
                                            </div>
                                            
											<div class="section">
                                                <label>Status<small>aktif atau tidak aktif</small></label>
                                                
                                                <div>
                                                         <input id="status" type="checkbox" class="on_off_checkbox" {% if bank.status == 'A' %}checked{% endif %} value="1" />
                                                        <span class="f_help">Aktif / Tidak Aktif  </span> 
                                               </div>
                                                
                                           </div> 
                                            
                                            <div class="section last">
                                                <div>
													<button type="button" class="uibutton special cancel">Batal</button>
													<button type="submit" class="uibutton loading" title="Loading..." rel="1">Simpan</a>
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
			<script src="{{ base_url() }}assets/js/bank/bank-addedit-handler.js"></script>
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