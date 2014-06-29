<?php

class PolicyController extends BaseController {

	protected $layout = 'layouts.master';

	public function __construct() {
		View::share('context', null);
	}

	public function terms()
	{
		$this->layout->content = View::make('policies/terms');
	}


}