// import React from "react";
import { useCookies } from "react-cookie";

export const Chk=()=>{
    const [cookies] = useCookies(["jwt"]);
    let jwt = cookies.jwt;
    // console.log(jwt);         
     return jwt;
     
}