@section('content')

<div id="opus">
<h1 itemprop="title" id="post-title" name="title" contenteditable="true">{{{ $post->title or 'Type your title' }}}</h1>
</div>
@if(isset($jsonPost))
<script type="text/javascript">
	var post = {{$jsonPost}};
</script>
@endif

@stop