class InterviewService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/interview/', { search: params });

        table.empty();
        pagination.empty();
        
        try {
            let tableBody

            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

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
                    if (item.time_interview == null) {
                        tableBody += "<td>" + "-" + "</td>";
                    } else {
                        tableBody += "<td>" + item.time_interview + "</td>";
                    }
    
                    if (item.link == null) {
                        tableBody += "<td>" + "Interview offline" + "</td>";
                    } else {
                        tableBody += "<td>" + item.link + "</td>";
                    }
    
                    if (item.status_interview == 'pending') {
                        tableBody += "<td>" + "<span class='badge badge-warning'>Siap interview</span>" + "</td>"
                    }else if(item.status_interview == 'lolos') {
                        tableBody += "<td>" + "<span class='badge badge-success'>Lolos</span>" + "</td>"
                    }else{
                        tableBody += "<td>" + "<span class='badge badge-danger'>Tidak Lolos</span>" + "</td>"
                    }
    
                    if (item.time_interview == null) {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-interview mr-1' data-toggle='modal' data-target='#jadwalInterviewModal' data-id='" +
                            item.id + "'>Buat jadwal interview</button>"
                    }else if(item.status_interview == 'lolos' ){
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-wa mr-1' data-phone='" +
                            item.file.pelamar.phone + "'><i class='icon-phone'></i></button>" +
                            "<button class='btn btn-sm btn-reject mr-1' data-toggle='modal' data-target='#rejectModal' data-id='" +
                            item.id + "'>Tidak Lolos</button>"
                    }else if(item.status_interview == 'pending' ) {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-approve mr-1'  data-id='" +
                            item.id + "'>Lolos</button>" +
                            "<button class='btn btn-sm btn-reject mr-1' data-toggle='modal' data-target='#rejectModal' data-id='" +
                            item.id + "'>Tidak Lolos</button>"
                    } else {
                        tableBody += "<td>" + "-" + "</td>";
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
        } catch (error) {
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
                    window.location.reload();
                })
                
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

    async approve(id) {
        console.log('id', id);
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data yang sudah di approve tidak bisa diubah lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, setujui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post(`/v1/interview/approve/${id}`);
                const responseData = await response.data;
                if (responseData.status === 'success') {
                    Swal.fire(
                        'Berhasil!',
                        'Data berhasil di approve silahkan kunjungi halaman archive untuk melihat hasil interview', 
                        'success'
                    ).then(() => {
                        this.getAllData();
                    })
                } else {
                    errorAlert();
                }
            }
        })
    }

    async reject(e, id){
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);
            const id_berkas = id
            formData.append('id_berkas', id_berkas)
            submitButton.attr('disabled', true);
            const response = await axios.post(`/v1/interview/reject/${id_berkas}`, formData);
            const responseData = await response.data;
            console.log('disni', responseData);
            if (responseData.status === 'success') {
                Swal.fire({
                    'title': 'Berhasil!',
                    'text': 'Data berhasil di reject',
                    'icon': 'success',
                }).then(() => {
                    window.location.reload();
                })
                
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