<footer class="border-top border-bottom py-3 py-md-0">
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row">
      <div class="col-12 col-md-auto help-link">
        <img src="{{ asset('assets/img/megamendung-logo.png') }}" width="120" height="63" alt="Logo Mega Mendung">
      </div>
      <div class="col-12 col-md-auto">
        <ul class="list-unstyled">
          <li class="list-item font-weight-bold">@lang('messages.footer.help')</li>
          <li class="list-item">@lang('messages.footer.privacy')</li>
          <li class="list-item"><a href="{{route('faq')}}" class="text-decoration-none text-dark">FAQ</a></li>
          <li class="list-item"><a href="{{route('how_to_pay')}}" class="text-decoration-none text-dark">@lang('messages.footer.payment_guide')</a></li>
          <li class="list-item"><a href="/docs" class="text-decoration-none text-dark">@lang('messages.footer.help')</a></li>
        </ul>
      </div>
      <div class="col-12 col-md-auto">
        <ul class="list-unstyled">
          <li class="list-item font-weight-bold">@lang('messages.footer.company')</li>
          <li class="list-item"><a href="https://www.instagram.com/rafiqi_fariz0703/" class="text-dark text-decoration-none">Instagram</a></li>
          <li class="list-item"><a href="#" class="text-dark text-decoration-none">Whatsapp</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="copyright d-flex justify-content-center align-items-center p-3 gap-3">
    <span>© {{date('Y')}} NEXPAY. @lang('messages.footer.all_rights')</span>
    <span class="text-muted">|</span>
    <a href="{{ url('lang/' . (App::getLocale() === 'id' ? 'en' : 'id')) }}" class="text-muted text-decoration-none small">
      {{ App::getLocale() === 'id' ? 'English' : 'Indonesia' }}
    </a>
  </div>
</footer>
