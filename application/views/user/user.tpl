
		{% extends 'base/base.tpl' %}
		
		{% block content %}
			<div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                    		<!-- Table widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-home"></i> Master Data Pengguna</span>
                                </div><!-- End widget-header -->	
                                
                                <div class="widget-content">
								<ul class="uibutton-group">
									{% if role == 2 %}
										<li><span class="netip"><a href="{{ base_url() }}pengguna/tambah" class="uibutton icon add normal" title="Add Data">Tambah Data</a></span></li>
									{% endif %}
                                </ul><br />
								
                                    <table class="table table-bordered table-striped" id="table-list">
                                        <thead>
                                            <tr>
												<th>user_id</th>
                                                <th>Username</th>
                                                <th>Nama Lengkap</th>
                                                <th>Email</th>
												<th>Telepon</th>
												<th>Posisi</th>
												<th>Group</th>
												<th>Status</th>
												<th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
			<script src="{{ base_url() }}assets/js/user/user-handler.js"></script>
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