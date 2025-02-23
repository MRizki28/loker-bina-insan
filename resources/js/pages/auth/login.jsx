import { Content } from "../../components/auth/content";
import Hero from "../../components/home/hero";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";

export default function Login() {
    return(
        <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}
            <main className="flex-grow">
                <Content></Content>
            </main>
            {/* <Footer /> */}
        </div>
    )
}