<?

use LaravelBook\Ardent\Ardent;

class Post extends Ardent {

	protected $table = 'posts';
	protected $guarded = array('id', 'user_id', 'published_at', 'updated_at', 'created_at', 'deleted_at');
	protected $softDelete = true;
	public $timestamps = true;
	public static $statuses = array('draft' => 'draft', 'published' => 'published');
	public static $rules = array(
		'title' => 'required',
		'content' => 'required',
		'status' => 'required'
	);

	public function author() {
		return $this->belongsTo('User', 'user_id');
	}

}

