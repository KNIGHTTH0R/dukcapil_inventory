			<!-- Header -->
            <div id="header">
                <ul id="account_info" class="pull-right"> 
                    <li><img src="{{ base_url() }}assets/images/avatar.png" alt="Online" /></li>
                    <li class="setting">
                        Selamat datang, <b class="red">{{ session.userdata.user_fullname }}</b>
						{#
                        <ul class="subnav">
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Setting</a></li>
                            <li><a href="#">Reset password</a></li>
                            <br class="clearfix"/>
                        </ul>
						#}
                    </li>
                    <li class="logout" title="Disconnect"><a href="{{ base_url() }}login/expired">Logout</a></li> 
                </ul>
            </div><!-- End Header -->