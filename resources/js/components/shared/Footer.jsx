export default function Footer() {
    const yearNow = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="max-w-3xl mx-auto py-5 text-white">
                <p className="text-center">© {yearNow} SIT Bina Insan Palu. All rights reserved.</p>
            </div>
        </footer>
    )
}