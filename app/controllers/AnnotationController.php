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
		$highlights = AnnotationHighlight::whereIn('annotation_id', $annotations->modelKeys())->get();
		$users = User::findMany(array_values(array_unique(array_merge($annotations->fetch('replies')->filter(function($item) { return !empty($item); })->collapse()->lists('user_id'), $annotations->lists('user_id')))));
		$payload = array(
			'annotations' => $annotations->toArray(),
			'authors' => $users->toArray(),
			'highlights' => $highlights->toArray()
		);
		return Response::json($payload);
	}



}
