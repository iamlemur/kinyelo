@section('content')

<div class="post-container">
<header>
	<h1>{{ $post->title }}</h1>
	<small>{{ $post->status }} by <a href="#">{{ $post->author->username }}</a> on <time datetime="{{ $post->created_at->toISO8601String() }}">{{ $post->created_at->toFormattedDateString() }}</time></small>
</header>
<div class="content-body">

	<p>{{ $post->content }}</p>

	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper. Aenean vel lorem ac ipsum lacinia condimentum. Suspendisse congue mi enim, vel tempor neque imperdiet eget. Donec at pulvinar odio. Vestibulum volutpat lobortis lorem, a accumsan purus accumsan eu. Nunc feugiat nisl in eros elementum, pretium rhoncus urna accumsan. Mauris tellus leo, euismod vitae dignissim nec, tempor ut erat. Pellentesque ac porttitor magna. Donec non pretium ipsum, sed posuere nulla. Ut lobortis nisi quis mi suscipit sagittis. Donec elit erat, feugiat eget suscipit et, porttitor sed arcu. Maecenas iaculis ipsum in aliquet faucibus.</p>

	<p>In blandit volutpat ligula at consequat. Vivamus laoreet ante ut varius pulvinar. Quisque est dolor, congue quis euismod vitae, tincidunt vitae sapien. Etiam fermentum tortor ligula, at condimentum est aliquam vel. Mauris sodales ac risus at venenatis. Curabitur aliquam dignissim facilisis. Duis cursus vitae justo nec sagittis. Etiam luctus dolor sed ligula iaculis bibendum. Sed et urna euismod, laoreet magna quis, rutrum ligula.</p>

	<p>Praesent blandit lectus dui, consectetur euismod erat lobortis ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ac metus leo. Vestibulum congue nibh elit, sed tincidunt sem interdum at. Curabitur nec nulla venenatis, varius quam sit amet, sodales eros. Proin lobortis dictum purus ac pellentesque. Suspendisse potenti. Nullam vitae magna dolor. Morbi ut dui ut eros semper pulvinar ut ut nulla. Morbi non tellus nec tortor iaculis lobortis non non orci.</p>

	<p>Fusce facilisis eros quis arcu posuere, quis porttitor est venenatis. Etiam varius augue est. Praesent faucibus luctus lorem, vel cursus elit. Donec et egestas ipsum, ut tristique lectus. Maecenas eu eros orci. Praesent sit amet luctus leo, sit amet gravida turpis. Proin eu nisi et quam fringilla vestibulum. Duis rutrum tempus metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>



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

	<figure class="content-author">
		<div class="img-wrapper">
			<img src="/img/avatar.jpg" />
		</div>
		<div class="bio">
			<h2>iamlemur</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu neque non erat ullamcorper aliquet sed id nibh. Ut vel diam malesuada, interdum tortor ac, blandit tellus. Aliquam erat volutpat. Integer urna neque, molestie sed gravida ac, auctor quis felis. Fusce et rutrum massa. Etiam convallis arcu vel nulla tincidunt, aliquet vehicula urna suscipit. Sed auctor quam ac eleifend ultricies. Ut nibh tellus, scelerisque sit amet aliquam et, dignissim sed erat. Phasellus nibh odio, lobortis eget ante sed, dignissim ornare justo. Mauris sagittis tortor eget euismod dictum. Curabitur tincidunt nisi at enim malesuada tempus. In fringilla tristique mauris, ultrices adipiscing justo accumsan non. Aliquam aliquet orci eu metus dapibus faucibus. Aenean varius egestas tortor sed gravida. </p>
		</div>
	</figure>

	<footer class="by-sa-30">
		<h2>rights and usage</h2>
		<p><a href="{{ action('PostController@show', $post->id) }}" property="dc:title" rel="cc:attributionURL">{{ $post->title }}</a> by <a href="#" rel="dc:creator" property="cc:attributionName">{{ $post->author->username }}</a> is licensed under a <a href="http://creativecommons.org/licenses/by-sa/3.0/" rel="license">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.</p>
		<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" /></a>
		<a href="#" class="btn-report">report a violation</a>
	</footer>


</div>

@stop

@section('upcoming')

	<div class="upcoming">
		<a href="#">Michael's Paltry Post Makes Me Kind of Sad</a>
		<small>published by asiral on May 10, 2014</small>
	</div>

@stop

@section('annotations')
<div class="annotations">

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
	<ul class="actions">
		<li>
			<button class="add-comment">add a comment</button>
		</li>
		<li>
			<button class="suggest-character">suggest a character</button>
		</li>
		<li>
			<button class="connect-post">connect a post</button>
		</li>
	</ul>
	<div class="action-create-metadata input-metadata comment">
		<div class="entry">
			<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar.jpg" /></a>
			<a href="#" title="Go to the profile of..." class="author">iamlemur</a>
			<p class="content">Add a comment...</p>
			<ul>
				<li><button class="reply submit-create-metadata">add</button></li>
				<li><button class="cancel cancel-create-metadata">cancel</button></li>
			</ul>
		</div>
	</div>
	<div class="action-create-metadata input-metadata character">
		<div class="entry">
			<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar.jpg" /></a>
			<a href="#" title="Go to the profile of..." class="author">iamlemur</a>
			<p class="content">Type the character's name...</p>
			<ul>
				<li><button class="reply submit-create-metadata">suggest</button></li>
				<li><button class="cancel cancel-create-metadata">cancel</button></li>
			</ul>
		</div>
	</div>
</div>
@stop