<?php

use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	public function up()
	{
		Schema::create('users', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->string('email', 255)->unique();
			$table->string('username', 32)->unique();
			$table->string('first_name', 32);
			$table->string('last_name', 32);
			$table->string('password');
			$table->string('confirmation_code');
			$table->boolean('confirmed')->default(false);
			$table->string('remember_token', 100)->nullable();
			$table->softDeletes();
			$table->timestamps();
		});

/*		Schema::create('password_reminders', function($table)
		{
			$table->engine = 'InnoDB';
			$table->string('email');
			$table->string('token');
			$table->timestamp('created_at');
		});*/

	}

	public function down()
	{
		//Schema::drop('password_reminders');
		Schema::drop('users');
	}

}