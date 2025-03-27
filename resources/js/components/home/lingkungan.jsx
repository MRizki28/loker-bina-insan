import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Lingkungan() {
    return (
        <div className="bg-[url('static/img/background.jpg')]">
            <div className="max-w-7xl mx-auto p-3 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Animasi masuk dari kiri untuk teks */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold text-blue-800 mb-6">
                            Lingkungan Kerja Inspiratif
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Kami menciptakan lingkungan kerja yang mendukung, kolaboratif, dan memungkinkan setiap guru untuk berkembang secara profesional.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Ruang kelas modern dengan fasilitas teknologi terkini",
                                "Program pengembangan berkelanjutan",
                                "Komunitas guru yang saling mendukung",
                                "Kesempatan untuk penelitian dan inovasi pendidikan"
                            ].map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    className="flex items-center"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <FaCheckCircle className="mr-3 text-blue-500" />
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Animasi zoom-in untuk gambar */}
                    <motion.div 
                        className="grid grid-cols-2 gap-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <img
                            src="static/img/bip.png"
                            alt="Ruang Kelas"
                            className="rounded-lg shadow-md w-full h-72 object-cover"
                        />
                        <img
                            src="static/img/hero.png"
                            alt="Aktivitas Guru"
                            className="rounded-lg shadow-md w-full h-72 object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
