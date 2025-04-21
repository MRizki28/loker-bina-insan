import AhpService from "./ahp.service.js?v=1.0.0";

$(document).ready(function () {
    const ahpService = new AhpService();
    ahpService.getDataKriteria()
    ahpService.getDataAlternatif()

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        ahpService.getDataKriteria(fullUrl);
    });


    $(document).on('click', '#search-button', function () {
        ahpService.getDataKriteria();
    })

    $(document).on('click', '#search-button-alternatif', function () {
        ahpService.getDataAlternatif();
    })

    function validation() {
        $('#formTambah').validate({
            rules: {
                "bobot_prioriti_kriteria": {
                    required: true,
                }

            },
            messages: {
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
    function validation2() {
        $('#formTambahAlternatif').validate({
            rules: {
                "bobot_prioriti_alternatif": {
                    required: true,
                }

            },
            messages: {
                "bobot_prioriti_alternatif": {
                    required: 'Bobot prioriti alternatif wajib diisi',
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


    validation2();

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

    $('#formTambahAlternatif').on('submit', function (e) {
        e.preventDefault();
        ahpService.updateDataAlternatif(e, resetFieldAlternatif);
    });

    $(document).on('click', '.edit-modal-alternatif', function () {
        const id = $(this).data('id')
        ahpService.getDataByIdAlternatif(id)
    })


    function resetField() {
        $('#bobotKriteriaModal').on('hidden.bs.modal', function () {
            $('#bobot_prioriti_kriteria').val();
            $('.form-control').removeClass('has-error').removeClass('has-success');
            $('.form-group').removeClass('has-error').removeClass('has-success');
            $('#formTambah').find('.form-group').find('.error').remove()
            $('.has-error').remove();
        });
    }

    function resetFieldAlternatif() {
        $('#bobotAlternatif').on('hidden.bs.modal', function () {
            $('#bobot_prioriti_alternatif').val();
            $('.form-control').removeClass('has-error').removeClass('has-success');
            $('.form-group').removeClass('has-error').removeClass('has-success');
            $('#formTambahAlternatif').find('.form-group').find('.error').remove()
            $('.has-error').remove();
        });
    }

    resetFieldAlternatif()

    resetField()
});