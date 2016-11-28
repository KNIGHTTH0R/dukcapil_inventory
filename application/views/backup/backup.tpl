
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Table widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-home"></i> Backup </span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
								<ul class="uibutton-group">
									{% if role == 2 %}
										<form action="{{ base_url() }}backup/download" method="post">
											<li><span class="netip"><button type="submit" class="uibutton normal" title="Download">Download</button></span></li>
										</form>
									{% else %}
										<p>You don't have permission to download backup database. Please contact your administrator</p>
                                    {% endif %}
                                   </ul>
                                </div><!--  end widget-content -->
                            </div><!-- widget  span12 clearfix-->

                    </div><!-- row-fluid -->
                    
                    {% include 'base/base.footer.tpl' %}
                    
                </div> <!--// End inner -->
              </div> <!--// End ID content -->
		{% endblock %}
		
		{% block js %}
		{% endblock %}