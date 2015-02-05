<?php

class AuthorController extends \BaseController {

	protected $author;
	protected $layout = 'layouts.master';

	public function __construct(User $author) {
		$this->author = $author;
		$this->beforeFilter('auth');
		View::share('context', 'k-author');
	}


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$this->listing('recent');
	}

	public function listing($filter = 'recent')
	{
		$authors = User::all();
		//TODO: actually filter
		$this->layout->content = View::make('author/index')->with('authors', $authors);
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$author = User::findOrFail($id);
		$this->layout->content = View::make('author/show')->with('author', $author);
	}



}
