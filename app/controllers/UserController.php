<?php

class UserController extends \BaseController {

	protected $user;
	protected $layout = 'layouts.master';

	public function __construct(User $user) {
		$this->user = $user;
		$this->beforeFilter('auth', array('except' => array('create', 'store', 'getLogin', 'postLogin')));
		$this->beforeFilter('csrf', array('on' => 'post'));
		View::share('context', 'k-user');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$this->layout->content = View::make('user/create')->with('user', $this->user);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$this->user = new User;
		$this->user->email = Input::get('email');
		$this->user->username = Input::get('username');
		$this->user->first_name = Input::get('first_name');
		$this->user->last_name = Input::get('last_name');
		$this->user->password = Hash::make(Input::get('password'));
		$this->user->confirmation_code = md5(uniqid(mt_rand(), true));

		$validator = Validator::make(Input::all(), $this->user->createRules);

		if($validator->passes()) {
			if($this->user->save()) {
				Auth::loginUsingId($this->user->id);
				$this->layout->content = View::make('user/message')->with('user', $this->user)->with('message', 'Thanks for registering!');
			} else {
				$this->layout->content = View::make('user/message')->with('user', $this->user)->with('message', 'Your account could not be created.');
			}
		} else {
			$this->layout->content = View::make('user/create')->with('user', $this->user)->withErrors($validator);
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @return Response
	 */
	public function edit()
	{
		$this->user = Auth::user();
		$this->layout->content = View::make('user/edit')->with('user', $this->user);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @return Response
	 */
	public function update()
	{
		$this->user = Auth::user();
		$this->user->email = Input::get('email');
		$this->user->username = Input::get('username');
		$this->user->first_name = Input::get('first_name');
		$this->user->last_name = Input::get('last_name');
		if(Input::has('password')) {
			$this->user->password = Hash::make(Input::get('password'));
		}

		$this->user->updateRules['email'] .= ",email," . $this->user->id;
		$this->user->updateRules['username'] .= ",username," . $this->user->id;

		$validator = Validator::make(Input::all(), $this->user->updateRules);

		if($validator->passes()) {
			if($this->user->save()) {
				$this->layout->content = View::make('user/edit')->with('user', $this->user)->with('message', 'Your account has been updated.');
			} else {
				$this->layout->content = View::make('user/edit')->with('user', $this->user)->with('message', 'Your account could not be updated.');
			}
		} else {
			return Redirect::action('UserController@edit')->withInput(Input::all())->withErrors($validator);
		}


	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	public function getLogin() {
		$this->user = Auth::user();
		if(!empty($this->user->id)){
			return Redirect::intended('/dashboard');
		}
		$this->layout->content = View::make('user/login')->with('user', $this->user);
	}

	public function postLogin() {

		$rules = array(
			'username' => array('required'),
			'password' => array('required')
		);

		$validator = Validator::make(Input::all(), $rules);
		if ($validator->fails()) {
			return Redirect::action('UserController@getLogin')->withErrors($validator)->withInput(Input::except('password'));
		}

		if (Auth::attempt(array('username' => Input::get('username'), 'password' => Input::get('password')), Input::get('remember'))){
			return Redirect::intended('/dashboard');
		} else {
			return Redirect::action('UserController@getLogin')->withInput(Input::except('password'))->with('error', 'The username or password was incorrect.');
		}
	}

	public function dashboard() {
		$this->layout->content = View::make('user/dashboard')->with('user', $this->user);
	}

	public function show($id) {
		$this->layout->content = View::make('user/show')->with('user', $this->user);
	}

	public function logout() {
		Auth::logout();
		$this->layout->content = View::make('user/message')->with('user', $this->user)->with('message', 'You have been logged out.');
	}

}