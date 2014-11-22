<?

class TeaserEmail extends Eloquent {

	protected $table = 'email_addresses';
	protected $guarded = array('id');
	public $timestamps = true;
	public static $rules = array(
		'email_address' => 'required'
	);

}

