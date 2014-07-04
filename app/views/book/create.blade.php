@section('content')

{{ Session::get('message') }}
<div class="post-form">
	<h1 itemprop="title" name="title" contenteditable="true" id="book-title" data-default-value="Type your title"></h1>
	<div id="book-summary" name="summary" contenteditable="true" data-default-value="Type your summary"></div>
</div>


@stop