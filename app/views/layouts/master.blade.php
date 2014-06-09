<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js screen-scroll js-ready"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Kinyelo</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="/css/base.css">
	<script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="{{ $context }}">

		<nav class="site-nav" role="navigation">
			<div class="site-nav-scrollable-container">
				<h1>postbook.</h1>
				<form role="search" method="get" action="/search">
					<input type="text" name="q" placeholder="search" />
				</form>
				<ul>
					<li class="personal"><a href="#"><span>joelleimer</span></a></li>
					<li class="posts<?=($context == "pb-posts" ? " active" : "")?>">
						<a href="{{ action('PostController@index') }}"><span>posts</span></a>
						<ul>
							<li <?= Route::current()->getActionName() == "PostController@listing" && Route::current()->getParameter('filter') == "trending" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'trending')) }}"><span>trending</span></a></li>
							<li <?= Route::current()->getActionName() == "PostController@listing" && Route::current()->getParameter('filter') == "editor" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'editor')) }}"><span>editor's picks</span></a></li>
							<li <?= Route::current()->getActionName() == "PostController@listing" && Route::current()->getParameter('filter') == "recent" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'recent')) }}"><span>most recent</span></a></li>
							<li><a href="#"><span>my reading list</span></a></li>
							<li><a href="#"><span>my posts</span></a></li>
							<li class="add"><a href="{{ action('PostController@create') }}"><span>create a new post</span></a></li>
						</ul>
					</li>
					<li class="books<?=($context == "pb-books" ? " active" : "")?>">
						<a href="{{ action('BookController@index') }}"><span>books</span></a>
						<ul>
							<li <?= Route::current()->getActionName() == "BookController@listing" && Route::current()->getParameter('filter') == "yours" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'yours')) }}"><span>your books</span></a></li>
							<li <?= Route::current()->getActionName() == "PostController@listing" && Route::current()->getParameter('filter') == "reading" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'reading')) }}"><span>your reading list</span></a></li>
							<li <?= Route::current()->getActionName() == "PostController@listing" && Route::current()->getParameter('filter') == "recommendations" ? 'class="active"' : ""?>><a href="{{ action('PostController@listing', array('filter' => 'recommendations')) }}"><span>your recommendations</span></a></li>
							<li class="add"><a href="{{ action('BookController@create') }}"><span>create a new book</span></a></li>
						</ul>
					</li>
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
			<a href="#" id="openUtils">Open Utils</a>
			<a href="{{ action('LoginController@getLogin') }}">Login</a>
		</nav>

<!--script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script-->
<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<script src="/js/vendor/jquery.nanoscroller.min.js"></script>
<script src="/js/vendor/waypoints.min.js"></script>
<script src="/js/vendor/waypoints-sticky.min.js"></script>
<script src="/js/vendor/icheck.min.js"></script>
<script src="/js/vendor/rangy-core.js"></script>
<!--script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.10.2.min.js"><\/script>')</script-->
<script src="http://localhost:9810/compile?id=kinyelo&mode=raw&level=verbose" type="text/javascript"></script>
<script src="/js/scripts.js" type="text/javascript"></script>
</body>
</html>
