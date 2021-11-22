import React from "react";
import { Chk } from  "../User/Chkauth";
// import "../adminIcons.css";
// // import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import  "../../node_modules/font-awesome/css/font-awesome.min.css";

function AdminLayout(props) {
    let jwt = Chk();

    return (
        <>
            {jwt ? (
                <>


                    
                        <div className="row    "  >
                            <div className="  col-md-12 mt-4"  >
                                <div className="card user-card-full" >
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-md-3 col-sm-12 bg-c-lite-green user-profile  " >
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25"> <img alt="fg" src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius img-fluid" /> </div>
                                                <h4 className="f-w-600">{jwt.user.name} </h4>
                                                <p>{jwt.user.role === 1 ? "Admin" : "User"}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-9" style={{ height: "80vh" ,overflow:"auto"}}>
                                          {props.children }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  


 

                </>)
                : (
                    null)}

        </>





    )

}

export default AdminLayout;