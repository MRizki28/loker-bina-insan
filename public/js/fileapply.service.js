class FileApplyService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/file-apply', { search: params });
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
                }else if(item.status == 'rejected') {
                    badgeHtml = '<span class="badge badge-danger">Ditolak</span>';
                }else{
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
                tableBody += "<td>" + item.reason_reject + "</td>";
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm review-modal mr-1' data-toggle='modal' data-target='#reviewModal' data-id='" +
                    item.id + "'>Review</button>" +
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


        } catch (error) {
            console.log(error);
        }
    }
}

export default FileApplyService;