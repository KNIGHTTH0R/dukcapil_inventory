<!DOCTYPE html>
<html lang="en">
	<head>
        <meta charset="utf-8">
        <title>Inventory Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Link shortcut icon-->
        <link rel="shortcut icon" type="image/ico" href="{{ base_url() }}assets/images/favicon.ico"/> 

        <!-- CSS Stylesheet-->
        <link type="text/css" rel="stylesheet" href="{{ base_url() }}assets/components/bootstrap/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="{{ base_url() }}assets/components/bootstrap/bootstrap-responsive.css" />
		<link type="text/css" rel="stylesheet" href="{{ base_url() }}assets/components/dataTables/css/jquery.dataTables.css" />
        <link type="text/css" rel="stylesheet" href="{{ base_url() }}assets/css/zice.style.css"/>
		<link type="text/css" rel="stylesheet" href="{{ base_url() }}assets/css/custom.css" />
		{% block css %}
		{% endblock %}
	
        <!--[if lte IE 8]><script language="javascript" type="text/javascript" src="{{ base_url() }}assets/components/flot/excanvas.min.js"></script><![endif]-->  
		
        <script type="text/javascript" src="{{ base_url() }}assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/ui/jquery.ui.min.js"></script> 
		<script type="text/javascript" src="{{ base_url() }}assets/components/bootstrap/bootstrap.min.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/ui/timepicker.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/colorpicker/js/colorpicker.js"></script>
		<script type="text/javascript" src="{{ base_url() }}assets/js/share.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/form/form.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/elfinder/js/elfinder.full.js"></script>
		<script type="text/javascript" src="{{ base_url() }}assets/components/bootbox/bootbox.min.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/dataTables/js/jquery.dataTables.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/fancybox/jquery.fancybox.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/jscrollpane/jscrollpane.min.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/editor/jquery.cleditor.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/chosen/chosen.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/validationEngine/jquery.validationEngine.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/validationEngine/jquery.validationEngine-en.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/fullcalendar/fullcalendar.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/flot/flot.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/components/uploadify/uploadify.js"></script>       
		<script type="text/javascript" src="{{ base_url() }}assets/components/Jcrop/jquery.Jcrop.js"></script>
		<script type="text/javascript" src="{{ base_url() }}assets/components/smartWizard/jquery.smartWizard.min.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="{{ base_url() }}assets/js/zice.custom.js"></script>
		
		<script type="text/javascript" src="{{ base_url() }}assets/js/moment.min.js"></script>
		<script type="text/javascript" src="{{ base_url() }}assets/js/lumi-request.js"></script>
		
		<script type="text/javascript">
            $(function() {
                $( "#accordion" ).accordion({ autoHeight: false });
                $( "#tabs" ).tabs();
            });
        </script>
		
		{% block js %}
		{% endblock %}
        
	</head>        
	<body>        
	
		{% include 'base/base.header.tpl' %}
		{% include 'base/base.left.menu.tpl' %}
		   
		{% block content %}
		{% endblock %}
	</body>
</html>