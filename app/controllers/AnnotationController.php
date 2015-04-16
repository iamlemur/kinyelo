<?php

class AnnotationController extends \BaseController {


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function getAnnotationsForPost($id)
	{
		$annotations = Annotation::with('replies')->where('post_id', '=', $id)->get();

		$highlights = $annotations->isEmpty() ? array() : AnnotationHighlight::whereIn('annotation_id', $annotations->modelKeys())->get()->toArray();
		$users = $annotations->isEmpty() ? array() : User::findMany(array_values(array_unique(array_merge($annotations->fetch('replies')->filter(function($item) { return !empty($item); })->collapse()->lists('user_id'), $annotations->lists('user_id')))))->toArray();

		$payload = array(
			'annotations' => $annotations->toArray(),
			'authors' => $users,
			'highlights' => $highlights
		);

		return Response::json($payload);
	}

	public function store($postId) {
		$post = Post::findOrFail($postId);
		$user = Auth::user();

		//TODO: validate
		$annotation = new Annotation(array(
			'annotatable_id' => Input::get('annotatable_id'),
			'content' => Input::get('content'),
			'type' => Input::get('type'),
			'state' => Input::get('state')
		));

		$annotation->author()->associate($user);
		$annotation->post()->associate($post);

		if($annotation->push()) {
			$annotation = Annotation::findOrFail($annotation->id);
			return $this->getJsonResponse(true, $annotation);
		}

		return $this->getJsonResponse(false, null, "The annotation could not be created.");

	}



}
