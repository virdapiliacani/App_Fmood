<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserProfile;
class UserProfileController extends Controller
{

    function getProfile(Request $req){
        $userProfile = User::leftjoin('user_profiles','users.id','user_profiles.user_id')->where('id',$req->user()->id)->get();
        if($userProfile) return $userProfile;
        else return response()->json(["status"=>500,"message"=>"internal serve error"]);
    }

    public static function getUserPicture($id){
        return UserProfile::where("user_id",$id)->select("profile_picture");
    }
    

    public static function setInitilaProfilePicture($user_id){
        UserProfile::updateOrCreate(
            ['user_id' => $user_id],
            ['profile_picture'=>'profile-pictures/0/user-default.png']
        );
        return "profile-pictures/0/user-default.png";
    }

    function updatePicture(Request $req){
        $file = $req->file('userPicture');
        $saved_path = $file->store('profile-pictures/'.($req->user()->id));
        $userProfile = new UserProfile;
        $result = $userProfile::updateOrCreate(
            ['user_id' => $req->user()->id],
            ['profile_picture'=>$saved_path]
        );
        if($result){
            return response()->json(["status"=>200,"profile_picture"=>$saved_path]);
        }
        else{
            return response()->json(["status"=>500]);
        }
    }

    function updateName(Request $req){
        $user = User::find($req->user()->id);
        $user->name = $req->name;
        $result = $user->save();
        return $result;
    }
    function updateGender(Request $req){
        $userProfile = UserProfile::find($req->user()->id);
        $userProfile->gender = $req->gender;
        $result = $userProfile->save();
        return $result;
    }
    function updateDOB(Request $req){
        $userProfile = UserProfile::find($req->user()->id);
        $userProfile->dob = $req->dob;
        $result = $userProfile->save();
        return $result;
    }
    function updateEmail(Request $req){
        $user= User::find($req->user()->id);
        $user->email = $req->email;
        $result = $user->save();
        return $result;
    }
    function updatePhoneNumber(Request $req){
        $userProfile = UserProfile::find($req->user()->id);
        $userProfile->phone_number = $req->phoneNumber;
        $result = $userProfile->save();
        return $result;
    }
}
