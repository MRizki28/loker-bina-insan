		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{asset('img/profilepeople.png')}}" alt="" class="avatar-img rounded-circle">
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

						<li class="nav-item {{ request()->is('penawaran*') ? 'active' : '' }}">
							<a href="{{ url('/penawaran') }}">
								<i class="fas fa-newspaper"></i>
								<p>Penawaran</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('berita*') ? 'active' : '' }}">
							<a href="{{ url('/berita') }}">
								<i class="fas fa-newspaper"></i>
								<p>Informasi & Berita</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('produk*') ? 'active' : '' }}">
							<a href="{{ url('/produk') }}">
								<i class="fab fa-product-hunt"></i>
								<p>Produk</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('hero*') ? 'active' : '' }}">
							<a href="{{ url('/hero') }}">
								<i class="fas fa-file-image"></i>
								<p>Banner</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('lelang*') ? 'active' : '' }}">
							<a href="{{ url('/lelang') }}">
								<i class="fas fa-home"></i>
								<p>Lelang</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('karir*') ? 'active' : '' }}">
							<a href="{{ url('/karir') }}">
								<i class="fas fa-user-tie"></i>
								<p>Lowongan Pekerjaan</p>
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