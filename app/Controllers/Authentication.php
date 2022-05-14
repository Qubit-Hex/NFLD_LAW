<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Services\Auth\Auth;

class Authentication extends BaseController
{


	public function __construct()
	{
		// anything we want to preload here

		// check if the session are set
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
		}

	}

	/**
	 * 
	 *  @function: login	
	 * 
	 * 	@purpose:  inorder to login the user 
	 * 
	 */

	public function login()
	{
		$user = [
			// place the values of the user in an array
			// our login function will automatically check the array, sanitize the data, and check the credentials
			'email' => $_POST['email'],
			'password' => $_POST['password'],
			'honeypot' => $_POST['SID_TRACKER']
		];


		$loginStatus = Auth::login($user);

		// process the login form
		if ($loginStatus['status'] === true) {
			return redirect()->to('/dashboard');
		}

		$data = $loginStatus;

		return view('/home/template/header') . view('/home/login', $loginStatus) . view('/home/template/footer');
	}

	/**
	 *  
	 *  @function: register
	 * 
	 *  @purpose: in order to register the user inside of the system 
	 */

	public function register()
	{
		$user = [
			// place the values of the user in an array
			// our login function will automatically check the array, sanitize the data, and check the credentials
			'email' => $_POST['email'],
			'password' => $_POST['password'],
			'confirm_password' => $_POST['passwordConfirm'],

		];

		$loginStatus = Auth::register($user);

		if (($loginStatus['status'] === true)) {
			// redirect the user to the login page
			return redirect()->to('/home/login');
		}
		// deny the request and run the cleanu]
		// return error message to the view 
		return view('/home/template/header') . view('/home/register', $loginStatus) . view('/home/template/footer');

	}
	
	/**
	 * 
	 *   @function: logout
	 *  
	 *   @purpose: in order to logout the user from the system
	 * 
	 */

	public function logout()
	{
		// logout the user and clear the sessions and cookies.
		if (Auth::logout()) {
			return redirect()->to('/home/login');
			exit;
		}
	}
}