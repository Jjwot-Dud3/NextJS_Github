"use client";
import {SessionProvider} from 'next-auth/react'
//Define la session para ser utilizadas por todos la vista utilizando Next-Auth
export const NextAuthProvider = ({children}) =>{
    return <SessionProvider>{children}</SessionProvider>;
};