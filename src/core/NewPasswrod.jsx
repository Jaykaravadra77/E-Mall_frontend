import React,{useState,useContext,} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
 
const NewPassword  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        fetch("http://127.0.0.1:8000/api/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
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
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
        
            <input
            type="password"
            placeholder="enter a new password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Update password
            </button>
    
        </div>
      </div>
   )
}


export default NewPassword