<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\FmoodPayController;
use App\Http\Controllers\API\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $req){
        $validator = Validator::make($req->all(),[
            'name' => ['required', 'string', 'max:20','min:5'],
            'email' => ['required', 'string', 'email', 'max:191', 'unique:users'],
            'password' => ['required','string', 'min:8'],
            'repassword' =>['required_with:password','same:password'],
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else{
            $user = User::create([
                'name'=>$req->name,
                'email'=>$req->email,
                'password'=>Hash::make($req->password)
            ]);
            $token = $user->createToken($user->email, ['server:update'])->plainTextToken;
            $fmoodpay = FmoodPayController::createFmoodPay($user->id);
            $userProfilePicture = UserProfileController::setInitilaProfilePicture($user->id);
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=> $token,
                'user_picture'=>$userProfilePicture,
                'message'=>'Registered Successfully',
                'fmoodpay'=>$fmoodpay,
            ]);
        }
    }

    public function login(Request $req){
        $validator = Validator::make($req->all(),[
            'email'=>'required | max:191',
            'password'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else{
            $user = User::join('user_profiles','users.id','user_profiles.user_id')->where('email',$req->email)->first();
            if (! $user || ! Hash::check($req->password, $user->password)) {
               return response()->json([
                'status'=>401,   
                'message'=>"Invalid email or password"
               ]);
            }
            else{
                $token = $user->createToken($user->email, ['server:update'])->plainTextToken;
                return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=> $token,
                'profile_picture'=>$user->profile_picture,
                'id'=> $user->id,
                'message'=>'Login Successfully'
            ]);
            }
        }
    }

    public function logout(){
    auth()->user()->tokens()->delete();
    return response()->json([
        'status'=>200,
        'message'=>'Logged out successfully'
    ]);
    }
}
