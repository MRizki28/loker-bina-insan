import { Content } from "../../components/auth/content";


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