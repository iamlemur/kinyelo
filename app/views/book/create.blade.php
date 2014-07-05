@section('content')

{{ Session::get('message') }}


<div class="book-container book-{{$action}}">
	<header>
		<h1 itemprop="title" name="title" contenteditable="true" id="book-title" data-default-value="Enter the title...">
			@if(!empty($book->title))
				{{$title}}
			@endif
		</h1>
	</header>
	<div id="book-summary" name="summary" contenteditable="true" data-default-value="Enter a summary or drag in a file...">
		@if(!empty($book->summary))
			{{$book->summary}}
		@endif
	</div>
	@if($action == "create")
	<nav class="actions">
		<ul>
			<li><button data-action="create" class="submit">create book</button></li>
			<li><button data-action="cancel" class="cancel">cancel</button></li>
		</ul>
	</nav>
	@else

	@endif
</div>

@if($action == "create")
	{{ Form::model($book, array('action' => 'BookController@store', 'id' => 'transporter', 'style' => 'display: none')) }}
	{{ Form::token() }}
	{{ Form::close() }}
@endif


@stop