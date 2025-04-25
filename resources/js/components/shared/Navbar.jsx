import { useSelector, useDispatch } from 'react-redux';
import logo from '../../../../public/static/img/logo.png';
import { useEffect } from 'react';
import { checkTokenValidity, setLogout } from '../../redux/slices/checkLogin';
import axios from 'axios';
import SweetAlertService from '../../utils/sweetalert';
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';

export default function Navbar() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.checkLogin);
    const login = selector.isLoggedIn;

    useEffect(() => {
        checkTokenValidity();
    }, []);

    const handleLogout = async () => {
        try {
            const confirmed = await SweetAlertService.logoutAlert();
            if (!confirmed) {
                return;
            }

            const response = await axios.post(`${appUrl}/v1/auth/logout`, {});
            const responseData = await response.data;

            if (responseData.message === 'Logout successful') {
                dispatch(setLogout());
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkRole = () => {
        if (!login.isLoggedIn) {
            return (
                <>
                    <li><a href="/" className="block py-2 px-3 text-black hover:text-blue-500">Beranda</a></li>
                    <li><a href="/#lowongan" className="block py-2 px-3 text-black hover:text-blue-500">Lowongan pekerjaan</a></li>
                    <li><a href="/login" className="block py-2 px-3 text-black hover:text-blue-500">Login</a></li>
                </>
            );
        }

        if (login.role === 'admin' || login.role === 'superadmin') {
            return (
                <>
                    <li><a href="/" className="block py-2 px-3 text-black hover:text-blue-500">Beranda</a></li>
                    <li><a href="/#lowongan" className="block py-2 px-3 text-black hover:text-blue-500">Lowongan pekerjaan</a></li>
                    <li><a href="/cms/admin/dashboard" className="block py-2 px-3 text-black hover:text-blue-500">Ke Halaman Admin</a></li>
                    <li><a href="#" onClick={handleLogout} className="block py-2 px-3 text-black hover:text-blue-500">Logout</a></li>
                </>
            );
        }

        if (login.role === 'user') {
            return (
                <>
                    <li><a href="/" className="block py-2 px-3 text-black hover:text-blue-500">Beranda</a></li>
                    <li><a href="/#lowongan" className="block py-2 px-3 text-black hover:text-blue-500">Lowongan pekerjaan</a></li>
                    <li><a href="/history" className="block py-2 px-3 text-black hover:text-blue-500">History Apply</a></li>
                    <li><a href="#" onClick={handleLogout} className="block py-2 px-3 text-black hover:text-blue-500">Logout</a></li>
                </>
            );
        }
    };

    const checkMobileNav = () => {
        if (!login.isLoggedIn) {
            return (
                <>
                    <Link to='/' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaHome className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Home</span>
                    </Link>
                    <Link to='/#lowongan' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaInfoCircle className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Lowongan</span>
                    </Link>
                    <Link to='/login' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaShop className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Login</span>
                    </Link>
                </>
            );
        }

        if (login.role === 'admin' || login.role === 'superadmin') {
            return (
                <>
                    <Link to='/' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaHome className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Home</span>
                    </Link>
                    <a href='/cms/admin/dashboard' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaShop className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Admin</span>
                    </a>
                    <button onClick={handleLogout} className="inline-flex flex-col items-center justify-center px-5 group">
                        <IoIosExit className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Logout</span>
                    </button>
                </>
            );
        }

        if (login.role === 'user') {
            return (
                <>
                    <Link to='/' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaHome className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Home</span>
                    </Link>
                    <Link to='/#lowongan' className="inline-flex flex-col items-center justify-center px-5 group">
                        <FaInfoCircle className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Lowongan</span>
                    </Link>
                    <button onClick={handleLogout} className="inline-flex flex-col items-center justify-center px-5 group">
                        <IoIosExit className="text-2xl mb-2 text-black group-hover:text-red-600" />
                        <span className="text-sm text-black group-hover:text-red-600">Logout</span>
                    </button>
                </>
            );
        }
    };

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <nav className="bg-white border-gray-200 dark:white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Logo" />
                </a>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        {checkRole()}
                    </ul>
                </div>
            </div>

            {/* Mobile navbar (bottom) */}
            <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
                <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                    {checkMobileNav()}
                </div>
            </div>
        </nav>
    );
}
