@section('content')

{{ Session::get('message') }}
<div class="post-form">
<h1 itemprop="title" name="title" contenteditable="true">Type your title</h1>
</div>


{{ Form::model($book, array('action' => array('BookController@store'), 'method' => 'POST')) }}

{{ Form::label('title', 'Title') }}
{{ Form::text('title') }}

{{ Form::label('summary', 'Summary') }}
{{ Form::textarea('summary') }}

{{ Form::label('status', 'Status') }}
{{ Form::select('status', Book::$statuses) }}


{{ Form::submit('Create Book') }}

{{ Form::close() }}
@stop