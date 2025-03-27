import JobService from "./job.service.js?v=1.0.1";

$(document).ready(function () {

    const startDateInput = $('#start_date');
    const endDateInput = $('#end_date');

    const today = new Date();

    startDateInput.attr('min', today.toISOString().split('T')[0]);
    endDateInput.attr('min', today.toISOString().split('T')[0]);

    startDateInput.on('change', function () {
        endDateInput.attr('min', $(this).val());
    })

    const jobService = new JobService();

    jobService.getAllData();

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        jobService.getAllData(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            jobService.getAllData();
        }
    })

    $(document).on('click', '#search-button', function () {
        jobService.getAllData();
    })

    $('#addQualification').on('click', function () {

        const newInputGroup = $(
            ` <div class="d-flex align-items-center mb-2">
                    <input name="qualification[]" type="text" class="form-control me-2" placeholder="Kualifikasi">
                    <button type="button" class="btn btn-danger remove">Hapus</button>
                </div>`
        )

        $('#input-group-container').append(newInputGroup)
    })

    $('#input-group-container').on('click', '.remove', function () {
        $(this).parent().remove();
    });

    $('#addRequirement').on('click', function () {
        const newInputGroup = $(
            ` <div class="d-flex align-items-center mb-2">
                    <input name="requirement[]" type="text" class="form-control me-2" placeholder="Pesyaratan">
                    <button type="button" class="btn btn-danger remove">Hapus</button>
                </div>`
        )

        $('#input-group-container2').append(newInputGroup)
    })

    $('#input-group-container2').on('click', '.remove', function () {
        $(this).parent().remove();
    });

    function validation() {
        $('#formTambah').validate({
            rules: {
                "name": {
                    required: true,
                },
                "experience": {
                    required: true,
                },
                "department": {
                    required: true,
                },
                "qualification[]": {
                    required: true
                },
                "requirement[]": {
                    required: true
                },
                "start_date": {
                    required: true
                },
                "end_date": {
                    required: true
                },
                "job_type": {
                    required: true
                },
                "category": {
                    required: true
                }

            },
            messages: {
                "name": {
                    required: 'Nama lowongan wajib diisi',
                },
                "experience": {
                    required: 'Experience wajib diisi',
                },
                "department": {
                    required: 'Department wajib diisi',
                },
                "qualification[]": {
                    required: 'Setiap kualifikasi wajib diisi'
                },
                "requirement[]": {
                    required: 'Setiap persyaratan wajib diisi'
                },
                "start_date": {
                    required: 'Start date wajib diisi'
                },
                "end_date": {
                    required: 'End date wajib diisi'
                },
                "job_type": {
                    required: 'Job type wajib diisi'
                },
                "category": {
                    required: 'Category wajib diisi'
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "qualification[]" || element.attr("name") === "requirement[]") {
                    error.insertAfter(element.closest('.d-flex'));
                } else {
                    error.insertAfter(element);
                }
            }
        });
    }

    validation();

    function checkingEdit() {
        return $('#id').val() ? true : false
    }

    $('#formTambah').on('submit', function (e) {
        e.preventDefault();
        jobService.createData(e, checkingEdit, resetField);
    });

    $(document).on('click', '.edit-modal', function () {
        const id = $(this).data('id')
        jobService.getDataById(id, checkingEdit)
    })

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        jobService.deleteData(id)
    })

    $(document).on('click', '.qualification-modal', function () {
        const id = $(this).data('id');
        jobService.getDataQualificationAndRequirement(id);
    })

    $(document).on('click', '.requirement-modal', function () {
        const id = $(this).data('id');
        jobService.getDataQualificationAndRequirement(id);
    })


    function resetField() {
        $('#lokerModal').on('hidden.bs.modal', function () {
            $('#id').val('');
            $('#name').val('');
            $('#description').val('');
            $('#start_date').val('');
            $('#end_date').val('');
            $('#job_type').val('');
            $('#category').val('');
            $('#modal-title').text('Tambah Data');
    
            $('#input-group-container').empty();
            const initialInputGroup = `
                <label for="qualification" class="me-2">Kualifikasi</label>
                <div class="d-flex align-items-center mb-2">
                    <input id="qualification" name="qualification[]" type="text" class="form-control me-2" placeholder="Kualifikasi">
                    <button type="button" class="btn btn-primary" id="addQualification">Tambah</button>
                </div>
            `;
            $('#input-group-container').append(initialInputGroup);
    
            $('#input-group-container2').empty();
            const initialInputGroup2 = `
                <label for="requirement" class="me-2">Persyaratan</label>
                <div class="d-flex align-items-center mb-2">
                    <input id="requirement" name="requirement[]" type="text" class="form-control me-2" placeholder="Persyaratan">
                    <button type="button" class="btn btn-primary" id="addRequirement">Tambah</button>
                </div>
            `;
            $('#input-group-container2').append(initialInputGroup2);
    
            $('.form-control').removeClass('has-error').removeClass('has-success');
            $('.form-group').removeClass('has-error').removeClass('has-success');
            $('#formTambah').find('.form-group').find('.error').remove()
            $('.has-error').remove();

            $('#input-group-container').off('click', '#addQualification').on('click', '#addQualification', function () {
                const newInputGroup = $(
                    `<div class="d-flex align-items-center mb-2">
                        <input name="qualification[]" type="text" class="form-control me-2" placeholder="Kualifikasi">
                        <button type="button" class="btn btn-danger remove">Hapus</button>
                    </div>`
                );
                $('#input-group-container').append(newInputGroup);
            });
    
            $('#input-group-container2').off('click', '#addRequirement').on('click', '#addRequirement', function () {
                const newInputGroup = $(
                    `<div class="d-flex align-items-center mb-2">
                        <input name="requirement[]" type="text" class="form-control me-2" placeholder="Persyaratan">
                        <button type="button" class="btn btn-danger remove">Hapus</button>
                    </div>`
                );
                $('#input-group-container2').append(newInputGroup);
            });
    
            $('#input-group-container').on('click', '.remove', function () {
                $(this).parent().remove();
            });
            $('#input-group-container2').on('click', '.remove', function () {
                $(this).parent().remove();
            });
        });
    }
    
    resetField()
});