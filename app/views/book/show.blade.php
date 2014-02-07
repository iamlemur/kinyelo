@section('content')

<div class="book-container book-read">
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



	<nav class="book">
		<ul class="expandable">
			<li>
				<h2 class="chapters"><a href="#">in this book</a></h2>
				<div class="details">
					<ol class="posts">
						<li>
							<div class="item">
								The Dissipation of Hunter Feyman
								<small>published by iamlemur on <time>May 1, 2014</time></small>
								<button></button>
							</div>
						</li>
					</ol>
				</div>
			</li>
			<li>
				<h2 class="authors"><a href="#">authors</a></h2>
				<div class="details">

				</div>
			</li>
			<li>
				<h2 class="characters"><a href="#">characters</a></h2>
				<div class="details">

				</div>
			</li>
			<li>
				<h2 class="comments"><a href="#">comments</a></h2>
				<div class="details">

				</div>
			</li>
			<li>
				<h2 class="connections"><a href="#">connections</a></h2>
				<div class="details">

				</div>
			</li>
		</ul>
	</nav>

</div>

@stop
