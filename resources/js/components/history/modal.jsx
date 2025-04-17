import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import logoDefault from "../../../../public/static/img/logo.png";

export default function ModalDetailLoker({ isOpen, onClose, applicationData }) {
    console.log(
        "applicationData", applicationData);


    const handleDownloadFile = async (file) => {
        try {
            const response = await axios.get(`${appUrl}/v1/file-apply/download/${file}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!applicationData || !Array.isArray(applicationData)) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-h-screen overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: -100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full"
                    >
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl">
                            <h1 className="text-2xl font-bold text-gray-800">Detail Lamaran</h1>

                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Header */}
                                <div className="p-6 border-b flex items-center">
                                    <img
                                        src={logoDefault}
                                        alt="Logo"
                                        className="h-24 w-24 rounded-lg object-contain mr-6"
                                    />
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">{applicationData[1]}</h1>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {applicationData[5]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Diapply pada: {
                                            new Date(applicationData[4]).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        }</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Deskripsi Pekerjaan</h3>
                                            <p className="text-gray-600">{applicationData[6]}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Persyaratan</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                                {applicationData[7]?.map((item, key) => (
                                                    <li key={key}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Kualifikasi</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                                {applicationData[8]?.map((item, key) => (
                                                    <li key={key}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Catatan</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg border text-gray-600">
                                                Informasi update lamaran akan dikirimkan melalui email yang terdaftar.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b">Data Lamaran</h3>
                                            <div className="space-y-2">
                                                <span>Deskripsikan diri anda</span>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                                    <div>
                                                        <p className="font-medium text-gray-700">{applicationData[9]}</p>
                                                    </div>
                                                </div>
                                                <span >File</span>
                                                <button type="button" onClick={() => handleDownloadFile(applicationData[3])}  className="flex items-center justify-between p-3 bg-gray-50 w-full rounded-lg border">
                                                    <div>
                                                        <p className="font-medium text-gray-700">{applicationData[3]}</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 bg-gray-50 border-t flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
