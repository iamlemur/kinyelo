@section('content')

<div class="index-container">
	<header>
		<h1>authors</h1>
		<nav>
			<ul>
				<li <?= Route::input('filter') == "trending" ? 'class="active"' : '' ?>><a href="{{ action('AuthorController@listing', array('filter' => 'trending')) }}">trending</a></li>
				<li <?= Route::input('filter') == "recent" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('AuthorController@listing', array('filter' => 'recent')) }}">most recent</a></li>
                <li <?= Route::input('filter') == "favorites" ? 'class="active"' : '' ?>><a href="{{ action('AuthorController@listing', array('filter' => 'favorites')) }}">favorites</a></li>
			</ul>
		</nav>
	</header>
	<div class="index">
		<ul class="result-listings">
			@foreach($authors as $author)

            @endforeach
		</ul>
	</div>
</div>
@stop