<?php

use Illuminate\Support\Facades\Route,
    App\Http\Controllers\UploadController,
    App\Http\Controllers\HomeController,
    App\Http\Controllers\Admin\BillController,
    App\Http\Controllers\Admin\DashboardController,
    App\Http\Controllers\Admin\ElectricityUsageController,
    App\Http\Controllers\Admin\PaymentController,
    App\Http\Controllers\Admin\PLNCustomerController,
    App\Http\Controllers\Admin\UserController,
    App\Http\Controllers\Admin\ReportController,
    App\Http\Controllers\Admin\LevelController,
    App\Http\Controllers\Admin\TariffController,
    App\Http\Controllers\Admin\UserProfileController,
    App\Http\Controllers\Admin\ActivityLogController,
    App\Http\Controllers\Admin\PermissionController,
    App\Http\Controllers\Admin\TransactionController,
    App\Http\Controllers\Admin\PaymentMethodController,
    App\Http\Controllers\Admin\TaxTypeController,
    App\Http\Controllers\Admin\TaxRateController,
    App\Http\Controllers\MidtransController,
    App\Http\Controllers\SocialiteController,
    Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


//Static Page
Route::get('/', [HomeController::class, "index"])->name("home");
Route::get('/about-us', [HomeController::class, "aboutUs"])->name("about_us");
Route::get('/faq', [HomeController::class, "faq"])->name('faq');
Route::get('/how-to-pay', [HomeController::class, "howToPay"])->name('how_to_pay');

//Transaction Handler
Route::group(['prefix' => 'payments', 'as' => 'transaction.'], function(){
  Route::post('callback', [MidtransController::class, 'notificationHandler'])->name('callback');
  Route::get('finish', [MidtransController::class, 'finish'])->name('finish');
  Route::get('unfinish', [MidtransController::class, 'unfinish'])->name('unfinish');
  Route::get('error', [MidtransController::class, 'error'])->name('error');
});

//Upload File
Route::post('upload', [UploadController::class, "store"])->name('upload.store');
Route::delete('upload', [UploadController::class, "destroy"])->name('upload.destroy');

//Transaksi
Route::group(['middleware' => ['auth']], function(){
  Route::get('/transaction-history', [TransactionController::class, "transactionHistory"])->name("transaction-history");
  Route::get('/transaction-history/details/{payment?}', [TransactionController::class, "transactionHistory"])->name("transaction-history.details");
  Route::get('/payment-confirmation/{payment}', [TransactionController::class, "uploadProofOfPayment"])->name('upload-proof-of-payment');

  Route::group(['prefix' => 'payments', 'as' => 'payment.'], function(){
    Route::get('/{payment_method:slug}/confirm/{payment}', [TransactionController::class, "confirm"])->name('confirm');
    Route::post('/{payment_method:slug}/confirm/{payment}', [TransactionController::class, "process"])->name('process');
    Route::get('/{payment}', [TransactionController::class, "index"])->name('index');
    Route::post('/change/{payment}', [TransactionController::class, "changePaymentMethod"])->name('change-method');
    
    Route::post('create', [TransactionController::class, "create"])->name('create');
  });
});

// Auth
Auth::routes();
Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [SocialiteController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// Admin Panel
Route::group(["as" => 'admin.', 'prefix' => 'admin', 'middleware' => ['auth', 'admin']], function(){
  Route::get('/', [DashboardController::class, "index"])->name('dashboard');
  Route::get('/notifications/unread', [DashboardController::class, "notifications"])->name('notifications.unread');
  Route::get('/reports', [ReportController::class, "index"])->name('reports');
  Route::post('/reports/payment', [ReportController::class, "printPaymentReports"])->name('reports.payment');

  // User Profile
  Route::get('profile', [UserProfileController::class, "index"])->name('profile.index');
  Route::get('profile/edit', [UserProfileController::class, "edit"])->name('profile.edit');
  Route::put('profile/update/{id}', [UserProfileController::class, "update"])->name('profile.update');

  // Dashboard setting
  Route::get('settings', [DashboardController::class, "settings"])->name('settings');
  
  // Data Master
  Route::delete('usages/destroy', [ElectricityUsageController::class, "massDestroy"])->name('usages.massDestroy');
  Route::delete('levels/destroy', [LevelController::class, "massDestroy"])->name('levels.massDestroy');
  Route::delete('tariffs/destroy', [TariffController::class, "massDestroy"])->name('tariffs.massDestroy');
  Route::delete('pln-customers/destroy', [PlnCustomerController::class, "massDestroy"])->name('pln-customers.massDestroy');
  Route::delete('permissions/destroy', [PermissionController::class, "massDestroy"])->name('permissions.massDestroy');
  Route::delete('users/destroy', [UserController::class, "massDestroy"])->name('users.massDestroy');
  Route::delete('tax-types/destroy', [TaxTypeController::class, "massDestroy"])->name('tax-types.massDestroy');
  Route::delete('tax-rates/destroy', [TaxRateController::class, "massDestroy"])->name('tax-rates.massDestroy');
  
  Route::resource('activity-logs', ActivityLogController::class)->except('create', 'store', 'edit', 'update', 'destroy');
  Route::resources([
    'payments' => PaymentController::class,
    'bills' => BillController::class,
    'levels' => LevelController::class,
    'usages' => ElectricityUsageController::class,
    'tariffs' => TariffController::class,
    'pln-customers' => PLNCustomerController::class,
    'users' => UserController::class,
    'permissions' => PermissionController::class,
    'payment-methods' => PaymentMethodController::class,
    'tax-rates' => TaxRateController::class,
    'tax-types' => TaxTypeController::class
  ]);
});