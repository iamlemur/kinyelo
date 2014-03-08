@section('content')

{{ Session::get('message') }}
<div class="post-form" ng-controller="editableAreaController">
<h1 itemprop="title" name="title" contenteditable="true">Type your title</h1>
<h2 data-default-value="Type your subtitle" role="textbox" contenteditable="true">Type your subtitle</h2>
<div class="post-body" data-default-value="Type your post" role="textbox" contenteditable="true" data-rte>
	<section>
		<p>Type your posts</p>
	</section>
</div>
<div data-rte-toolbar class="rte-toolbar" ng-controller="rteToolbarController">
	<ul>
		<li ng-repeat="button in buttons"><button data-rte-toolbar-button data-action="<%button.class%>"><%button.name%></button></li>
	</ul>
</div>
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