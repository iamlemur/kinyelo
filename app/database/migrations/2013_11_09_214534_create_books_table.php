<?php

use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('book_covers', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->string('path');
			$table->softDeletes();
			$table->timestamps();
		});
		Schema::create('books', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->string('title')->index();
			$table->text('summary');
			$table->integer('book_cover_id')->unsigned();
			$table->foreign('book_cover_id')->references('id')->on('book_covers');
			$table->timestamp('published_at')->nullable()->index();
			$table->enum('status', array('draft', 'published'))->index();
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
		Schema::drop('books');
		Schema::drop('book_covers');
	}

}