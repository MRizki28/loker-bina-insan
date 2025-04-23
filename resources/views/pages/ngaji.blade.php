@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data ngaji" headerIcon="fas fa-file-image"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="false" headerAddButton="Tambah Data"
                modalId="#reviewModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Nama pelamar</th>
                        <th>Job yang dilamar</th>
                        <th>Status review berkas</th>
                        <th>Status interview</th>
                        <th>Waktu test</th>
                        <th>Status tes ngaji</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>
    <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="jobLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="max-width: 800px; ">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Form reject</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="formReject">
                    <div class="modal-body">
                        @csrf
                        <div class="row py-2">
                            <div class="col-md-12">
                                <input type="hidden" name="id" id="id" value="">
                                <div class="form-group form-ckeditor fill form-show-validation">
                                    <label class="form-ckeditor">Alasan Penolakan</label>
                                    <textarea class="form-control" id="reason_reject" name="reason_reject"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Tutup</button>
                            <button type="submit" class="btn btn-outline-primary">Simpan Data</button>
                        </div>
                </form>
            </div>
        </div>
    </div>

    </div>
    <x-penilaian.penilaianinterview-modal></x-penilaian.penilaianinterview-modal>
    <x-ngaji.ngaji-modal></x-ngaji.ngaji-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/ngaji.controller.js') }}?v={{ time() }}"></script>
@endsection
