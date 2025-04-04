import FileApplyService from "./fileapply.service.js?v=1.0.0";

$(document).ready(function () {
    const fileApplyService = new FileApplyService()
    fileApplyService.getAllData()

    $(document).on('click', '.review-modal', function () {
        const id = $(this).data('id')
        fileApplyService.getReview(id)
    })
});