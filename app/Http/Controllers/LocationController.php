<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
  protected $section = 'Location';

  protected $model = Location::class;
  protected $modelName = "Location";


  public function store(Request $request)
  {
    $data = $request->toArray();

    $location = $data['address'];

    $location['name'] = $data['details']['name'];
    $location['comments'] = $data['details']['comments'];
    $location['longitude'] = $data['marker']['lng'];
    $location['latitude'] = $data['marker']['lat'];

    $record = $this->model::create($location);
    $record->save();

    return $this->successResponse($record, $this->modelName . ' Succesfully Created!', 201);

  }

}
