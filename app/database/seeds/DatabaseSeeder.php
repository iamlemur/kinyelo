<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UserTableSeeder');
		$this->command->info('User table seeded!');

		$this->call('PostTableSeeder');
		$this->command->info('Posts table seeded!');

		$this->call('AnnotationsTableSeeder');
		$this->command->info('Annotations seeded!');
	}

}

class UserTableSeeder extends Seeder {

	public function run()
	{
		DB::table('users')->delete();

		User::create(array(
			'email' => 'asiral@gmail.com',
			'username' => 'asiral',
			'first_name' => 'Michael',
			'last_name' => 'Hill',
			'password' => Hash::make('password')
		));

		User::create(array(
			'email' => 'joelleimer@gmail.com',
			'username' => 'joelleimer',
			'first_name' => 'Joel',
			'last_name' => 'Leimer',
			'password' => Hash::make('password')
		));

	}

}

class PostTableSeeder extends Seeder {

	public function run()
	{
		DB::table('posts')->delete();

		Post::create(array(
			'user_id' => '1',
			'title' => 'First Post',
			'status' => 'draft',
			'content' => '<section id="74f5"><p id="558b">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac suscipit arcu. Nulla porta magna nunc, non egestas ex maximus eget. Duis sit amet nisi sit amet eros vulputate feugiat. Curabitur accumsan in ipsum at pharetra. Vestibulum consequat, orci eu tincidunt sodales, risus lacus fermentum felis, quis pulvinar lectus felis pellentesque tellus. Integer facilisis malesuada purus dignissim congue. In velit neque, varius nec pellentesque quis, rhoncus sit amet libero. Nullam a elementum est, eu lacinia felis. Nullam semper iaculis quam sit amet lobortis. Etiam volutpat in ipsum at venenatis. Sed ultrices enim metus, vitae accumsan ipsum cursus vel. Sed molestie posuere neque non mattis. Aenean molestie pellentesque ligula vel mollis. Integer condimentum turpis ipsum.</p><p id="558c">Quisque tincidunt orci eu sapien efficitur maximus. Mauris porta dignissim pharetra. Fusce feugiat consectetur pellentesque. Cras euismod risus non turpis eleifend porttitor. Sed dictum id dui in vestibulum. Vivamus et magna condimentum, pretium erat nec, sagittis ante. Praesent finibus venenatis magna, eget consequat felis ornare rutrum. Quisque suscipit risus dolor, a euismod massa venenatis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet auctor velit. Duis fermentum ante quis turpis euismod hendrerit. Nam viverra pharetra nibh, vulputate tincidunt turpis venenatis non. Aenean felis urna, pharetra maximus semper vitae, bibendum non lorem. Donec suscipit justo risus, a tempus diam condimentum non. Curabitur elit ipsum, lacinia et facilisis ut, facilisis in dui. Sed eleifend a turpis vitae feugiat.</p><p id="558d">Ut convallis sem non augue porta, ac accumsan nisl mattis. Praesent pretium ante ac finibus rutrum. Curabitur fermentum, erat quis venenatis cursus, lorem est interdum urna, in lobortis mauris tortor nec mauris. Donec condimentum massa ut maximus luctus. In auctor pretium massa nec venenatis. Vivamus auctor lectus ut felis vestibulum, non vestibulum libero tempor. Etiam erat turpis, rhoncus eleifend eleifend sed, pharetra sed felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam eu ligula felis. Fusce a faucibus est. Curabitur metus augue, scelerisque eget tortor vel, viverra tristique neque. Cras bibendum, mi vel ornare bibendum, ipsum erat mattis odio, eu rhoncus ante mauris eget enim. Aliquam luctus vel urna vitae ultricies. Mauris dictum, augue in sodales volutpat, turpis turpis hendrerit leo, et mattis magna metus eget velit. In justo leo, semper vitae purus vel, aliquet venenatis est. Suspendisse potenti.</p><p id="558e">Suspendisse molestie luctus rhoncus. Donec a luctus tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas pulvinar lacus sit amet tellus tempus, nec fringilla leo aliquam. Duis luctus cursus vestibulum. Sed non bibendum ligula, nec tempor sapien. Vivamus sed nisi elementum, fringilla orci in, tristique felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam diam dolor, faucibus non metus in, condimentum pulvinar massa.</p><p id="558f">Fusce faucibus tellus metus, sit amet auctor enim aliquet eu. Suspendisse lacinia felis eu nulla faucibus, a sagittis leo cursus. Nulla pulvinar dignissim erat eu semper. Praesent aliquet fringilla ex in tincidunt. Suspendisse porta, dolor sed interdum mollis, libero ligula placerat mi, eu maximus purus mi vel quam. Nulla id pharetra diam. Vestibulum ac efficitur mauris, ultrices varius sapien. Nullam a lorem ligula. Praesent libero erat, mattis vel justo a, dapibus ullamcorper leo. Aliquam at dapibus sapien, in mattis mauris. Curabitur ut pulvinar diam. Fusce ac dolor tempor, iaculis felis eget, tincidunt libero.</p></section>'
		));

	}

}

class AnnotationsTableSeeder extends Seeder {

	public function run()
	{

		Annotation::create(array(
			'user_id' => '2',
			'post_id' => '1',
			'anchor' => '558b',
			'state' => 'PUBLIC'
		));

		AnnotationComment::create(array(
			'annotation_id' => '1',
			'content' => 'This is an awesome article dude!'
		));

		AnnotationHighlight::create(array(
			'annotation_id' => '1',
			'content' => 'consectetur adipiscing elit'
		));

		Annotation::create(array(
			'user_id' => '2',
			'post_id' => '1',
			'anchor' => '558b',
			'state' => 'PUBLIC'
		));

		AnnotationComment::create(array(
			'annotation_id' => '2',
			'content' => 'I need to re-emphasize that this is awesome!'
		));

		AnnotationCommentReply::create(array(
			'comment_id' => '2',
			'user_id' => '1',
			'content' => 'We get it dude.'
		));

	}

}