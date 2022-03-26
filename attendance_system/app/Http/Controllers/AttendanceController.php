<?php

namespace App\Http\Controllers;

use App\Http\Requests\InputFormRequest;
use App\Models\Attendance;
use App\Library\IsAttendanceFuture;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // 現在ログイン中のユーザー情報を取得
        $user = Auth::user();

        try {
            $attendance = Attendance::where('user_id', $user->id)->orderBy('id', 'desc')->get();
            return view('admin.admin', compact('user', 'attendance'));

        } catch (\Throwable $th) {
            return view('admin.admin');
        }
    }

    public function add()
    {
        return view('admin.add');
    }

    public function insert(InputFormRequest $request)
    {
        // 現在ログイン中のユーザー情報を取得
        $user = Auth::user();

        // DBに登録する書式を整える
        $begin_time = $request->begin_date . ' ' . $request->begin_time;
        $finish_time = $request->begin_date . ' ' .$request->finish_time;
        $memo = $request->memo;

        $isFuture = IsAttendanceFuture::isFuture($begin_time, $finish_time);
        if (!$isFuture) return redirect()->back()->withInput()->with('error', '退勤時間は出勤時間より過去には設定できません');

        try {
            DB::transaction(function () use($user, $begin_time, $finish_time, $memo) {
                // DBに新規追加
                $attendance = new Attendance();
                $attendance->user_id = $user->id;
                $attendance->begin_time = $begin_time;
                $attendance->finish_time = $finish_time;
                $attendance->memo = $memo;
        
                $attendance->save();
            });
    
            return redirect('admin')->with('status', '新規作成に成功しました。');
            
        } catch (\Throwable $th) {
            return redirect('admin')->with('error', '新規作成に失敗しました。');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register()
    {
        return view('admin.register');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 現在ログイン中のユーザーIDを取得
        $user_id = Auth::id();
        
        // 初期化
        $attendance = new Attendance();
        $date = new Carbon();
        $status = '';
        
        try {

            // 最新の勤怠履歴を取得
            $recent_attendance_history = Attendance::where('user_id', $user_id)->latest('id')->first();
            
            // ユーザー初回の出勤登録の処理
            if(!isset($recent_attendance_history)) {
                // 出勤ボタンを押されたとき
                if(isset($request->begin_time)) {
                    
                    return DB::transaction(function() use($attendance, $user_id, $date) {
                        $status = '出勤しました。';
                        $attendance->begin_time = $date;
                        $attendance->user_id = $user_id;
                        $attendance->save();

                        return redirect('admin')->with('status', $status);
                    });
                }
    
                // 退勤ボタンを押されたとき
                if(isset($request->finish_time)) {
                    $error = '出勤登録に失敗しました。管理者にお問合せください。';
                    return redirect('admin')->with(compact('error'));
                }

            }
            
            $recent_begin_time = new Carbon($recent_attendance_history->begin_time);
            $recent_finish_time = $recent_attendance_history->finish_time;
    
            // 出勤ボタンを押されたとき
            if(isset($request->begin_time)) {
                $request_flag = 'begin_time';
    
                // 24hいないに出勤していないか確認 かつ 直近の出勤が退勤されているか確認
                $diffInHours = $recent_begin_time->diffInHours($date);
                if(isset($recent_finish_time) || $diffInHours >= 24) {
                    $status = '出勤しました。';
                    
                    DB::transaction(function() use($attendance, $user_id, $date) {
                        $attendance->begin_time = $date;
                        $attendance->user_id = $user_id;
                        $attendance->save();
                    });

                } else {
                    $error = '出勤登録に失敗しました。管理者にお問合せください。';
                    return redirect('admin')->with(compact('error'));
                }
            }
            
            // 退勤ボタンを押されたとき
            if(isset($request->finish_time)) {
                $request_flag = 'finish_time';
    
                // 直近のレコードで出勤されているか確認 かつ 退勤されてなければ退勤処理を受け付ける。
                if(isset($recent_attendance_history->begin_time) && !isset($recent_finish_time)) {    
                    $status = '退勤しました。';

                    DB::transaction(function() use($user_id, $date) {
                        Attendance::where('user_id', $user_id)->latest('id')->update(['finish_time' => $date]);
                    });

                } else {
                    $error = '退勤登録に失敗しました。管理者にお問合せください。';
                    return redirect('admin')->with(compact('error'));
                }
            }

            return redirect('admin')->with('status', $status);

        } catch (\Exception $th) {
            return redirect('admin')->with('error', '問題が発生しました。再度時間を置いてからお試しください。');
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $attendance = Attendance::find($id);

        return view('admin.edit', compact('attendance'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InputFormRequest $request, $id)
    {

        // DBに登録する書式を整える
        $begin_time = $request->begin_date . ' ' . $request->begin_time;
        $finish_time = $request->begin_date . ' ' .$request->finish_time;
        $memo = $request->memo;

        $isFuture = IsAttendanceFuture::isFuture($begin_time, $finish_time);
        if (!$isFuture) return redirect()->back()->withInput()->with('error', '退勤時間は出勤時間より過去には設定できません');

        try {
            DB::transaction(function() use($begin_time, $finish_time, $memo, $id) {
                // DB Update
                Attendance::where('id', $id)->update([
                    'begin_time' => $begin_time,
                    'finish_time' => $finish_time,
                    'memo' => $memo,
                ]);
            });
    
            return redirect('admin')->with('status', '変更に成功しました。');
            
        } catch (\Throwable $th) {
            return redirect('admin')->with('error', '変更に失敗しました。');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            DB::transaction(function() use($id) {
                Attendance::find($id)->delete();     
            });

            return redirect('admin')->with('status', '削除に成功しました。');

        } catch (\Throwable $th) {
            return redirect('admin')->with('error', '削除に失敗しました。');
        }

    }
}
