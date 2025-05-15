import FileApplyService from "./fileapply.service.js?v=1.0.2";

$(document).ready(function () {
    const fileApplyService = new FileApplyService()
    fileApplyService.getAllData()

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            fileApplyService.getAllData();
        }
    })

    $(document).on('click', '#form-search', function () {
        fileApplyService.getAllData();
    })

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        fileApplyService.getReview(id)
    })

    $(document).on('click', '#rejectBtn', function (e) {
        e.preventDefault();

        const id = $(this).data('id');
        $('#rejectModal').modal('show');
        $('#reviewModal').modal('hide');

        $('#formReject #id').val(id);
    });


    $(document).on('submit', '#formReject', function (e) {
        e.preventDefault();

        const id = $('#formReject #id').val();
        const reason = $('#formReject #reason_reject').val();

        // Validasi singkat (opsional)
        if (!reason) {
            alert('Harap isi alasan penolakan!');
            return;
        }

        // Kirim data via axios
        fileApplyService.reject(id, reason, e);
    });

    $(document).on('click', '.approveBtn', function (e) {
        e.preventDefault();
        const id_berkas = $(this).data('id');
        console.log(id_berkas)
        $('#reviewModal').modal('hide');
        $('#penilaianBerkasModal').modal('show');
        $('#formTambahPenilaianBerkas #id_file').val(id_berkas);
        fileApplyService.penilaianModal();
    });

    $('#formTambahPenilaianBerkas').on('submit', function (e) {
        e.preventDefault();
        const id_file = $('#formTambahPenilaianBerkas #id_file').val();
        fileApplyService.submitPenilaian(e, id_file);
    })
    
    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        fileApplyService.deleteData(id)
    })

    function resetField() {
        $('#reviewModal').on('hidden.bs.modal', function () {
            $('#description').text('');
            $('#requirement').empty();
            $('#qualification').empty();
        });
    }

    resetField()
});