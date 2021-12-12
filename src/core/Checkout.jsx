import React, { useState, useEffect } from "react";
import { Chk } from "../User/Chkauth";
import { getBraintreeClientToken } from "./APIcore";
import DropIn from "braintree-web-drop-in-react";
import { paymentProcess } from "./APIcore";
import { emptyCart } from "./CartHelper";
import swal from "sweetalert";
import { createOrder } from "./APIcore";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/BeatLoader";
import "./swal.css";

function Checkout({ products }) {
  let checkAuth = Chk();
  let [dladd, setDladd] = useState();

  const [data, setData] = useState({
    loading: false,
    clientToken: null,
    instance: {},
    address: "",
  });
  var regExp = /[a-zA-Z]/g;
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const getToken = (token) => {
    console.log("token passed", token);
    getBraintreeClientToken(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("client token okay", data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    if (checkAuth) {
      getToken(checkAuth.token);
    }
  }, []);

  const showCheckout = () => {
    return checkAuth ? <div>{showDropIn()}</div> : "";
  };

  let dileveryAddress = data.address;

  useEffect(() => {
    setData({ ...data, loading: true });
    setTimeout(() => {
      setData({ ...data, loading: false });
    }, 500000000000);
  }, []);

  const buy = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        paymentProcess(checkAuth.token, paymentData).then((response) => {
          const createOrderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            address: dileveryAddress,
          };
          createOrder(
            checkAuth.user._id,
            checkAuth.token,
            createOrderData
          ).then((data) => {
            console.log(data);
          });

          swal("Good job!", "Your order Has Been Placed!", "success");
          setTimeout(() => {
            emptyCart();
          }, 2000);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
    if (event.target.name === "dladd") {
      setDladd(event.target.value);
    }
  };

  function setAlert() {
    swal("Good job!", "Your order Has Been Placed!", "success");
  }

  function setWarning() {
    swal(
      "Order Dilivirable in only Rajkot City",
      "Please Enter Address in Given Formate.if address is Unreacheble your order has been cancled ",
      "warning"
    );
  }
  const showDropIn = () => (
    <div
      onBlur={() => setData({ ...data, error: "" })}
      onLoad={() => {
        setData({ ...data, loading: "false" });
      }}
    >
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group  ">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onBlur={setWarning}
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Your Address Include your Socity name and flate Number."
              required
              name="dladd"
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
        </div>
      ) : null}
    </div>
  );

  function cod() {
    let totalamount = getTotal(products);

    const createOrderData = {
      products: products,
      amount: totalamount,
      method: "Cash On Dilevery",
    };
    createOrder(checkAuth.user._id, checkAuth.token, createOrderData).then(
      (data) => {
        console.log(data);
      }
    );
    setAlert();
    setTimeout(() => {
      emptyCart();
    }, 2000);
  }

  return (
    <>
      {data.loading && checkAuth ? (
        <>
          <div className="mx-5" style={{ marginTop: "30vh" }}>
            <HashLoader color={"#123abc"} loading={data.loading} />
          </div>
        </>
      ) : (
        <>
          <h2>Total:{getTotal()}</h2>
          {products && products.length > 0 ? (
            <div className="row">
              {showCheckout()}
              <div className="col-md-12">
                <hr />
                {checkAuth ? (
                  <>
                  
                    {dladd && regExp.test(dladd) ? (
                      <>
                      
                        <button
                          onClick={buy}
                          style={{ background: "#f5c71a", color: "white" }}
                          className=" btn float-end mb-3 mt-0 mx-2"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={cod}
                          style={{ background: "#0000ff", color: "white" }}
                          className=" btn float-end mb-3 mt-0 "
                        >
                          Cash On Dilevery
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/signin"
                    style={{ background: "#f5c71a", color: "white" }}
                    className=" btn float-end mb-3 mt-0"
                  >
                    Sign In to Checkout
                  </NavLink>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

export default Checkout;
