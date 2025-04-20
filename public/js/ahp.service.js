class AhpService {
    async getDataKriteria(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/bobot-kriteria', { search: params });

        table.empty();
        pagination.empty();

        try {
            let tableBody
            
            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

            if (responseData.message === 'Success get data bobot kriteria') {
                $.each(responseData.data.data, function (index, item) {
                    tableBody += "<tr>";
                    tableBody += "<td>" + item.name_kriteria + "</td>"
                    tableBody += "<td>" + item.bobot_prioriti_kriteria + "</td>"
                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center '>" +
                        "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#bobotKriteriaModal' data-id='" +
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

    async createDataKriteria(e, checkingEdit, resetField) {
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);

            if (checkingEdit()) {
                const id = $('#id').val()
                const response = await axios.post(`/v1/bobot-kriteria/update/${id}`, formData);
                const responseData = await response.data;
                if (responseData.status === 'success') {
                    successUpdateAlert().then(() => {
                        resetField()
                        $('#bobotKriteriaModal').modal('hide');
                    })
                    this.getDataKriteria();
                    submitButton.attr('disabled', false);
                } else {
                    errorAlert();
                    submitButton.attr('disabled', false);
                }
            } else {
                submitButton.attr('disabled', true);
                const response = await axios.post(`/v1/bobot-kriteria/create`, formData);
                const responseData = await response.data;
                console.log(responseData);
                if (responseData.status === 'success') {
                    successAlert().then(() => {
                        resetField()
                        $('#bobotKriteriaModal').modal('hide');
                    })
                    this.getDataKriteria();
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
            } else {
                errorAlert();
            }
        }
    }

  
    async getDataByIdKriteria(id, checkingEdit) {
        try {
            const response = await axios.get(`/v1/bobot-kriteria/get/${id}`);
            const responseData = response.data;
            console.log('description', responseData);
            $('#modal-title').text("Edit Data");
            $('#id').val(responseData.data.id);
            $('#name_kriteria').val($('<div>').html(responseData.data.name_kriteria).text());
            $('#bobot_prioriti_kriteria').val(responseData.data.bobot_prioriti_kriteria);

            checkingEdit();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteDataKriteria(id) {
        try {
            deleteAlert().then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`/v1/bobot-kriteria/delete/${id}`)
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

export default AhpService