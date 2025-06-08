import UserManagementService from "./usermanagement.service.js?v=1.0.2";

$(document).ready(function () {
    const userManagementService = new UserManagementService();

    $('#role').on('change', function () {
        const selectedRole = $(this).val();
        const container = $('#user-container');
    
        container.html(''); // Kosongkan dulu
    
        if (selectedRole === 'user') {
            container.html(`
    
                <div class="form-group fill form-show-validation">
                    <label for="birth_place_date">Tempat, Tanggal Lahir</label>
                    <input id="birth_place_date" name="birth_place_date" type="text" class="form-control" placeholder="Contoh: Jakarta, 01 Januari 2000">
                </div>
    
                <div class="form-group fill form-show-validation">
                    <label for="mother_name">Nama Ibu</label>
                    <input id="mother_name" name="mother_name" type="text" class="form-control" placeholder="Masukkan nama ibu">
                </div>
    
                <div class="form-group fill form-show-validation">
                    <label for="father_name">Nama Ayah</label>
                    <input id="father_name" name="father_name" type="text" class="form-control" placeholder="Masukkan nama ayah">
                </div>
    
                <div class="form-group fill form-show-validation">
                    <label for="child_order">Anak ke-</label>
                    <input id="child_order" name="child_order" type="number" class="form-control" placeholder="Contoh: 1">
                </div>
    
                <div class="form-group fill form-show-validation">
                    <label for="sibling_count">Jumlah Saudara Kandung</label>
                    <input id="sibling_count" name="sibling_count" type="number" class="form-control" placeholder="Contoh: 3">
                </div>

                  <div class="form-group fill form-show-validation">
                    <label for="address">Alamat</label>
                    <textarea id="address" name="address" class="form-control" rows="3" placeholder="Masukkan alamat lengkap"></textarea>
                </div>
            `);
        }
    });
    
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
                    minlength: 12,
                    maxlength: 12,
                },
                "address": {
                    required: true,
                },
                "birth_place_date": {
                    required: true,
                },
                "mother_name": {
                    required: true,
                },
                "father_name": {
                    required: true,
                },
                "child_order": {
                    required: true,
                    number: true
                },
                "sibling_count": {
                    required: true,
                    number: true
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
                    minlength: 'No HP minimal 12 digit',
                    maxlength: 'No HP maksimal 12 digit'
                },
                "address": {
                    required: 'Alamat wajib diisi',
                },
                "birth_place_date": {
                    required: 'Tempat, Tanggal Lahir wajib diisi',
                },
                "mother_name": {
                    required: 'Nama ibu wajib diisi',
                },
                "father_name": {
                    required: 'Nama ayah wajib diisi',
                },
                "child_order": {
                    required: 'Urutan anak wajib diisi',
                    number: 'Harus berupa angka'
                },
                "sibling_count": {
                    required: 'Jumlah saudara kandung wajib diisi',
                    number: 'Harus berupa angka'
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