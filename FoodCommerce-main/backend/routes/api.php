<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserAddressController;
use App\Http\Controllers\API\StoreProfileController;
use App\Http\Controllers\API\FmoodPayController;
use App\Http\Controllers\API\RajaOngkir;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductReviewController;
use App\Http\Controllers\API\UserProfileController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::get('get-products/visible',[ProductController::class,'getVisible']);
Route::get('get-new-products',[ProductController::class,'getNewProducts']);
Route::get('get-discount-products',[ProductController::class,'getDiscountProducts']);
Route::get('get-cheap-products',[ProductController::class,'getCheapProducts']);
Route::get('find-product-by-name',[ProductController::class,'findProductByName']);
Route::get('get-product-detail/{id}',[ProductController::class,'getProductDetail']);
Route::get('get-reviews/{product_id}',[ProductReviewController::class,'getReviews']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum','hasStore')->group(function(){
  
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/isLogin',function(){
        return response()->json(['status'=>200,'message'=>"You are Logged in"]);
    });
    Route::post('logout',[AuthController::class,'logout']);

    //get store products
    Route::get('get-products/all',[ProductController::class,'getAll']);

    // Categories, add to seperate auth group later !
    Route::get('category',[CategoryController::class,'getCategories']);
    Route::get('subcategory/{parent_id}',[CategoryController::class,'getSubCategories']);

    // Products add to seperate auth group later !
    Route::post('add-product',[ProductController::class,'add']);

     // Products add to seperate auth group later !
     Route::post('update-product/{productId}',[ProductController::class,'update']);

    //create store profile
    Route::post('create-store-profile',[StoreProfileController::class,'createStoreProfile']);

    // get store profile
    Route::get('get-store-profile',[StoreProfileController::class,'getStoreProfile']);

    //add to cart only for login user
    Route::post('add-cart',[CartController::class,'addCart']);

     //remove item from cart
     Route::delete('remove-cart-item/{product_id}',[CartController::class,'removeCartItem']);

    //get user address
    Route::get('get-user-address',[UserAddressController::class,'getUserAddress']);

    //get shipment cost
    Route::post('get-shipment-cost',[RajaOngkir::class,'getShipmentCost']);

    //get user fmoodPay balance
    Route::get('get-fmood-pay-balance',[FmoodPayController::class,'getBalance']);

    //create order
    Route::post('create-order',[OrderController::class,'createOrder']);

    //get orders
    Route::get('get-orders',[OrderController::class,'getOrders']);

    //create userAddress
    Route::post('create-user-address',[UserAddressController::class,'CreateUserAddress']);

    //get user cart
    Route::get('get-cart',[CartController::class,'getCart']);

    //get user adderss
    Route::get('get-user-address',[UserAddressController::class,'getUserAddress']);

    //get store orders
    Route::get('get-store-orders/{status}',[OrderController::class,'getStoreOrders']);

    //process order
    Route::get('process-order/{orderId}',[OrderController::class,'processOrder']);

    //send order
    Route::get('send-order/{orderId}/{shipmentCode}',[OrderController::class,'sendOrder']);

    //order delivered
    Route::get('delivered-order/{orderId}',[OrderController::class,'deliveredOrder']);

    //cancel delivered
    Route::put('cancel-order/{orderId}',[OrderController::class,'cancelOrder']);

    //review product
    Route::post('add-review',[ProductReviewController::class,'addReview']);

    //get user profile

    Route::get('get-user-profile',[UserProfileController::class,'getProfile']);

    //update user picture;
    Route::patch('update-user-picture',[UserProfileController::class,'updatePicture']);

    //update 
    Route::patch('update-user-name',[UserProfileController::class,'updateName']);

    //update 
    Route::patch('update-user-gender',[UserProfileController::class,'updateGender']);

    //update 
    Route::patch('update-user-email',[UserProfileController::class,'updateEmail']);

    //update 
    Route::patch('update-user-phoneNumber',[UserProfileController::class,'updatePhoneNumber']);

    //update 
    Route::patch('update-user-dob',[UserProfileController::class,'updateDOB']);

    //cont order
    Route::get('count-orders',[OrderController::class,'countOrders']);

    //cont total customers
    Route::get('count-total-customers',[OrderController::class,'countTotalCustomers']);

    //counst store rating
    Route::get('count-store-rating',[OrderController::class,'countStoreRating']);

    //counst store income
    Route::get('count-store-income',[OrderController::class,'countStoreIncome']);

    //get store a product to update
    Route::get('get-store-product/{id}',[ProductController::class,'getStoreProduct']);

    //upload product media (image/video)
    Route::post('upload-product-media',[ProductController::class,'uploadProductMedia']);

    //remove product image
    Route::post('remove-product-media',[ProductController::class,'removeProductMedia']);
});


