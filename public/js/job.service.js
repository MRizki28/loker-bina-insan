class JobService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/job', { search: params });
        const response = await axios.get(endpoint);
        const responseData = await response.data;
        console.log('ini response', responseData)

        table.empty();
        pagination.empty();

        let tableBody
        if (responseData.message === 'Success get data job') {
            $.each(responseData.data.data, function (index, item) {
                tableBody += "<tr>";
                tableBody += "<td>" + item.job_opening + "</td>"
                tableBody += "<td>" + item.experience + "</td>"
                tableBody += "<td>" + item.department + "</td>"
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm qualification-modal mr-1' data-toggle='modal' data-target='#qualificationModal' data-id='" +
                    item.id + "'><i class='fas fa-eye'></i></button>"
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm requirement-modal mr-1' data-toggle='modal' data-target='#requirementModal' data-id='" +
                    item.id + "'><i class='fas fa-eye'></i></button>"
                tableBody += "<td>" + item.start_date + ' - ' + item.end_date + "</td>"
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#jobModal' data-id='" +
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
    }

    async createData(e, checkingEdit, resetField) {
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);

            if (checkingEdit()) {
                const id = $('#id').val()
                const response = await axios.post(`/v1/job/update/${id}`, formData);
                const responseData = await response.data;
                if (responseData.status === 'success') {
                    successUpdateAlert().then(() => {
                        resetField()
                        $('#jobModal').modal('hide');
                    })
                    this.getAllData();
                    submitButton.attr('disabled', false);
                } else {
                    errorAlert();
                    submitButton.attr('disabled', false);
                }
            } else {
                submitButton.attr('disabled', true);
                const response = await axios.post(`/v1/job/create`, formData);
                const responseData = await response.data;
                console.log(responseData);
                if (responseData.status === 'success') {
                    successAlert().then(() => {
                        resetField()
                        $('#jobModal').modal('hide');
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
            if (error.response.status == 422) {
                warningAlert();
                $('.form-ckeditor').addClass('has-error');
                $('.error-description').removeAttr('hidden');
            } else {
                errorAlert();
            }
        }
    }

    async getDataQualificationAndRequirement(id) {
        try {
            const response = await axios.get(`/v1/job/get/${id}`);
            const { qualification: qualifications, requirement: requirements } = response.data.data;
            const renderList = (items, selector) => {
                const $list = $(selector);
                $list.empty();
                items.forEach(item => $list.append(`<li>${item}</li>`));
            };

            renderList(qualifications, '#qualificationList');
            renderList(requirements, '#requirementList');
        } catch (error) {
            console.error('Error fetching qualification and requirement data:', error);
        }
    }

    async getDataById(id, checkingEdit) {
        try {
            const response = await axios.get(`/v1/job/get/${id}`);
            const responseData = response.data;
            console.log('description', responseData);
            $('#modal-title').text("Edit Data");
            $('#id').val(responseData.data.id);
            $('#job_opening').val($('<div>').html(responseData.data.job_opening).text());
            $('#experience').val(responseData.data.experience);
            $('#department').val(responseData.data.department);

            $('#qualification').val(responseData.data.qualification[0]);
            $('#requirement').val(responseData.data.requirement[0]);
            $('#start_date').val(responseData.data.start_date);
            $('#end_date').val(responseData.data.end_date);

            responseData.data.qualification.slice(1).forEach((qualification) => {
                const newInputGroup = `
                    <div class="d-flex align-items-center mb-2">
                        <input name="qualification[]" type="text" class="form-control me-2" value="${qualification}">
                        <button type="button" class="btn btn-danger remove">Hapus</button>
                    </div>
                `;
                $('#input-group-container').append(newInputGroup);
            });

            responseData.data.requirement.slice(1).forEach((requirement) => {
                const newInputGroup = `
                    <div class="d-flex align-items-center mb-2">
                        <input name="requirement[]" type="text" class="form-control me-2" value="${requirement}">
                        <button type="button" class="btn btn-danger remove">Hapus</button>
                    </div>
                `;
                $('#input-group-container2').append(newInputGroup);
            });

            $('#input-group-container').on('click', '.remove', function () {
                $(this).parent().remove();
            });

            $('#input-group-container2').on('click', '.remove', function () {
                $(this).parent().remove();
            });

            checkingEdit();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteData(id) {
        try {
            deleteAlert().then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`/v1/job/delete/${id}`)
                    const responseData = await response.data
                    console.log(response)
                    if (responseData.status === 'success') {
                        successDeleteAlert().then(() => {
                            window.location.reload()
                        })
                    } else {
                        errorAlert()
                    }
                }
            })
        } catch (error) {
            errorAlert()
        }
    }
}

export default JobService