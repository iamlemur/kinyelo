@section('content')

{{ Session::get('message') }}
<div id="opus">
<h1 itemprop="title" name="title" contenteditable="true">Type your title</h1>
</div>


@stop