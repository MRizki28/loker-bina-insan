import NgajiService from "./ngaji.service.js?v=1.0.0";

$(document).ready(function () {
    const ngajiService = new NgajiService()
    ngajiService.getAllData()

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        ngajiService.getReview(id)
    })

    function validation() {
        $('#formTambah').validate({
            rules: {

                "time_test": {
                    required: true,
                }
            },
            messages: {
                "time_test": {
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
            ngajiService.createData(e, id)
        })
    })

    $(document).on('click', '.btn-approve', function () {
        const id = $(this).data('id')
        const id_file = $(this).data('id_file')
        $('#penilaianInterviewModal').modal('show');
        $('#formTambahPenilaianInterview #id_file').val(id_file);;
        $('#formTambahPenilaianInterview #id').val(id);
        ngajiService.penilaianModal();
    })

    $('#formTambahPenilaianInterview').on('submit', function (e) {
        e.preventDefault();
        const id_file = $('#formTambahPenilaianInterview #id_file').val();
        const id = $('#formTambahPenilaianInterview #id').val();
        ngajiService.submitPenilaian(e, id_file, id);
    })

    $(document).on('click', '.btn-reject', function () {
        const id = $(this).data('id')
        $('#formReject').on('submit', function (e) {
            e.preventDefault();
            ngajiService.reject(e, id)
        })
    })

    $(document).on('click', '.btn-wa', function () {
        const phone = $(this).data('phone')
        const message = "Halo"
        const link = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message)
        window.open(link, '_blank')
    })
});