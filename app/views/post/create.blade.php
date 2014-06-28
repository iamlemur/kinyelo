@section('content')

{{ Session::get('message') }}
<div id="opus">
<h1 itemprop="title" name="title" contenteditable="true">Type your title</h1>
<h2 data-default-value="Type your subtitle" role="textbox" contenteditable="true">Type your subtitle</h2>
</div>


@stop