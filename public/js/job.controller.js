import JobService from "./job.service.js?v=1.0.2";

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

    let index = 0

    $('#add-criteria-btn').on('click', function () {

      const criteriaRow = `
                <div class="row mb-2 criteria-row">
                    <div class="col-md-4">
                        <input type="text" name="criteria[${index}][field]" class="form-control" placeholder="Field (misal: education)">
                    </div>
                    <div class="col-md-3">
                        <select name="criteria[${index}][operator]" class="form-control">
                            <option value="">Operator</option>
                            <option value="=">=</option>
                            <option value="!=">!=</option>
                            <option value=">">></option>
                            <option value=">=">>=</option>
                            <option value="<"><</option>
                            <option value="<="><=</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" name="criteria[${index}][value]" class="form-control" placeholder="Nilai">
                    </div>
                    <div class="col-md-1">
                        <button type="button" class="btn btn-sm btn-danger remove-criteria">&times;</button>
                    </div>
                </div>
            `;

            $('#criteria-container').append(criteriaRow);
            index++;
    })

    $('#criteria-container').on('click', '.remove-criteria', function () {
        $(this).closest('.criteria-row').remove();
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
            $('#formTambah')[0].reset();
            $('#criteria-container').empty(); 
            index = 0; 

        });
    }
    
    resetField()
});