import Link from "next/link";
import ProfileIcon from "./profileicon";

export default function NavBar(){
    return(
        <nav className=" flex items-center justify-between  left-0 right-0 px-8 h-14 bg-purple-600 text-white">
            <Link className="font-bold hover:text-purple-300 transition" href={"/"}>NextJS_Github</Link>
            <div className="flex items-center space-x-4">
                <Link href={"/"} className="hover:text-purple-300 transition"> Home
                </Link>
                <Link href={"/favorites"} className="hover:text-purple-300 transition">
                    Favorites
                </Link>
            </div>
            <ProfileIcon/>
        </nav>
    )
};