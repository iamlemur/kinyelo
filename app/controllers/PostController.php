<?php

class PostController extends \BaseController {

	protected $post;
	protected $layout = 'layouts.master';

	public function __construct(Post $post) {
		$this->post = $post;
		$this->beforeFilter('auth');
		View::share('context', 'pb-posts');
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
		$posts = Post::with('author')->get();
		$this->layout->content = View::make('post/index')->with('posts', $posts);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$this->layout->content = View::make('post/create')->with('post', $this->post);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$this->post = new Post;
		$this->post->title = Input::get('title');
		$this->post->content = Input::get('content');
		$this->post->status = Input::get('status');
		if(Input::get('status') == "published") {
			$this->post->published_at = Carbon\Carbon::now();
		}
		$this->post->user_id = Auth::user()->id;
		if ( $this->post->save() ) {
			return Redirect::to('/')->with( 'message', 'Thanks for posting!' );
		} else {
			return Redirect::action('PostController@create')->withErrors( $this->post->errors() );
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
		$this->post = Post::with('author')->findOrFail($id);
		$this->layout->content = View::make('post/show')->with('post', $this->post);
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