<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;
class CartController extends Controller
{
    public function addCart(Request $req){
        $validator = Validator::make($req->all(),[
            'productId'=>'required',
            'quantity'=>'required|min:1',
            'note'=>'max:254',
        ]);
        if($validator->fails()){
            return response()->json(['status'=>422,'errors'=>$validator->messages()]);
        }else{
            $cart = new Cart;
            $cart->user_id = $req->user()->id;
            $cart->product_id = $req->input('productId');
            $cart->quantity = $req->input('quantity');
            $cart->sell_price = $req->input('sellPrice');
            $cart->note = $req->input('note');
            
            $existCard = Cart::where('user_id',
            $req->input('userId'))->where('product_id',$req->input('productId'))->first();
            if($existCard){
                $isUpdate = $this->updateCart($existCard->id,$req->input('quantity'),$req->input('note'));
                if($isUpdate){
                    return response()->json(['status'=>200,'message'=>"Cart Added Successfully"]);
                }
                else{
                    return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
                }
            }
            else if($cart->save()){
                return response()->json(['status'=>200,'message'=>"Cart Added Successfully"]);
            }
            else{
                return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
            }
        }

    }

    public function updateCart($cart_id,$quantity,$note){
        $cart = Cart::find($cart_id);
        $cart->quantity = $cart->quantity + $quantity;
        $cart->note = $note;
        return($cart->save());
    }

    public function getCart(Request $req){
        $user_id = $req->user()->id;
        $cart = Cart::leftjoin('products','carts.product_id','=','products.id')
        ->leftJoin('store_profiles','products.user_id','=','store_profiles.user_id')
        ->where('carts.user_id',$user_id)
        ->select('products.id as product_id','products.name as product_name','carts.sell_price as sell_price'
        ,'products.stock as stock','products.weight as product_weight','carts.quantity as quantity','note','img_main',
                'store_profiles.user_id as store_id','store_profiles.name as store_name',
                'store_profiles.city as store_city','store_profiles.city_id as store_city_id')->get();
        $groupByStoreId = $this->group_by("store_id",$cart->toArray());
        return response()->json(['status'=>200,'carts'=>$groupByStoreId]);
    }

    function group_by($key, $data) {
        $result = array();
        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $result[$val[$key]][] = $val;
            }else{
                $result[""][] = $val;
            }
        }
    
        return $result;
    }

    function removeCartItem(Request $req){
        $item = Cart::where('user_id',$req->user()->id)->where('product_id',$req->product_id)->delete();
        return $item;
    }
}
