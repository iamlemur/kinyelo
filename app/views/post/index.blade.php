@section('content')

@section('content')
<h1>posts</h1>
<nav>
	<ul>
		<li class="active"><a href="#">trending</a></li>
		<li><a href="#">editor's picks</a></li>
		<li><a href="#">most recent</a></li>
	</ul>
</nav>
<div id="inner-content-container">
	<ul>
		@foreach($posts as $post)
			<li>
				<h2><a href="{{ action('PostController@show', $post->id) }}">Title 1</a></h2>
				<small>published by iamlemur on <time>May 1, 2014</time></small>
			</li>
		@endforeach
		@foreach($posts as $post)
		<li>
			<h2><a href="{{ action('PostController@show', $post->id) }}">Title 1</a></h2>
			<small>published by iamlemur on <time>May 1, 2014</time></small>
		</li>
		@endforeach
	</ul>
</div>
@stop