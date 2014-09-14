<?

class AnnotationHighlight extends Eloquent {

	protected $table = 'highlights';
	protected $guarded = array('id', 'annotation_id');
	public $timestamps = false;

	public function annotation() {
		return $this->belongsTo('Annotation');
	}

}

