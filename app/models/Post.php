<?

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Post extends Eloquent {

	use SoftDeletingTrait;

	protected $table = 'posts';
	protected $guarded = array('id', 'user_id', 'published_at', 'updated_at', 'created_at', 'deleted_at');
	public $timestamps = true;
	public static $statuses = array('draft' => 'draft', 'published' => 'published');
	public static $rules = array(
		'title' => 'required',
		'content' => 'required',
		'status' => 'required'
	);
	protected $dates = ['deleted_at'];

	public function author() {
		return $this->belongsTo('User', 'user_id');
	}

}

