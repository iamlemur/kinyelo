@section('content')

<div class="book-container">
<header>
	<h1>{{ $book->title }}</h1>
	<small>{{ $book->status }} by <a href="#">{{ $book->author->username }}</a> on <time datetime="{{ $book->created_at->toISO8601String() }}">{{ $book->created_at->toFormattedDateString() }}</time></small>
</header>
<div class="content-body">

	<p>{{ $book->summary }}</p>

</div>



	<div class="social-actions">
		<a href="#" class="btn-favorite"></a>
		<a href="#" class="btn-email"></a>
		<a href="#" class="btn-facebook"></a>
		<a href="#" class="btn-twitter"></a>
	</div>

	<div class="tags">
		<ul>
			<li><a href="#">tag 1</a></li>
			<li><a href="#">tag 2</a></li>
			<li><a href="#">tag 3</a></li>
			<li><a href="#">tag 4</a></li>
			<li><a href="#">tag 5</a></li>
			<li><a href="#">tag 6</a></li>
		</ul>
	</div>

</div>

@stop
