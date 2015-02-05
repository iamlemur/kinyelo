<?

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Character extends Eloquent {

	use SoftDeletingTrait;

	protected $table = 'characters';
	protected $guarded = array('id', 'post_id', 'updated_at', 'created_at', 'deleted_at');
	public $timestamps = true;
	public static $rules = array(
		'name' => 'required',
		'description' => 'required'
	);

	public function post() {
		return $this->belongsTo('Post');
	}

	public function author() {
		return $this->post()->author;
	}

}

