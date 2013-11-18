@section('content')
<?
print_r($errors);
echo Session::get('message');
?>

{{ Form::model($post, array('action' => array('PostController@store'), 'method' => 'POST')) }}

{{ Form::label('title', 'Title') }}
{{ Form::text('title') }}

{{ Form::label('content', 'Content') }}
{{ Form::textarea('content') }}

{{ Form::label('status', 'Status') }}
{{ Form::select('status', Post::$statuses) }}


{{ Form::submit('Create Post') }}

{{ Form::close() }}
@stop