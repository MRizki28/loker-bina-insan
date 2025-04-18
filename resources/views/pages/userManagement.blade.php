@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data pengguna" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="true" headerAddButton="Tambah Data"
                modalId="#userManagementModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Nomor Handphone</th>
                        <th>Role</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>

    <x-usermanagement.usermanagement-modal></x-usermanagement.usermanagement-modal>
@endsection


@section('js-service')
    <script type="module" src="{{ asset('js/usermanagement.controller.js') }}?v={{ time() }}"></script>
@endsection

