@section('content')

<div id="opus">
    <header>
	    <h1 itemprop="title" id="post-title" name="title" contenteditable="true" data-default-value="Type your title">{{{ $post->title }}}</h1>
    </header>
	<div id="post-body" contenteditable="true" data-default-value="Write your story">{{ $post->content }}</div>
	<div id="annotation-markers"></div>
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