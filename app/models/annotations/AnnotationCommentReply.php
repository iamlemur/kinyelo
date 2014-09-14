<?

class AnnotationCommentReply extends Eloquent {

	protected $table = 'annotations_comments_replies';
	protected $guarded = array('id', 'comment_id');
	public $timestamps = false;

	public function comment() {
		return $this->belongsTo('AnnotationComment', 'comment_id');
	}

}

