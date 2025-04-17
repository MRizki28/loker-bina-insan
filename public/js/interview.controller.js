import InterviewService from "./interview.service.js?v=1.0.0";

$(document).ready(function () {
    const interviewService = new InterviewService()
    interviewService.getAllData()

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        interviewService.getReview(id)
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
        interviewService.approve(id)
    })

    $(document).on('click', '.btn-reject', function () {
        const id = $(this).data('id')
        $('#formReject').on('submit', function (e) {
            e.preventDefault();
            interviewService.reject(e, id)
        })
    })
});