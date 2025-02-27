<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClothingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//clothing
Route::get('/clothing', [ClothingController::class, 'index']);
Route::post('/clothing', [ClothingController::class, 'store']);
Route::delete('/clothing/{id}', [ClothingController::class, 'destroy']);
Route::post('/clothing/{id}', [ClothingController::class, 'update']);
Route::get('/clothing/{id}', [ClothingController::class, 'show']);

//category
Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category', [CategoryController::class, 'store']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

//sammary
Route::get('/summary', [ClothingController::class, 'summary']);

