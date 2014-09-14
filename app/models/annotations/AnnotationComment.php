<?

class AnnotationComment extends Eloquent {

	protected $table = 'annotations_comments';
	protected $guarded = array('id', 'annotation_id');
	public $timestamps = false;

	public function parent() {
		return $this->belongsTo('Annotation', 'annotation_id');
	}

	public function replies() {
		return $this->hasMany('AnnotationCommentReply', 'comment_id');
	}

}

