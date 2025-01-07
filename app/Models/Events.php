<?php

/**
 * App\Models\Events
 *
 * @category Laravel
 *
 * @author  Jonathan Reinink <jonathan@reinink.ca>
 * @license MIT License
 *
 * @link https://github.com/jonathanreinkink/laravel-mongodb
 */

namespace App\Models;

use Mongodb\Laravel\Eloquent\Model;

/**
 * Class Events
 *
 * @category Laravel
 *
 * @author  Jonathan Reinink <jonathan@reinink.ca>
 * @license MIT License
 *
 * @link https://github.com/jonathanreinkink/laravel-mongodb
 */
class Events extends Model
{
    protected $connection = 'mongodb';

    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'link', 'image'];
}
