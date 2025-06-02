import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import SweetAlertService from "../../utils/sweetalert";
import Swal from "sweetalert2";

export default function ModalApply({ isOpen, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        watch,
    } = useForm();

    const { id } = useParams();
    const watchedFields = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const formData = new FormData();
            formData.append("file", data.file[0]);
            formData.append("reason", data.reason);
            formData.append("id_job", id);
            formData.append("_token", csrfToken);

            const response = await axios.post(`${appUrl}/v1/file-apply/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const responseData = await response.data;
            console.log(responseData)
            if (responseData.status === 'success') {
                SweetAlertService.successApply();
                reset();
                clearErrors();
                onClose();
            }
        } catch (error) {
            console.log('eeee', error);
            if(error.response.status === 422){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Maximal ukuran file 2MB',
                    confirmButtonText: 'Tutup'
                })
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            reset();
            clearErrors();
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
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                    >
                        <h2 className="text-xl font-bold mb-4">Apply sekarang</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="file" className="block text-sm font-medium mb-2">
                                    Berkas Lamaran (PDF, RAR, atau ZIP)
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    {...register("file", {
                                        validate: (value) => {
                                            if (value.length > 0) {
                                                const allowedTypes = [
                                                    "application/pdf",
                                                    "application/zip",
                                                    "application/x-rar-compressed",
                                                    "application/x-zip-compressed"
                                                ];
                                                const allowedExtensions = ["pdf", "zip", "rar"];

                                                const file = value[0];
                                                const fileType = file.type;
                                                const fileName = file.name.toLowerCase();
                                                const fileExtension = fileName.split('.').pop();

                                                if (!allowedTypes.includes(fileType) && !allowedExtensions.includes(fileExtension)) {
                                                    return "File harus dalam format PDF, RAR, atau ZIP";
                                                }
                                            }
                                            return true;
                                        }
                                    })}
                                    className={`mt-1 p-2 w-full border rounded-md transition-colors duration-300 focus:ring-0 ${
                                        watchedFields.file ? "border-green-400" : "border-gray-300"
                                    }`}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Harap unggah berkas dalam format <b>PDF, RAR, atau ZIP</b>.
                                </p>
                                {errors.file && (
                                    <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="reason" className="block text-sm font-medium mb-2">
                                    Jelaskan secara singkat diri anda <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="reason"
                                    {...register("reason", {
                                        required: "Pesan wajib diisi",
                                    })}
                                    rows={4}
                                    className={`w-full border rounded-md p-2 transition-colors duration-300 focus:ring-0 ${
                                        errors.reason
                                            ? "border-red-500 focus:border-red-500"
                                            : watchedFields.reason
                                                ? "border-green-400"
                                                : "border-gray-300"
                                    }`}
                                    placeholder="Jelaskan secara singkat diri anda"
                                ></textarea>
                                {errors.reason && (
                                    <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                                )}
                            </div>

                            <motion.div
                                className="col-span-2 flex justify-end gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors focus:ring-0"
                                    onClick={onClose}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-bprYellow text-bprDarkBlue px-4 py-2 rounded-md transition-colors focus:ring-0 
                                        ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-400"}`}
                                >
                                    {isSubmitting ? "Mengirim..." : "Kirim"}
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
