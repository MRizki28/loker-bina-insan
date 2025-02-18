import Hero from "../../components/home/hero";
import Navbar from "../../components/shared/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Hero></Hero>
            </main>
            {/* <Footer /> */}
        </div>
    )
}