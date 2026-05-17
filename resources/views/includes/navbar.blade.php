<!-- Navbar -->
<header class="bg-white {{Route::is(['about_us', 'transaction-history']) ? 'border-bottom' : ''}}">
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<a class="navbar-brand" href="{{route('home')}}">
			<img src="{{asset('assets/img/megamendung-logo.png')}}" width="120" height="63" class="d-inline-block align-top" alt="Mega Mendung Logo">
		</a>
		<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
		>
				<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item {{Route::is('home') ? 'active' : ''}}">
					<a class="nav-link" href="{{route('home')}}">@lang('messages.nav.home') <span class="sr-only">(current)</span></a
					>
				</li>
				<li class="nav-item {{Route::is('about_us') ? 'active' : ''}}">
						<a class="nav-link" href="{{route('about_us')}}">@lang('messages.nav.about')</a>
				</li>
				<li class="nav-item {{Route::is(['transaction-history', 'transaction-history.*']) ? 'active' : ''}}">
						<a class="nav-link" href="{{route('transaction-history')}}">@lang('messages.nav.transaction_history')</a>
				</li>
				@guest
					<li class="nav-item">
						<a href="{{route('register')}}" class="nav-link btn btn-primary-custom">@lang('messages.nav.register')</a>
					</li>
					<li class="nav-item">
						<a href="{{route('login')}}" class="nav-link">@lang('messages.nav.login')</a>
					</li>
				@endguest

				@auth
					@if(auth()->user()->isAdmin() || auth()->user()->isBank())
						<li class="nav-item">
							<a href="{{route('admin.dashboard')}}" class="nav-link">
								@lang('messages.nav.dashboard')
							</a>
						</li>
					@endif
						<li class="nav-item my-2 my-md-0">
							<form action="{{route('logout')}}" method="post">
								@csrf
								<button class="nav-link btn btn-primary-custom">
									@lang('messages.nav.logout')
								</button>
							</form>
						</li>
				@endauth
				<li class="nav-item d-flex align-items-center">
					<a href="{{ url('lang/' . (App::getLocale() === 'id' ? 'en' : 'id')) }}" class="nav-link text-muted small">
						{{ App::getLocale() === 'id' ? 'EN' : 'ID' }}
					</a>
				</li>
				</ul>
		</div>
	</nav>
</header>
<!-- End of Navbar -->