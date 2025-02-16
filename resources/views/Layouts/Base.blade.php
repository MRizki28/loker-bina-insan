<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>BPR Palu Anugerah</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="key" content="{{ env('APP_KEY') }}">
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
        <meta name="google-site-verification" content="google-site-verification=fZLfwCvkglOU2lmzgAhHyxuMwA1YweeoXzJhp1_iClY" />

    <link rel="icon" type="image/png" href="{{ asset('favicon/favicon-96x96.png') }}" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon/favicon.svg') }}" />
    <link rel="shortcut icon" href="{{ asset('favicon/favicon.ico') }}" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-touch-icon.png') }}" />
    <link rel="manifest" href="{{ asset('favicon/site.webmanifest') }}" />
    <script src="https://cdn.ckeditor.com/ckeditor5/37.0.1/classic/ckeditor.js"></script>
    @include('Layouts.styles')
    <script>
        let appUrl = '{{ env('API_URL_BE') }}';
    </script>
</head>

<body>
    <div class="wrapper">
        <div class="main-header">
            <div class="logo-header" style="background-color: #00274D">
                <a href="#" class="logo" >
                    <img src="{{ asset('img/logobprwhite.png') }}" width="150" height="20" class="navbar-brand"
                        alt="logo"></img>
                </a>
                <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse"
                    data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="icon-menu"></i>
                    </span>
                </button>
                <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar">
                        <i class="icon-menu"></i>
                    </button>
                </div>
            </div>
            @include('Layouts.Navbar')
        </div>

        @include('Layouts.Sidebar')
        <div class="main-panel">
            <div class="content">
                @yield('content')

            </div>
            @include('Layouts.footer')
        </div>
    </div>
    @include('Layouts.scripts')
    @yield('js-service')
</body>

</html>