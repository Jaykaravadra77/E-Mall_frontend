import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import { getCart } from "./CartHelper";
import Card from "./Card";
import { removeItem } from "./CartHelper";
import {NavLink} from 'react-router-dom';
import nproduct from "../staticimg/nproduct.png";

 

import Checkout from "./Checkout";
function Cart() {
    
    let [items, setItems] = useState([]);

    useEffect(() => {
        let item = getCart();
        setItems(item);
        return null;
    }, [])
 
    function ritem(pid) {
        removeItem(pid);
    
        
    }
    const reload = useCallback(() => {
        let item = getCart();
        setItems(item);
    }, [])
    
    useEffect(()=>{
      let a= setInterval(() => {
           reload();
       }, 10);
       return ()=>{
          clearInterval(a);
       }
    },[])
     


   


    return (
        <Layout className="container">
            <div className="row gx-5">
                <div className="col-md-8  ">
                    <h1>My Cart</h1>
                    <div className="row ">
                        {items && items.length > 0 ? items.map((p, i) => {
                            return (
                                <div className="col-md-4" key={i}>
                                    <Card showcartbutton={false} ritemfunc={(pid) => ritem(pid)} upateqty={true} removebtn={true} product={p} />
                                </div>
                            
                            )
                        }) : <div className="row">
                            
                        </div>}
                    </div>
                     
                   

                </div>
             
                {items===0 || items.length===0?<div className="col-md-12 ">
                                <div className="row  justify-content-center " style={{marginTop:"10vh"}}>
                                    <div className="col-md-4 ">
                                        <img src={nproduct} className="img-fluid" alt="" />
                                    </div>
                                   <div className="col-md-9 ">
                                       <h6 className="text-center">Missing Cart items?</h6>
                                       <div className="text-center">
                                       <NavLink  to="/" style={{ background: "#f5c71a", color: "white" }} className=" btn  mb-3 mt-0 ">Continue to Shop</NavLink>
                                       </div>
                                     
                                   </div>
                                </div>
                            </div>:""}
      
                {items&&items.length>0? <div  className="col-md-3 mx-2   mt-3" >
                    <h2>Cart Summry</h2>
                  <Checkout key={1}  products={items}/>
                            
                </div>:""}
               
            </div>
           
            
        </Layout>
    )
}

export default Cart;