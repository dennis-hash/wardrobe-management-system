<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'categories';
    protected $primaryKey = 'categoryId';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
       'name',
    ];

    public function products()
    {
        return $this->hasMany(Clothing::class, 'categoryId', 'categoryId');
    }
}
