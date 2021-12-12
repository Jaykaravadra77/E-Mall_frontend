import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ForgotPassword from "../staticimg/images.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";

const ResetPassword = () => {
  function showsuc(msg) {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function showEroor(error) {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const history = useHistory();
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showEroor("Please Enter Register Email");
        } else {
          setEmail("")
          showsuc("Password Reset Mail Send to Your Email");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout className="container">
      <div className="col-md-4 mx-auto" style={{ marginTop: "15vh" }}>
        <div className="card ">
          <div className="card  auth-card input-field">
            <h3 className="mx-auto mt-2">Reset Password</h3>
            <img src={ForgotPassword} alt="Error" />
            <p className="m-3" style={{ fontSize: "15px" }}>
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <div className="col-md-11 mx-auto">
              <input
                className="form-control  "
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="btn btn-primary m-3" onClick={() => PostData()}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
