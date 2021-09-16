<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $guarded = ['id'];

    protected $appends = ['position'];

    public function getPositionAttribute()
    {

      return array(
          "lat" => (float) $this->attributes['latitude'],
          "lng" => (float) $this->attributes['longitude']
        );
    }
}
