@section('content')


<header>
	<h1>{{ $post->title }}</h1>
	<small>{{ $post->status }} by <a href="#">{{ $post->author->username }}</a> on <time>December 15, 2013</time>, 15m, <a href="#">Favorites</a></small>
</header>
<main>

	<p>{{ $post->content }}</p>

	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur sem ut magna laoreet, sit amet mollis leo ullamcorper. Aenean vel lorem ac ipsum lacinia condimentum. Suspendisse congue mi enim, vel tempor neque imperdiet eget. Donec at pulvinar odio. Vestibulum volutpat lobortis lorem, a accumsan purus accumsan eu. Nunc feugiat nisl in eros elementum, pretium rhoncus urna accumsan. Mauris tellus leo, euismod vitae dignissim nec, tempor ut erat. Pellentesque ac porttitor magna. Donec non pretium ipsum, sed posuere nulla. Ut lobortis nisi quis mi suscipit sagittis. Donec elit erat, feugiat eget suscipit et, porttitor sed arcu. Maecenas iaculis ipsum in aliquet faucibus.</p>

	<p>In blandit volutpat ligula at consequat. Vivamus laoreet ante ut varius pulvinar. Quisque est dolor, congue quis euismod vitae, tincidunt vitae sapien. Etiam fermentum tortor ligula, at condimentum est aliquam vel. Mauris sodales ac risus at venenatis. Curabitur aliquam dignissim facilisis. Duis cursus vitae justo nec sagittis. Etiam luctus dolor sed ligula iaculis bibendum. Sed et urna euismod, laoreet magna quis, rutrum ligula.</p>

	<p>Praesent blandit lectus dui, consectetur euismod erat lobortis ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ac metus leo. Vestibulum congue nibh elit, sed tincidunt sem interdum at. Curabitur nec nulla venenatis, varius quam sit amet, sodales eros. Proin lobortis dictum purus ac pellentesque. Suspendisse potenti. Nullam vitae magna dolor. Morbi ut dui ut eros semper pulvinar ut ut nulla. Morbi non tellus nec tortor iaculis lobortis non non orci.</p>

	<p>Fusce facilisis eros quis arcu posuere, quis porttitor est venenatis. Etiam varius augue est. Praesent faucibus luctus lorem, vel cursus elit. Donec et egestas ipsum, ut tristique lectus. Maecenas eu eros orci. Praesent sit amet luctus leo, sit amet gravida turpis. Proin eu nisi et quam fringilla vestibulum. Duis rutrum tempus metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>



</main>

@stop