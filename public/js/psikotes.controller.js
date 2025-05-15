import PsikotesService from "./psikotes.service.js?v=1.0.1";

$(document).ready(function () {
    const psikotesService = new PsikotesService()
    psikotesService.getAllData()

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        psikotesService.getReview(id)
    })

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            psikotesService.getAllData();
        }
    })

    $(document).on('click', '#form-search', function () {
        psikotesService.getAllData();
    })

    function validation() {
        $('#formTambah').validate({
            rules: {

                "time_psikotes": {
                    required: true,
                }
            },
            messages: {
                "time_psikotes": {
                    required: 'Waktu test wajib diisi',
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });
    }

    validation();


    $(document).on('click', '.btn-ngaji', function () {
        const id = $(this).data('id')
        console.log(id);
        $('#formTambah').on('submit', function (e) {
            e.preventDefault();
            psikotesService.createData(e, id)
        })
    })

    $(document).on('click', '.btn-approve', function () {
        const id = $(this).data('id')
        const id_file = $(this).data('id_file')
        $('#penilaianPsikotesModal').modal('show');
        $('#formTambahPenilaianPsikotes #id_file').val(id_file);;
        $('#formTambahPenilaianPsikotes #id').val(id);
        psikotesService.penilaianModal();
    })

    $('#formTambahPenilaianPsikotes').on('submit', function (e) {
        e.preventDefault();
        const id_file = $('#formTambahPenilaianPsikotes #id_file').val();
        const id = $('#formTambahPenilaianPsikotes #id').val();
        psikotesService.submitPenilaian(e, id_file, id);
    })

    $(document).on('click', '.btn-reject', function () {
        const id = $(this).data('id')
        $('#formReject').on('submit', function (e) {
            e.preventDefault();
            psikotesService.reject(e, id)
        })
    })

    $(document).on('click', '.btn-wa', function () {
        const phone = $(this).data('phone')
        const message = "Halo"
        const link = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message)
        window.open(link, '_blank')
    })
});