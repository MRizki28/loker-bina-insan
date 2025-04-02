import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function ModalDetailLoker({ isOpen, onClose }) {
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
                        className="bg-white p-6 rounded-lg shadow-lg  max-w-5xl"
                    >
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl ">

                            <h1 className="text-2xl font-bold text-gray-800">Detail Lamaran</h1>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Header Section */}
                                <div className="p-6 border-b flex items-center">
                                    <img src="/api/placeholder/96/96" alt="PT. Teknologi Maju" className="h-24 w-24 rounded-lg object-cover mr-6" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">Frontend Developer</h1>
                                        <h2 className="text-xl text-gray-700">PT. Teknologi Maju</h2>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Jakarta Selatan
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Full Time
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Rp 10.000.000 - Rp 15.000.000
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Diapply pada: 25 Maret 2025</p>
                                    </div>
                                </div>

                                {/* Tabs Navigation */}
                                {/* <div className="border-b">
                                    <nav className="flex pl-6">
                                        <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
                                            Detail Lamaran
                                        </button>
                                        <button className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium">
                                            Timeline
                                        </button>
                                        <button className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium">
                                            File Lamaran
                                        </button>
                                    </nav>
                                </div> */}

                                {/* Content Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Deskripsi Pekerjaan</h3>
                                            <p className="text-gray-600">
                                                Kami mencari Frontend Developer yang berpengalaman dalam mengembangkan aplikasi web modern dengan React, Next.js, dan Tailwind CSS.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Persyaratan</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                                <li>Minimal 2 tahun pengalaman dalam pengembangan frontend</li>
                                                <li>Mahir dalam JavaScript, React, dan CSS modern</li>
                                                <li>Pengalaman dengan Next.js dan Tailwind CSS</li>
                                                <li>Memahami prinsip-prinsip UI/UX dan responsive design</li>
                                                <li>Mampu bekerja dalam tim dengan Git workflow</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Catatan Wawancara</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg border text-gray-600">
                                                Kandidat menunjukkan keterampilan teknis yang kuat dalam React dan memiliki portofolio yang mengesankan. Komunikasi baik dan cocok dengan budaya perusahaan.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">File Lamaran</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                                    <div>
                                                        <p className="font-medium text-gray-700">CV_AndiFirmansyah.pdf</p>
                                                        <p className="text-xs text-gray-500">2.4 MB • Diunggah 25 Maret 2025</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                                    <div>
                                                        <p className="font-medium text-gray-700">PortofolioProyek.zip</p>
                                                        <p className="text-xs text-gray-500">8.7 MB • Diunggah 25 Maret 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 border-t flex justify-end">
                                    <button onClick={onClose}  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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