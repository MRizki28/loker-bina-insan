import { motion } from "framer-motion";

export default function Hero() {
    const transition = {
        duration: 3,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    };

    return (
        <div className="relative h-[40rem]">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('static/img/hero.png')] bg-cover bg-center"></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-85"></div>

            {/* Vector Background */}
            <div className="absolute inset-0 bg-[url('static/img/vector.svg')] bg-cover bg-center  z-0"></div>

            {/* Content */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={transition}
                className="relative z-10 flex items-center justify-center h-full"
            >
                <div className="text-center px-4">
                    <h2 className="text-base font-semibold text-white tracking-wide uppercase">
                        Jadilah Pendidik Berkualitas, Membangun Masa Depan Bersama!
                    </h2>
                    <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Temukan Peluang Karier Anda
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-white">
                        Bergabunglah dengan SIT Bina Insan Palu Untuk Membangun Masa Depan Bersama
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
