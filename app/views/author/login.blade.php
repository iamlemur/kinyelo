@section('content')
<?
print_r($errors);
?>

{{ Form::model($user, array('action' => array('LoginController@postLogin'), 'method' => 'POST')) }}
{{ Session::get('error') }}
{{ Form::label('username', 'Username') }}
{{ Form::text('username') }}

{{ Form::label('password', 'Password') }}
{{ Form::password('password') }}

{{ Form::submit('Login') }}

{{ Form::close() }}

<p>Don't have an account? <a href="{{ action('UserController@create') }}">Create one.</a></p>
@stop