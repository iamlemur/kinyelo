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
		Schema::create('book_posts', function($table)
		{
			$table->engine = 'InnoDB';
			$table->integer('ordinal')->index();
			$table->integer('book_id')->unsigned();
			$table->integer('post_id')->unsigned();
			$table->primary(array('book_id', 'post_id'));
			$table->foreign('book_id')->references('id')->on('books');
			$table->foreign('post_id')->references('id')->on('posts');
			$table->timestamp('added_on');
			//cascade on deletion of books
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('book_posts');
	}

}