<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function show($filename)
    {


        $path =  Storage::disk('public')->path('images/'. $filename); // image is in publi cbut a folder called images: it will be Storage::disk('public')->path('images/' . $filename);
        return response()->file($path);
    }
}
