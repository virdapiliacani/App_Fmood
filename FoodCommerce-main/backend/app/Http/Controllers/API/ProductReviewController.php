<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\UserProfileController;
use Illuminate\Http\Request;
use App\Models\ProductReview;
class ProductReviewController extends Controller
{
    public function addReview(Request $req){
        $productReview = new ProductReview;
        $productReview->product_id = $req->productId;
        $productReview->user_id = $req->user()->id;
        $productReview->order_id = $req->orderId;
        $productReview->rating = $req->rating;
        $productReview->review = $req->review;
        
        if($productReview->save() && OrderController::reviewedOrder($req->orderId)){
            return response()->json(["status"=>200,"message"=>"success"]);
        }
        else{
            return response()->json(["status"=>500,"message"=>"failed"]);
        }
    }
    public function getReviews($product_id){
        $productReview = new ProductReview;
        $results = $productReview::leftjoin('users','users.id','=','product_reviews.user_id')
        ->leftjoin('user_profiles','users.id','user_profiles.user_id')
        ->where('product_id',$product_id)->orderByDesc('product_reviews.id')
        ->select('name','review','rating','profile_picture','product_reviews.updated_at')->paginate(15);
        $pagination=[];
        data_fill($pagination,'current_page',$results->currentPage());
        data_fill($pagination,'last_page',$results->lastPage());
        data_fill($pagination,'total',$results->total());
        if(sizeof($results) !=0){
            return response()->json(["status"=>200,"data"=>$results->items(),"pagination"=>$pagination]);
        }else{
            return response()->json(["status"=>204,"message"=>'No Content']);
        }
    }
}
