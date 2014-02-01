@section('content')

<div class="index-container">
	<header>
		<h1>books</h1>
		<nav>
			<ul>
				<li <?= Route::input('filter') == "trending" ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'trending')) }}">trending</a></li>
				<li <?= Route::input('filter') == "editor" ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'editor')) }}">editor's picks</a></li>
				<li <?= Route::input('filter') == "recent" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'recent')) }}">most recent</a></li>
			</ul>
		</nav>
	</header>
	<div class="index">
		<ul>
			@foreach($books as $book)
			<li>
				<h2><a href="{{ action('BookController@show', $book->id) }}">{{ $book->title }}</a></h2>
				<small>published by {{ $book->author->username }} <time datetime="{{ $book->created_at->toISO8601String() }}">{{ $book->created_at->diffForHumans() }}</time></small>
			</li>
			@endforeach
		</ul>
	</div>
</div>
@stop