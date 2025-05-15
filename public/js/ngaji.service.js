class NgajiService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/ngaji/', { search: params });

        table.empty();
        pagination.empty();

        try {
            let tableBody

            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

            if (responseData.message === 'Success get ngaji') {
                $.each(responseData.data.data, function (index, item) {

                    tableBody += "<tr>";
                    tableBody += "<td>" + item.psikotes.interview.file.pelamar.name + "</td>"
                    tableBody += "<td>" + item.psikotes.interview.file.job.name + "</td>"


                    if (item.time_ngaji == null) {
                        tableBody += "<td>" + "-" + "</td>";
                    } else {
                        tableBody += "<td>" + item.time_ngaji + "</td>";
                    }

                    if (item.status_ngaji == 'pending') {
                        tableBody += "<td>" + "<span class='badge badge-warning'>Siap test mengaji</span>" + "</td>"
                    } else if (item.status_ngaji == 'lolos') {
                        tableBody += "<td>" + "<span class='badge badge-success'>Lolos</span>" + "</td>"
                    } else {
                        tableBody += "<td>" + "<span class='badge badge-danger'>Tidak Lolos</span>" + "</td>"
                    }

                    tableBody += "<td>" + (item.reason_reject_ngaji ? item.reason_reject_ngaji : "-") + "</td>";

                    if (item.time_ngaji == null) {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-ngaji mr-1' data-toggle='modal' data-target='#jadwalNgajiModal' data-id='" +
                            item.id + "'>Buat jadwal test ngaji</button>"
                    } else if (item.status_ngaji == 'lolos') {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-wa mr-1' data-phone='" +
                            item.psikotes.interview.file.pelamar.phone + "'><i class='icon-phone'></i></button>" 
                    } else if (item.status_ngaji == 'pending') {
                        tableBody +=
                            "<td style='padding: 0 10px !important;'  class='text-center '>" +
                            "<button class='btn btn-sm btn-approve mr-1'  data-id='" +
                            item.id + "' data-id_file='" + item.psikotes.interview.file.id + "'>Lolos</button>" +
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
            const response = await axios.post(`/v1/ngaji/update/${id_berkas}`, formData);
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

    async reject(e, id) {
        let submitButton = $(e.target).find(':submit')
        try {
            const formData = new FormData(e.target);
            const id_berkas = id
            formData.append('id_berkas', id_berkas)
            submitButton.attr('disabled', true);
            const response = await axios.post(`/v1/ngaji/reject/${id_berkas}`, formData);
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

    async penilaianModal() {
        const response = await axios.get('/v1/penilaian/get-kriteria-for-ngaji');
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

    async submitPenilaian(e, id_file, id) {
        e.preventDefault();
        let submitButton = $(e.target).find(':submit');
        const originalContent = submitButton.html();

        const setButtonLoading = (isLoading) => {
            if (isLoading) {
                submitButton.prop('disabled', true).html(`
                    <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                    Sedang Diproses...
                `);
            } else {
                submitButton.prop('disabled', false).html(originalContent);
            }
        };

        setButtonLoading(true);

        try {
            const formData = new FormData(e.target);
            const penilaianResponse = await axios.post(`${appUrl}/v1/penilaian/create-penilaian-ngaji`, formData);
            const penilaianData = penilaianResponse.data;
            console.log('penilaianData', penilaianResponse)

            if (penilaianData.status !== 'success') {
                throw new Error('Gagal menyimpan penilaian.');
            }

            const reviewResponse = await axios.post(`${appUrl}/v1/ngaji/approve/${id}`);

            console.log('reviewResponse', reviewResponse)

            if (reviewResponse.status !== 200) {
                throw new Error('Gagal menyimpan review.');
            }

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Berhasil memberikan penilaian dan review',
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.log(error);
            warningAlert('Terjadi kesalahan saat menyimpan data.');
        } finally {
            setButtonLoading(false);
        }
    }
}

export default NgajiService;