<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StoreProfile;

class StoreProfileController extends Controller
{
    public static function getStoreById($id){
        $storeProfile = StoreProfile::where("user_id",$id)->first();
        return $storeProfile;
    }
    public function getStoreProfile(Request $req){
        $user_id = $req->user()->id;
        $storeProfile = StoreProfile::where("user_id",$user_id)->first();
        return $storeProfile;
    }
    public function createStoreProfile(Request $req){
        $user_id = $req->user()->id;
        $storeProfile = new StoreProfile;
        $storeProfile->user_id = $user_id;
        $storeProfile->province = $req->provinceName;
        $storeProfile->province_id = $req->provinceId;
        $storeProfile->city = $req->cityName;
        $storeProfile->city_id = $req->cityId;
        $storeProfile->zip_code = $req->zipCode;
        $storeProfile->address = $req->address;
        $storeProfile->name = $req->name;
        $storeProfile->phone_number = $req->phoneNumber;
        $storeProfile->description = $req->description;
        $storeProfile->img_store = "store-default.png";

        if($storeProfile->save()){
            return response()->json(['status'=>200,'message'=>"store added successfully"]);
        }
        else{
            return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
        }
    }
}
