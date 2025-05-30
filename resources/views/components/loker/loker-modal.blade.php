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
                            <label>Kriteria Lowongan</label>
                            <div id="criteria-container"></div>
                            <button type="button" class="btn btn-sm btn-outline-success mt-2" id="add-criteria-btn">
                                Tambah Kriteria
                            </button>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group form-ckeditor fill form-show-validation">
                                <label class="form-ckeditor">Deskripsi</label>
                                <textarea class="form-control"  id="description" name="description"></textarea>
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
