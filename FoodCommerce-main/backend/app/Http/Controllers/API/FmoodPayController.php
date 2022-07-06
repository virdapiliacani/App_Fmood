<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FmoodPay;

class FmoodPayController extends Controller
{
    function getBalance(Request $req){
        $userId =  $req->user()->id;
        return FmoodPay::where("user_id",$userId)->first()["balance"];
    }
    public static function createFmoodPay($id){
        $fmood_pay = new FmoodPay;
        $fmood_pay->user_id = $id;
        $fmood_pay->balance = 3450000;
        return $fmood_pay->save();
    } 
}
