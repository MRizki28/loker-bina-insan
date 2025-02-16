function paramsUrl(url, params) {
    if (params) {
        return url + '?' + $.param(params)
    }
    return url
}

function clearInputForm() {
    $(".form-control").val("")
    $(".form-control").val("").trigger('change');
}

function paginationLink(element, params) {
    params.data.links.forEach((link, index) => {
        if (index === 0) {
            element.append(`
                <li class="page-item ${params.data.prev_page_url ? '' : 'disabled'}">
                    <a class="page-link" href="${params.data.prev_page_url || '#'}" aria-label="Previous" id="pagination-prev" >
                        <span aria-hidden="true">«</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            `)
        } else if (index === params.data.links.length - 1) {
            element.append(`
                <li class="page-item ${params.data.next_page_url ? '' : 'disabled'}">
                    <a class="page-link" href="${params.data.next_page_url || '#'}" aria-label="Next" id="pagination-next" >
                        <span aria-hidden="true">»</span></span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            `)
        } else {
            element.append(`
                <li class="page-item ${link.active ? 'active disabled' : ''}"><a class="page-link" href="${link.active ? '#' : link.url}">${link.label}</a></li>
            `)
        }
    })
}

function successAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil ditambahkan',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successLogin() {
    return Swal.fire({
        title: 'Success',
        text: 'Login berhasil',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successUpdateAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil diperbaharui',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successSettingPasswordAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Password berhasil diperbaharui',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function errorAlert() {
    Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true
    });
}

function failedDeleteDataLoginAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Tidak bisa delete diri sendiri!',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function warningAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Periksa kembali inputan anda !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function deleteAlert() {
    return Swal.fire({
        title: 'Hapus ?',
        text: 'Anda tidak dapat mengembalikan  ini',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya',
        reverseButtons: true,
    })
}

function exportAlert() {
    return Swal.fire({
        title: 'Export ?',
        text: 'Hanya data dengan status approved yang akan di export',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya',
        reverseButtons: true,
    })
}

function successDeleteAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil dihapus',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true
    })
}

function emailOrPasswordWrong() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Email atau password anda salah !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function jabatanAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Data dengan jabatan ini sudah ada silahkan pilih yang lain !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function emailAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Email sudah ada sebelumnya silahkan gunakan email lain !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function maximalFile() {
    Swal.fire({
        title: 'Error',
        text: 'File yang diizinkan maksimal 6',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true
    });
}

function insertLineBreaks(text, wordsPerLine) {
    const words = text.split(' ');
    let newText = '';
    let wordCount = 0;

    for (let i = 0; i < words.length; i++) {
        newText += words[i] + ' ';
        wordCount++;

        if (wordCount === wordsPerLine) {
            newText += '<br>';
            wordCount = 0;
        }
    }

    return newText.trim();
}

function generateFormPreview(previewContainerId) {
    if ($(`#${previewContainerId} #preview`).length === 0) {
        $(`#${previewContainerId}`).html('<div class="text-center"><img src="" alt="" id="preview" class="mx-auto d-block pb-2" style="max-width: 200px; padding-top: 23px"></div>');
    }
}

function generateFormPreviewHero(previewContainerId) {
    if ($(`#${previewContainerId} #preview`).length === 0) {
        $(`#${previewContainerId}`).html('<div class="text-center"><img src="" alt="" id="preview" class="mx-auto d-block pb-2" style="max-width: 200px; padding-top: 23px"><span class="d-flex justify-content-center" id="labelimg1">Gambar desktop</span></div>');
    }
}


function generateFormPreviewHero2(previewContainerId) {
    if ($(`#${previewContainerId} #preview2`).length === 0) {
        $(`#${previewContainerId}`).html('<div class="text-center"><img src="" alt="" id="preview2" class="mx-auto d-block pb-2" style="max-width: 200px; padding-top: 23px"><span class="d-flex justify-content-center" id="labelimg2">Gambar mobile</span></div>');
    }
}

function generateFormStatus(statusContainerId) {
    console.log('Generating form status for:', statusContainerId);
    if ($(`#${statusContainerId} #status`).length === 0) {
        $(`#${statusContainerId}`).html(
            `<div class="form-group fill form-show-validation" id="form-status">
                <label>Status</label>
                <select name="status" id="status" class="form-control">
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>`
        );
    }
}


$(document).ready(function () {
    $.validator.addMethod("fileExtension", function (value, element) {
        return this.optional(element) || /\.(png|jpg|jpeg|webp)$/i.test(value);
    },
        "Hanya file dengan ekstensi png, jpg, jpeg, webp yang diperbolehkan."
    );
});


function handleFileChange(previewSelector) {
    return function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $(previewSelector).attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
}

function formatCurrency(value) {
    let numberValue = value.replace(/[^0-9]/g, '');
    numberValue = numberWithCommas(numberValue);
    return numberValue
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
