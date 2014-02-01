<?

use LaravelBook\Ardent\Ardent;

class Book extends Ardent {

	protected $table = 'books';
	protected $guarded = array('id', 'user_id', 'published_at', 'updated_at', 'created_at', 'deleted_at');
	protected $softDelete = true;
	public $timestamps = true;
	public static $statuses = array('draft' => 'draft', 'published' => 'published');
	public static $rules = array(
		'title' => 'required',
		'summary' => 'required',
		'status' => 'required'
	);

	public function author() {
		return $this->belongsTo('User', 'user_id');
	}

	public function cover() {
		return $this->hasOne('BookCover');
	}

}

