@section('content')

{{ Session::get('message') }}
<div class="post-form">
<h1 itemprop="title" name="title" contenteditable="true">Type your title</h1>
<h2 data-default-value="Type your subtitle" role="textbox" contenteditable="true"></h2>
</div>


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