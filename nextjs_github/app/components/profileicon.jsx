"use client";

import {signIn, useSession, signOut} from "next-auth/react";
import Image from "next/image";

export default function ProfileIcon(){
    const{data: session, status} = useSession();
    //Revisa si esta aunteticado para mostrar la foto de perfil del usuario y su nombre como texto alternativo
    if (status === "authenticated"){
        return (
            <div className="flex gap-4">
                <Image src={session.user.image} width={40} height={40} className="rounded-full" title={session.user.name}/>
                <button className="font-bold" onClick={() => signOut()}> Sign Out</button>
            </div>
        );
    }

    return <button onClick={()=> signIn("github")}>Sign In</button>
}
