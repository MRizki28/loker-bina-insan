class UserManagementService {

    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/auth/get-all-data', { search: params });

        table.empty();
        pagination.empty();

        try {
            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

            let tableBody
            if (responseData.message === 'Success get data user') {
                $.each(responseData.data.data, function (index, item) {
                    tableBody += "<tr>";
                    tableBody += "<td>" + item.name + "</td>"
                    tableBody += "<td>" + item.email + "</td>"
                    tableBody += "<td>" + item.phone + "</td>"
                    tableBody += "<td>" + item.role + "</td>"

                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center '>" +
                        "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#userManagementModal' data-id='" +
                        item.id + "'><i class='fas fa-edit'></i></button>" +
                        "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                        item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                        "</td>";
                    tableBody += "</tr>";
                    dataNotFound.hide()
                });

                table.append(tableBody);
                paginationLink(pagination, responseData);
                totalData.text(responseData.data.total);
            } else {
                table.empty()
                dataNotFound.show()
                pagination.empty()
                totalData.text('0')
            }
        } catch (error) {
            table.empty()
            dataNotFound.show()
            pagination.empty()
            totalData.text('0')
        }

    }


    async createData(e, checkingEdit, resetField) {
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);

            if (checkingEdit()) {
                const id = $('#id').val()
                const response = await axios.post(`/v1/auth/update-data-user/${id}`, formData);
                const responseData = await response.data;
                if (responseData.status === 'success') {
                    successUpdateAlert().then(() => {
                        resetField()
                        $('#userManagementModal').modal('hide');
                    })
                    this.getAllData();
                    submitButton.attr('disabled', false);
                } else {
                    errorAlert();
                    submitButton.attr('disabled', false);
                }
            } else {
                submitButton.attr('disabled', true);
                const response = await axios.post(`/v1/auth/create-data-user`, formData);
                const responseData = await response.data;
                console.log(responseData);
                if (responseData.status === 'success') {
                    successAlert().then(() => {
                        resetField()
                        $('#userManagementModal').modal('hide');
                    })
                    this.getAllData();
                    submitButton.attr('disabled', false);
                } else {
                    errorAlert();
                    submitButton.attr('disabled', false);
                }
            }
        } catch (error) {
            submitButton.attr('disabled', false);
            console.log(error);
            if (error.response && error.response.data) {
                if (
                    error.response.data.data?.email?.includes(
                        "The email has already been taken."
                    )
                ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Perhatian',
                        text: 'Email sudah terdaftar silahkan gunakan email lain',

                    })
                } else if (error.response.status === 422) {
                    warningAlert();
                } else {
                    errorAlert()
                }
            } else {
                errorAlert()
            }
        }
    }

    async getDataById(id, checkingEdit) {
        try {
            const response = await axios.get(`/v1/auth/get/${id}`);
            const responseData = response.data;
            console.log('description', responseData);
            $('#modal-title').text("Edit Data");
            $('#id').val(responseData.data.id);
            $('#name').val($('<div>').html(responseData.data.name).text());
            $('#email').val(responseData.data.email);
            $('#phone').val(responseData.data.phone);
            $('#role').val(responseData.data.role).trigger('change');
            checkingEdit();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteData(id) {
        deleteAlert().then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/v1/auth/delete/${id}`)
                    const responseData = await response.data
                    console.log(response)
                    if (responseData.status === 'success') {
                        successDeleteAlert().then(() => {
                            window.location.reload()
                        })
                    } else {
                        errorAlert()
                    }
                } catch (error) {
                    const message = error.response?.data?.message;

                    if (message === 'Cannot delete your self') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Perhatian',
                            text: 'Anda tidak dapat menghapus akun anda sendiri',
                        });
                    } else {
                        errorAlert();
                    }
                }

            }
        })

    }
}

export default UserManagementService;