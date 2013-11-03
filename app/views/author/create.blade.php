<?
print_r($errors);
echo Session::get('message');
?>

{{ Form::model($user, array('action' => array('UserController@store'), 'method' => 'POST')) }}

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

{{ Form::submit('Register') }}

{{ Form::close() }}

<p>Already registered? <a href="{{ action('LoginController@getLogin') }}">Log in.</a></p>