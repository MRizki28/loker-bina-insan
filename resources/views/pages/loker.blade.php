@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data Hero" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="true" headerAddButton="Tambah Data"
                modalId="#lokerModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Judul</th>
                        <th>Gambar Versi Desktop</th>
                        <th>Gambar Versi Mobile</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>
    </div>
    <x-loker.loker-modal></x-loker.loker-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/job.controller.js') }}?v={{ time() }}"></script>
@endsection
