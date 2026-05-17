@extends('layouts.admin')

@section('title', __('messages.admin.dashboard'))

@push('addon-style')
<script src="{{ asset('assets/plugin/Chart.js-3.0.2/chart.min.js') }}" charset="utf-8"></script>
@endpush

@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- Total Revenue Overview -->
      @if (auth()->user()->isAdmin())
        <div class="col-12 col-md-6 col-lg-3 mb-3">
          <div class="card card-overview">
            <div class="card-body">
              <div class="row align-items-center h-100">
                <div class="col-4">
                  <img src="{{ asset('assets/img/mm-icon/revenue-icon@2x.png') }}" alt="Payment Icon" width="65" height="65">
                </div>
                <div class="col-8">
                  <h6 class="font-weight-bold">{{$totalPendapatan}}</h6>
                  @lang('messages.admin.total_revenue')
                </div>
              </div>
            </div>
          </div>
        </div>
      @endif
      <!-- End of Total Revenue Overview -->

      <!-- Total Payment Overview -->
      @if (auth()->user()->isAdmin())
        <div class="col-12 col-md-6 col-lg-3 mb-3">
          <div class="card card-overview">
            <div class="card-body">
              <div class="row align-items-center h-100">
                <div class="col-4">
                  <img src="{{ asset('assets/img/mm-icon/payment-icon@2x.png') }}" alt="Payment Icon" width="65" height="65">
                </div>
                <div class="col-8">
                  <h6 class="font-weight-bold">{{$payments->count()}}</h6>
                  @lang('messages.admin.total_payments')
                </div>
              </div>
            </div>
          </div>
        </div>
      @else
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="card card-overview">
            <div class="card-body">
              <div class="row align-items-center h-100">
                <div class="col-4">
                  <img src="{{ asset('assets/img/mm-icon/payment-icon@2x.png') }}" alt="Payment Icon" width="65" height="65">
                </div>
                <div class="col-8">
                  <h6 class="font-weight-bold">{{$payments->count()}}</h6>
                  <div>@lang('messages.admin.total_payments')</div>
                  <a href="{{route('admin.payments.index')}}" class="text-decoration-none">@lang('messages.admin.view_details')</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      @endif
      <!-- End of Total Payment Overview -->

      <!-- Bill Paid Off Overview -->
      @if(auth()->user()->isAdmin())
        <div class="col-12 col-md-6 col-lg-3 mb-3">
          <div class="card card-overview">
            <div class="card-body">
              <div class="row align-items-center h-100">
                <div class="col-4">
                  <img src="{{ asset('assets/img/mm-icon/bill-paid-off-icon@2x.png') }}" alt="Payment Icon" width="65" height="65">
                </div>
                <div class="col-8">
                  <h6 class="font-weight-bold">{{$bills->where('status', 'LUNAS')->count()}}</h6>
                  @lang('messages.admin.paid_bills')
                </div>
              </div>
            </div>
          </div>
        </div>
      @endif
      <!-- End of Bill Paid Off Overview -->

      <!-- Bill Not Paid Off Overview -->
      @if(auth()->user()->isAdmin())
        <div class="col-12 col-md-6 col-lg-3 mb-3">
          <div class="card card-overview">
            <div class="card-body">
              <div class="row align-items-center h-100">
                <div class="col-4">
                  <img src="{{ asset('assets/img/mm-icon/bill-not-paid-off-icon@2x.png') }}" alt="Payment Icon" width="65" height="65">
                </div>
                <div class="col-8">
                  <h6 class="font-weight-bold">{{$bills->where('status', 'BELUM LUNAS')->count()}}</h6>
                  @lang('messages.admin.unpaid_bills')
                </div>
              </div>
            </div>
          </div>
        </div>
      @endif

      {{-- Grafik pendapatan tahunan --}}
      @if (auth()->user()->isAdmin())
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              {!! $chart->container() !!}
            </div>
          </div>
        </div>
      @endif
      <!-- End of Bill Not Paid Off Overview -->
      <div class="col-12">
        <h2 class="text-center mt-5">@lang('messages.admin.payment_history')</h2>
        <div class="card my-5 ">
          <div class="card-body table-responsive">
            <table class="table table-striped table-bordered w-100" id="paymentHistories">
              <thead>
                <tr>
                  <th>@lang('messages.dt.id')</th>
                  <th>@lang('messages.dt.customer_name')</th>
                  <th>@lang('messages.dt.pln_customer_name')</th>
                  <th>@lang('messages.dt.bill_id')</th>
                  <th>@lang('messages.dt.payment_date')</th>
                  <th>@lang('messages.dt.admin_fee')</th>
                  <th>@lang('messages.dt.penalty')</th>
                  <th>@lang('messages.dt.total_amount')</th>
                  <th>@lang('messages.dt.payment_method')</th>
                  <th>@lang('messages.dt.status')</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
@push('addon-script')
  {!! $chart->script() !!}
  <script>
    console.log(window);
    $('#paymentHistories').DataTable({
        responsive: true,
        serverSide: true,
        ajax: "",
        columns: [
            {data: 'id'},
            {data: 'nama'},
            {data: 'nama_pelanggan'},
            {data: 'id_tagihan'},
            {data: 'tanggal_bayar'},
            {data: 'biaya_admin',
             render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
            },
            {data: 'denda',
             render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
            },
            {data: 'total_bayar',
             render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
            },
            {data: 'payment.payment_method.nama', defaultContent: '-'},
            {data: 'status',
              render: function(data, type, row){
                let state;
                if(data == 'success'){
                  state = 'success';
                }else if(data == 'pending'){
                  state = 'warning';
                }else{
                  state = 'danger';
                }
                return `<span class='badge badge-pill 
                        badge-${state}'>${data}</span>`;
              }
            },
        ]
    });
  </script>
@endpush