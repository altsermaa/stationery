import { Mail, Phone } from "lucide-react"

export const Footer = () => {
    return <footer className="w-full border-t mt-7 py-8 px-4 lg:px-10 m-auto">
        <div className="container w-full lg:w-[930px] m-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="flex gap-1 items-center">
                    <Mail className="w-5 h-5 text-gray-600"/>
                    <p>altsermaa@gmail.com</p>
                </div>

                <div className="flex gap-1 items-center">
                    <Phone className="w-5 h-5 text-gray-600"/>
                    <p>976-99929224</p>
                </div>
                
       
        </div>
      </footer>
}