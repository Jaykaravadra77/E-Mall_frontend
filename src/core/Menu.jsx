import React, {  useEffect, useState } from "react";
import { Chk } from "../User/Chkauth";
import { NavLink } from 'react-router-dom';
// import { Sout } from '../User/Signout';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { signout } from "../Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { itemTotal } from "./CartHelper";
import "./menu.css";
import Emall from "../staticimg/icon.png"
 

 
 
function Menu() {
 let [items,setItems]=useState();
  
   useEffect(()=>{
    
   
    
 

     var t= setInterval(() => {
        let citems = itemTotal();
       //  console.log(citems);
       setItems(citems);
      }, 10)
  
     

     return ()=>{
        clearInterval(t);
     }
   },[])
 
  
  let check = Chk();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
 
  const history = useHistory();
  function sout() {
    removeCookie("jwt");
    signout();
    logout();




  }
  function logout() {
    console.log("Toast fireddd");
    toast.success("Loged outed", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(function () {
      history.push("/");
    }, 1050);
    history.push("/");
  }


  return (
    <>
      <ToastContainer />
      <nav className="navbar sticky-top navbar-expand-lg  " style={{ backgroundColor: "white", minHeight: "12vh" }}>
        <div className="container-fluid">
           <img src={Emall} alt="Err in loading" className="img-fluid" style={{width:"200px",height:"90px"}} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto w-100 justify-content-end  " style={{ marginRight: "100px" }} >

              {check ? (<>
                {check.user.role === 1 ? <>
                  <li className="nav-item mx-3">
                    <NavLink className="nav-link" activeClassName="act" to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item mx-3 ">
                    <NavLink className="nav-link" activeClassName="act" to="/admin/addcategory">category</NavLink>
                  </li>

                  <li className="nav-item mx-3 ">
                    <NavLink className="nav-link" activeClassName="act" to="/admin/addproduct"> Add Product</NavLink>
                  </li>
                  <li className="nav-item mx-3 ">
                    <NavLink className="nav-link" activeClassName="act" to="/admin/orderList"> Orders</NavLink>
                  </li>
                  <li className="nav-item mt-1 mx-3">
                    <button className="btn btn-outline-danger" onClick={sout}>Logout</button>
                  </li>
                </> : <>
                  <li className="nav-item ">
                    <NavLink className="nav-link" activeClassName="act" to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item ">
                  <NavLink to="/cart" type="button" style={{width:"100px"}} className="btn btn-outline-primary position-relative">Cart</NavLink>
                  </li>

                  <li className="nav-item mt-1 mx-3">
                    <button className="btn btn-outline-danger " onClick={sout}>Logout</button>
                  </li>

                </>}



              </>) : <>
                <li className="nav-item mx-3">
                  <NavLink className="nav-link" exact activeClassName="act" to="/">Home</NavLink></li>
                <li className="nav-item mx-3">
                  <NavLink className="nav-link" exact activeClassName="act" to="/aboutus">About</NavLink></li>
               
                <NavLink to="/cart" type="button" style={{width:"100px"}} className="btn btn-outline-primary position-relative">
                  Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                     {items}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>

                <li className="nav-item mx-3" style={{ maxWidth: "100px" }}>
                  <NavLink className="nav-link btn btn-outline-primary " exact activeClassName="act" to="/signin">Signin</NavLink>
                </li></>}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menu;