<?php

class LoginController extends \BaseController {

	protected $user;
	protected $layout = 'layouts.master';

	public function __construct(User $user) {
		$this->user = $user;
	}

	public function getLogin() {
		$user = Auth::user();
		if(!empty($user->id)){
			return Redirect::to('/');
		}
		$this->layout->content = View::make('author/login')->with('user', $this->user);
	}

	public function postLogin() {

		$rules = array(
			'username' => array('required'),
			'password' => array('required')
		);

		$validator = Validator::make(Input::all(), $rules);
		if ($validator->fails()) {
			return Redirect::action('LoginController@getLogin')->withErrors($validator)->withInput(Input::except('password'));
		}

		if (Auth::attempt(array('username' => Input::get('username'), 'password' => Input::get('password')))){
			return Redirect::intended('/');
		} else {
			return Redirect::action('LoginController@getLogin')->withInput(Input::except('password'))->with('error', 'The username or password was incorrect.');
		}
	}

}