<?php

class CharacterController extends \BaseController {

	protected $character;
	protected $layout = 'layouts.master';

	public function __construct(Character $character) {
		$this->character = $character;
		$this->beforeFilter('auth');
		View::share('context', 'k-characters');
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
		$characters = Character::with('post.author')->get();
		//TODO: actually filter
		$this->layout->content = View::make('character/index')->with('characters', $characters);
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		if(Input::has('post_id')) {
			$post = Post::findOrFail(Input::get('post_id'));
			if($post->author_id != Auth::user()->id) {
				return Response::requestError('You are not allowed to create a character based on the specified post.');
			}
		}
		//TODO: validate
		$this->character = new Character;
		$this->character->name = Input::get('name');
		$this->character->description = Input::get('description');
		$this->character->post_id = Input::get('post_id');
		if ( $this->character->save() ) {
			return Response::requestSuccess($this->character->id);
		} else {
			return Response::requestError('The character could not be created.');
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
		$this->character = Character::with('post.author')->findOrFail($id);
		$this->layout->content = View::make('character/show')->with('character', $this->character);
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
