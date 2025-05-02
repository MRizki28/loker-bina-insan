import ArchiveService from "./archive.service.js?v=1.0.1";

$(document).ready(function () {
    const archiveService = new ArchiveService()
    archiveService.getAllData()
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        archiveService.getAllData(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            archiveService.getAllData();
        }
    })

    $(document).on('click', '#search-pengguna', function () {
        archiveService.getAllData();
    })

    $('#data-pengguna').off('click', '.btn-user').on('click', '.btn-user', function () {
        const name = $(this).data('name');
        const id = $(this).data('id');
        console.log(id);
        $('#name-pengguna').text(name);
        archiveService.getDataByPelamar(id);

        $(document).on('click', '#search-button', function () {
            archiveService.getDataByPelamar(id);
        })
    });
    
});