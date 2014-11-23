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

Route::get('/', 'HomeController@getTeaser');
Route::post('/', 'HomeController@postTeaser');

Route::get('/login', 'UserController@getLogin');
Route::post('/login', 'UserController@postLogin');

Route::get('/signup', 'UserController@create');
Route::post('/signup', 'UserController@store');

Route::group(array('before' => 'auth'), function() {

	Route::get('/home', 'HomeController@showWelcome');
	Route::post('/log', 'HomeController@log');
	Route::get('/log', 'HomeController@log');
	Route::get('/policies/terms', 'PolicyController@terms');

	Route::resource('/user', 'UserController');

	Route::get('/dashboard', 'UserController@dashboard');
	Route::get('/user', 'UserController@show');

	Route::get('/logout', 'UserController@logout');

	Route::get('/user/edit', 'UserController@edit');
	Route::post('/user/edit', 'UserController@update');

	Route::get('/posts/search/title', 'PostController@searchPostsByTitle');
	Route::get('/posts/lists/{filter?}', 'PostController@listing');
	Route::resource('/posts', 'PostController');

	Route::get('/posts/{id}/annotations', 'AnnotationController@getAnnotationsForPost');

	Route::get('/books/lists/{filter?}', 'BookController@listing');
	Route::resource('/books', 'BookController');

});
