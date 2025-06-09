import lokerImg from '../../../../public/static/img/loker.png';
import { IoBagRemoveSharp, IoPeopleSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalApply from "./modal";
import { Link } from 'react-router-dom';
import { FaRupiahSign } from 'react-icons/fa6';

export default function Content() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const backup = localStorage.getItem('backup');
    const parsedBackup = backup ? JSON.parse(backup) : { isLoggedIn: false, role: null };
    const [selectedJobId, setSelectedJobId] = useState(null);


    const { isLoggedIn, role } = parsedBackup;

    const getData = async (searchQuery = '') => {
        try {
            const response = await axios.get(`/v1/job/get-for-frontend?limit=100&search=${searchQuery}`);
            const responseData = response.data;
            const rentanWaktu = responseData.data.data.map((item) => {
                return {
                    ...item,
                    rentanWaktu: `${item.start_date} s/d ${item.end_date}`
                };
            })

            setLoading(false);
            setData(rentanWaktu);
            setLoading(false);
        } catch (error) {
            setData([]);
            console.log(error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        getData(e.target.value);
    }


    useEffect(() => {
        getData();
    }, []);

    const transition = {
        duration: 0.8,
        ease: "easeOut",
    };

    return (
        <div className="mt-5">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    Lowongan Karir Guru
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Temukan posisi yang sesuai dengan keahlian dan passion Anda dalam dunia pendidikan.
                </p>
                <div className="max-w-3xl mx-auto p-3">
                    {/* Search Bar (Di Atas) */}
                    <div className="relative mb-4">
                        <label htmlFor="default-search" className="sr-only">Search</label>
                        <input
                            onChange={handleSearch}
                            type="search"
                            id="default-search"
                            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500"
                            placeholder="Cari Lowongan Guru..."
                            required
                        />
                        <div className="absolute inset-y-0 start-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>



                </div>
            </div>

            {/* Card */}
            <div className="flex justify-center mt-5 p-1 mb-4" id="lowongan">
                {loading ? (
                    <p className="text-gray-600">Memuat data...</p>
                ) : data.length === 0 ? (
                    <p className="text-gray-600">Tidak ada lowongan tersedia.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {data.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...transition, delay: index * 0.1 }}
                                className="w-96 border bg-white rounded-lg shadow-md p-3"
                            >
                                <div className="flex justify-center items-center gap-2 p-3">
                                    <img src={lokerImg} width={50} height={50} alt="loker" />
                                    <span className="text-lg font-semibold">{item.name}</span>
                                </div>
                                <div className="mt-5 space-y-2">
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <IoBagRemoveSharp />
                                        <span className="capitalize">{item.job_type}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <FaRegCalendarAlt />
                                        <span>Waktu lowongan: {item.rentanWaktu}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <IoPeopleSharp />
                                        <span>Kategori: {item.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <span>Gaji: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.salary_min)} s/d {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.salary_max)} </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {!isLoggedIn ? (
                                        <Link
                                            to="/login"
                                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors inline-block mb-4"
                                        >
                                            Silahkan login untuk melamar
                                        </Link>
                                    ) : role === "admin" || role === "superadmin" ? (
                                        <button
                                            className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-not-allowed"
                                            disabled
                                        >
                                            Admin tidak bisa melamar
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors inline-block mb-4"
                                            onClick={() => {

                                                setSelectedJobId(item.id)
                                                setIsModalOpen(true)
                                            }
                                            }
                                        >
                                            Apply now
                                        </button>
                                    )}
                                </div>
                                {isModalOpen && (
                                    <ModalApply
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        jobId={selectedJobId}
                                    />
                                )}

                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
