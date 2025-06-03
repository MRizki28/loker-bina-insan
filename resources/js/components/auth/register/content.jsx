import { useForm } from "react-hook-form";
import loginBackground from "../../../../../public/static/img/hero.png";
import { Link } from "react-router-dom";
import SweetAlertService from "../../../utils/sweetalert";
import axios from "axios";
import { useState } from "react";

export function Content() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const [loading, setLoading] = useState(false);

    const spinner = loading ? (
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    ) : 'Sign Up';

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('v1/auth/register', data)
            const responseData = response.data;
            if (responseData.message === 'Register Success') {
                setLoading(false);
                SweetAlertService.successRegister().then(() => {
                    window.location.href = '/login';
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.response && error.response.data?.data?.password?.[0] === 'The password field confirmation does not match.') {
                SweetAlertService.passwordNotMatch();
            } else if (error.response && error.response.data?.data?.email?.[0] === 'The email has already been taken.') {
                SweetAlertService.emailAlreadyExist();
            } else {
                SweetAlertService.errorAlert();
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
                <div className="hidden lg:block lg:w-1/2">
                    <img src={loginBackground} alt="Login Background" className="object-cover w-full h-full" />
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
                        <h2 className="text-sm text-gray-500 mb-6 text-center">
                            Daftar dan bergabung bersama kami untuk memajukan pendidikan di Indonesia
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Nama */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", { required: "Nama wajib diisi" })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan nama anda"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Nomor Telepon */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input
                                    type="text"
                                    id="phone"
                                    {...register("phone", {
                                        required: "Nomor telepon wajib diisi",
                                        minLength: { value: 11, message: "Nomor telepon minimal 11 digit" },
                                        pattern: { value: /^[0-9]+$/, message: "Hanya boleh menggunakan angka" }
                                    })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    }}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan nomor telepon anda"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", { 
                                        required: "Email wajib diisi",
                                        pattern: { 
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                                            message: "Email tidak valid" 
                                        } 
                                    })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan email anda"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password & Konfirmasi Password dalam 2 kolom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password", {
                                            required: "Password wajib diisi",
                                            minLength: { value: 6, message: "Password minimal 6 karakter" }
                                        })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Inputkan password anda"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        {...register("password_confirmation", {
                                            required: "Konfirmasi password wajib diisi",
                                            validate: (value) => value === password || "Password tidak cocok"
                                        })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Konfirmasi password anda"
                                    />
                                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>}
                                </div>
                            </div>

                            {/* Alamat (textarea full width) */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat</label>
                                <textarea
                                    id="address"
                                    {...register("address", { required: "Alamat wajib diisi" })}
                                    rows={3}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 resize-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan alamat anda"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                            </div>

                            {/* Tempat & Tanggal Lahir */}
                            <div>
                                <label htmlFor="birth_place_date" className="block text-sm font-medium text-gray-700">Tempat & Tanggal Lahir</label>
                                <input
                                    type="text"
                                    id="birth_place_date"
                                    {...register("birth_place_date", { required: "Tempat & tanggal lahir wajib diisi" })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.birth_place_date ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Contoh: Jakarta, 1 Januari 2000"
                                />
                                {errors.birth_place_date && <p className="text-red-500 text-xs mt-1">{errors.birth_place_date.message}</p>}
                            </div>

                            {/* Nama Ibu & Nama Ayah dalam 2 kolom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="mother_name" className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                                    <input
                                        type="text"
                                        id="mother_name"
                                        {...register("mother_name", { required: "Nama ibu wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.mother_name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Inputkan nama ibu anda"
                                    />
                                    {errors.mother_name && <p className="text-red-500 text-xs mt-1">{errors.mother_name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="father_name" className="block text-sm font-medium text-gray-700">Nama Ayah</label>
                                    <input
                                        type="text"
                                        id="father_name"
                                        {...register("father_name", { required: "Nama ayah wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.father_name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Inputkan nama ayah anda"
                                    />
                                    {errors.father_name && <p className="text-red-500 text-xs mt-1">{errors.father_name.message}</p>}
                                </div>
                            </div>

                            {/* Anak ke & Dari ... bersaudara dalam 2 kolom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="child_order" className="block text-sm font-medium text-gray-700">Anak ke</label>
                                    <input
                                        type="number"
                                        id="child_order"
                                        {...register("child_order", { required: "Anak ke wajib diisi", min: { value: 1, message: "Minimal anak ke 1" } })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.child_order ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Inputkan anak ke berapa"
                                    />
                                    {errors.child_order && <p className="text-red-500 text-xs mt-1">{errors.child_order.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="sibling_count" className="block text-sm font-medium text-gray-700">Dari ... bersaudara</label>
                                    <input
                                        type="number"
                                        id="sibling_count"
                                        {...register("sibling_count", { required: "Jumlah saudara wajib diisi", min: { value: 1, message: "Minimal 1 saudara" } })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.sibling_count ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Inputkan jumlah saudara anda"
                                    />
                                    {errors.sibling_count && <p className="text-red-500 text-xs mt-1">{errors.sibling_count.message}</p>}
                                </div>
                            </div>

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {spinner}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Sudah punya akun? <Link to='/login' className="text-black hover:underline">Login</Link></p>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 text-center">
                            <p>
                                <a href="/" className="text-black hover:underline hover:text-gray-800 transition duration-300">
                                    ⬅️ Kembali ke Beranda
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
