		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{asset('static/img/profile.png')}}" alt="" class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a href="{{ url('/setting') }}" >
								<span>
									<span class="user-name" id="userName">Rizki</span>
									<span class="user-level" id="user-level">Super admin</span>
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
					<ul class="nav nav-primary">
						<li class="nav-item {{ request()->is('/*') ? 'active' : '' }}">
							<a href="{{ url('/') }}">
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
						<li class="nav-item {{ request()->is('cms/admin/archive*') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/archive') }}">
								<i class="fas fa-book"></i>
								<p>Data archive</p>
							</a>
						</li> 
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