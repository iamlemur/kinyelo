@section('content')

<div class="author-container author-read">
	<header>
		<h1>{{ $author->username}}</h1>

	</header>
	<div class="content-body">
		<p>nothing</p>
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


</div>

@stop
