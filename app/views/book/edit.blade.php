@section('content')

<div class="book-container book-edit">
<header>
	<h1>{{ $book->title }}</h1>
	<ul class="status-controls">
		<li><input type="radio" name="status" id="status-control-draft" value="draft" /><label for="status-control-draft">draft</label></li>
		<li><input type="radio" name="status" id="status-control-published" value="published" /><label for="status-control-published">published</label></li>
	</ul>
</header>
<div class="content-body">

	<p>{{ $book->summary }}</p>

</div>

<nav class="book">
	<ul class="expandable">
		<li>
			<h2 class="chapters">in this book</h2>
			<p class="notice">No posts have been added to this book yet. Select a post from the lists below.</p>
			<ol class="posts">
				<li>
					<div class="item">
						The Dissipation of Hunter Feyman
						<small>published by iamlemur on <time>May 1, 2014</time></small>
						<button></button>
					</div>
				</li>
			</ol>
		</li>
		<li>
			<h2 class="add">add posts</h2>
			<ul class="add-post-quick-filters">
				<li><a class="heart active" href="#">recommended</a></li><li><a class="star" href="#">reading list</a></li>
			</ul>
			<form class="add-post-search">
				<input type="text" placeholder="search for a post by title..."/>
			</form>
			<div class="add-post-search-results">
				<p class="summary">Showing results for "The Dissipation of"</p>
				<ol>
					<li>
						<div class="item">
							<input type="checkbox" name="posts[]" value="1" id="add-post-1" />
							<label for="add-post-1">The Dissipation of Bullshit</label>
							<small>published by iamlemur on <time>May 1, 2014</time></small>
							<button></button>
						</div>
						<div class="details">
							<p>Etiam a mi gravida, scelerisque magna vel, dignissim lectus. Nam tincidunt in nulla faucibus porta. Proin venenatis, enim at gravida convallis, justo orci blandit nisl, sed ullamcorper mi tellus et ante. Aliquam erat volutpat. Vivamus gravida dignissim metus, id dictum quam placerat in. In hac habitasse platea dictumst. Mauris venenatis viverra elit id scelerisque. Vestibulum sed laoreet sapien. Donec a ante dignissim, eleifend enim id, aliquet orci. Maecenas scelerisque odio at magna interdum, in ultrices leo pulvinar. Vivamus scelerisque arcu vel luctus pharetra. Aenean rutrum viverra leo sed rutrum. </p>
							<p>Etiam a mi gravida, scelerisque magna vel, dignissim lectus. Nam tincidunt in nulla faucibus porta. Proin venenatis, enim at gravida convallis, justo orci blandit nisl, sed ullamcorper mi tellus et ante. Aliquam erat volutpat. Vivamus gravida dignissim metus, id dictum quam placerat in. In hac habitasse platea dictumst. Mauris venenatis viverra elit id scelerisque. Vestibulum sed laoreet sapien. Donec a ante dignissim, eleifend enim id, aliquet orci. Maecenas scelerisque odio at magna interdum, in ultrices leo pulvinar. Vivamus scelerisque arcu vel luctus pharetra. Aenean rutrum viverra leo sed rutrum. </p>
						</div>
					</li>
					<li>
						<div class="item">
							<input type="checkbox" name="posts[]" value="1" id="add-post-2" />
							<label for="add-post-2">The Dissipation of Bullshit</label>
							<small>published by iamlemur on <time>May 1, 2014</time></small>
							<button></button>
						</div>
						<div class="details">
							<p>Etiam a mi gravida, scelerisque magna vel, dignissim lectus. Nam tincidunt in nulla faucibus porta. Proin venenatis, enim at gravida convallis, justo orci blandit nisl, sed ullamcorper mi tellus et ante. Aliquam erat volutpat. Vivamus gravida dignissim metus, id dictum quam placerat in. In hac habitasse platea dictumst. Mauris venenatis viverra elit id scelerisque. Vestibulum sed laoreet sapien. Donec a ante dignissim, eleifend enim id, aliquet orci. Maecenas scelerisque odio at magna interdum, in ultrices leo pulvinar. Vivamus scelerisque arcu vel luctus pharetra. Aenean rutrum viverra leo sed rutrum. </p>
							<p>Etiam a mi gravida, scelerisque magna vel, dignissim lectus. Nam tincidunt in nulla faucibus porta. Proin venenatis, enim at gravida convallis, justo orci blandit nisl, sed ullamcorper mi tellus et ante. Aliquam erat volutpat. Vivamus gravida dignissim metus, id dictum quam placerat in. In hac habitasse platea dictumst. Mauris venenatis viverra elit id scelerisque. Vestibulum sed laoreet sapien. Donec a ante dignissim, eleifend enim id, aliquet orci. Maecenas scelerisque odio at magna interdum, in ultrices leo pulvinar. Vivamus scelerisque arcu vel luctus pharetra. Aenean rutrum viverra leo sed rutrum. </p>
						</div>
					</li>
				</ol>
			</div>
			<ul class="add-post-actions">
				<li><a href="#">update book</a></li>
				<li><a href="#">cancel</a></li>
			</ul>
		</li>
	</ul>
</nav>

	<a href="#" class="delete-book">Permanently delete this book <span>This will not delete posts or characters contained within the book</span></a>

</div>

@stop
