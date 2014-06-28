@section('content')

{{ Form::model($user, array('action' => array('UserController@postLogin'), 'method' => 'POST')) }}

{{ Session::get('error') }}

{{ Form::token() }}

{{ Form::label('username', 'Username') }}
{{ Form::text('username') }}

{{ Form::label('password', 'Password') }}
{{ Form::password('password') }}

{{ Form::checkbox('remember') }}
{{ Form::label('remember', 'Remember me') }}

{{ Form::submit('Login') }}

{{ Form::close() }}

<p>Don't have an account? <a href="{{ action('UserController@create') }}">Create one.</a></p>
@stop