import React from "react";
import { Chk } from "../User/Chkauth";
import AdminLayout from "./AdminLayout";
function AdminDashboard() {
    let jwt = Chk();
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
                    <button style={{ height: "100px" }} className="btn btn-primary col-md-3 col-sm-2 mx-3">Add</button>
                    <button style={{ height: "100px" }} className="btn btn-primary col-md-3 col-sm-2 mx-3">Add</button>
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