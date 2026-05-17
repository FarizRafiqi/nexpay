<header>
  <nav class="navbar navbar-expand-lg navbar-light bg-white mx-0 px-3 navbar-dashboard">
    <button class="navbar-toggler" type="button" data-target="#sidebar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="nav-item ml-auto dropdown" id="navbarNavDropdown">
      <a class="dropdown-toggle text-decoration-none text-dark ml-1 d-inline-block" href="#" data-toggle="dropdown" data-display="static">
        {{ ucwords(auth()->user()->username) }}
      </a>
      <ul class="dropdown-menu dropdown-menu-right">
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
          <form action="{{route('logout')}}" method="post" class="dropdown-item">
            @csrf
            <button class="btn p-0" id="btnLogout">@lang('messages.admin.logout')</button>
          </form>
        </li>
      </ul>
      <img src="{{ auth()->user()->gambar ? Storage::url('img/avatar/'.auth()->id().'/'.auth()->user()->gambar) : "https://ui-avatars.com/api/?name=".auth()->user()->username }}" class="rounded-circle ml-3" alt="Avatar" width="48" height="48">
    </div>
  </nav>
</header>