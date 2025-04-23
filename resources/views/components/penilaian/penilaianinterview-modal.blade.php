<div class="modal fade" id="penilaianInterviewModal" tabindex="-1" role="dialog" aria-labelledby="jobLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 800px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title">Penilaian Interview</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formTambahPenilaianInterview">
                @csrf
                <div class="modal-body">
                    <input type="hidden" name="id_file" id="id_file">
                    <input type="hidden" name="id" id="id">
                    <div id="form-penilaian-dinamis"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Tutup</button>
                    <button type="submit" class="btn btn-outline-primary">Simpan Penilaian</button>
                </div>
            </form>
        </div>
    </div>
</div>
