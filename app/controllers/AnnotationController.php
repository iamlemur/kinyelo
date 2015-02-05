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



}
