<div class="modal fade" id="jadwalInterviewModal" tabindex="-1" role="dialog" aria-labelledby="jobLabel" aria-hidden="true">
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
                            <input type="hidden" name="id" id="id" value="">
                            <div class="form-group fill form-show-validation">
                                <label>Waktu interview</label>
                                <input type="datetime-local" id="time_interview" name="time_interview" class="form-control"
                                    placeholder="Tanggal dan waktu">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input type="hidden" name="id" id="id" value="">
                            <div class="form-group fill form-show-validation">
                                <label>Link (Opsional)</label>
                                <input type="text" id="link" name="link" class="form-control"
                                    placeholder="Link interview">
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
