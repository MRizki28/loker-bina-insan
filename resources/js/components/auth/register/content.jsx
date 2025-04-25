import { set, useForm } from "react-hook-form";
import loginBackground from "../../../../../public/static/img/hero.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SweetAlertService from "../../../utils/sweetalert";
import { setLogin } from "../../../redux/slices/checkLogin";
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
            if (error.response && error.response.data.data.password == 'The password field confirmation does not match.') {
                SweetAlertService.passwordNotMatch()
            } else if (error.response && error.response.data.data.email == 'The email has already been taken.') {
                SweetAlertService.emailAlreadyExist()
            } else {
                SweetAlertService.errorAlert()
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
                <div className="hidden lg:block lg:w-1/2">
                    <img src={loginBackground} alt="Login Background" className="object-cover w-full h-full" />
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
                        <h2 className="text-sm text-gray-500 mb-6 text-center">Daftar dan bergabung bersama kami untuk memajukan pendidikan di indonesia</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                <input
                                    type="name"
                                    id="name"
                                    {...register("name", { required: "Nama wajib diisi" })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan nama anda"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Nomor Telepon
                                </label>
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

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", { required: "Email wajib diisi", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan email anda"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
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
                        </div><div className="mt-2 text-sm text-gray-600 text-center">
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
