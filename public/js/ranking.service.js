class RankingService {
    async getAllData() {
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#job-search').val() || '';
        let endpoint = `/v1/ahp/get?lowongan=${params}`;;

        table.empty();

        try {
            const response = await axios.get(endpoint);
            const responseData = await response.data;
            console.log('ini response', responseData)

            let tableBody
            if (responseData.message === 'Ranking per penilaian berhasil dihitung') {
                $.each(responseData.data, function (index, item) {
                    tableBody += "<tr>";
                    tableBody += "<td>" + item.name_pelamar + "</td>"
                    tableBody += "<td>" + item.job + "</td>"
                    tableBody += "<td>" + item.K1 + "</td>"
                    tableBody += "<td>" + item.K2 + "</td>"
                    tableBody += "<td>" + item.K3 + "</td>"
                    tableBody += "<td>" + item.K4 + "</td>"
                    tableBody += "<td>" + item.K5 + "</td>"
                    tableBody += "<td>" + item.K6 + "</td>"
                    tableBody += "<td>" + item.total_score + "</td>"
                    tableBody += "<td>" + item.ranking + "</td>"

                    tableBody += "</tr>";
                    dataNotFound.hide()
                });

                table.append(tableBody);
                totalData.text(responseData.data.total);
            } else {
                table.empty()
                dataNotFound.show()
                totalData.text('0')
            }
        } catch (error) {
            table.empty()
            dataNotFound.show()
            totalData.text('0')
        }
    }

    async getJob() {
            try {
                const response = await axios.get('/v1/job?limit=100')
                const responseData = await response.data
                console.log('job', responseData)
                let option = "";
                $.each(responseData.data.data, function (index, item) {
                    option += '<option value="' + item.name +
                        '">' + item.name + '</option>';
                });
                $('#job-search').append(option);
            } catch (error) {
                console.log(error)
            }
    }
}

export default RankingService;