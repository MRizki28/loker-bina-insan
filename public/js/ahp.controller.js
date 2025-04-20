import AhpService from "./ahp.service.js?v=1.0.0";

$(document).ready(function () {
    const ahpService = new AhpService();
    ahpService.getDataKriteria()

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        ahpService.getDataKriteria(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            ahpService.getDataKriteria();
        }
    })

    $(document).on('click', '#search-button', function () {
        ahpService.getDataKriteria();
    })

    function validation() {
        $('#formTambah').validate({
            rules: {
                "name_kriteria": {
                    required: true,
                },
                "bobot_prioriti_kriteria": {
                    required: true,
                }

            },
            messages: {
                "name_kriteria": {
                    required: 'Nama kriteria wajib diisi',
                },
                "bobot_prioriti_kriteria": {
                    required: 'Bobot prioriti kriteria wajib diisi',
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

    function checkingEdit() {
        return $('#id').val() ? true : false
    }

    $('#formTambah').on('submit', function (e) {
        e.preventDefault();
        ahpService.createDataKriteria(e, checkingEdit, resetField);
    });

    $(document).on('click', '.edit-modal', function () {
        const id = $(this).data('id')
        ahpService.getDataByIdKriteria(id, checkingEdit)
    })

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        ahpService.deleteDataKriteria(id)
    })



    function resetField() {
        $('#bobotKriteriaModal').on('hidden.bs.modal', function () {
            $('#name_kriteria').val('');
            $('#bobot_prioriti_kriteria').val();
            $('.form-control').removeClass('has-error').removeClass('has-success');
            $('.form-group').removeClass('has-error').removeClass('has-success');
            $('#formTambah').find('.form-group').find('.error').remove()
            $('.has-error').remove();
        });
    }

    resetField()
});