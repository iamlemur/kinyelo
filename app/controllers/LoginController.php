<?php

class LoginController extends \BaseController {

	protected $user;
	protected $layout = 'layouts.master';

	public function __construct(User $user) {
		$this->user = $user;

		View::share('context', null);
	}



}