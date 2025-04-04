import { useSelector, useDispatch } from 'react-redux';
import logo from '../../../../public/static/img/logo.png';
import { useEffect } from 'react';
import { checkTokenValidity, setLogout } from '../../redux/slices/checkLogin';
import axios from 'axios';
import SweetAlertService from '../../utils/sweetalert';

export default function Navbar() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.checkLogin);
    const login = selector.isLoggedIn;

    console.log(login);

    useEffect(() => {
        checkTokenValidity();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
    
            const confirmed = await SweetAlertService.logoutAlert();
            if (!confirmed) {
                return; 
            }
    
            const response = await axios.post(`${appUrl}/v1/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const responseData = await response.data;
            if (responseData.message === 'Logout successful') {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                dispatch(setLogout());
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const checkRole = () => {
        if (!login) {
            return (
                <li>
                    <a href="/login" className="block py-2 px-3 text-black hover:text-blue-500 ">Login</a>
                </li>
            );
        }

        const role = localStorage.getItem('role');
        if (role === 'admin') {
            return (
                <>
                    <li>
                        <a href="/cms/admin/dashboard" className="block py-2 px-3 text-black hover:text-blue-500 ">Ke Halaman Admin</a>
                    </li>
                    <li>
                        <a href="#" onClick={handleLogout} className="block py-2 px-3 text-black hover:text-blue-500 ">Logout</a>
                    </li>
                </>
            );
        } else if (role === 'user') {
            return (
                <>
                    <li>
                        <a href={`${appUrl}/history`} className="block py-2 px-3 text-black hover:text-blue-500 ">History Apply</a>
                    </li>
                    <li>
                        <a href="#" onClick={handleLogout} className="block py-2 px-3 text-black hover:text-blue-500 ">Logout</a>
                    </li>
                </>
            );
        }
    };

    return (
        <nav className="bg-white border-gray-200 dark:white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Flowbite Logo" />
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                        {checkRole()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}