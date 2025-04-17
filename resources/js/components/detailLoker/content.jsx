import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ModalApply from "./modal";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../shared/Breadcrumb";



export default function Content() {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.checkLogin);

    const isLoggedIn = useSelector((state) => state.checkLogin.isLoggedIn);
    const role = useSelector((state) => state.checkLogin.role);

    const breadCrumbItems = [

        {
            label: "Detail Lowongan"
        }
    ]

    const { id } = useParams();
    console.log(id)

    const getData = async () => {
        try {
            const response = await axios.get(`/v1/job/get-for-frontend/get/${id}`);
            console.log(response.data);
            if (response.data.message == 'Success get data job by id') {
                const responseData = await response.data;
                setData(responseData.data);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (!data) {
        return <p className="text-center text-gray-700">Data not found</p>;
    }

    return (
        <div className="mt-10">
            <div className="max-w-screen-2xl mx-auto pb-60 p-5 lg:p-16 -mt-40 md:-mt-20">
                <BreadCrumb items={breadCrumbItems}></BreadCrumb>
                <h2 className="text-xl font-bold text-center mb-11">DETAIL LOWONGAN</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">{data.name || "Nama tidak tersedia"}</h2>
                        <p className="text-gray-700">Tipe kontrak: <span className="font-semibold">{data.job_type || "Tidak ada informasi"}</span></p>
                        <p className="text-gray-700">Kategori: <span className="font-semibold">{data.category || "Tidak ada informasi"}</span></p>
                        <h3 className="text-lg font-bold text-blue-700 mt-6 mb-2">Kualifikasi</h3>
                        <ul className="text-gray-700 list-decimal list-inside">
                            {(data.qualification || []).map((qual, index) => (
                                <li key={index}>{qual}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold text-blue-700 mb-2">Tanggal Pendaftaran</h3>
                            <p className="text-gray-700">
                                {data.start_date ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(data.start_date)) : "Tidak tersedia"} -
                                {data.end_date ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(data.end_date)) : "Tidak tersedia"}
                            </p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold text-blue-700 mb-2">Persyaratan</h3>
                            <ol className="text-gray-700 list-disc list-inside">
                                {(data.requirement || []).map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="lg:col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">Cara Melamar</h2>
                        <p className="text-gray-700 mb-4">Apply berkas anda dengan menekan tombol di bawah:</p>

                        {!isLoggedIn.isLoggedIn ? (
                            <Link
                                to="/login"
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors inline-block mb-4"
                            >
                                Silahkan login untuk melamar
                            </Link>
                        ) : role === "admin" ? (
                            <button
                                className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-not-allowed"
                                disabled
                            >
                                Admin tidak bisa melamar
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors inline-block mb-4"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Apply now
                            </button>
                        )}

                    </div>
                </div>
            </div>
            {isModalOpen && <ModalApply isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

        </div>


    );
}
