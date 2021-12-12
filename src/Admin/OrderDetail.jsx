import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../core/Layout";
import AdminLayout from "./AdminLayout";
import { orderByid } from "./APIadmin";
import moment from "moment";
import { getStatusValues } from "./APIadmin";
import { Chk } from "../User/Chkauth";
import { updateOrderStatus } from "./APIadmin";
import ShowImage from "../core/ShowImage";

function OrderDetail() {
  let checkAuth = Chk();
  let { orderid } = useParams();
  let [order, setOrder] = useState();
  let [status, setStatus] = useState([]);
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  function loadOrders() {
    orderByid(orderid)
      .then((data) => {
        let arr = [];
        arr.push(data);
        setOrder(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const showInput = (key, value) => (
    <ul className="list-group">
      <li className="list-group-item">
        {key}:{value}
      </li>
    </ul>
  );

  const loadStatusValues = () => {
    getStatusValues(checkAuth.token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatus(data);
      }
    });
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(checkAuth.token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option disabled>Update Status</option>
        {status.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  function simg(id) {
    return (
      <div  >
        <ShowImage  id={id} />
      </div>
    );
  }

  function ordDetail() {
    return (
      <Layout className="container">
        <AdminLayout>
          <h2 className="mt-1 text-primary">Orders</h2>
          <h3 className="     b-b-default "> </h3>
          <div className="col-md-8 mx-auto mt-3">
            {order && order.length === 1 ? (
              <>
                {showStatus(order[0])}
                <ul className="list-group">
                  <li className="list-group-item">Order By:{order[0]._id}</li>
                  <li className="list-group-item">
                    Order By:{order[0].user.name}
                  </li>
                  <li className="list-group-item">
                    Transaction_id:{order[0].transaction_id}
                  </li>
                  <li className="list-group-item">Amount:{order[0].amount}</li>
                  <li className="list-group-item">
                    Order On:{moment(order[0].createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Delivery address: {order[0].address}
                  </li>
                </ul>
                <h5 className="mt-4 text-bg-secondary">
                  Products associated with order{" "}
                </h5>

                {order[0].products.map((p, pIndex) => (
                  <div
                    className="mb-0"
                    key={pIndex}
                    style={{
                      padding: "20px",
                    }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product total", p.count)}
                    {showInput("Product Id", p._id)}
                    {simg(p._id)}
                    <hr/>
                  </div>
                ))}
              </>
            ) : (
              console.log("NOT YET")
            )}
          </div>
        </AdminLayout>
      </Layout>
    );
  }

  return <>{ordDetail()}</>;
}

export default OrderDetail;
