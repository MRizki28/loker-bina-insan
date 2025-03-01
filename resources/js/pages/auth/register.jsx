import { Content } from "../../components/auth/register/content";

export default function Register() {
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