<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

class UserAddressController extends Controller
{
    function getUserAddress(Request $req){
    $userId =  $req->user()->id;
    return UserAddress::where("user_id",$userId)->get();
    
    }
    function createUserAddress(Request $req){
        $address = new UserAddress;
        $address->user_id = $req->user()->id;
        $address->province = $req->provinceName;
        $address->province_id = $req->provinceId;
        $address->city = $req->cityName;
        $address->city_id = $req->cityId;
        $address->zip_code = $req->zipCode;
        $address->address = $req->address;
        $address->active = $req->active;
        $address->receiver = $req->receiver;
        $address->phone_number = $req->phoneNumber;
        $address->lable = $req->lable;

        if($address->save()){
            return response()->json(['status'=>200,'message'=>"address added successfully"]);
        }
        else{
            return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
        }
    }
}
