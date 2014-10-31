@section('content')

<div class="index-container">
	<header>
		<h1>books</h1>
		<nav>
			<ul>
				<li <?= Route::input('filter') == "trending" ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'trending')) }}">trending</a></li>
				<li <?= Route::input('filter') == "recent" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'recent')) }}">most recent</a></li>
                <li <?= Route::input('filter') == "favorites" ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'favorites')) }}">favorites</a></li>
                <li <?= Route::input('filter') == "yours" ? 'class="active"' : '' ?>><a href="{{ action('BookController@listing', array('filter' => 'yours')) }}">yours</a></li>
                <li><a href="/books/create">create</a></li>
			</ul>
		</nav>
	</header>
	<div class="index">
		<ul class="result-listings">
			@foreach($books as $book)
			<li>
			    <button class="colored"></button>
                <div class="listing">
                    <h2><a href="{{ action('BookController@show', $book->id) }}">{{ $book->title }}</a></h2>
                    <small>published by {{ $book->author->username }} <time datetime="{{ $book->created_at->toISO8601String() }}">{{ $book->created_at->diffForHumans() }}</time></small>
                </div>
                <button class="btn-expandable"></button>
			</li>
			@endforeach
			<li>
                <button class="btn-fav colored active"></button>
                <div class="listing">
                    <h2><a href="">This is a Title of a Book</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable"></button>
            </li>
            <li>
                <button class="btn-fav colored"></button>
                <div class="listing">
                    <h2><a href="">Some Titles Will be Very Very Long to the Point of Absurdity So that We Can See How This Whole Thing Wraps</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable"></button>
            </li>
            <li>
                <button class="btn-fav colored"></button>
                <div class="listing">
                    <h2><a href="">Other Titles will be mispeled and bad grammers.</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable"></button>
            </li>
            <li>
                <button class="btn-fav colored"></button>
                <div class="listing">
                    <h2><a href="">Tomorrow is another day for</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable"></button>
            </li>
            <li>
                <button class="btn-fav colored"></button>
                <div class="listing">
                    <h2><a href="">Another chance to make your mistakes again</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable"></button>
            </li>
		</ul>
	</div>
</div>
@stop