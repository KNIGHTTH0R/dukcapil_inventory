        
        {% extends 'base/base.tpl' %}
        
        {% block content %}
            <div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                            <!-- Widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-align-left"></i>Input Data Position</span>
                                </div><!-- End widget-header -->    
                                
                                <div class="widget-content">
                                    <!-- title box -->
                                      <form id="form-action"> 
                                            <input type="hidden" id="position-id" name="position_id" value="{{ position.position_id }}" />
                                            <div class="section">
                                                <label>Position Name*<small>nama untuk posisi</small></label>   
                                                <div> <input type="text" class=" medium" id="position_name" placeholder="Position Name" value="{{ position.position_name }}" /></div>
                                            </div>

                                            <div class="section">
                                                <label>Position Desc*<small>deskripsi untuk posisi</small></label>   
                                                <div> <input type="text" class=" medium" id="position_desc" placeholder="Position Description" value="{{ position.position_desc }}" /></div>
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
            <script src="{{ base_url() }}assets/js/position/position-addedit-handler.js"></script>
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