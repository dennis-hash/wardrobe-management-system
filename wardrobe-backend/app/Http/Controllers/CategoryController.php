<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return response([
            'categories' => $categories,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //new category
        $request->validate([
            'name' => 'required|string',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response([
            'category' => $category,
        ], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response([
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        return response([
            'message' => 'Category deleted',
        ], 200);
    }
}
