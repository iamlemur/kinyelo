@section('content')

@if(isset($message))
<p>{{$message}}</p>
@endif

{{ Form::model($user, array('action' => array('UserController@update'), 'method' => 'POST')) }}

@if(count($errors->all()) > 0)
	@foreach ($errors->all('<li>:message</li>') as $message)
		{{$message}}
	@endforeach
@endif

{{ Form::label('email', 'E-Mail Address') }}
{{ Form::text('email') }}

{{ Form::label('username', 'Username') }}
{{ Form::text('username') }}

{{ Form::label('first_name', 'First Name') }}
{{ Form::text('first_name') }}

{{ Form::label('last_name', 'Last Name') }}
{{ Form::text('last_name') }}

{{ Form::label('password', 'Password') }}
{{ Form::password('password') }}

{{ Form::label('password_confirmation', 'Password Confirmation') }}
{{ Form::password('password_confirmation') }}

{{ Form::submit('Edit') }}

{{ Form::close() }}

@stop