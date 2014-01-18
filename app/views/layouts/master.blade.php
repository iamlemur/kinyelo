<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js screen-scroll js-ready js-utils-nav"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Postbook</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="/css/base.css">
	<script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="pb-posts">

		<nav class="site-nav" role="navigation">
			<div class="site-nav-scrollable-container">
				<h1>postbook.</h1>
				<form role="search" method="get" action="/search">
					<input type="text" name="q" placeholder="search" />
				</form>
				<ul>
					<li class="personal"><a href="#"><span>joelleimer</span></a></li>
					<li class="posts active">
						<a href="#"><span>posts</span></a>
						<ul>
							<li class="active"><a href="#"><span>trending</span></a></li>
							<li><a href="#"><span>editor's picks</span></a></li>
							<li><a href="#"><span>most recent</span></a></li>
							<li><a href="#"><span>my reading list</span></a></li>
							<li>
								<a href="#"><span>my posts</span></a>
								<ul>
									<li><a href="#">drafts</a></li>
									<li><a href="#">published</a></li>
									<li><a href="#">recommended</a></li>
								</ul>
							</li>
							<li class="add"><a href="#"><span>create new post</span></a></li>
						</ul>
					</li>
					<li class="books"><a href="#"><span>books</span></a></li>
					<li class="characters"><a href="#"><span>characters</span></a></li>
					<li class="authors"><a href="#"><span>authors</span></a></li>
				</ul>
			</div>
		</nav>
		<nav id="fixed-nav">
			<a href="#" id="logo"></a>
			<a href="#" id="btn-add-favorite"></a>
		</nav>
		<div id="active-nav-overlay"></div>
		<main class="outer-content-wrapper" role="main">
			<div class="inner-content-wrapper">
				<div class="content-container" id="content-container">
					@yield('content')
				</div>
				@yield('upcoming')
			</div>
		</main>
		<nav class="page-utils" role="complementary">
			<div class="page-utils-scrollable-container content">
				@yield('annotations')
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
<script src="/js/vendor/waypoints.min.js"></script>
<script src="/js/vendor/waypoints-sticky.min.js"></script>
<script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
<script src="/js/scripts.js"></script>
</body>
</html>
