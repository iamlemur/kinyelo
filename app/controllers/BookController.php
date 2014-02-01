<?php

class BookController extends \BaseController {

	protected $book;
	protected $layout = 'layouts.master';

	public function __construct(Book $book) {
		$this->book = $book;
		$this->beforeFilter('auth');
		View::share('context', 'pb-books');
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
		$books = Book::with('author')->get();
		$this->layout->content = View::make('book/index')->with('books', $books);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$this->layout->content = View::make('book/create')->with('book', $this->book);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$this->book= new Book;
		$this->book->title = Input::get('title');
		$this->book->summary= Input::get('summary');
		$this->book->status = Input::get('status');
		if(Input::get('status') == "published") {
			$this->book->published_at = Carbon\Carbon::now();
		}
		$this->book->user_id = Auth::user()->id;
		if ( $this->book->save() ) {
			return Redirect::action('BookController@show', $this->book->id)->with( 'message', 'Thanks for posting!' );
		} else {
			return Redirect::action('BookController@create')->withErrors( $this->post->errors() );
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
		$this->book = Book::with('author')->findOrFail($id);
		$this->layout->content = View::make('book/show')->with('book', $this->book);
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

}