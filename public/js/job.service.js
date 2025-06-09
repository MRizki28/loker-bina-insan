class JobService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')
    
        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/job', { search: params });
    
        table.empty();
        pagination.empty();
    
        try {
            let tableBody = '';
    
            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)
    
            if (responseData.message === 'Success get data job') {
                $.each(responseData.data.data, function (index, item) {
                    // Render kriteria sebagai <ul><li>
                    let criteriaHtml = '<ul class="mb-0 pl-3">';
                    if (Array.isArray(item.criteria)) {
                        item.criteria.forEach(crit => {
                            let label = '';
                            switch (crit.field) {
                                case 'experience':
                                    label = 'Pengalaman Kerja';
                                    break;
                                case 'education':
                                    label = 'Pendidikan';
                                    break;
                                case 'age':
                                    label = 'Umur';
                                    break;
                                case 'graduation_year':
                                    label = 'Lulusan Tahun';
                                    break;
                                case 'major':
                                    label = 'Jurusan';
                                    break;
                                default:
                                    label = crit.field;
                            }
    
                            criteriaHtml += `<li><strong>${label}</strong> ${crit.operator} ${crit.value}</li>`;
                        });
                    } else {
                        criteriaHtml += `<li>Tidak ada</li>`;
                    }
                    criteriaHtml += '</ul>';
    
                    tableBody += "<tr>";
                    tableBody += "<td>" + item.name + "</td>";
                    tableBody += "<td>" + item.description + "</td>";
                    tableBody += "<td>" + item.start_date + ' - ' + item.end_date + "</td>";
                    tableBody += "<td>" + item.job_type + "</td>";
                    tableBody += "<td>" + item.category + "</td>";
                    tableBody += "<td>" + item.salary_min + " s/d " + item.salary_max + "</td>";
                    tableBody += "<td>" + criteriaHtml + "</td>";
                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center'>" +
                        "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#lokerModal' data-id='" +
                        item.id + "'><i class='fas fa-edit'></i></button>" +
                        "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                        item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                        "</td>";
                    tableBody += "</tr>";
                    dataNotFound.hide();
                });
    
                table.append(tableBody);
                paginationLink(pagination, responseData);
                totalData.text(responseData.data.total);
            } else {
                table.empty();
                dataNotFound.show();
                pagination.empty();
                totalData.text('0');
            }
        } catch (error) {
            table.empty();
            dataNotFound.show();
            pagination.empty();
            totalData.text('0');
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
                        $('#lokerModal').modal('hide');
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
                        $('#lokerModal').modal('hide');
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
                    error.response.data.data?.salary_max?.includes(
                        "The maximum salary must be greater than or equal to the minimum salary."
                    )
                ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Perhatian',
                        text: 'Gaji Maksimal harus lebih besar dari Gaji Minimal',

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
            const responseData = response.data.data;
    
            $('#modal-title').text("Edit Data");
            $('#id').val(responseData.id);
            $('#name').val($('<div>').html(responseData.name).text());
            $('#start_date').val(responseData.start_date);
            $('#end_date').val(responseData.end_date);
            $('#job_type').val(responseData.job_type);
            $('#category').val(responseData.category);
            $('#description').val(responseData.description);
            $('#salary_min').val(responseData.salary_min);
            $('#salary_max').val(responseData.salary_max);
    
            responseData.criteria.forEach((c, index) => {
                const $valueInput = $(`[name="criteria[${index}][value]"]`);
            
                if ($valueInput.is('select')) {
                    $valueInput.val(c.value);  
                } else {
                    $valueInput.val(c.value);  
                }
            
                const $operatorInput = $(`[name="criteria[${index}][operator]"]`);
                if ($operatorInput.length) {
                    $operatorInput.val(c.operator);
                }
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