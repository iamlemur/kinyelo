<?php

class UserController extends \BaseController {

	protected $user;
	protected $layout = 'layouts.master';

	public function __construct(User $user) {
		$this->user = $user;
		$this->beforeFilter('auth', array('except' => array('create', 'store')));
		View::share('context', null);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$this->layout->content = View::make('author/create')->with('user', $this->user);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$this->user = new User;
		if ( $this->user->save() ) {
			return Redirect::to( '/author/create' )->with( 'message', 'Thanks for registering!' );
		} else {
			return Redirect::to( '/author/create' )->withErrors( $this->user->errors() );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
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
		$this->layout->content = View::make('author/login')->with('user', $this->user);
	}

}