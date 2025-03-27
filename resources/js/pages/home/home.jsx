import About from "../../components/home/about";
import Content from "../../components/home/content";
import Hero from "../../components/home/hero";
import Lingkungan from "../../components/home/lingkungan";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <Hero></Hero>
                <About></About>
                <Lingkungan></Lingkungan>
                <Content></Content>
            </main>
            <Footer />
        </div>
    )
}