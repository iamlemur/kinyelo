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
		<ul>
			<li><a href="#" class="btn-favorite"></a></li>
			<li><a href="#" class="btn-email"></a></li>
			<li><a href="#" class="btn-facebook"></a></li>
			<li><a href="#" class="btn-twitter"></a></li>
		</ul>
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

	<ul class="expandable">
		<li class="chapters">
			<h2><button>in this book</button></h2>
			<div class="details">
				<ol class="posts with-details">
					@foreach($book->posts as $post)
						<li>
							<div class="item">
								<span class="title">{{ $post->title }}</span>
								<small>published by {{ $post->author->username }} on <time>{{ $post->published_at }}</time></small>
								<button></button>
							</div>
							<div class="details">
								<p>Etiam a mi gravida, scelerisque magna vel, dignissim lectus. Nam tincidunt in nulla faucibus porta. Proin venenatis, enim at gravida convallis, justo orci blandit nisl, sed ullamcorper mi tellus et ante. Aliquam erat volutpat. Vivamus gravida dignissim metus, id dictum quam placerat in. In hac habitasse platea dictumst. Mauris venenatis viverra elit id scelerisque. Vestibulum sed laoreet sapien. Donec a ante dignissim, eleifend enim id, aliquet orci. Maecenas scelerisque odio at magna interdum, in ultrices leo pulvinar. Vivamus scelerisque arcu vel luctus pharetra. Aenean rutrum viverra leo sed rutrum. </p>
							</div>
						</li>
					@endforeach
				</ol>
			</div>
		</li>
		<li class="authors">
			<h2><button>authors</button></h2>
			<div class="details">

			</div>
		</li>
		<li class="characters">
			<h2><button>characters</button></h2>
			<div class="details">

			</div>
		</li>
		<li class="comments">
			<h2><button>comments</button></h2>
			<div class="details">
				<div class="annotations-container">
					<p>&nbsp;</p>
					<ul class="annotation-list comment">
						<li class="has-children">
							<div class="entry">
								<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar1.jpg" /></a>
								<a href="#" title="Go to the profile of..." class="author">jcomp</a>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
							</div>
							<ul>
								<li>
									<div class="entry">
										<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar2.jpg" /></a>
										<a href="#" title="Go to the profile of..." class="author">sammyshake</a>
										<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
									</div>
								</li>
								<li>
									<div class="entry">
										<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar2.jpg" /></a>
										<a href="#" title="Go to the profile of..." class="author">sammyshake</a>
										<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
									</div>
								</li>
								<li>
									<div class="entry">
										<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar.jpg" /></a>
										<a href="#" title="Go to the profile of..." class="author">iamlemur</a>
										<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
										<p class="approval"><span>The comment has been sent to the author for approval.</span></p>
									</div>
								</li>
							</ul>
							<button class="reply start-reply">reply</button>
						</li>
					</ul>
					<ul class="annotation-list character">
						<li>
							<div class="entry">
								<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar.jpg" /></a>
								<a href="#" title="Go to the profile of..." class="author">iamlemur</a>
								<a href="#" title="Go to the character profile of..." class="character">Robert Bloch</a>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
								<p class="approval"><span>The character has been sent to the author for approval.</span></p>
							</div>
							<button class="reply start-reply">reply</button>
						</li>
					</ul>
					<ul class="annotation-list comment">
						<li class="has-children">
							<div class="entry">
								<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar1.jpg" /></a>
								<a href="#" title="Go to the profile of..." class="author">jcomp</a>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
							</div>
							<ul>
								<li>
									<div class="entry">
										<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar2.jpg" /></a>
										<a href="#" title="Go to the profile of..." class="author">sammyshake</a>
										<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
									</div>
								</li>
								<li>
									<div class="entry">
										<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar2.jpg" /></a>
										<a href="#" title="Go to the profile of..." class="author">sammyshake</a>
										<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
									</div>
								</li>
							</ul>
							<div class="action-reply-metadata input-metadata comment">
								<div class="entry">
									<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar.jpg" /></a>
									<a href="#" title="Go to the profile of..." class="author">iamlemur</a>
									<p class="content">Add a comment...</p>
									<ul>
										<li><button class="reply submit-reply-metadata">reply</button></li>
										<li><button class="cancel cancel-reply-metadata">cancel</button></li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
					<ul class="annotation-list character">
						<li>
							<div class="entry">
								<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar1.jpg" /></a>
								<a href="#" title="Go to the profile of..." class="author">jcomp</a>
								<a href="#" title="Go to the character profile of..." class="character">Firstname Lastname</a>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
							</div>
							<button class="reply start-reply">reply</button>
						</li>
					</ul>
					<ul class="annotation-list post">
						<li>
							<div class="entry">
								<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar1.jpg" /></a>
								<a href="#" title="Go to the profile of..." class="author">jcomp</a>
								<a href="#" title="Go to post..." class="post">Lorem ipsum dolor sit amet</a>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper.</p>
							</div>
							<button class="reply start-reply">reply</button>
						</li>
					</ul>
				</div>
			</div>
		</li>
		<li class="connections">
			<h2><button>connections</button></h2>
			<div class="details">

			</div>
		</li>
	</ul>

</div>

@stop
