@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data loker" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="true" headerAddButton="Tambah Data"
                modalId="#lokerModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Lowongan</th>
                        <th>Deskripsi</th>
                        <th>Waktu lowongan</th>
                        <th>Type</th>
                        <th>Kategory</th>
                        <th>Kualifikasi</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>
    <div class="modal fade" id="qualificationModal" tabindex="-1" role="dialog" aria-labelledby="qualificationLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document" style="max-width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Kualifikasi</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ol id="qualificationList" style="color: #000;"></ol>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="requirementModal" tabindex="-1" role="dialog" aria-labelledby="requirementLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document" style="max-width: 800px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Pesyaratan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ol id="requirementList" style="color: #000;"></ol>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    <x-loker.loker-modal></x-loker.loker-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/job.controller.js') }}?v={{ time() }}"></script>
@endsection
