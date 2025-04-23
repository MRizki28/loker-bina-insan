@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data Ranking" headerIcon="fas fa-star"></x-base-header>
        <x-base-body>
            <div class="p-3">
                <div class="d-flex justify-content-between align-items-center mb-md-0 row">
                    <div class="col-md-7 row mb-2 ">
                        <div class="input-icon col-md-4">
                            <select name="job" class="form-control" id="job-search" style="width: 100%; height: 30px;">
                                <option value="" selected disabled hidden>Lowongan</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-responsive p-2">
                <table class="table table-bordered" id="table">
                    <thead style="background-color: #f7f8fa;">
                        <th>Nama pelamar</th>
                        <th>Job yang dilamar</th>
                        <th>K1 (USIA)</th>
                        <th>K2 (PENGALAMAN KERJA)</th>
                        <th>K3 (PENDIDIKAN TERAKHIR)</th>
                        <th>K4 (TES WAWANCARA)</th>
                        <th>K5 (TES PSIKOLOGI)</th>
                        <th>K6 (TES MENGAJI)</th>
                        <th>TOTAL</th>
                        <th>RANKING</th>
                    </thead>
                    <tbody class="text-center">

                    </tbody>
                    <tfoot id="dataNotFound">
                        <tr class="text-center text-muted" id="template-empty-info">
                            <td colspan="9" class=" ">
                                <i class="fas fa-folder-open mr-1"></i> Data tidak ditemukan ...
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div class="d-flex justify-content-between align-items-center px-4">
                    <span class="mb-3 text-muted">
                        Total <span id="data-total"></span> data
                    </span>
                    <ul class="pagination pg-info"></ul>
                </div>
            </div>
        </x-base-body>
    </div>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/ranking.controller.js') }}?v={{ time() }}"></script>
@endsection
