
import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { listOrders } from "./APIadmin";
import { Chk } from "../User/Chkauth";
import Layout from "../core/Layout";
import moment from "moment";
import {NavLink} from "react-router-dom";

function Olist() {
    let checkAuth = Chk();
    const [orders, setOrders] = useState([]);
    const loadOrders = () => {
        listOrders(checkAuth.token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
          
            }
        });
    };

    useEffect(() => {
        loadOrders();
    }, [])


    

    return (
        <Layout className="container">
            <AdminLayout>
                
            <h2 className="mt-1 text-primary">Orders</h2>
				<h3 className="     b-b-default ">   </h3>
                <div className="col-md-10 mx-auto mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order By</th>
                                <th>Order on</th>
                                <th> Status</th>
                                <th> Update Status</th>
                                <th>view Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                          {orders.map((o,i)=>{
                              return( <tr key ={i}>
                               <td>{o.user.name}</td>
                               <td>{moment(o.createdAt).fromNow()}</td>
                               <td>{o.status}</td>
                               <td><NavLink to={`/admin/orderdetail/${o._id}`} className="btn btn-outline-info text-dark">Update Status</NavLink ></td>
                               <td><NavLink to={`/admin/orderdetail/${o._id}`} className="btn btn-outline-primary">View Order</NavLink ></td>
                               <td> </td>
                             </tr>
                              )
                          })}
                            
                        
                        </tbody>
                    </table>
                </div>

            </AdminLayout>
        </Layout>
    )
}


export default Olist;


