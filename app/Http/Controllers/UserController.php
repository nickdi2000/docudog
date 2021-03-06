<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Facades\App\Repository\Users;

use App\User;

class UserController extends Controller
{

    public function index()
    {
    		$users = Users::all();
        return response()->json($users);
    }

		  public function list()
	    {
	    		$users = Users::all('name');

					foreach($users as $c){
						echo $c->name . "<br>";
					}
	    }

			public function show($id)
			{
				$user = User::find($id);
				return response()->json($user);
			}

			public function myCourse()
			{
					$user_id = auth()->user()->id;
					$course = User::with('course')->get()->pluck('course');
					return response()->json($course[0]);
			}


			public function myUser()
			{
					$user = User::find(1);
					return response()->json($user);
			}
}
