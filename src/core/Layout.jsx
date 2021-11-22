import React  from "react";
import Menu from "../core/Menu";
import { CookiesProvider } from 'react-cookie';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function Layout({title="Document",className="container-fluid",children}){
    
  return(
      <>
  
      <CookiesProvider>
      <Menu/>
      <div   className = {className} style={{minHeight:"",width:"100vw",backgroundColor:"white"}}  >
         {children}
         
    
      </div>
      </CookiesProvider>
      </>
    )
}

export default Layout;