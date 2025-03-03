import { useForm } from "react-hook-form";
import loginBackground from "../../../../public/static/img/hero.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SweetAlertService from "../../utils/sweetalert";
import { setLogin } from "../../redux/slices/checkLogin";
import { useState } from "react";

export function Content() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const spinner = loading ? (
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    ) : 'Sign Up';


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('v1/auth/login', data);
            const responseData = response.data;
            console.log(response);
            console.log(responseData);

            if (responseData.message === 'Login Success') {
                setLoading(false);
                SweetAlertService.successLogin().then(() => {
                    if (responseData.data.role === 'admin') {
                        window.location.href = 'cms/admin/dashboard';
                        localStorage.setItem('token', responseData.data.token);
                        localStorage.setItem('role', responseData.data.role);
                    } else {
                        localStorage.setItem('token', responseData.data.token);
                        localStorage.setItem('role', responseData.data.role);
                        dispatch(setLogin());
                        window.location.href = '/';
                    }
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.response && error.response.status === 401) {
                SweetAlertService.emailOrPasswordMistant();
            } else {
                SweetAlertService.errorAlert();
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
                        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
                        <h2 className="text-sm text-gray-500 mb-6 text-center">Silahkan masuk menggunakan akun yang sudah anda daftarkan</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                    {...register("password", { required: "Password is required" })}
                                    className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Inputkan password anda"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
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
                            <p>Belum punya akun? <Link to='/register' className="text-black hover:underline">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
