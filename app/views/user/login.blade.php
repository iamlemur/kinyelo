@section('content')

<div class="form-container">
	<header>
		<h1>log in</h1>
	</header>
	<div class="form-body">

		{{ Form::model($user, array('action' => array('UserController@postLogin'), 'method' => 'POST')) }}

		{{ Session::get('error') }}
		{{ Form::token() }}

		<ul class="fields">
			<li>
				{{ Form::label('username', 'username') }}
				{{ Form::text('username') }}
			</li>
			<li>
				{{ Form::label('password', 'password') }}
				{{ Form::password('password') }}
			</li>
			<li>
				{{ Form::checkbox('remember') }}
				{{ Form::label('remember', 'remember') }}
			</li>
			<li>
				{{ Form::submit('Login') }}
			</li>
			<li>
				<p>Don't have an account? <a href="{{ action('UserController@create') }}">Create one.</a></p>
			</li>
		</ul>

		{{ Form::close() }}

	</div>
</div>

@stop