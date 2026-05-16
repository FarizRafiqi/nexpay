<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    @stack('prepend-style')
    @include('includes.style')
    @stack('addon-style')
    @livewireStyles
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.1/dist/alpine.min.js" defer></script>
  </head>
  <body>
    @include('includes.navbar')
    @yield('content')
    @include('includes.footer')
    
    @stack('prepend-script')
    @include('includes.script')
    @livewireScripts
    @stack('addon-script')
    <!--Start of Tawk.to Script-->
      <script type="text/javascript">
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/605652d7067c2605c0ba9926/1f18j77cp';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      </script>
    <!--End of Tawk.to Script-->
  </body>
</html>
