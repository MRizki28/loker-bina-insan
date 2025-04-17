@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data archive" headerIcon="fas fa-file"></x-base-header>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="m-0 p-0">
                        <div class="p-3">
                            <div class="d-flex align-items-center flex-row justify-content-between mb-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <i class="icon-user fa-xl mr-2"></i>
                                    <h2>Daftar Pengguna</h2>
                                </div>
                                <div class="input-icon col-md-4">
                                    <input type="text" class="form-control" placeholder="Cari..." id="form-search-pengguna">
                                    <span class="input-icon-addon p-3 text-center" id="search-pengguna">
                                        <i class="fa fa-search " style="cursor: pointer;"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="row" id="data-pengguna">
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center px-4">
                            <span class="mb-3 text-muted">
                                Total <span id="data-total"></span> data
                            </span>
                            <ul class="pagination pg-info"></ul>
                        </div>
                    </div>
                </div>
                <div class="card" style="background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1))">
                    <div class="m-0 p-0">
                        <div class="p-3">
                            <div class="d-flex align-items-center flex-row justify-content-center mb-3">
                                <div class="d-flex ">
                                    <!-- Profile image -->
                                    <img src={{ asset('static/img/profile.png') }} alt="Profile"
                                        class="rounded-circle mr-3" style="width: 50px; height: 50px; object-fit: cover;">

                                    <!-- Icon and name -->
                                    <div class="d-flex align-items-center">
                                        <h2 class="mb-0" id="name-pengguna"></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="m-0 p-0">
                        <div class="p-3">
                            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                                modalUpdateStatus="#updateStatusModal" buttonAdd="false" headerAddButton="Tambah Data"
                                modalId="#lokerModal"></x-base-sorting>
                            <x-base-table initId="table">
                                <x-slot name="thead">
                                    <tr class="text-center">
                                        <th>Lowongan</th>
                                        <th>Waktu lowongan</th>
                                        <th>Type</th>
                                        <th>Status review berkas</th>
                                        <th>Status wawancara</th>
                                    </tr>
                                </x-slot>
                            </x-base-table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/archive.controller.js') }}?v={{ time() }}"></script>
@endsection
