<?

class AnnotationReply extends Eloquent {

	protected $table = 'annotations_replies';
	protected $guarded = array('id', 'annotation_id', 'user_id');
	public $timestamps = false;

	public function annotation() {
		return $this->belongsTo('Annotation', 'annotation_id');
	}

	public function author() {
		return $this->belongsTo('User', 'user_id');
	}

}

