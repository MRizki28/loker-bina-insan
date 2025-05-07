import UserManagementService from "./usermanagement.service.js?v=1.0.1";

$(document).ready(function () {
    const userManagementService = new UserManagementService();


    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        userManagementService.getAllData(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            userManagementService.getAllData();
        }
    })

    $(document).on('click', '#search-button', function () {
        userManagementService.getAllData();
    })


    userManagementService.getAllData();
    function noHp(){
        $('#phone').on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    noHp();
    function validation() {
        $('#formTambah').validate({
            rules: {
                "name": {
                    required: true,
                },
                "email": {
                    required: true,
                    email: true
                },
                "password": {
                    required: true,
                    minlength: 6
                },
                "role": {
                    required: true,
                },
                "phone": {
                    required: true,

                }
            },
            messages: {
                "name": {
                    required: 'Nama wajib diisi',
                },
                "email": {
                    required: 'Email wajib diisi',
                    email: 'Format email tidak valid'
                },
                "password": {
                    required: 'Password wajib diisi',
                    minlength: 'Password minimal 6 karakter'
                },
                "role": {
                    required: 'Role wajib diisi',
                },
                "phone": {
                    required: 'No HP wajib diisi',
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
        userManagementService.createData(e, checkingEdit, resetField);
    });

    $(document).on('click', '.edit-modal', function () {
        const id = $(this).data('id')
        $('#password').prop('disabled', false);
        userManagementService.getDataById(id, checkingEdit)
    })

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        userManagementService.deleteData(id)
    })


    function resetField() {
        $('#userManagementModal').on('hidden.bs.modal', function () {
            $('#id').val('');
            $('#name').val('');
            $('#email').val('');
            $('#role').val('').trigger('change');
            $('#phone').val('');
            $('#password').prop('disabled', true);
            $('#modal-title').text('Tambah Data');
            $('.form-control').removeClass('has-error').removeClass('has-success');
            $('.form-group').removeClass('has-error').removeClass('has-success');
            $('#formTambah').find('.form-group').find('.error').remove()
            $('.has-error').remove();
        });
    }
    
    resetField()
});