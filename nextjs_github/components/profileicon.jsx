"use client";

import {signIn, useSession, signOut} from "next-auth/react";

export default function ProfileIcon(){
    const{data: session, status} = useSession();
    if (status === "authenticated"){
        return (
            <div>
                <button onClick={() => signOut()}> Sign Out</button>
            </div>
        );
    }

    return <button onClick={()=> signIn("github")}>Sign In</button>
}
