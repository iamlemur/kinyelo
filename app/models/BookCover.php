<?

use LaravelBook\Ardent\Ardent;

class BookCover extends Ardent {

	protected $table = 'book_covers';
	protected $guarded = array('id', 'book_id', 'updated_at', 'created_at', 'deleted_at');
	public $timestamps = true;

	public function book() {
		return $this->belongsTo('Book', 'book_id');
	}

}

