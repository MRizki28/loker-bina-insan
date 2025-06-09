import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SweetAlertService from "../../utils/sweetalert";

export default function ModalApply({ isOpen, onClose, jobId }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        watch,
    } = useForm();

    const watchedFields = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [criteria, setCriteria] = useState([]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
    
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const formData = new FormData();
            formData.append("file", data.file[0]);
            formData.append("reason", data.reason);
            formData.append("id_job", jobId);
            formData.append("_token", csrfToken);
    
            Object.entries(data).forEach(([key, value]) => {
                if (key.startsWith("criteria_")) {
                    formData.append(key, value);
                }
            });
    
            // Tampilkan loading selama 5 detik
            await Swal.fire({
                title: 'Tunggu sebentar',
                text: 'Sistem sedang memverifikasi lamaran Anda...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                timer: 5000,
                timerProgressBar: true,
            });
    
            const response = await axios.post(`${appUrl}/v1/file-apply/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const responseData = response.data;
            console.log(responseData);
    
            if (responseData.status === 'success') {
                // Tampilkan status lamaran dari backend
                const message = responseData.data.message_to_applicant || 'Lamaran berhasil dikirim.';
    
                await Swal.fire({
                    icon: responseData.data.status === 'rejected' ? 'error' : 'success',
                    title: responseData.data.status === 'rejected' ? 'Lamaran Ditolak' : 'Lamaran Diterima',
                    text: message,
                    confirmButtonText: 'Tutup',
                });
    
                reset();
                clearErrors();
                onClose();
            }
        } catch (error) {
            console.error(error);
    
            if (error.response?.status === 422) {
                let message = '';
    
                const validationErrors = error.response.data.data;
                if (typeof validationErrors === 'object' && !Array.isArray(validationErrors)) {
                    let messages = [];
                    for (const key in validationErrors) {
                        if (Array.isArray(validationErrors[key])) {
                            messages.push(...validationErrors[key]);
                        }
                    }
                    message = messages.join('\n');
                }
    
                if (!message && error.response.data.message) {
                    message = error.response.data.message;
                }
    
                await Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: message || 'Terjadi kesalahan',
                    confirmButtonText: 'Tutup'
                });
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan Server',
                    text: 'Terjadi kesalahan pada server. Coba lagi nanti.',
                    confirmButtonText: 'Tutup'
                });
            }
    
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const getDataById = async (id) => {
        try {
            const response = await axios.get(`${appUrl}/v1/job/get/${id}`);
            const responseData = response.data;
            if (responseData.status === 'success') {
                setCriteria(responseData.data.criteria || []);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatFieldLabel = (field) => {
        const map = {
            education: "Pendidikan",
            age: "Usia",
            experience: "Pengalaman",
            graduation_year: "Tahun Lulus",
            major: "Jurusan",
        };
        return map[field] || field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            getDataById(jobId);
        } else {
            document.body.style.overflow = "auto";
            reset();
            clearErrors();
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const getInputType = (field) => {
        const numericFields = ["age", "experience", "graduation_year"];
        return numericFields.includes(field) ? "number" : "text";
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: -100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 100 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.3,
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-xl font-bold mb-4">Apply Sekarang</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-2">
                                {/* File Upload */}
                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium mb-1">Berkas Lamaran (PDF, RAR, ZIP)</label>
                                    <input type="file" id="file" {...register("file")} className="w-full border rounded-md p-2" />
                                    <p className="text-xs text-gray-500 mt-1">Harap unggah berkas dalam format PDF, RAR, atau ZIP</p>
                                </div>

                                {/* Reason */}
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium mb-1">Jelaskan secara singkat diri anda</label>
                                    <textarea id="reason" {...register("reason")} rows={3} className="w-full border rounded-md p-2" placeholder="Tuliskan di sini..." />
                                </div>

                                {/* Kriteria dari backend */}
                                {criteria.map((item, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium mb-1 capitalize">
                                            {formatFieldLabel(item.field)}
                                        </label>
                                        <input
                                            type={getInputType(item.field)}
                                            {...register(`criteria_${item.field}`)}
                                            className="w-full border rounded-md p-2"
                                            placeholder={`Masukkan ${item.field}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm">Batal</button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-bprYellow text-bprDarkBlue px-4 py-2 rounded text-sm ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-400"}`}
                                >
                                    {isSubmitting ? "Mengirim..." : "Kirim"}
                                </button>
                            </div>
                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
