<?php

use Illuminate\Database\Migrations\Migration;

class CreateNoteRepliesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('note_replies', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->integer('note_id')->unsigned();
			$table->foreign('note_id')->references('id')->on('notes');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('post_id')->unsigned();
			$table->foreign('post_id')->references('id')->on('posts');
			$table->text('content');
			$table->enum('state', array('private', 'public'))->index();
			$table->timestamp('published_at')->nullable()->index();
			$table->softDeletes();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('note_replies');
	}

}