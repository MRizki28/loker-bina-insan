import lokerImg from '../../../../public/static/img/loker.png';
import { IoBagRemoveSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { motion } from "framer-motion";


export default function Content() {
    const transition = {
        duration: 3,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    };

    return (
        <div className="mt-5">
            <div className="max-w-3xl mx-auto p-3">
                {/* Search Bar (Di Atas) */}
                <div className="relative mb-4">
                    <label htmlFor="default-search" className="sr-only">Search</label>
                    <input
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

                {/* Filter & Button (Di Bawah, Sejajar) */}
                <div className="flex items-center gap-2">
                    {/* Dropdown Mata Pelajaran */}
                    <select className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:text-gray-900 dark:focus:ring-blue-500">
                        <option selected>Kategory</option>
                        <option value="Matematika">Matematika</option>
                        <option value="IPA">IPA</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="IPS">IPS</option>
                        <option value="TIK">TIK</option>
                    </select>

                    {/* Dropdown Jenis Pekerjaan */}
                    <select className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:text-gray-900 dark:focus:ring-blue-500">
                        <option selected>Jenis Pekerjaan</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Honorer">Honorer</option>
                    </select>

                    {/* Search Button */}
                    {/* <button className="w-full px-5 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Search
                    </button> */}
                </div>
            </div>

            {/* card */}
            <div className='flex justify-center mt-5 p-1'>
                <div className='grid grid-cols-3 gap-5'>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={transition}
                        className='w-96 border bg-white rounded-lg shadow-md p-3' >
                        <div className='flex justify-center items-center gap-2 p-3 space-x-6'>
                            <img src={lokerImg} width={50} height={50} alt="loker" />
                            <span>Guru testing</span>
                        </div>
                        <div className='mt-5'>
                            <div className='flex items-center space-x-1 '>
                                <IoBagRemoveSharp></IoBagRemoveSharp><span className='text-blue-600'>Fulltime</span>
                            </div>
                            <div className='flex items-center space-x-1 mt-2'>
                                <FaRegCalendarAlt></FaRegCalendarAlt><span className='text-blue-600'>Posting tanggal 12 Jan 2025</span>
                            </div>
                            <div className='flex items-center space-x-1 mt-2'>
                                <IoPeopleSharp></IoPeopleSharp><span className='text-blue-600'>Kategori: Guru</span>
                            </div>
                            <div className='mt-10'>
                                <button className='border w-full bg-blue-600 text-white hover:bg-blue-900 p-2'>Read More</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )

}
