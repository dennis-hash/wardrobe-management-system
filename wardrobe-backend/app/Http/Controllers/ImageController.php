<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function show($filename)
    {
        $imageFolderPath = Setting::where('setting_key', 'image_folder_path')->first();
        if (!$imageFolderPath) {
            return response([
                'message' => 'Image folder path not found in settings',
            ], 500);
        }



        $path =  $imageFolderPath->value .'/' . $filename;

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }
}
