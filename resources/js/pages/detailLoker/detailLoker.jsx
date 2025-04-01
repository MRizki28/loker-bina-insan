
import Content from "../../components/detailLoker/content";
import Hero from "../../components/detailLoker/hero";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

export default function DetailLoker() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Hero></Hero>
                <Content></Content>
            </main>
            <Footer />
        </div>
    )
}