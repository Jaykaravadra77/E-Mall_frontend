import React, { useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "./Layout";
import PasswordResteIcon from "../staticimg/password-reset-icon-on-white-vector (1).jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {

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
  const [password, setPasword] = useState("");
  const { token } = useParams();
  console.log(token);
  const PostData = () => {
    fetch("http://127.0.0.1:8000/api/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
            console.log(data.error);
            showEroor(data.error);
        } else {
          showsuc("Your Password Has Been Reset");
          setTimeout(() => {
              history.push("/signin");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout className="container">
      <div className=" col-md-4 mx-auto" style={{ marginTop: "15vh" }}>
        <div className="card auth-card input-field">
          <div className="mx-auto">
            <img
              src={PasswordResteIcon}
              alt=""
              style={{ maxHeight: "280px", width: "300px" }}
            />
          </div>
          <h4 className="text-center text-info">Enter Your New Password</h4>
          <div className="m-3">
            <input
              className="form-control "
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <button
          style={{marginRight:"10px",marginLeft:"10px",marginBottom:"10px"}}
            className="btn btn-outline-primary text-dark "
            onClick={() => PostData()}
          >
            Update password
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewPassword;
