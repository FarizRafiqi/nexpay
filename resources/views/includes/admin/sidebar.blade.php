<div id="sidebar" class="sidenav">

  <div class="d-flex align-items-center justify-content-between">
    <a class="sidebar-brand w-100 text-center" href="{{route('home')}}">
      <img src="{{asset('assets/img/megamendung-logo-white.png')}}" width="120" height="63" alt="Mega Mendung Logo">
    </a>
    <a href="#" class="closebtn text-decoration-none">&times;</a>
  </div>

  <a href="{{route('admin.dashboard')}}" class="sidebar-item d-flex align-items-center {{ Route::is('admin.dashboard') ? 'active' : '' }}">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill mr-1" viewBox="0 0 16 16">
      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
    </svg>
    @lang('messages.admin.dashboard')
  </a>

  @can('payment_method_access')
    <a href="{{route('admin.payment-methods.index')}}" class="sidebar-item {{ Route::is('admin.payment-methods.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
      </svg>
      @lang('messages.admin.payment_methods')
    </a>
  @endcan

  @can('payment_access')
    <a href="{{route('admin.payments.index')}}" class="sidebar-item {{ Route::is('admin.payments.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
      </svg>
      @lang('messages.admin.payments')
    </a>
  @endcan
  
  @can('pln_customer_access')
    <a href="{{route('admin.pln-customers.index')}}" class="sidebar-item {{ Route::is('admin.pln-customers.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
      @lang('messages.admin.customers')
    </a>
  @endcan

  @can('usage_access')
    <a href="{{route('admin.usages.index')}}" class="sidebar-item {{ Route::is('admin.usages.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
      </svg>
      @lang('messages.admin.usage')
    </a>
  @endcan

  @can('bill_access')
    <a href="{{route('admin.bills.index')}}" class="sidebar-item {{Route::is('admin.bills.*') ? 'active' : ''}}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
        <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
        <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"/>
      </svg>
      @lang('messages.admin.bills')
    </a>
  @endcan
  
  @can('tariff_access')
    <a href="{{ route('admin.tariffs.index') }}" class="sidebar-item {{ Route::is('admin.tariffs.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
      </svg>
      @lang('messages.admin.tariffs')
    </a>
  @endcan

  {{-- @can('tax_access')
    <a href="#collapseTax" data-toggle="collapse" class="sidebar-item {{ Route::is(['admin.tax-types.*', 'admin.tax-rates.*']) ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-percent" viewBox="0 0 16 16">
        <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
      </svg>
      Manajemen Pajak
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right ml-4" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </a>
    <div class="collapse" id="collapseTax">
      <div class="card card-body">
       @can('tax_type_access')
        <a href="{{ route('admin.tax-types.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.tax-types.*') ? 'active' : '' }}">Tipe Pajak</a>
       @endcan
       @can('tax_rate_access')
        <a href="{{ route('admin.tax-rates.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.tax-rates.*') ? 'active' : '' }}">Persentase Pajak</a>
       @endcan
      </div>
    </div>
  @endcan --}}

  @can('user_management_access')
    <a href="#collapseManajemenUser" data-toggle="collapse" class="sidebar-item {{ Route::is('admin.users.*') || Route::is('admin.levels.*') || Route::is('admin.activity-logs.*') || Route::is('admin.permissions.*') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
      </svg>
      @lang('messages.admin.user_management')
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right ml-4" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </a>
    <div class="collapse" id="collapseManajemenUser">
      <div class="card card-body">
       <a href="{{ route('admin.permissions.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.permissions.*') ? 'active' : '' }}">@lang('messages.admin.permissions')</a>
       <a href="{{ route('admin.users.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.users.*') ? 'active' : '' }}">@lang('messages.admin.users')</a>
       <a href="{{ route('admin.levels.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.levels.*') ? 'active' : '' }}">@lang('messages.admin.levels')</a>
       <a href="{{ route('admin.activity-logs.index') }}" class="text-decoration-none text-dark {{ Route::is('admin.activity-logs.*') ? 'active' : '' }}">@lang('messages.admin.activity_logs')</a>
      </div>
    </div>
  @endcan

  @can('report_create')
    <a href="{{ route('admin.reports') }}" class="sidebar-item {{ Route::is('admin.reports') ? 'active' : '' }}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
      </svg>
      @lang('messages.admin.reports')
    </a>
  @endcan
  <a href="{{ route('admin.settings') }}" class="sidebar-item {{ Route::is('admin.settings') ? 'active' : '' }}">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
    @lang('messages.admin.settings')
  </a>
</div>