
	{% extends 'base/base.tpl' %}
	
	{% block content %}
		<div id="content" >
			<div class="inner">
								
				{% include 'base/base.setting.tpl' %}
				<div class="row-fluid">
				
						<!-- Table widget -->
						<div class="widget  span12 clearfix">
						
							<div class="widget-header">
								<span><i class="icon-home"></i> NOTAUTHORIZED </span>
							</div><!-- End widget-header -->	
							
							<div class="widget-content">
								<h3>You don't have permission to access this page. Please contact administrator</h3>
							</div><!--  end widget-content -->
						</div><!-- widget  span12 clearfix-->

				</div><!-- row-fluid -->
				
				{% include 'base/base.footer.tpl' %}
				
			</div> <!--// End inner -->
		  </div> <!--// End ID content -->
	{% endblock %}

	{% block js %}
	{% endblock %}