<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js screen-scroll js-ready"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Postbook</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="/css/base.css">
	<script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>

		<nav class="site-nav" role="navigation">
			<div class="site-nav-scrollable-container">
				<h1>Postbook</h1>
				<form role="search" method="get" action="/search">
					<input type="text" name="q" />
				</form>
				<ul>
					<li><a href="#">joelleimer</a></li>
					<li>
						<a href="#">posts</a>
						<ul>
							<li><a href="#" class="active">trending</a></li>
							<li><a href="#">editor's picks</a></li>
							<li><a href="#">most recent</a></li>
							<li><a href="#">my reading list</a></li>
							<li>
								<a href="#">my posts</a>
								<ul>
									<li><a href="#">drafts</a></li>
									<li><a href="#">published</a></li>
									<li><a href="#">recommended</a></li>
								</ul>
							</li>
							<li><a href="#">create new post</a></li>
						</ul>
					</li>
					<li><a href="#">books</a></li>
					<li><a href="#">chracters</a></li>
					<li><a href="#">authors</a></li>
				</ul>
			</div>
		</nav>
		<main class="content-container" id="content-container" role="main">
			@yield('content')
		</main>
		<nav class="page-utils nano" role="complementary">
			<div class="page-utils-scrollable-container content">

			</div>
		</nav>
		<nav id="dev-nav">
			<a href="#" id="openNav">Open Nav</a>
			<a href="#" id="openUtils">Open Utils</a>
			<a href="{{ action('PostController@index') }}">View all posts</a>
			<a href="{{ action('PostController@create') }}">Create a post</a>
			<a href="{{ action('LoginController@getLogin') }}">Login</a>
		</nav>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
<script src="/js/vendor/jquery.nanoscroller.min.js"></script>
<script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
<script src="/js/scripts.js"></script>
</body>
</html>
