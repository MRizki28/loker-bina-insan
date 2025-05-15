import InterviewService from "./interview.service.js?v=1.0.1";

$(document).ready(function () {
    const interviewService = new InterviewService()
    interviewService.getAllData()

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        interviewService.getReview(id)
    })

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            interviewService.getAllData();
        }
    })

    $(document).on('click', '#form-search', function () {
        interviewService.getAllData();
    })

    function validation() {
        $('#formTambah').validate({
            rules: {

                "time_interview": {
                    required: true,
                }
            },
            messages: {
                "time_interview": {
                    required: 'Waktu interview wajib diisi',
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


    $(document).on('click', '.btn-interview', function () {
        const id = $(this).data('id')
        console.log(id);
        $('#formTambah').on('submit', function (e) {
            e.preventDefault();
            interviewService.createData(e, id)
        })
    })

    $(document).on('click', '.btn-approve', function () {
        const id = $(this).data('id')
        const id_file = $(this).data('id_file')
        $('#penilaianInterviewModal').modal('show');
        $('#formTambahPenilaianInterview #id_file').val(id_file);;
        $('#formTambahPenilaianInterview #id').val(id);
        interviewService.penilaianModal();
    })

    $('#formTambahPenilaianInterview').on('submit', function (e) {
        e.preventDefault();
        const id_file = $('#formTambahPenilaianInterview #id_file').val();
        const id = $('#formTambahPenilaianInterview #id').val();
        interviewService.submitPenilaian(e, id_file, id);
    })

    $(document).on('click', '.btn-reject', function () {
        const id = $(this).data('id')
        $('#formReject').on('submit', function (e) {
            e.preventDefault();
            interviewService.reject(e, id)
        })
    })

    $(document).on('click', '.btn-wa', function () {
        const phone = $(this).data('phone')
        const message = "Halo"
        const link = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message)
        window.open(link, '_blank')
    })
});