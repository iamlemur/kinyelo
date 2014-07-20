@section('content')

<div class="form-container">
	<header>
		<h1>create account</h1>
	</header>
	<div class="form-body">

		{{ Form::model($user, array('action' => array('UserController@store'), 'method' => 'POST')) }}

		@if(count($errors->all()) > 0)
			@foreach ($errors->all('<li>:message</li>') as $message)
				{{$message}}
			@endforeach
		@endif

		<ul class="fields">
			<li>
				{{ Form::label('email', 'email address') }}
				{{ Form::text('email') }}
			</li>
			<li>
				{{ Form::label('username', 'username') }}
				{{ Form::text('username') }}
			</li>
			<li>
				{{ Form::label('first_name', 'first name') }}
				{{ Form::text('first_name') }}
			</li>
			<li>
				{{ Form::label('last_name', 'last name') }}
				{{ Form::text('last_name') }}
			</li>
			<li>
				{{ Form::label('password', 'password') }}
				{{ Form::password('password') }}
			</li>
			<li>
				{{ Form::label('password_confirmation', 'password confirmation') }}
				{{ Form::password('password_confirmation') }}
			</li>
			<li>
				<p><a href="{{ action('PolicyController@terms') }}">Terms of Service</a></p>
			</li>
			<li>
				{{ Form::checkbox('agree') }}
				{{ Form::label('agree', 'agree to the terms of service') }}
			</li>
			<li>
				{{ Form::submit('register') }}
			</li>
			<li>
				<p>Already registered? <a href="{{ action('UserController@getLogin') }}">Log in.</a></p>
			</li>
		</ul>

		{{ Form::close() }}

	</div>
</div>

@stop