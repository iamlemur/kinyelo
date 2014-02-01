@section('content')

<div class="index-container">
	<header>
		<h1>posts</h1>
		<nav>
			<ul>
				<li <?= Route::input('filter') == "trending" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'trending')) }}">trending</a></li>
				<li <?= Route::input('filter') == "editor" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'editor')) }}">editor's picks</a></li>
				<li <?= Route::input('filter') == "recent" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'recent')) }}">most recent</a></li>
			</ul>
		</nav>
	</header>
	<div class="index">
		<ul>
			@foreach($posts as $post)
			<li>
				<h2><a href="{{ action('PostController@show', $post->id) }}">{{ $post->title }}</a></h2>
				<small>published by {{ $post->author->username }} <time datetime="{{ $post->created_at->toISO8601String() }}">{{ $post->created_at->diffForHumans() }}</time></small>
			</li>
			@endforeach
		</ul>
	</div>
</div>
@stop