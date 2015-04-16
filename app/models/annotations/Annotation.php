<?

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Annotation extends Eloquent {

	use SoftDeletingTrait;

	protected $table = 'annotations';
	protected $guarded = array('id', 'user_id', 'post_id', 'state_updated_at', 'updated_at', 'created_at', 'deleted_at');
	public $timestamps = true;
	//protected $hidden = array('password');
	public static $statuses = array('private' => 'PRIVATE', 'public' => 'PUBLIC');

	protected $dates = ['deleted_at'];

	public function author() {
		return $this->belongsTo('User', 'user_id');
	}

	public function post() {
		return $this->belongsTo('Post', 'post_id');
	}

	public function highlight() {
		return $this->hasOne('AnnotationHighlight');
	}

	public function replies() {
		return $this->hasMany('AnnotationReply');
	}

}

