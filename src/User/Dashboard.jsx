import React from "react";
import Layout from "../core/Layout";
import "./userdashboard.css";
import UserDashboard from "./Components/UserDashboard";
import { Chk } from "../User/Chkauth";
 
import AdminDashboard from "../Admin/AdminDashboard";
 
function Dashboard() {
    let jwt = Chk();
  
        if (jwt.user.role === 0) {
            return (
                <Layout className="container ">

                    <UserDashboard />

                </Layout>

            )
        }
        else{
            return (
                <Layout className="container" >
                   <AdminDashboard/>
         

                </Layout>

            )
        }
    
}


export default Dashboard;