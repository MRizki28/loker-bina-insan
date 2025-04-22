class FileApplyService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/file-apply', { search: params });

        table.empty();
        pagination.empty();

        try {
            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

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
                    tableBody += "<td>" + item.pelamar.name + "</td>"
                    tableBody += "<td>" + item.job.name + "</td>"
                    // tableBody +=
                    //     "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    //     "<button class='btn btn-sm qualification-modal mr-1' data-toggle='modal' data-target='#qualificationModal' data-id='" +
                    //     item.id + "'><i class='fas fa-eye'></i></button>"
                    // tableBody += "<td>" + item.reason + "</td>"
                    tableBody += "<td>" + badgeHtml + "</td>"
                    tableBody += "<td>" + (item.reason_reject ?? "-") + "</td>";
                    tableBody += "<td>" + item.pelamar.phone + "</td>";
                    if (item.status === 'pending') {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm review-modal mr-1' data-toggle='modal' data-target='#reviewModal' data-id='" +
                            item.id + "'>Review</button>" +
                            "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                            item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                            "</td>";
                    } else {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<span>Sudah di review</span>" +
                            "</td>";
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

    async getReview(id) {
        try {
            const response = await axios.get(`/v1/file-apply/get/${id}`);
            const responseData = await response.data;

            let badgeHtml = '';
            if (responseData.data.status == 'pending') {
                badgeHtml = '<span class="badge badge-warning">Sedang di review</span>';
            } else if (responseData.data.status == 'rejected') {
                badgeHtml = '<span class="badge badge-danger">Ditolak</span>';
            } else if (responseData.data.status == 'approved') {
                badgeHtml = '<span class="badge badge-success">Diterima</span>';
            }
            console.log('ini response', responseData)
            $('#nameJob').text(responseData.data.job.name);
            $('#status').html(badgeHtml);
            $('#description').text(responseData.data.job.description);
            responseData.data.job.requirement.forEach(requirement => {
                $('#requirement').append('<li>' + requirement + '</li>');
            });
            responseData.data.job.qualification.forEach(qualification => {
                $('#qualification').append('<li>' + qualification + '</li>');
            });
            $('#reason').text(responseData.data.reason);

            const filePath = `/uploads/fileapply/${responseData.data.file}`;
            $('#unduhFile').attr('href', filePath).attr('download', responseData.data.file);
            $('#fileLabel').text(responseData.data.file);
            $('#approveBtn').attr('data-id', id);
            $('#rejectBtn').attr('data-id', id);


        } catch (error) {
            console.log(error);
        }
    }

    async reject(id, e) {
        console.log(id)
        let submitButton = $(e.target).find(':submit')
        try {
            const response = await axios.post(`/v1/file-apply/review/${id}`, {
                status: 'rejected',
                reason_reject: $('#reason_reject').val(),
            });

            const responseData = await response.data;
            if (responseData.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: responseData.message,
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
            errorAlert();
            console.log(error);
        }
    }

    async approve(id, e) {
        console.log(id)
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Anda akan menyetujui lamaran ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, setujui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post(`/v1/file-apply/review/${id}`, {
                    status: 'approved',
                });

                const responseData = await response.data;
                if (responseData.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Sukses approve lamaran, silahkan check pada menu wawancara',
                    }).then(() => {
                        window.location.reload();
                    })
                } else {
                    errorAlert();
                }
            }
        })
    }

    async penilaianModal() {
        const response = await axios.get('/v1/penilaian/get-kriteria-for-berkas-review');
        const responseData = await response.data;
        console.log('ini response', responseData)
        if (responseData.status === 'success') {
            const container = $('#form-penilaian-dinamis');
            container.empty();
    
            $.each(responseData.data, function (index, kriteria) {
                let selectAlternatif = `<select class="form-control" name="id_bobot_alternatif[${kriteria.id}]">`;
                selectAlternatif += `<option value="" selected disabled hidden>Choose here</option>`;  // Opsi default
    
                $.each(kriteria.alternatif, function (i, alt) {
                    selectAlternatif += `<option value="${alt.id}">${alt.name_alternatif}</option>`;
                });
    
                selectAlternatif += `</select>`;
    
                const html = `
                    <div class="form-group mb-3">
                        <label class="font-weight-bold">${kriteria.name_kriteria}</label>
                        <input type="hidden" name="id_bobot_kriteria[${kriteria.id}]" value="${kriteria.id}">
                        ${selectAlternatif}
                    </div>
                `;
                container.append(html);
            });
        } else {
            console.log('Error in response:', responseData.message);
        }
    }

    async submitPenilaian(e){
        e.preventDefault();
        let submitButton = $(e.target).find(':submit')
        const originalContent = submitButton.html()
        const setButtonLoading = (isLoading) => {
            if (isLoading) {
                submitButton.prop('disabled', true).html(`
                    <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                    Sedang Diproses...
                `);
            } else {
                submitButton.prop('disabled', false).html(originalContent);
            }
        }

        setButtonLoading(true);
        try {
            const formData = new FormData(e.target);
            formData.append('approve')
            const response = await axios.post(`${appUrl}v1/penilaian/create`, formData)
            const responseData = await response.data;
            console.log('ini response', responseData)
        } catch (error) {
            console.log(error)
            warningAlert();

        } finally{
            setButtonLoading(false);
        }
    }
    
}

export default FileApplyService;