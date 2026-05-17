<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{{asset('css/app.css')}}">
  <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
  <title>@yield('title')</title>
  @stack('styles')
</head>
<body>
  @include('includes.navbar-alternate')
  @yield('content')
  <div class="text-center py-2">
    <a href="{{ url('lang/' . (App::getLocale() === 'id' ? 'en' : 'id')) }}" class="text-white text-decoration-none small opacity-75">
      {{ App::getLocale() === 'id' ? 'English' : 'Indonesia' }}
    </a>
  </div>
  <script src="{{ asset('js/app.js') }}"></script>
  @stack('script')
</body>
</html>