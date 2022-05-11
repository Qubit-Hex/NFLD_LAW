<?php

namespace App\Models;

use CodeIgniter\Model;

class Users extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'users';
	protected $primaryKey           = 'userID';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDeletes       = false;
	protected $protectFields        = true;
	protected $allowedFields        = ['userEmail', 'userPassword', 'userLastLogin', 'userLoginAttempts',
	'userAccessToken', 'userSessionID', 'userSalt', 'userLoginActive'];

	// Dates
	protected $useTimestamps        = false;
	protected $dateFormat           = 'datetime';
	protected $createdField         = 'created_at';
	protected $updatedField         = 'updated_at';
	protected $deletedField         = 'deleted_at';

	// Validation
	protected $validationRules      = [
		'userEmail' => 'required|valid_email|is_unique[users.userEmail]',
		'userPassword' => 'required|min_length[8]',
		'userSalt' => 'required'
	];
	protected $validationMessages   = [];
	protected $skipValidation       = false;
	protected $cleanValidationRules = true;

	// Callbacks
	protected $allowCallbacks       = true;
	protected $beforeInsert         = [];
	protected $afterInsert          = [];
	protected $beforeUpdate         = [];
	protected $afterUpdate          = [];
	protected $beforeFind           = [];
	protected $afterFind            = [];
	protected $beforeDelete         = [];
	protected $afterDelete          = [];


	// lookup username in data to see if the user exists or not
	public function lookupUser($username)
	{
		return $this->where(['userEmail' => $username])->first();
	}

	// changes the key value of the user inorder to login to the session
	public function issueHandshake($id, $data)
	{
		return $this->update($id, $data);
	}

	public function updateUserData($id, $data)
	{
		return $this->update($id, $data);
	}

	public function lookupBySessionID($sessionID)
	{
		return $this->where(['userAccessToken' => $sessionID])->first();
	}

	// change the logout values of the particular user 
	public function logout() {

	}

	// register a user into the database 
	public function registerUser($data)
	{
		return $this->insert($data);

	}

	// remove the user for users to delete their account 
	public function removeUser($id)
	{	
		return $this->delete();
	}

}
