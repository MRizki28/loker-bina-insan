class ArchiveService {
    async getAllData(url) {
        const pagination = $('.pagination');
        const container = $('#data-pengguna');
        const totalData = $('#data-total');

        let search = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/user', { search });

        try {
            const response = await axios.get(endpoint);
            const result = await response.data;
            const users = result.data.data;
            const total = result.data.total;
            console.log(result);
            container.empty();
            totalData.text(total);
            pagination.empty();

            if (users.length === 0) {
                container.html('<div class="col-12 text-center"><em>Data tidak ditemukan</em></div>');
                return;
            }

            users.forEach(user => {
                const item = `
                    <div class="col-md-3 mb-3">
                        <button type="button"
                        class="btn-user btn btn-primary w-100 border p-2 rounded bg-white d-flex justify-content-center align-items-center"
                        data-name="${user.name}" data-id="${user.id}">
                        <span class="fw-bold">${user.name}</span>
                        </button>
                    </div>
                `;
                container.append(item);
            });

            paginationLink(pagination, result);

        } catch (error) {
            console.error('Gagal ambil data pengguna:', error);
            container.html('<div class="col-12 text-center text-danger">Data tidak ditemukan.</div>');
        }
    }

    async getDataByPelamar(id, url) {
        console.log(id);
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || `/v1/archive/get-data-by-pelamar/${id}`, { search: params });

        table.empty();
        pagination.empty();

        try {
            const response = await axios.get(endpoint);
            const responseData = response.data;
            console.log(responseData);

            let tableBody = '';
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
                    tableBody += "<td>" + item.name + "</td>"

                    tableBody += "<td>" + item.start_date + ' - ' + item.end_date + "</td>"
                    tableBody += "<td>" + item.job_type + "</td>";
                    tableBody += "<td>" + badgeHtml + "</td>";
                    if (item.status_interview == 'pending') {
                        tableBody += "<td>" + "<span class='badge badge-warning'>Siap interview</span>" + "</td>"
                    }else if(item.status_interview == 'lolos') {
                        tableBody += "<td>" + "<span class='badge badge-success'>Lolos</span>" + "</td>"
                    }else{
                        tableBody += "<td>" + "<span class='badge badge-danger'>Tidak Lolos</span>" + "</td>"
                    }
                    tableBody += "</tr>";
                });

                table.append(tableBody);
                dataNotFound.hide();
                paginationLink(pagination, responseData);
                totalData.text(responseData.data.total);
            } else {
                table.empty();
                dataNotFound.show();
                totalData.text('0');
            }

        } catch (error) {
            console.error('Gagal mengambil data pelamar:', error);
            table.empty();
            dataNotFound.show();
            pagination.empty();
            totalData.text('0');
        }
    }

}

export default ArchiveService;
