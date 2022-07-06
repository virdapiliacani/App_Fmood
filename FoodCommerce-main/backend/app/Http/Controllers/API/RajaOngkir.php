<?php

namespace App\Http\Controllers\API; 
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class RajaOngkir{
    function getShipmentCost(Request $req){
        $response = Http::withHeaders([
            'key' => 'dba3123597917a7dc8fe77410aaa3ac1'
        ])->post('https://api.rajaongkir.com/starter/cost',
        ['origin' => $req->origin,'destination'=> $req->destination,
        'weight'=>$req->weight,'courier'=>$req->courier]);
        return $response["rajaongkir"]['results'][0]['costs'];
    }
}