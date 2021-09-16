<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Support\Facades\Validator;
use App\Traits\ApiHandler;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ApiHandler;

		 public function validateRecord($data){
        return Validator::make(request()->all(), $data);
    }

    public function index()
    {
      return $this->model::all();
    }

    public function store(Request $request)
    {
      $data = $request->toArray();
      $record = $this->model::create($data);
      $record->save();

      return $this->successResponse($record, $this->modelName . ' Succesfully Created!', 201);

    }

    public function update (Request $request, $id)
    {
       $data = $request->toArray();
       $record = $this->model::update($data);
       $record->save();

       return $this->successResponse($record, $this->modelName . ' Succesfully Saved!', 201);

    }

		public function destroy($id)
		{
			$record = $this->model::find($id);
			$record->delete();

			return $this->successResponse($record, $this->modelName . ' Succesfully Deleted!', 201);
		}

}
