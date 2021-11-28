
import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import AdminLayout from "./AdminLayout";
import { Chk } from "../User/Chkauth";
import { deleteUser, getUsers } from "./APIadmin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function UserDetails() {
    let checkAuth = Chk();
    let [users, setUsers] = useState([]);
    useEffect(() => {
        loadUsers();
    }, [])


    function showsuc(msg) {
		toast.success(msg, {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
    function loadUsers() {
        getUsers().then((data) => {
            setUsers(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function deluse(id) {
        if (checkAuth) {
            console.log(id);
            deleteUser(checkAuth.token,id).then(() => {
                showsuc("User Deleted Successfully");
                loadUsers();
            })
        }

    }


    function allusers() {
        return (
            <>

                <h2 className="mt-1 text-primary">Users</h2>
                <h3 className="     b-b-default ">   </h3>
                {users ? users.map((user, index) => {
                    return (
                        <div key={index} className="col-md-8 mx-auto">

                            <button className="btn btn-outline-danger   text-dark " onClick={()=>deluse(user._id)}>Delete User</button>
                            <ul className="list-group mb-4">
                                <li className="list-group-item"><span className="text-primary">Category id:</span> {user._id}</li>
                                <li className="list-group-item"><span className="text-primary">Category Name:</span>   {user.name} </li>
                            </ul>
                        </div>)
                }) : ""}
            </>
        )
    }

    return (
        <Layout className="container">
            <AdminLayout>

                {allusers()}
            </AdminLayout>
        </Layout>
    )

}

export default UserDetails;
