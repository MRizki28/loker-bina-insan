class InterviewService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/interview/', { search: params });
        const response = await axios.get(endpoint);
        const responseData = await response.data;
        console.log('ini response', responseData)

        table.empty();
        pagination.empty();


        let tableBody
        if (responseData.message === 'Success get data job') {
            $.each(responseData.data.data, function (index, item) {
                let badgeHtml = '';

                if (item.status == 'pending') {
                    badgeHtml = '<span class="badge badge-warning">Sedang di review</span>';
                } else if (item.status == 'rejected') {
                    badgeHtml = '<span class="badge badge-danger">Ditolak</span>';
                } else {
                    badgeHtml = '<span class="badge badge-success">Approve lanjut ke tahap wawancara</span>';
                }

                tableBody += "<tr>";
                tableBody += "<td>" + item.file.pelamar.name + "</td>"
                tableBody += "<td>" + item.file.job.name + "</td>"

                tableBody += "<td>" + badgeHtml + "</td>"
                if(item.time_interview == null) {
                    tableBody += "<td>" + "-" + "</td>";
                }else{
                    tableBody += "<td>" + item.time_interview + "</td>";
                }

                if(item.link == null) {
                    tableBody += "<td>" + "Interview offline" + "</td>";
                }else{
                    tableBody += "<td>" + item.link + "</td>";
                }

                if (item.status_interview == 'pending') {
                    tableBody += "<td>" + "<span class='badge badge-warning'>Siap interview</span>" + "</td>"
                }


                if (item.time_interview == null) {
                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center '>" +
                        "<button class='btn btn-sm btn-interview mr-1' data-toggle='modal' data-target='#jadwalInterviewModal' data-id='" +
                        item.id + "'>Buat jadwal interview</button>"
                } else {
                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center '>" +
                        "<button class='btn btn-sm btn-approve mr-1'  data-id='" +
                        item.id + "'>Lolos</button>" +
                        "<button class='btn btn-sm btn-reject mr-1' data-toggle='modal' data-target='#rejectModal' data-id='" +
                        item.id + "'>Tidak Lolos</button>"

                }

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

    async createData(e, id) {
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);
            const id_berkas = id
            formData.append('id_berkas', id_berkas)
            submitButton.attr('disabled', true);
            const response = await axios.post(`/v1/interview/update/${id_berkas}`, formData);
            const responseData = await response.data;
            console.log('disni', responseData);
            if (responseData.status === 'success') {
                successAlert().then(() => {
                    resetField()
                    $('#jadwalInterviewModal').modal('hide');
                })
                this.getAllData();
                submitButton.attr('disabled', false);
            } else {
                errorAlert();
                submitButton.attr('disabled', false);
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
}

export default InterviewService;