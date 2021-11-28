 
 
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Chk } from "../User/Chkauth";
import AdminLayout from "./AdminLayout";
import { getUsers } from "./APIadmin";
import { listOrders } from "./APIadmin";
import axios from "axios";
import { saveAs } from 'file-saver';

function AdminDashboard() {
    let jwt = Chk();
    let [users, setUsers] = useState([]);
    let [orders,setOrders] = useState([]);


    useEffect(() => {
     loadUsers();
     loadOrders();
    }, [])


    function loadUsers() {
        getUsers().then((data) => {
            setUsers(data);
        }).catch((err) => {
            console.log(err);
        })
    }



 function loadOrders(){
       if(jwt){
           listOrders(jwt.token).then((data)=>{
               setOrders(data);
           }).catch((err)=>{
               console.log(err);
           })
       }
 }


 function genrateReport(){
    axios.post('http://127.0.0.1:8000/api/pdf/create', orders,{
        headers:{
            'authorization': jwt.token
        }
    })
   
    .then(() => axios.get('http://127.0.0.1:8000/api/fetch-pdf', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'Report.pdf');
    })
 }


    function Dashboard() {
        return (
            <>

                <div className="card-block">
                    <h3 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h3>
                    <div className="row">

                        <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400"> {jwt.user.email}</h6>
                        </div>
                        <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Name</p>
                            <h6 className="text-muted f-w-400">{jwt.user.name}</h6>
                        </div>
                    </div>
                    <h3 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">   </h3>



                </div>
                <div className="row justify-content-center">
                    <NavLink to="/admin/users" style={{ height: "150px" }} className="btn btn-primary col-md-3 col-sm-2 mx-3"><i class="fa fa-user fa-4x mx-2 mt-4" aria-hidden="true"></i><span style={{fontSize:"45px"}}>{users.length}</span></NavLink>
                    <button style={{ height: "100px" }}  className="btn btn-primary col-md-3 col-sm-2 mx-3" onClick={genrateReport}>Genrate Report</button>
                    <button style={{ height: "100px" }} className="btn btn-primary col-md-3 col-sm-2  mx-3">Add</button>
                </div>
            </>
        )
    }

    return (
        <AdminLayout  >
            {Dashboard()}
        </AdminLayout>

    )
}

export default AdminDashboard;