import React  from "react";
import Layout from "../core/Layout";
 
function Signup(){
    const alert =()=>{
     return (
         alert("hiii")
     )
    }
    return(
        
        <Layout className="container">
  
           <h1>sign up</h1>
            <button onClick={alert}>jay</button>
            </Layout>
  
      )
}

export default Signup;
