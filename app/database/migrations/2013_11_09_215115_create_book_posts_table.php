<?php

use Illuminate\Database\Migrations\Migration;

class CreateBookPostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('book_post', function($table)
		{
			$table->engine = 'InnoDB';
			$table->integer('ordinal')->unsigned()->index();
			$table->integer('book_id')->unsigned();
			$table->integer('post_id')->unsigned();
			$table->primary(array('book_id', 'post_id'));
			$table->foreign('book_id')->references('id')->on('books');
			$table->foreign('post_id')->references('id')->on('posts');
			/*do not cascade on deletion of books and posts, we want to see if for some reason in the future the
			relationship still needs to be tracked (i.e. this post is no longer available but used to be part of
			this book)*/
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('book_post');
	}

}