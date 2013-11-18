@section('content')
<table>
	<thead>
	<tr>
		<th>ID</th>
		<th>Title</th>
		<th>Status</th>
		<th>Author</th>
	</tr>
	</thead>
	<tbody>
@foreach($posts as $post)
	<tr>
		<td>{{ $post->id }}</td>
		<td><a href="{{ action('PostController@show', $post->id) }}">{{ $post->title }}</a></td>
		<td>{{ $post->status }}</td>
		<td>{{ $post->author->username }}</td>
	</tr>
@endforeach
	</tbody>
	</table>
@stop