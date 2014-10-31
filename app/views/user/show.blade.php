@section('content')

<div class="index-container">
	<header>
		<h1>{{ Auth::user()->username }}</h1>
		<nav>
			<ul>
                <li <?= Route::input('filter') == "pending" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'pending')) }}">pending</a></li>
                <li <?= Route::input('filter') == "posts" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'posts')) }}">posts</a></li>
                <li <?= Route::input('filter') == "books" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'books')) }}">books</a></li>
                <li <?= Route::input('filter') == "characters" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'characters')) }}">characters</a></li>
                <li <?= Route::input('filter') == "favorites" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'favorites')) }}">favorites</a></li>
                <li <?= Route::input('filter') == "fans" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'fans')) }}">fans</a></li>
			</ul>
		</nav>
	</header>
    <p>Here a user can view information about themselves.</p>
</div>

@stop