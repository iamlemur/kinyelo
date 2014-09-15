<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Database\Eloquent\SoftDeletingTrait;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $table = 'users';
	protected $appends = array('url', 'avatar');
	protected $hidden = array('password', 'remember_token');
	protected $guarded = array('id', 'updated_at', 'created_at', 'confirmation_code', 'confirmed', 'deleted_at', 'password');
	public $createRules = array(
		'first_name' => 'required|between:2,32',
		'last_name' => 'required|between:2,32',
		'email' => 'required|email|unique:users',
		'username' => 'required|unique:users',
		'password' => 'required|between:8,64|confirmed',
		'password_confirmation' => 'required|between:8,64',
		'agree' => 'required',
	);

	public $updateRules = array(
		'first_name' => 'required|between:2,32',
		'last_name' => 'required|between:2,32',
		'email' => 'required|email|unique:users',
		'username' => 'required|unique:users',
		'password' => 'between:8,64|confirmed',
		'password_confirmation' => 'between:8,64',
	);

	public function getUrlAttribute()
	{
		return action('UserController@show', $this->id);
	}

	public function getAvatarAttribute()
	{
		return '/img/avatar1.jpg';
	}

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	public function getAuthPassword()
	{
		return $this->password;
	}

	public function getReminderEmail()
	{
		return $this->email;
	}

	public function posts() {
		return $this->hasMany('Post');
	}
/*
	public function getRememberToken() {

	}

	public function setRememberToken($value) {

	}

	public function getRememberTokenName() {

	}
*/
}