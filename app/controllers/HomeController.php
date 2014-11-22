<?php

class HomeController extends BaseController {

	protected $layout = 'layouts.master';

	public function __construct() {
		View::share('context', null);
	}

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		$this->layout->content = View::make('welcome');
	}

	public function log() {
		Log::info(Input::all());
	}

	public function getTeaser() {
		$this->layout = View::make('teaser');
	}
	public function postTeaser() {

		$validator = Validator::make(
			Input::all(),
			array('email' => 'required|email')
		);

		if ($validator->fails())
		{
			return Response::json(array('response' => 0, 'message' => 'Invalid email address'));
		}

		$email = TeaserEmail::create(array('email_address' => Input::get('email')));
		if($email) {
			return Response::json(array('response' => 1));
		} else {
			return Response::json(array('response' => 0, 'message' => 'The email address already exists'));
		}

	}

}