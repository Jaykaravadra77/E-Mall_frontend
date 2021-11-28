import React, { useEffect, useState } from "react";
import { Chk } from "../Chkauth";
import { read } from "../API User";
import { update } from "../API User";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { useCookies } from "react-cookie";
import moment from 'moment';
import { getPurchaseHistory } from "../API User";


function UserDashboard() {
    const [cookies, setCookie] = useCookies(["jwt"]);
    const [history, setHistory] = useState([]);
    let jwt = Chk();
    let [user, setUser] = useState({
        name: "",
        email: "",
    });

    // let [refect, setRefect] = useState(false);

    let [password, setPassword] = useState("");

    useEffect(() => {
        if (jwt) {
            loadUser();
        }

    }, [])

    function loadUser() {
        read(jwt.user._id, jwt.token).then((data) => {
            setUser(data);
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function subupdate(event) {
        event.preventDefault();
        let name = event.target.name.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        if (jwt) {
            let token = jwt.token;

            update(user._id, token, { name, email, password }).then((data) => {
                console.log("Data", data);

                const { _id, name, email, role } = data;

                setCookie("jwt", { token, user: { _id, name, email, role } }, { maxAge: 400 });
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    const handleval1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((values) => {
            return {
                ...values,
                [name]: value
            }

        })

    }


    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);


    }


    function modal() {
        return (
            <>
                <button type="button" className="btn btn-outline-light  mx-auto d-block" data-bs-toggle="modal" data-bs-target="#modalForm">
                    Update Profile
                </button>

                <div className="modal fade" id="modalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form onSubmit={subupdate}>
                                    <div className="mb-1">
                                        <label className="form-label">User Name</label>
                                        <input type="text" onChange={handleval1} value={user.name} className="form-control" name="name" placeholder="Username" />
                                    </div>
                                    <div className="mb-1">
                                        <label className="form-label">Email Address</label>
                                        <input type="text" onChange={handleval1} value={user.email} className="form-control" name="email" placeholder="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" onChange={handlePassword} value={password} className="form-control" name="password" placeholder="Password" />
                                    </div>

                                    <div className="modal-footer d-block">

                                        <button type="submit" className="btn btn-warning float-end">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    const init = (token) => {
        getPurchaseHistory(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };



    useEffect(() => {
        if (jwt) {
            init(jwt.token);
        }

    }, []);


    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };
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
                                            {modal()}

                                        </div>
                                    </div>
                                    <div className="col-md-9" style={{ height: "80vh" }}>
                                        <div className="card-block">
                                            <h3 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h3>
                                            <div className="row">
                                                {/* {console.log("jwt",jwt)} */}
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

                                            {purchaseHistory(history)}

                                        </div>


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

export default UserDashboard;