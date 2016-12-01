
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Table widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-home"></i> Master Data Department </span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
								 <ul class="uibutton-group">
									{% if role == 2 %}
										<li> <span class="netip"><a href="{{ base_url() }}department/tambah" class="uibutton icon add normal" title="Add Data">Tambah Data</a></span></li>
                                    {% endif %}
                                 </ul><br />
                                    <table class="table table-bordered table-striped" id="table-list">
                                        <thead>
                                            <tr>
												<th>department_id</th>
                                                <th>Department Name</th>
												<th>Department Sort</th>
                                                <th>Department Desc</th>
                                                <th>Status</th>
                                                <th>Created By</th>
                                                <th>Created Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody align="">
                                            
                                        </tbody>
                                    </table>
                                </div><!--  end widget-content -->
                            </div><!-- widget  span12 clearfix-->

                    </div><!-- row-fluid -->
                  
                    {% include 'base/base.footer.tpl' %}
                    
                </div> <!--// End inner -->
              </div> <!--// End ID content -->
		{% endblock %}
		
		{% block js %}
			<script src="{{ base_url() }}assets/js/department/department-handler.js"></script>
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