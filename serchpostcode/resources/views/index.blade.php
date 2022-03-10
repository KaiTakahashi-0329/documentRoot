<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>郵便番号検索ツール</title>

    <meta name="keywords" content="郵便番号, 郵便番号検索, 検索, postcode">
    <meta name="description" content="郵便番号を検索するためのツールになります。">
    <link rel="canonical" href="正規のURLを検索エンジンにしめす。">
    <meta property="og:site_name" content="郵便番号検索ツール">
    <meta property="og:title" content="郵便番号検索ツール">
    <meta property="og:description" content="郵便番号を検索するためのツールになります。">
    <meta property="og:type" content="website">
    <meta property="og:url" content="サイトのURL貼る">
    <meta property="og:image" content="ogpのURL貼る">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="サイトのURL貼る">
    <meta name="twitter:image" content="ogpのURL貼る">

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="App"></div>
</body>
</html>