<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js screen-scroll js-ready"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>kinyelo &middot; the evolution of story</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="/css/base.css">
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700|Merriweather:400,300,700' rel='stylesheet' type='text/css'>
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="{{ $context }}">

		<nav class="site-nav" role="navigation">
			<div class="site-nav-scrollable-container">
				<h1>kinyelo.</h1>
				<form role="search" method="get" action="/search">
					<input type="text" name="q" placeholder="search" />
				</form>
				<ul class="nav-primary">
					@if(Auth::check())
					<li class="personal<?=($context == "k-user" ? " active" : "")?>">
						<a class="nav-item" href="{{ action('UserController@show') }}"><span>{{ Auth::user()->username }}</span></a>
					</li>
					@else
					<li class="personal">
					    <a class="nav-item" href="{{ action('UserController@getLogin') }}"><span>log in</span></a>
					</li>
					@endif
					<li class="posts<?=($context == "k-posts" ? " active" : "")?>">
						<a class="nav-item" href="{{ action('PostController@index') }}"><span>posts</span></a>
                        <a class="nav-add" href="{{ action('PostController@create') }}"></a>
                    </li>
					<li class="books<?=($context == "k-books" ? " active" : "")?>">
						<a class="nav-item" href="{{ action('BookController@index') }}"><span>books</span></a>
                        <a class="nav-add" href="{{ action('BookController@create') }}"></a>
					</li>
					<li class="characters"><a class="nav-item" href="#"><span>characters</span></a></li>
					<li class="authors"><a class="nav-item" href="#"><span>authors</span></a></li>
				</ul>
                @if(Auth::check())
                <ul class="nav-secondary">
                    <li class="settings"><a href="{{ action('UserController@edit') }}"><span>settings</span></a></li>
                    <li class="logout"><a href="{{ action('UserController@logout') }}"><span>log out</span></a></li>
                </ul>
                @endif
			</div>
		</nav>
		<nav id="fixed-nav">
            @yield('draftstatus')
			<a href="#" class="logo"></a>
            @if(Auth::check())
            <!-- need method: verify that user has edit privileges -->
            <a href="#" class="btn-edit c-btn-icn" id="btn-edit"></a>
            @endif
			<a href="#" class="btn-add-favorite c-btn-icn" id="btn-add-favorite"></a>
		</nav>
		<div id="active-nav-overlay"></div>
		<main class="outer-content-wrapper" role="main">
			<div class="inner-content-wrapper">
				<div class="content-container" id="content-container">
					@yield('content')
					<div id="template-test"></div>
				</div>
				@yield('upcoming')
			</div>
		</main>
		<div id="annotations">
		</div>

		<!--
        <nav id="dev-nav">
			<a href="{{ action('UserController@getLogin') }}">Login</a> |
            <a href="#" id="openUtils">Open Utils</a>
		</nav>
		-->

<!--script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script-->
<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<!--script src="/js/vendor/jquery.nanoscroller.min.js"></script-->
<script src="/js/vendor/waypoints.min.js"></script>
<script src="/js/vendor/waypoints-sticky.min.js"></script>
<script src="/js/vendor/icheck.min.js"></script>
<!--script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.10.2.min.js"><\/script>')</script-->
<script src="http://kinyelo.com:9810/compile?id=kinyelo&mode=raw&level=verbose" type="text/javascript"></script>
<!--script src="http://kinyelo.com/js/compiled.js" type="text/javascript"></script-->
<script src="/js/scripts.js" type="text/javascript"></script>
</body>
</html>
