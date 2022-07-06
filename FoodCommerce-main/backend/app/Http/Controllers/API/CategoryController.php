<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Arr;

class CategoryController extends Controller
{
    public function getCategories(){
        $categories = Category::all();
        $categories_w_sub =[];
        foreach($categories as $category){
            $cat_name = $category->name;
            $cat_data = [
            "id"=> $category->id,
            "name"=>$category->name,
            "description"=>$category->description,
            "children"=> self::getSubCategories($category->id)];
             data_fill($categories_w_sub,$category->id, $cat_data);
        }

        return $categories_w_sub;
    }
    public function getSubCategories($parent_id){
        return SubCategory::where('parent_id',$parent_id)->get();
    }
}
