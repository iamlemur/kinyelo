<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	protected function compileStyles() {

	}

	protected function getJsonResponse($success, $payload, $message = null) {
		return Response::json(array(
			"success" => $success,
			"payload" => $payload != null ? $payload->toArray() : null,
			"message" => $message
		));
	}

}