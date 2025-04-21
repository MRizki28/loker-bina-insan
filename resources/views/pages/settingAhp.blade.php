@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data bobot kriteria" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="false" headerAddButton="Tambah Data"
                modalId="#bobotKriteriaModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Nama kriteria</th>
                        <th>Bobot prioriti kriteria</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
        <x-base-header headerName="Data bobot alternatif" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <div class="p-3">
                <div class="d-flex justify-content-between align-items-center mb-md-0 row">
                    <div class="col-md-7 row mb-2 ">
                        {{-- Form Search --}}
                        <div class="input-icon col-md-4">
                            <input type="text" class="form-control" placeholder="Cari..." id="form-search-alternatif">
                            <span class="input-icon-addon p-3 text-center" id="search-button-alternatif">
                                <i class="fa fa-search " style="cursor: pointer;"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table" id="table-alternatif">
                    <thead style="background-color: #f7f8fa;">
                        <tr class="text-center">
                            <th>Nama alternatif</th>
                            <th>Sub kriteria</th>
                            <th>Bobot prioriti alternatif</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">

                    </tbody>
                    <tfoot id="dataNotFoundAlternatif">
                        <tr class="text-center text-muted" id="template-empty-info">
                            <td colspan="9" class=" ">
                                <i class="fas fa-folder-open mr-1"></i> Data tidak ditemukan ...
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div class="d-flex justify-content-between align-items-center px-4">
                    <span class="mb-3 text-muted">
                        Total <span id="data-total-alternatif"></span> data
                    </span>
                    {{-- <ul class="pagination pg-info"></ul> --}}
                </div>
            </div>
        </x-base-body>
        <x-bobotalternatif.bobot-alternatif-modal></x-bobotalternatif.bobot-alternatif-modal>
    </div>
    <x-bobotkriteria.bobot-kriteria-modal></x-bobotkriteria.bobot-kriteria-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/ahp.controller.js') }}?v={{ time() }}"></script>
@endsection
