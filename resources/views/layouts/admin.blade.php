<!DOCTYPE html>
<html lang="en" class="h-100">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title')</title>
  @stack('prepend-style')
  @include('includes.admin.style')
  @stack('addon-style')
  @livewireStyles
  <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.1/dist/alpine.min.js" defer></script>
</head>
<body class="d-flex flex-column h-100">
  {{-- @if((bool)Cookie::get('enable_sidebar') == false) --}}
    {{-- @include('includes.admin.navbar') --}}
  {{-- @elseif(Cookie::get('enable_sidebar')) --}}
    @include('includes.admin.sidebar')
    @include('includes.admin.navbar-admin-alternate')
  {{-- @endif --}}
  <main class="flex-shrink-0" id="main">
    <div class="container-dashboard mt-5">
      @yield('content')
    </div>
  </main>
  @include('includes.admin.footer')

  @stack('prepend-script')
  @include('includes.admin.script')
  @livewireScripts
  @stack('addon-script')
</body>
</html>