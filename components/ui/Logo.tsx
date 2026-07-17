import Image from "next/image";
import logo from '@/public/logo.svg'

export default function Logo(){
    return(
        <Image alt="The Thirteen Logo" src={logo} className="w-full h-auto"></Image>
    )
}