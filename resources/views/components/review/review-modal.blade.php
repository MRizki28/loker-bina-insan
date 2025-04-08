<div class="modal fade" id="reviewModal" tabindex="-1" role="dialog" aria-labelledby="jobLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 800px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title">Detail Lamaran</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <!-- Header job info -->
            <div class="p-4">
                <div class="d-flex align-items-center mb-3">
                    <div class="mr-3">
                        <img src="{{ asset('static/img/logo.png') }}" alt="logo" class="img-fluid" style="width: 200px; height: 90px;">
                    </div>
                    <div>
                        <h4 class="mb-1" id="nameJob">Guru SMP</h4>
                        <div id="status">fulltime</div>
                        <p class="text-muted mt-2 mb-0" id="diApply">Diapply pada: 01 April 2025</p>
                    </div>
                </div>
                <hr>
                
                <!-- Two column layout -->
                <div class="row mt-4">
                    <!-- Left column - job details -->
                    <div class="col-md-7">
                        <h5 class="font-weight-bold">Deskripsi Pekerjaan</h5>
                        <p id="description"></p>
                        
                        <h5 class="font-weight-bold mt-4">Persyaratan</h5>
                        <ul id="requirement">
                        </ul>
                        
                        <h5 class="font-weight-bold mt-4">Kualifikasi</h5>
                        <ul id="qualification">
                        </ul>
                    
                    </div>
                    
                    <!-- Right column - applicant data -->
                    <div class="col-md-5">
                        <h5 class="font-weight-bold">Data Lamaran</h5>
                        
                        <div class="mt-3">
                            <label class="font-weight-bold">Deskripsikan diri anda</label>
                            <div class="form-control bg-light" id="reason"></div>
                        </div>
                        
                        <div class="mt-3">
                            <label class="font-weight-bold">File</label>
                            <div class="form-control bg-light">1743514335.pdf</div>
                            <a id="unduhFile" class="btn btn-outline-primary mt-2" href="#" download>Unduh file</a>

                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary approveBtn" id="approveBtn">Approve ke tahap wawancara</button>
                <button class="btn btn-danger" id="rejectBtn">Tolak</button>
                <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>