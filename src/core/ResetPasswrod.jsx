import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import Layout from './Layout'
const ResetPassword  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           
            return
        }
        fetch('http://127.0.0.1:8000/api/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              
           }
           else{
               
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
       <Layout className="container">
      <div className="mycard col-md-4 mx-auto">
          <div className="card  auth-card input-field">
            <h2>Instagram</h2>
            <input
            className="form-control"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn btn-primary"
            onClick={()=>PostData()}
            >
               reset password
            </button>
            
    
        </div>
      </div>
      </Layout>
   )
}


export default ResetPassword;