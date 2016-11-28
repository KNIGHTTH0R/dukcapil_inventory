
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Table widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-home"></i> Restore Database </span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
									<form id="form-action" method="post" enctype="multipart/form-data" action="{{ base_url() }}restore/import" /> 
											{{ session.userdata.msg | raw }}
											<div class="section">
                                                <label>Upload File</label>   
                                                <div> <input type="file" name="userfile" class=" medium" id="file" placeholder="MySQL File" value="" /></div>
                                            </div>
                                            
                                            <div class="section last">
                                                <div>
													{% if role == 2 %}
														<button type="submit" class="uibutton loading" title="Loading..." rel="1">Restore</a>
													{% endif %}
												</div>
                                           </div>
                                        </form>                                </div><!--  end widget-content -->
                            </div><!-- widget  span12 clearfix-->

                    </div><!-- row-fluid -->
                    
                    {% include 'base/base.footer.tpl' %}
                    
                </div> <!--// End inner -->
              </div> <!--// End ID content -->
		{% endblock %}
		
		{% block js %}
			<script src="{{ base_url() }}assets/js/bank/bank-handler.js"></script>
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