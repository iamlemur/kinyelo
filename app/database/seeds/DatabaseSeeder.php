<?php

require_once '/vendor/fzaninotto/faker/src/autoload.php';

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UserAndPostTableSeeder');

		$this->command->info('User table seeded!');
	}

}

class UserAndPostTableSeeder extends Seeder {

	public function run()
	{
		DB::table('users')->delete();
		DB::table('posts')->delete();

		$generator = \Faker\Factory::create();
		$generator->seed(1234);
		$populator = new Faker\ORM\Doctrine\Populator($generator);
		$populator->addEntity('User', 10);
		$populator->addEntity('Post', 100);
		$insertedPKs = $populator->execute();

//		User::create(array('email' => 'foo@bar.com'));
	}

}