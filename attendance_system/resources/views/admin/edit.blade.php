@extends('layouts.app')

@section('css')
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<!-- timepicker -->
<link rel="stylesheet" href="https://cdn.rawgit.com/jonthornton/jquery-timepicker/3e0b283a/jquery.timepicker.min.css">
@endsection

@section('content')
<div class="container">
    <h1>編集画面</h1>
    <div class="mt-5">
        @if (isset($attendance))
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item flex-fill w-20">日付</li>
                <li class="list-group-item flex-fill w-20">出勤時間</li>
                <li class="list-group-item flex-fill w-20">退勤時間</li>
                <li class="list-group-item flex-fill w-25">メモ</li>
                <li class="list-group-item flex-fill w-7_5">修正</li>
                <li class="list-group-item flex-fill w-7_5">削除</li>
            </ul>
            <form action="/admin/update/{{ $attendance->id }}" method="POST">
            @csrf
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">
                        <div>
                            <input type="text" name="begin_date" value="{{ old('begin_date') ? old('begin_date') : substr($attendance->created_at, 0, 10) }}" id="js-datepicker">
                            @error('begin_date')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">
                        <div>
                            <input type="text" name="begin_time" value="{{ old('begin_time') ? old('begin_time') : substr($attendance->begin_time, 10) }}" class="js-timepicker">
                            @error('begin_time')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">
                        <div>
                            <input type="text" name="finish_time" value="{{ old('finish_time') ? old('finish_time') : substr($attendance->finish_time, 10) }}" class="js-timepicker">
                            @error('finish_time')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                            @if (session('error'))
                                <div class="text-danger" role="alert">
                                    {{ session('error') }}
                                </div>
                            @endif
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-25">
                        <div>
                            <input type="text" name="memo" value="{{ old('memo') ? old('memo') : $attendance->memo }}" class="w-100">
                            @error('memo')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-7_5">
                        <button type="submit" class="btn btn-secondary" name="edit">修正</button>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-7_5">
                        <button type="submit" class="btn btn-danger js-submit" name="delete" data-action="/admin/delete/{{ $attendance->id }}">削除</button>
                    </li>
                </ul>
            </form>
        @else
            <div class="mt-3 alert alert-danger" role="alert">
                該当の情報はありませんでした。
            </div>
        @endif
    </div>

    <div class="mt-5">
        <p><a href="/admin/">一覧画面へ戻る</a></p>
    </div>
</div>
@endsection

@section('script')
<!-- datapicker -->
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>

<!-- timepicker -->
<script src="https://cdn.rawgit.com/jonthornton/jquery-timepicker/3e0b283a/jquery.timepicker.min.js"></script>


<script>
    $(function() {
        $( "#js-datepicker" ).datepicker({
            dateFormat: "yy-mm-dd"
        });

        $('.js-timepicker').timepicker({
            'timeFormat': 'H:i:s',
            'step': 15
        });
        $('.js-submit').click(function() {    
            $(this).parents('form').attr('action', $(this).data('action'));
            $(this).parents('form').submit();
        });
    });
</script>
@endsection

<style>
    .w-7_5 {
        width: 7.5%;
    }
    .w-10 {
        width: 10%;
    }
    .w-15 {
        width: 15%;
    }
    .w-20 {
        width: 20%;
    }
    .w-25 {
        width: 25%;
    }
    .w-100 {
        width: 100%;
    }
</style>