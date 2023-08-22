import Link from "next/link";
import ProfileIcon from "./profileicon";

export default function NavBar(){
    return(
        <nav className="flex items-center justify-between fixed left-0 right-0 px-8 h-14 bg-purple-600 text-white">
            <Link classname="font-bold " href={"/"}>NextJS_Github</Link>
            <ProfileIcon/>
        </nav>
    )
};