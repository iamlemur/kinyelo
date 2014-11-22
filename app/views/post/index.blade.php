@section('content')

<div class="index-container">
	<header>
		<h1>posts</h1>
		<nav>
			<ul>
				<li <?= Route::input('filter') == "trending" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'trending')) }}">trending</a></li>
                <li <?= Route::input('filter') == "recent" || is_null(Route::input('filter')) ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'recent')) }}">most recent</a></li>
                <li <?= Route::input('filter') == "favorites" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'favorites')) }}">favorites</a></li>
                <li <?= Route::input('filter') == "yours" ? 'class="active"' : '' ?>><a href="{{ action('PostController@listing', array('filter' => 'yours')) }}">yours</a></li>
                <li><a href="/posts/create">create</a></li>
			</ul>
		</nav>
	</header>
	<div class="index">
		<ul class="result-listings expandable">
			@foreach($posts as $post)
			<li>
                <button class="btn-fav c-btn-icn"></button>
				<div class="listing">
                    <h2><a href="{{ action('PostController@show', $post->id) }}">{{ $post->title }}</a></h2>
                    <small>published by {{ $post->author->username }} <time datetime="{{ $post->created_at->toISO8601String() }}">{{ $post->created_at->diffForHumans() }}</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
			</li>
			@endforeach
            <li>
                <button class="btn-fav c-btn-icn active"></button>
                <div class="listing">
                    <h2><a href="">This is a Title of a Post</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
            </li>
            <li>
                <button class="btn-fav c-btn-icn"></button>
                <div class="listing">
                    <h2><a href="">Some Titles Will be Very Very Long to the Point of Absurdity So that We Can See How This Whole Thing Wraps</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
            </li>
            <li>
                <button class="btn-fav c-btn-icn"></button>
                <div class="listing">
                    <h2><a href="">Other Titles will be mispeled and bad grammers.</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
            </li>
            <li>
                <button class="btn-fav c-btn-icn"></button>
                <div class="listing">
                    <h2><a href="">Tomorrow is another day for</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
            </li>
            <li>
                <button class="btn-fav c-btn-icn"></button>
                <div class="listing">
                    <h2><a href="">Another chance to make your mistakes again</a></h2>
                    <small>published by username <time datetime="">Month Day, Year</time></small>
                </div>
                <button class="btn-expandable c-link"></button>
            </li>
		</ul>
	</div>
</div>
@stop