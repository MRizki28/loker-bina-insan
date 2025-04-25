		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{asset('static/img/profile.png')}}" alt="" class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a href="{{ url('/cms/admin/setting') }}" >
								<span>
									<span class="user-name" id="userName">{{ auth()->user()->name }}</span>
									<span class="user-level" id="user-level">{{ auth()->user()->role }}</span>
								</span>
							</a>
							<div class="clearfix"></div>
							<div class="collapse in" id="collapseExample">
								<ul class="nav">
									<li>
										<a href="#">
											<span class="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					@if (auth()->check() && auth()->user()->role =='admin')
					<ul class="nav nav-primary">
						<li class="nav-item {{ request()->is('cms/admin/dashboard*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/dashboard') }}">
								<i class="fas fa-align-left"></i>
								<p>Beranda</p>
							</a>
						</li> 

						<li class="nav-item {{ request()->is('cms/admin/loker*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/loker') }}">
								<i class="fas fa-book"></i>
								<p>Lowongan kerja</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('cms/admin/file-apply*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/file-apply') }}">
								<i class="fas fa-book"></i>
								<p>Data seleksi berkas</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/interview*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/interview') }}">
								<i class="fas fa-book"></i>
								<p>Data interview</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/psikotes*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/psikotes') }}">
								<i class="fas fa-book"></i>
								<p>Data psikotes</p>
							</a>
						</li>
						<li class="nav-item {{ request()->is('cms/admin/ngaji*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/ngaji') }}">
								<i class="fas fa-book"></i>
								<p>Data ngaji</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/ranking*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/ranking') }}">
								<i class="fas fa-book"></i>
								<p>Ranking</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/archive*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/archive') }}">
								<i class="fas fa-book"></i>
								<p>Data archive</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('/cms/admin/ahp*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/ahp') }}">
								<i class="fas fa-book"></i>
								<p>Bobot kriteria & alternatif</p>
							</a>
						</li> 
						<ul>
						@else
						<ul class="nav nav-primary">
							<li class="nav-item {{ request()->is('cms/admin/dashboard*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/dashboard') }}">
									<i class="fas fa-align-left"></i>
									<p>Beranda</p>
								</a>
							</li> 
	
							<li class="nav-item {{ request()->is('cms/admin/loker*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/loker') }}">
									<i class="fas fa-keyboard"></i>
									<p>Lowongan kerja</p>
								</a>
							</li>  
							<li
                        class="nav-item {{ request()->is('cms/admin/file-apply*') || request()->is('cms/admin/interview*') || request()->is('cms/admin/psikotes*') || request()->is('cms/admin/ngaji') ? 'active' : '' }}">
                        <a data-toggle="collapse" href="#sidebarLayouts2" class="collapsed" aria-expanded="false">
                            <i class="fas fa-book"></i>
                            <p>Seleksi</p>
                            <span class="caret"></span>
                        </a>
                        <div class="collapse" id="sidebarLayouts2" style="">
                            <ul class="nav nav-collapse">
                                <li class="nav-item {{ request()->is('cms/admin/file-apply*') ? 'active' : '' }}">
                                    <a href="{{ url('/cms/admin/file-apply') }}">
                                        <span class="sub-item">Data seleksi berkas</span>
                                    </a>
                                </li>
                                <li class="nav-item {{ request()->is('cms/admin/interview*') ? 'active' : '' }}">
                                    <a href="{{ url('/cms/admin/interview') }}">
                                        <span class="sub-item">Data interview</span>
                                    </a>
                                </li>
                                <li class="nav-item {{ request()->is('cms/admin/psikotes*') ? 'active' : '' }}">
                                    <a href="{{ url('/cms/admin/psikotes') }}">
                                        <span class="sub-item">Data psikotes</span>
                                    </a>
                                </li>
								<li class="nav-item {{ request()->is('cms/admin/ngaji*') ? 'active' : '' }}">
                                    <a href="{{ url('/cms/admin/ngaji') }}">
                                        <span class="sub-item">Data tes mengaji</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
							<li class="nav-item {{ request()->is('cms/admin/ranking*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/ranking') }}">
									<i class="fas fa-chart-bar"></i>
									<p>Ranking</p>
								</a>
							</li> 
							<li class="nav-item {{ request()->is('cms/admin/archive*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/archive') }}">
									<i class="fas fa-archive"></i>
									<p>Data archive</p>
								</a>
							</li> 
							<li class="nav-item {{ request()->is('/cms/admin/ahp*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/ahp') }}">
									<i class="fas fa-cog"></i>
									<p>Bobot kriteria & alternatif</p>
								</a>
							</li> 
							<li class="nav-item {{ request()->is('cms/admin/usermanagement*') ? 'active' : '' }}">
								<a href="{{ url('/cms/admin/usermanagement') }}">
									<i class="fas fa-user"></i>
									<p>User management</p>
								</a>
							</li> 
							<ul>
						@endif
						
					<ul>
				</div>
			</div>
		</div>

		{{-- <script>
			$(document).ready(function () {
				function getNameUser() {
					$.ajax({
						type: "GET",
						url: `${appUrl}/v1/user/get-personal`,
						dataType: "json",
						success: function (response) {
							if (response.message == 'Success get data personal user') {
								$('#userName').text(!response.data.profile ? 'Admin' : response.data.profile.name)
							}else{
								$('#userName').text('Admin')
							}
						}
					});
				}

				getNameUser()
			});
		</script> --}}
		<!-- End Sidebar -->