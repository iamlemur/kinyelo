<?php

Response::macro('requestError', function($message)
{
	return Response::json(array('status' => 'error', 'message' => $message));
});

Response::macro('requestSuccess', function($payload)
{
	return Response::json(array('status' => 'success', 'payload' => $payload));
});