@extends('layouts.app')

@section('content')
<div class="container">
    <h1>一覧画面</h1>
    <div class="d-flex mt-5">
        <div>
            <form action="store/" method="POST">
            @csrf
                <input type="hidden" name="begin_time" value="begin_time">
                <button type="submit" class="btn btn-primary">出勤</button>
            </form>
        </div>
        <div class="ms-2">
            <form action="store/" method="POST">
            @csrf
                <input type="hidden" name="finish_time" value="finish_time">
                <button type="submit" class="btn btn-secondary">退勤</button>
            </form>
        </div>
    </div>

    <div class="mt-5">
        <p><a href="/admin/">一覧画面へ戻る</a></p>
    </div>
</div>
@endsection