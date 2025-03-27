import { motion } from "framer-motion";
import { CiGlobe } from "react-icons/ci";
import { FaAward, FaUser } from "react-icons/fa";

export default function About() {
    const features = [
        {
            icon: <FaAward className="w-12 h-12 text-blue-600" />,
            title: "Pengembangan Profesional",
            description: "Program pelatihan berkelanjutan dan kesempatan untuk pertumbuhan karir."
        },
        {
            icon: <CiGlobe className="w-12 h-12 text-blue-600" />,
            title: "Lingkungan Inovatif",
            description: "Mendukung metode pengajaran kreatif dan teknologi pendidikan terkini."
        },
        {
            icon: <FaUser className="w-12 h-12 text-blue-600" />,
            title: "Komunitas Terpadu",
            description: "Jaringan guru yang saling mendukung dan berbagi pengetahuan."
        }
    ];

    return (
        <div id="tentang" className="max-w-7xl mx-auto p-3 py-16">
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    Mengapa Bergabung Dengan Kami?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Kami percaya bahwa guru adalah agen perubahan yang paling berpengaruh dalam membentuk masa depan pendidikan. Bergabunglah dengan komunitas pendidik profesional kami.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-2xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                        <div className="flex justify-center mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-600">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
