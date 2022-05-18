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
		// make sure the request is over https
		if (!$this->request->isSecure()) {
			return json_encode([
				'status' => 'error',
				'message' => 'Please use https'
			]);
		} 


		// make sure the request is a post request 
		if ($_SERVER['REQUEST_METHOD'] != 'POST') {
			die('You must use a POST request');
		}
		
		$user = [
			// place the values of the user in an array
			// our login function will automatically check the array, sanitize the data, and check the credentials
			'email' => $this->request->getVar('email', FILTER_SANITIZE_EMAIL),
			'password' => $this->request->getVar('password', FILTER_DEFAULT),
			'honeypot' =>  $this->request->getVar('SID_TRACKER', FILTER_DEFAULT),
		];

		
		// we wil use rest calls in order to send the error message to the user
		return json_encode(Auth::login($user));
	}

	/**
	 *  
	 *  @function: register
	 * 
	 *  @purpose: in order to register the user inside of the system 
	 */

	public function register()
	{	
		// make sure the request is used over https
		if (!$this->request->isSecure()) {
			return json_encode([
				'status' => 'error',
				'message' => 'Please use https'
			]);
		}

		// make sure the request is a post request

		if ($_SERVER['REQUEST_METHOD'] != 'POST') {
			die('You must use a POST request');
		}


		$user = [
			// place the values of the user in an array
			// our login function will automatically check the array, sanitize the data, and check the credentials
			'email' => $this->request->getVar('email', FILTER_SANITIZE_EMAIL),
			'password' => $this->request->getVar('password', FILTER_DEFAULT),
			'confirm_password' => $this->request->getVar('passwordConfirm', FILTER_DEFAULT),
		];


		// we will use rest calls in order to check this.
		return json_encode(Auth::register($user));

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