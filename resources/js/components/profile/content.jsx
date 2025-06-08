import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SweetAlertService from "../../utils/sweetalert";
import { setLogout } from "../../redux/slices/checkLogin";
import { persistor } from "../../redux/store";

export default function Content() {
  const [activeTab, setActiveTab] = useState("biodata");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/v1/biodata');
        console.log(response)
        const data = response.data.data;

        setValue("birth_place_date", data.birth_place_date || "");
        setValue("mother_name", data.mother_name || "");
        setValue("father_name", data.father_name || "");
        setValue("child_order", data.child_order || "");
        setValue("sibling_count", data.sibling_count || "");
        setValue("address", data.address || "");
      } catch (err) {
        console.error("Gagal mengambil data user", err);
      }
    };
    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/v1/biodata/update', data);
      console.log("Update success", response.data);
      if (response.data.message === "Success update biodata") {
        SweetAlertService.successUpdateProfile()
      }
    } catch (error) {
      SweetAlertService.errorAlert()
    } finally {
      setLoading(false);
    }
  };

  const spinner = loading ? (
    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  ) : (
    "Simpan Perubahan"
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-1">Manajemen profile</p>
        </div>

        {/* Tab */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("biodata")}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "biodata"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Biodata
            </button>
            <button
              onClick={() => setActiveTab("setting")}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "setting"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Setting
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "biodata" && (
          <div className="w-full flex justify-center p-6">
            <div className="w-full max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Perbarui Biodata Anda</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* TTL */}
                  <div>
                    <label htmlFor="birth_place_date" className="block text-sm font-medium text-gray-700">
                      Tempat Tanggal Lahir
                    </label>
                    <input
                      type="text"
                      id="birth_place_date"
                      {...register("birth_place_date", { required: "Ttl wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.birth_place_date ? "border-red-500" : "border-gray-300"}`}
                      placeholder="contoh: Jakarta, 01 Januari 2000"
                    />
                    {errors.birth_place_date && <p className="text-red-500 text-xs">{errors.birth_place_date.message}</p>}
                  </div>

                  {/* Nama Ibu */}
                  <div>
                    <label htmlFor="mother_name" className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                    <input
                      type="text"
                      id="mother_name"
                      {...register("mother_name", { required: "Nama ibu wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.mother_name ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Nama ibu kandung"
                    />
                    {errors.mother_name && <p className="text-red-500 text-xs">{errors.mother_name.message}</p>}
                  </div>

                  {/* Nama Ayah */}
                  <div>
                    <label htmlFor="father_name" className="block text-sm font-medium text-gray-700">Nama Ayah</label>
                    <input
                      type="text"
                      id="father_name"
                      {...register("father_name", { required: "Nama ayah wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.father_name ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Nama ayah kandung"
                    />
                    {errors.father_name && <p className="text-red-500 text-xs">{errors.father_name.message}</p>}
                  </div>

                  {/* Anak ke-berapa */}
                  <div>
                    <label htmlFor="child_order" className="block text-sm font-medium text-gray-700">Anak ke-berapa</label>
                    <input
                      type="number"
                      id="child_order"
                      {...register("child_order", { required: "Data ini wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.child_order ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Contoh: 2"
                    />
                    {errors.child_order && <p className="text-red-500 text-xs">{errors.child_order.message}</p>}
                  </div>

                  {/* Jumlah saudara */}
                  <div>
                    <label htmlFor="sibling_count" className="block text-sm font-medium text-gray-700">Jumlah saudara kandung</label>
                    <input
                      type="number"
                      id="sibling_count"
                      {...register("sibling_count", { required: "Jumlah saudara wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.sibling_count ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Contoh: 4"
                    />
                    {errors.sibling_count && <p className="text-red-500 text-xs">{errors.sibling_count.message}</p>}
                  </div>

                  {/* Alamat */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                    <textarea
                      id="address"
                      rows={3}
                      {...register("address", { required: "Alamat wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.address ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Contoh: Jl. Merdeka No. 123, Jakarta Timur"
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                  </div>
                </div>

                {/* Tombol Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    {spinner}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "setting" && (
          <div className="w-full flex justify-center p-6">
            <div className="w-full max-w-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Ubah Password</h2>
              <form
                onSubmit={handleSubmit(async (formData) => {
                  try {
                    if (formData.password !== formData.password_confirmation) {
                      alert("Konfirmasi password tidak sama");
                      return;
                    }
                  
                    setLoading(true);
                  
                    const response = await axios.post('/v1/biodata/update-password', {
                      password_old: formData.password_old,
                      password: formData.password,
                      password_confirmation: formData.password_confirmation,
                    });
                  
                    if (response.data.message === 'Old password is wrong') {
                      alert("Password lama salah, silakan coba lagi.");
                      return;
                    }

                    if(response.data.message === 'New password must be different from old password' ){
                      alert("Password baru harus berbeda dari password lama.");
                      return;
                    }
                  
                    if (response.status === 200) {
                      alert("Password berhasil diubah!");
                      localStorage.removeItem("backup");
                      localStorage.removeItem("persist:root");
                  
                      // Opsional: Delay agar alert muncul dulu
                      setTimeout(() => {
                        window.location.href = '/login';
                      }, 100);
                  
                      return; // Hindari lanjut ke finally/catch
                    }
                  
                  } catch (error) {
                    if (error.response && error.response.status === 422) {
                      const errors = error.response.data.errors;
                      let errorMessages = '';
                  
                      Object.keys(errors).forEach((field) => {
                        errors[field].forEach((msg) => {
                          errorMessages += `• ${msg}\n`;
                        });
                      });
                  
                      alert(`Gagal mengubah password:\n${errorMessages}`);
                    } else {
                      alert("Terjadi kesalahan saat mengubah password. Silakan coba lagi.");
                    }
                  } finally {
                    setLoading(false);
                  }
                  
                })}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {/* Password Lama */}
                  <div>
                    <label htmlFor="password_old" className="block text-sm font-medium text-gray-700">Password Lama</label>
                    <input
                      type="password"
                      id="password_old"
                      {...register("password_old", { required: "Password lama wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.password_old ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Masukkan password lama"
                    />
                    {errors.password_old && <p className="text-red-500 text-xs">{errors.password_old.message}</p>}
                  </div>

                  {/* Password Baru */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password Baru</label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", { required: "Password baru wajib diisi", minLength: { value: 6, message: "Minimal 6 karakter" } })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Masukkan password baru"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                  </div>

                  {/* Konfirmasi Password Baru */}
                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      id="password_confirmation"
                      {...register("password_confirmation", { required: "Konfirmasi password wajib diisi" })}
                      className={`mt-1 p-2 w-full border rounded-md ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Ulangi password baru"
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs">{errors.password_confirmation.message}</p>}
                  </div>
                </div>

                {/* Tombol Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      "Ubah Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
