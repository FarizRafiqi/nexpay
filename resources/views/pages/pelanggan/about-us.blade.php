@extends('layouts.app')

@section('title', 'About Us')

@section('content')
  <div class="container pt-5">
    <h1 class="text-center font-weight-bold">@lang('messages.about_us.title')</h1>
    <p class="text-center lead">
      @lang('messages.about_us.desc')
    </p>
    <section class="mt-5">
      <div class="card mx-auto" style="width: 18rem;">
        <img src="{{asset('assets/img/avatar-of-me.svg')}}" class="card-img-top" alt="Avatar">
        <div class="card-body">
          <h5 class="mb-1">@lang('messages.benefits.admin_title')</h5>
          <h5 class="font-weight-bold card-title">Aulia El Ihza Fariz Rafiqi</h5>
          <p class="card-text">
            @lang('messages.about_us.admin_bio')
          </p>
        </div>
      </div>
    </section>
  </div>
@endsection