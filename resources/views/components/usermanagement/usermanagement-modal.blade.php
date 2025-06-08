    {{-- modal updert data --}}
    <div class="modal fade" id="userManagementModal" tabindex="-1" role="dialog" aria-labelledby="userManagementLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Tambah Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="formTambah">
                    <div class="modal-body">
                        @csrf
                        <div class="row py-2">
                            <div class="col-md-12">
                                <input type="hidden" name="id" id="id" value="">
                                <div class="form-group fill form-show-validation">
                                    <label for="role">Role</label>
                                    <select name="role" id="role" class="form-control">
                                        <option value="" selected disabled hidden>Choose here</option>
                                        <option value="superadmin">Super Admin</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div id="user-container"></div> 
                                <div class="form-group fill form-show-validation">
                                    <label for="name">Nama pengguna</label>
                                    <input id="name" name="name" type="text" class="form-control"
                                        placeholder="name anda" autocomplete="off">
                                </div>
                                <div class="form-group fill form-show-validation">
                                    <label for="email">Email</label>
                                    <input id="email" name="email" type="email" class="form-control"
                                        placeholder="email anda" autocomplete="off">
                                </div>
                                <div class="form-group fill form-show-validation">
                                    <label for="phone">Nomor handphone</label>
                                    <input id="phone" name="phone" type="text" class="form-control"
                                        placeholder="phone anda" autocomplete="off">
                                </div>
                                <div class="form-group form-show-validation">
                                    <label for="password">Password</label>
                                    <input type="text" class="form-control" style="height: 44px !important" value="123456" name="password" id="password" disabled>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Tutup</button>
                        <button type="submit" class="btn btn-outline-primary">Simpan Data</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

