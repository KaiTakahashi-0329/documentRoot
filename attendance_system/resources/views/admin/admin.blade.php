@extends('layouts.app')

@section('content')

@if (session('status'))
    <div class="alert alert-success" role="alert">
        {{ session('status') }}
    </div>
@endif
@if (session('error'))
    <div class="alert alert-danger" role="alert">
        {{ session('error') }}
    </div>
@endif

<div class="container">
    <h1>一覧画面</h1>
    @if (isset($user))
        <p>こんにちは{{ $user->name }}さん</p>
    @endif
    <div class="mt-5">

        <ul class="list-group list-group-horizontal">
          <li class="list-group-item flex-fill w-20">日付</li>
          <li class="list-group-item flex-fill w-20">出勤時間</li>
          <li class="list-group-item flex-fill w-20">退勤時間</li>
          <li class="list-group-item flex-fill w-25">メモ</li>
          <li class="list-group-item flex-fill w-7_5">修正</li>
          <li class="list-group-item flex-fill w-7_5">削除</li>
        </ul>
        @if (isset($attendance))

            @foreach($attendance as $item)
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">{{ substr($item->begin_time, 0, 10) }}</li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">{{ substr($item->begin_time, 10) }}</li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-20">{{ substr($item->finish_time, 10) }}</li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-25">{{ $item->memo }}</li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-7_5">
                        <a href="/admin/edit/{{ $item->id }}"><button type="button" class="btn btn-secondary">修正</button></a>
                    </li>
                    <li class="list-group-item d-flex align-items-center flex-fill w-7_5">
                        <form action="/admin/delete/{{ $item->id }}" method="POST">
                        @csrf
                            <button type="submit" class="btn btn-danger" name="delete">削除</button>
                        </form>
                    </li>
                </ul>
            @endforeach

        @endif
    </div>

    <div class="mt-5">
        <p><a href="/admin/register/">出退勤画面へ</a></p>
        <p class="mt-2"><a href="/admin/add/">手入力勤怠追加画面へ</a></p>
    </div>
</div>
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
    form {
        margin: 0;
    }
</style>