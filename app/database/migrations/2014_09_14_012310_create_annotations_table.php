<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnnotationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('highlights');
		Schema::dropIfExists('notes_replies');
		Schema::dropIfExists('notes');

		Schema::create('annotations', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('post_id')->unsigned();
			$table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
			$table->integer('linked_post_id')->unsigned()->nullable();
			$table->foreign('linked_post_id')->references('id')->on('posts')->onDelete('cascade');
			$table->string('annotatable_id', 4);
			$table->text('content');
			$table->enum('type', array('COMMENT', 'POST', 'CHARACTER'))->index();
			$table->enum('state', array('PRIVATE', 'PUBLIC'))->index();
			$table->timestamp('state_updated_at')->nullable()->index();
			$table->softDeletes();
			$table->timestamps();
		});

		Schema::create('highlights', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->text('content');
			$table->integer('annotation_id')->unsigned();
			$table->foreign('annotation_id')->references('id')->on('annotations')->onDelete('cascade');
		});

		Schema::create('annotations_replies', function($table)
		{
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
			$table->integer('annotation_id')->unsigned();
			$table->foreign('annotation_id')->references('id')->on('annotations')->onDelete('cascade');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->text('content');
		});


	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('annotations_replies');
		Schema::dropIfExists('annotations');
		Schema::dropIfExists('highlights');
	}

}
