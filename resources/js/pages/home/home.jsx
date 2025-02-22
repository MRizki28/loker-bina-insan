import Content from "../../components/home/content";
import Hero from "../../components/home/hero";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

export default function Home() {
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