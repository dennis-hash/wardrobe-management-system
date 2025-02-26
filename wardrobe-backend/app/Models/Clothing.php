<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clothing extends Model
{
    protected $table = 'clothing';
    protected $primaryKey = 'clothingId';
    protected $fillable = [
        'name',
        'description',
        'image',
        'type',
        'categoryId',
        'isFavorite',
        'purchase_date',
        'color',
        'size',
        'season',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'categoryId');
    }
}
