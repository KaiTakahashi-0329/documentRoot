<?php
namespace App\Library;

use Carbon\Carbon;

class IsAttendanceFuture
{
    // 退勤時間は出勤時間より未来か判定 未来であったらtrueを返す
    public static function isFuture($begin_time, $finish_time) {
        $carbon_begin_time = new Carbon($begin_time);
        $carbon_finish_time = new Carbon($finish_time);

        $isFuture = $carbon_finish_time->gt($carbon_begin_time);

        return $isFuture;
    }
}