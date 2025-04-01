import lokerImg from '../../../../public/static/img/loker.png';
import { IoBagRemoveSharp, IoPeopleSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Content() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get('/v1/job/get-for-frontend?limit=100');
            const responseData = response.data;
            const rentanWaktu = responseData.data.data.map((item) => {
                return {
                    ...item,
                    rentanWaktu: `${item.start_date} s/d ${item.end_date}`
                };
            })

            setData(rentanWaktu);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

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
            </div>

            {/* Card */}
            <div className="flex justify-center mt-5 p-1">
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
                                </div>
                                <div className="mt-6">
                                    <Link to={`/detail/${item.id}`} className="border w-full bg-blue-600 text-white hover:bg-blue-900 p-2 rounded-lg">
                                        Read More
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
