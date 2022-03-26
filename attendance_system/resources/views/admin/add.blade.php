@extends('layouts.app')

@section('css')
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<!-- timepicker -->
<link rel="stylesheet" href="https://cdn.rawgit.com/jonthornton/jquery-timepicker/3e0b283a/jquery.timepicker.min.css">
@endsection

@section('content')
<div class="container">
    <h1>手入力追加画面</h1>
    <div class="mt-5">
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item flex-fill w-20">日付</li>
            <li class="list-group-item flex-fill w-20">出勤時間</li>
            <li class="list-group-item flex-fill w-20">退勤時間</li>
            <li class="list-group-item flex-fill w-25">メモ</li>
            <li class="list-group-item flex-fill w-15">追加</li>
        </ul>
        <form action="/admin/insert/" method="POST">
        @csrf
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item d-flex align-items-center flex-fill w-20">
                    <div>
                        <input type="text" name="begin_date" id="js-datepicker" value="{{ old('begin_date') }}">
                        @error('begin_date')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </li>
                <li class="list-group-item d-flex align-items-center flex-fill w-20">
                    <div>
                        <input type="text" name="begin_time" class="js-timepicker" value="{{ old('begin_time') }}">
                        @error('begin_time')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </li>
                <li class="list-group-item d-flex align-items-center flex-fill w-20">
                    <div>
                        <input type="text" name="finish_time" class="js-timepicker" value="{{ old('finish_time') }}">
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
                        <input type="text" name="memo" class="w-100" value="{{ old('memo') }}">
                        @error('memo')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </li>
                <li class="list-group-item d-flex align-items-center flex-fill w-15">
                    <button type="submit" class="btn btn-secondary" name="add">追加</button>
                </li>
            </ul>
        </form>
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