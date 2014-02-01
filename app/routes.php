<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@showWelcome');

Route::get('/login', 'LoginController@getLogin');
Route::post('/login', 'LoginController@postLogin');
Route::resource('/author', 'UserController');

Route::get('/posts/lists/{filter?}', 'PostController@listing');
Route::resource('/posts', 'PostController');

Route::get('/books/lists/{filter?}', 'BookController@listing');
Route::resource('/books', 'BookController');