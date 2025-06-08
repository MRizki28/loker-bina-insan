
import Content from "../../components/profile/content";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

export default function Profile() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              
                <Content></Content>
            </main>
            <Footer />
        </div>
    )
}