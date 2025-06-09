<div class="modal fade" id="lokerModal" tabindex="-1" role="dialog" aria-labelledby="jobLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 800px; ">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title">Tambah Data</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formTambah">
                <div class="modal-body">
                    @csrf
                    <div class="row py-2">
                        <div class="col-md-6">
                            <div class="form-group fill form-show-validation">
                                <input type="hidden" name="id" id="id" value="">
                                <label for="name">Nama Lowongan</label>
                                <input id="name" name="name" type="text" class="form-control"
                                    placeholder="Nama">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group fill form-show-validation">
                                <label>Kategory</label>
                                <select name="category" id="category" class="form-control">
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="guru">Guru</option>
                                    <option value="staff">Staff</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group fill form-show-validation">
                                <label>Type</label>
                                <select name="job_type" id="job_type" class="form-control">
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="fulltime">Fulltime</option>
                                    <option value="parttime">Parttime</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group fill form-show-validation">
                                <label for="start_date">Waktu di buka</label>
                                <input id="start_date" name="start_date" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group fill form-show-validation">
                                <label for="end_date">Waktu di tutup</label>
                                <input id="end_date" name="end_date" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group fill form-show-validation">
                                <label for="salary_min">Minimun salary</label>
                                <input id="salary_min" name="salary_min" type="number" class="form-control" min="0">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group fill form-show-validation">
                                <label for="salary_max">Maximum salary</label>
                                <input id="salary_max" name="salary_max" type="number" class="form-control" min="0">
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <label>Kriteria Lowongan</label>

                            <!-- Kriteria Lowongan -->
                            <div class="col-md-12">
                                <!-- Kriteria 1: Pengalaman Kerja -->
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <input type="hidden" name="criteria[0][field]" value="experience">
                                        <input type="hidden" name="criteria[0][operator]" value=">=">
                                        <label>Pengalaman Kerja Minimal (tahun)</label>
                                        <input type="number" name="criteria[0][value]" class="form-control"
                                            placeholder="Misal: 3">
                                    </div>
                                    <div class="col-md-8 align-self-center" style="padding-top: 30px;">
                                        Masukkan jumlah tahun minimal pengalaman kerja
                                    </div>
                                </div>

                                <!-- Kriteria 2: Pendidikan Terakhir -->
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <input type="hidden" name="criteria[1][field]" value="education">
                                        <input type="hidden" name="criteria[1][operator]" value="=">
                                        <label>Pendidikan Terakhir Minimal</label>
                                        <select name="criteria[1][value]" class="form-control">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="SMA">SMA</option>
                                            <option value="D3">D3</option>
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Kriteria 3: Umur Maksimal -->
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <input type="hidden" name="criteria[2][field]" value="age">
                                        <label>Umur (tahun)</label>
                                        <input type="number" name="criteria[2][value]" class="form-control"
                                            placeholder="Misal: 30">
                                    </div>
                                    <div class="col-md-3">
                                        <label>Operator</label>
                                        <select name="criteria[2][operator]" class="form-control">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="<" > < </option>
                                            <option value=">" > > </option>
                                        </select>
                                    </div>
                                    <div class="col-md-5 align-self-center" style="padding-top: 30px;">
                                        Masukkan umur pelamar yang diharapkan
                                    </div>
                                </div>

                                <!-- Kriteria 4: Tahun Lulus -->
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <input type="hidden" name="criteria[3][field]" value="graduation_year">
                                        <label>Lulusan Tahun</label>
                                        <input type="number" name="criteria[3][value]" class="form-control"
                                            placeholder="Misal: 2020">
                                    </div>
                                    <div class="col-md-3">
                                        <label>Operator</label>
                                        <select name="criteria[3][operator]" class="form-control">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="=" >=</option>
                                            <option value="<="><=</option>
                                            <option value=">=">>=</option>
                                        </select>
                                    </div>
                                    <div class="col-md-5 align-self-center" style="padding-top: 30px;">
                                        Tahun lulusan yang disyaratkan
                                    </div>
                                </div>

                                <!-- Kriteria 5: Jurusan Pendidikan -->
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <input type="hidden" name="criteria[4][field]" value="major">
                                        <label>Jurusan Pendidikan</label>
                                        <input type="text" name="criteria[4][value]" class="form-control"
                                            placeholder="Misal: Teknik Informatika">
                                    </div>
                                    <div class="col-md-3">
                                        <label>Operator</label>
                                        <select name="criteria[4][operator]" class="form-control">
                                            <option value="" selected disabled hidden>Choose here</option>
                                            <option value="=" >=</option>
                                            <option value="!=">!=</option>
                                        </select>
                                    </div>
                                    <div class="col-md-5 align-self-center" style="padding-top: 30px;">
                                        Nama jurusan pendidikan yang diharapkan
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-12">
                            <div class="form-group form-ckeditor fill form-show-validation">
                                <label class="form-ckeditor">Deskripsi</label>
                                <textarea class="form-control" id="description" name="description"></textarea>
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
