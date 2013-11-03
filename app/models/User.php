<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;
use LaravelBook\Ardent\Ardent;

class User extends Ardent implements UserInterface, RemindableInterface {

	protected $table = 'users';
	protected $hidden = array('password');
	protected $guarded = array('id', 'updated_at', 'created_at', 'confirmation_code', 'confirmed', 'deleted_at');
	public static $rules = array(
		'first_name' => 'required|between:2,32',
		'last_name' => 'required|between:2,32',
		'email' => 'required|email|unique:users',
		'username' => 'required|unique:users',
		'password' => 'required|between:8,64|confirmed',
		'password_confirmation' => 'required|between:8,64',
	);
	public $autoHydrateEntityFromInput = true;
	public $autoPurgeRedundantAttributes = true;
	public static $passwordAttributes = array('password');
	public $autoHashPasswordAttributes = true;

/*	public function beforeSave( $forced )
	{
		// if there's a new password, hash it
		if($this->changed('password'))
		{
			$this->password = Hash::make($this->password);
		}
		return true;
	}*/

	/**
	 * Ardent method overloading:
	 * Before save the user. Generate a confirmation
	 * code if is a new user.
	 *
	 * @param bool $forced Indicates whether the user is being saved forcefully
	 * @return bool
	 */
	public function beforeSave( $forced = false )
	{
		if ( empty($this->id) )
		{
			$this->confirmation_code = md5( uniqid(mt_rand(), true) );
		}

		return true;
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

}