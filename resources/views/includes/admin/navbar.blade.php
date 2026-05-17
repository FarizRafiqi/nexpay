<!-- Navbar -->
<header>
	<nav class="navbar navbar-expand-lg navbar-light bg-white mx-0 px-5 navbar-dashboard">
		<a class="navbar-brand" href="">
		<img src="{{asset('assets/img/megamendung-logo.png')}}" width="120" height="63.6" class="d-inline-block align-top" alt="Logo Mega Mendung">
		</a>
		<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarDashboard"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		
		<div class="collapse navbar-collapse" id="navbarDashboard">
			<ul class="navbar-nav mx-auto">
				<li class="nav-item {{Route::is('admin.dashboard') ? 'active' : ''}}">
					<a class="nav-link" href="{{route('admin.dashboard')}}">
						@lang('messages.admin.dashboard') <span class="sr-only">(current)</span>
					</a>
				</li>
				@can('transaction_access')
					<li class="nav-item dropdown {{Route::is(['admin.payments.*','admin.payment-methods.*']) ? 'active' : ''}}">
						<a class="nav-link dropdown-toggle" href="{{ route('admin.payments.index') }}" id="navbarDropdownTransaction" data-toggle="dropdown">
							@lang('messages.admin.transactions')
						</a>
						<div class="dropdown-menu">
							@can('payment_access')
								<a class="dropdown-item {{Route::is('admin.payments.*') ? 'active' : ''}}" href="{{route('admin.payments.index')}}">@lang('messages.admin.payments')</a>
							@endcan
							@can('payment_method_access')
								<a class="dropdown-item {{Route::is('admin.payment-methods.*') ? 'active' : ''}}" href="{{route('admin.payment-methods.index')}}">@lang('messages.admin.payment_methods')</a>
							@endcan
						</div>
					</li>
				@endcan
				@can('usage_access')
					<li class="nav-item {{Route::is('admin.usages.*') ? 'active' : ''}}">
						<a class="nav-link" href="{{route('admin.usages.index')}}">@lang('messages.admin.usage')</a>
					</li>
				@endcan
				@can('bill_access')
					<li class="nav-item {{Route::is('admin.bills.*') ? 'active' : ''}}">
						<a class="nav-link" href="{{route('admin.bills.index')}}">@lang('messages.admin.bills')</a>
					</li>
				@endcan
				@can('user_management_access')
					<li class="nav-item dropdown {{Route::is(['admin.users.*','admin.levels.*', 'admin.activity-logs.*', 'admin.permissions.*']) ? 'active' : ''}}">
						<a class="nav-link dropdown-toggle" href="{{ route('admin.users.index') }}" id="navbarDropdown" data-toggle="dropdown">
							@lang('messages.admin.user_management')
						</a>
						<div class="dropdown-menu">
							<a class="dropdown-item {{Route::is('admin.users.*') ? 'active' : ''}}" href="{{route('admin.users.index')}}">@lang('messages.admin.users')</a>
							<a class="dropdown-item {{Route::is('admin.permissions.*') ? 'active' : ''}}" href="{{route('admin.permissions.index')}}">@lang('messages.admin.permissions')</a>
							<a class="dropdown-item {{Route::is('admin.levels.*') ? 'active' : ''}}" href="{{route('admin.levels.index')}}">@lang('messages.admin.levels')</a>
							<a class="dropdown-item {{Route::is('admin.activity-logs.*') ? 'active' : ''}}" href="{{route('admin.activity-logs.index')}}">@lang('messages.admin.activity_logs')</a>
						</div>
					</li>
				@endcan
				@can('pln_customer_access')
					<li class="nav-item {{Route::is('admin.pln-customers.*') ? 'active' : ''}}">
						<a class="nav-link" href="{{route('admin.pln-customers.index')}}">@lang('messages.admin.customers')</a>
					</li>
				@endcan
				@can('tariff_access')
					<li class="nav-item {{ Route::is('admin.tariffs.*') ? 'active' : ''}} ">
						<a class="nav-link" href="{{ route('admin.tariffs.index') }}">@lang('messages.admin.tariffs')</a>
					</li>
				@endcan
				<li class="nav-item {{Route::is('admin.reports') ? 'active' : ''}}">
					<a class="nav-link" href="{{route('admin.reports')}}">@lang('messages.admin.reports')</a>
				</li>
			</ul>
			<div class="dropdown">
				<a class="dropdown-toggle text-decoration-none text-dark ml-1" href="#" id="navbarScrollingDropdown" data-toggle="dropdown">
					{{ ucwords(auth()->user()->username) }}
				</a>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="{{route('admin.profile.index')}}">@lang('messages.admin.profile')</a></li>
					<li><a class="dropdown-item" href="{{route('admin.settings')}}">@lang('messages.admin.settings')</a></li>
					<li><hr class="dropdown-divider"></li>
					<li>
						<a class="dropdown-item" href="{{ url('lang/' . (App::getLocale() === 'id' ? 'en' : 'id')) }}">
							{{ App::getLocale() === 'id' ? 'English' : 'Indonesia' }}
						</a>
					</li>
					<li><hr class="dropdown-divider"></li>
					<li>
						<a href="{{ route('logout') }}" class="dropdown-item">@lang('messages.admin.logout')</a>
					</li>
				</ul>
				
				<img src="{{ auth()->user()->gambar ? asset('assets/img/avatar/'.auth()->id.'/'.auth()->user()->gambar) : "https://ui-avatars.com/api/?name=".auth()->user()->username }}" class="rounded-circle d-lg-inline-block d-none ml-3" alt="Avatar">
			</div>
		</div>
	</nav>
</header>
<!-- End of Navbar -->