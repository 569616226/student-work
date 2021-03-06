<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //考核等级数据预制表
        Schema::create('assess', function (Blueprint $blueprint) {
            $blueprint->increments('id');
            $blueprint->string('title', 20)->comment('考核等级');
            $blueprint->integer('score')->comment('评分');
            $blueprint->string('type')->default('examine');// late
            $blueprint->timestamps();
            $blueprint->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assess');
    }
}
