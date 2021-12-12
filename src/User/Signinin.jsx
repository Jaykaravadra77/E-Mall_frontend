import React, { useCallback, useEffect, useState } from "react";
import Layout from "../core/Layout";
import { signup, signin } from "../Auth/index.js";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./toast.css";
import "./signup.css";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Chk } from "./Chkauth";
import loginimg from "../staticimg/os.jpg";
import {NavLink} from 'react-router-dom'



function Signin() {
     const history = useHistory();
      
     let check = Chk();


     useEffect(() => {
          if (check) {
               history.push("/");
          }
     }, [history,check]);



     const [cookies, setCookie] = useCookies(["jwt"]);

     const toggleForm = () => {
          const container = document.querySelector('.container');
          container.classList.toggle('active');
     }

     const [values, setValues] = useState({
          name: '',
          email: '',
          password: '',
          error: '',
          success: false,

     })

     const [values1, setValues1] = useState({
          email1: '',
          password1: '',
          error: '',
       


     })
 

     const SignupForm = () => {



          const { name, email, password } = values;
          const {   email1, password1 } = values1;


          const handleval = (event) => {
               const name = event.target.name;
               const value = event.target.value;
               setValues((values) => {

                    return {
                         ...values,
                         error: false,
                         [name]: value
                    }

               })

          }


          const handleval1 = (event) => {
               const name = event.target.name;
               const value = event.target.value;
               setValues1((values1) => {
                    return {
                         ...values1,
                         error: false,
                         [name]: value
                    }

               })

          }





          const submitdata = (event) => {
               event.preventDefault();
               setValues({ ...values, error: false });
               signup({ name, email, password }).then((data) => {
                    if (data.error) {

                         setValues({ ...values, error: data.error, success: false })

                         showEroor(data.error);
                    } else {
                         showsuc();
                         setValues({
                              name: '',
                              email: '',
                              success: true,
                              password: '',
                              error: '',

                         })
                    }
               })

          }

          const signinSubmitdata = (event) => {
               event.preventDefault();

               setValues1({ ...values1, loading: true, error: false });
               signin({ email1, password1 }).then((data) => {
                    if (data.error) {

                         setValues1({ ...values1, error: data.error, loading: false })
                         showEroor(data.error);
                    } else {

                         setValues1({
                              ...values1, redirectTorref: true, loading: false
                         })
                     
                         setCookie("jwt", data, { maxAge: 400 });
                         rdirect();
                    }
               })

          }



          const rdirect =useCallback(( )=>{
             
                  console.log("Callback fired")
                  return history.push("/dashboard");
             
                  
                 
             },[]);


          function showsuc() {
               toast.success("Account Created Please Signin ", {
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
 



          return (
               <>
                    
                    <div className="container-fluid" style={{ backgroundColor: "white" }}>
                         <div className="row">
                              <div className="col-md-12 mx-auto">
                                   <div className="row justify-content-center">
                                        <section>

                                             <div className="container mt-4 ">
                                                  <div className="user col-md-8 signinBx">
                                                  <div className="imgBx"><img src={loginimg} alt="" /></div>
                                                       <div className="formBx">
                                                            <form action="" >
                                                                 <h2>Sign In</h2>
                                                                 <input type="text" name="email1" onChange={handleval1} value={values1.email1} placeholder="email" />
                                                                 <input type="password" name="password1" onChange={handleval1} value={values1.password1} placeholder="Password" />
                                                                 <button className="btn btn-primary " onClick={signinSubmitdata} name="login" value="Login" >Login</button>
                                                                 <p className="signup ">
                                                                      Don't have an account ?
                                                                      <a href="#signin" onClick={toggleForm}>Sign Up.</a>
                                                                      <br className/>
                                                                      
                                                                 </p>
                                                                 <p className="text-center">
                                                                    <NavLink style={{ textDecoration: 'none' }} to="/resetPassword">Forgot Password ?</NavLink>
                                                                 </p>
                                                            </form>
                                                       </div>
                                                  </div>
                                                  <div className="user signupBx">
                                                       <div className="formBx">
                                                            <form action="">
                                                                 <h2>Create an account</h2>
                                                                 <input type="text" name="name" onChange={handleval} value={values.name} placeholder="Username" />
                                                                 <input type="email" name="email" onChange={handleval} value={values.email} placeholder="Email Address" />
                                                                 <input type="password" name="password" onChange={handleval} value={values.password} placeholder="Create Password" />

                                                                 <button onClick={submitdata} className="btn btn-primary col-sm-3">signup</button>
                                                                 <p className="signup">
                                                                      Already have an account ?
                                                                      <a href="#signup" onClick={toggleForm}>Sign in.</a>
                                                                 </p>
                                                            </form>
                                                       </div>
                                                       <div className="imgBx"><img src={loginimg} alt="" /></div>
                                                  </div>
                                             </div>
                                        </section>
                                   </div>
                              </div>
                         </div>



                    </div>
               </>
          )
     }

     return (

          <Layout title="Signin"  >
          
               {SignupForm()}

          </Layout>

     )

}


export default Signin;



