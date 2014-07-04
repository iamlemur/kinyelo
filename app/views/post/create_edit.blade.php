@section('content')

<div id="opus">
	<h1 itemprop="title" id="post-title" name="title" contenteditable="true" data-default-value="Type your title">{{{ $post->title }}}</h1>
	<div id="post-body" contenteditable="true" data-default-value="Write your story">{{{ $post->content }}}</div>
</div>

@stop