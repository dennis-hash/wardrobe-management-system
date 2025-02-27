<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Clothing;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ClothingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clothings = Clothing::all();

        $domain = Setting::where('setting_key', 'domain')->value('value');

        return response([
            'message' => 'Retrieved successfully',
            'clothings' => $clothings->map(function($clothing) use ($domain){
                $clothing->image = $domain . '/' .'storage/images'. '/' . $clothing->image;
                return $clothing;
            }),
        ], 200);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required|string',
            'name' => 'required|string',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'color' => 'required|string',
            'size' => 'required|string',
            'categoryId' => 'required|string',
            'isFavorite' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'season' => 'required|string',
        ]);

        if($request->file('image') != null){
            $uuid = Str::uuid();

            $domain = Setting::where('setting_key', 'domain')->value('value');


            $uploadedImage = $request->file('image');

            $imageName = $uuid . '_' . $uploadedImage->getClientOriginalName();

            $uploadedImage->storeAs('images', $imageName, 'public');

            $clothing = Clothing::create([
                'userId' => $request->userId,
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'color' => $request->color,
                'isFavorite' => $request->isFavorite == 'true',
                'size' => $request->size,
                'categoryId' => $request->categoryId,
                'image' => $imageName,
                'season' => $request->season,
            ]);

            $clothing = Clothing::findOrfail($clothing->clothingId);
            $clothing->image = $domain . '/' .'storage/images'. '/' . $imageName;

            return response([
                'message' => 'Clothing added successfully',
                'clothing' => $clothing,
            ], 201);

        }else{
            $clothing = Clothing::create([
                'userId' => $request->userId,
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'color' => $request->color,
                'size' => $request->size,
                'isFavorite' => $request->isFavorite== 'true',
                'categoryId' => $request->categoryId,
                'image' => null,
                'season' => $request->season,
            ]);

            return response([
                'message' => 'Clothing added successfully',
                'clothing' => $clothing,
            ], 201);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //Display the specified clothing
        $clothing = Clothing::find($id);
        if (!$clothing) {
            return response([
                'message' => 'Clothing not found',
            ], 404);
        }

        return response([
            'message' => 'Clothing found',
            'clothing' => $clothing,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $clothing = Clothing::find($id);
        if (!$clothing) {
            return response([
                'message' => 'Clothing not found',
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'color' => 'required|string',
            'description' => 'nullable|string',
            'size' => 'required|string',
            'categoryId' => 'required|string',
            'isFavorite' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048|string',
            'season' => 'required|string',
        ]);

        //check if category exists
        $category = Category::find($request->categoryId);
        if (!$category) {
            return response([
                'message' => 'Category not found',
            ], 404);
        }

        $domain = Setting::where('setting_key', 'domain')->value('value');

        $uploadedImage = $request->file('image');

        //if image is null the type is string

        if($request->file('image') != null ){
            $uuid = Str::uuid();


            $imageName = $uuid . '_' . $uploadedImage->getClientOriginalName();

            $uploadedImage->storeAs('images', $imageName, 'public');

            $clothing->image = $imageName;

            $clothing = Clothing::where('clothingId', $id)->update([
                'name' => $request->name,
                'type' => $request->type,
                'color' => $request->color,
                'description' => $request->description,
                'size' => $request->size,
                'isFavorite' => $request->isFavorite== 'true',
                'categoryId' => $request->categoryId,
                'season' => $request->season,
                'image' => $imageName,
            ]);

            return response([
                'message' => 'Clothing updated successfully',
                'clothing' => $clothing,
            ], 200);
        }

        $clothing->name = $request->name;
        $clothing->type = $request->type;
        $clothing->color = $request->color;
        $clothing->description = $request->description;
        $clothing->size = $request->size;
        $clothing->categoryId = $request->categoryId;
        $clothing->isFavorite = $request->isFavorite== 'true';
        $clothing->season = $request->season;
        $clothing->save();


        $clothing = Clothing::findOrfail($clothing->clothingId);
        $clothing->image = $domain . '/' .'storage/images'. '/' .$clothing->imageName;

        return response([
            'message' => 'Clothing updated successfully',
            'clothing' => $clothing,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $clothing = Clothing::where('clothingId', $id)->first();

        if (!$clothing) {
            return response([
                'message' => 'Clothing not found',
            ], 404);
        }

        $imageFolderPath = Setting::where('setting_key', 'image_folder_path')->first();
        if (!$imageFolderPath) {
            return response([
                'message' => 'Image folder path not found in settings',
            ], 500);
        }

        $imagePath = $imageFolderPath->value . '/' . $clothing->image;

        if (file_exists($imagePath))
            unlink($imagePath);

        $clothing->delete();

        return response([
            'message' => 'Clothing deleted successfully',
        ], 200);

    }

    public function summary(){
        $clothings = Clothing::all();
        $clothingCount = $clothings->count();
        $favoriteCount = $clothings->where('isFavorite', true)->count();
        $categoryCount = Category::all()->count();

        return response([
            'message' => 'Summary retrieved successfully',
            'clothingCount' => $clothingCount,
            'favoriteCount' => $favoriteCount,
            'categoryCount' => $categoryCount,
        ], 200);
    }
}
