<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['middleware' => ['auth']], function() {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('admin/', '\App\Http\Controllers\AttendanceController@index')->name('admin');
    Route::get('admin/add', '\App\Http\Controllers\AttendanceController@add')->name('admin.add');
    Route::post('admin/insert', '\App\Http\Controllers\AttendanceController@insert')->name('admin.insert');
    Route::get('admin/register', '\App\Http\Controllers\AttendanceController@register')->name('admin.register');
    Route::post('admin/register/store', '\App\Http\Controllers\AttendanceController@store')->name('admin.register.store');
    Route::get('admin/edit/{id}', '\App\Http\Controllers\AttendanceController@edit')->name('admin.edit');
    Route::post('admin/update/{id}', '\App\Http\Controllers\AttendanceController@update')->name('admin.update');
    Route::post('admin/delete/{id}', '\App\Http\Controllers\AttendanceController@destroy')->name('admin.delete');
});
