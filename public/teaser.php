<?php

if(isset($_POST) && !empty($_POST['email'])) {
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		echo json_encode(array('response' => 0, 'message' => 'Invalid email address'));
	} else {
		$dbc = new mysqli('mysql.kinyelo.com', 'kinyelo_teaser', 'albusdumbledore', 'kinyelo');
		$dbc->set_charset("utf8");
		$dbc->query('SET CHARACTER SET utf8');
		$dbc->query("SET NAMES 'utf8'");
		$r = $dbc->query("INSERT INTO email_addresses (`email_address`) VALUES ('" . $dbc->real_escape_string($_POST['email']) . "')");
		if($r) {
			echo json_encode(array('response' => 1));
		} else {
			echo json_encode(array('response' => 0, 'message' => 'The email address already exists'));
		}
	}
	die();
}

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>kinyelo</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
	<link href='http://fonts.googleapis.com/css?family=Merriweather:400,700,700italic,400italic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/teaser.css">
	<script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
<table class="container">
	<tbody>
	<tr>
		<td>
			<div class="container">
				<div class="logo">
					k
				</div>
				<h1>kinyelo.</h1>
				<h2>the evolution of story</h2>
				<form method="post" action="/" accept-charset="utf-8">
					<input type="text" name="email" placeholder="your email address goes here..." />
					<button type="submit">
						<span>tell me more</span>
						<div class="spinner">
							<div class="bounce1"></div>
							<div class="bounce2"></div>
							<div class="bounce3"></div>
						</div>
					</button>
					<span class="message"></span>
				</form>
			</div>
		</td>
	</tr>
	</tbody>
</table>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
<script type="text/javascript">
	$(document).ready(function() {
		var emailInput = $("input[name=email]");
		var message = $("span.message");
		var button = $("button");
		$('form').submit(function(e) {
			e.preventDefault();
			$.ajax({
				method: 'POST',
				url: $('form').attr('action'),
				dataType: 'json',
				data: {
					'email': emailInput.val()
				},
				beforeSend: function(xhr, settings) {
					button.children('span').hide();
					button.children('div.spinner').show();
				},
				complete: function(xhr, status) {
					button.children('span').show();
					button.children('div.spinner').hide();
				},
				success: function(data) {
					if(data.response) {
						button.attr('disabled', 'disabled');
						button.children('span').text('Success!');
						message.hide();
						emailInput.fadeOut('normal');
					} else {
						emailInput.addClass('error');
						message.text(data.message).fadeIn('normal');
					}
				}
			})
		});
	});
</script>

<script>
	(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
	ga('create','UA-52989073-1');ga('send','pageview');
</script>
</body>
</html>
