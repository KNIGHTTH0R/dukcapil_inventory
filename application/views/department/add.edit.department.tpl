        
        {% extends 'base/base.tpl' %}
        
        {% block content %}
            <div id="content" >
                <div class="inner">
                                    
                    {% include 'base/base.setting.tpl' %}
                    <div class="row-fluid">
                    
                            <!-- Widget -->
                            <div class="widget  span12 clearfix">
                            
                                <div class="widget-header">
                                    <span><i class="icon-align-left"></i>Input Data Department</span>
                                </div><!-- End widget-header -->    
                                
                                <div class="widget-content">
                                    <!-- title box -->
                                      <form id="form-action"> 
                                            <input type="hidden" id="department-id" name="department_id" value="{{ department.department_id }}" />
                                            <div class="section">
                                                <label>Department Name*<small>nama untuk department</small></label>   
                                                <div> <input type="text" class=" medium" id="department_name" placeholder="Department Name" value="{{ department.department_name }}" /></div>
                                            </div>

                                            <div class="section">
                                                <label>Department Sort*<small>urutan untuk department</small></label>   
                                                <div> <input type="text" class=" medium" id="department_sort" placeholder="" value="{{ department.department_sort }}" disabled /></div>
                                            </div>

                                            <div class="section">
                                                <label>Department Desc*<small>deskripsi untuk department</small></label>   
                                                <div> <input type="text" class=" medium" id="department_desc" placeholder="Department Description" value="{{ department.department_desc }}" /></div>
                                            </div>

                                            <div class="section">
                                                <label>Status<small>department aktif atau tidak aktif</small></label>
                                                
                                                <div>
                                                    <input type="checkbox" class="on_off_checkbox" {% if department.status == 'A' %}checked{% endif %} id="status" />
                                                    <span class="f_help">Aktif / Tidak Aktif  </span> 
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
            <script src="{{ base_url() }}assets/js/department/department-addedit-handler.js"></script>
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