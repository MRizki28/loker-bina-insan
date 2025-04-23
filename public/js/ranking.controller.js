import RankingService from "./ranking.service.js?v=1.0.0";

$(document).ready(function () {
    const rankingService = new RankingService();
    $('#job-search').select2();
    $(".select2-selection").addClass("form-control");
    rankingService.getJob();

    $(document).on('change', '#job-search', function () {

        rankingService.getAllData();
    })
    rankingService.getAllData();
});