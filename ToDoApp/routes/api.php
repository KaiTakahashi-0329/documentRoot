<?php

use App\Http\Controllers\api\ToDoAppApiController;
use App\Http\Controllers\ToDoAppController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/todos', [ToDoAppApiController::class, 'index']);
Route::post('/store', [ToDoAppApiController::class, 'store']);
Route::get('/todo/{id}', [ToDoAppApiController::class, 'show']);
Route::post('/todo/update/{id}', [ToDoAppApiController::class, 'update']);