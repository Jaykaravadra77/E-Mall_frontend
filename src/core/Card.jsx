import React,{useCallback, useState} from "react";
import { NavLink } from "react-router-dom";
import "./card.css";
import ShowImage from "./ShowImage";
import { addItem } from "./CartHelper";
import moment from "moment";
import "./badge.css";
import { updateItem } from "./CartHelper";
 

function Card({ product,ritemfunc, viewbthnvisible = true, cat, showcartbutton = true, upateqty = false,removebtn=false }) {

    let [qty,setQty] = useState(product.count);
   
 

    function addtoCart() {

        addItem(product, product._id);
        return null;

    }

    function sbtn() {
        if (showcartbutton) {
            return <button type="button" onClick={addtoCart} className="btn btncartf  bg-cart mt-2  "><i className="fa fa-cart-plus mr-2"></i> Add to cart</button>
        } else {
            return null;
        }

    }


    function rbtn() {
        if (removebtn) {
            return <button type="button"  onClick={()=>{ritemfunc(product._id)}}  className="btn btn-danger  col-md-12  mt-2  "><i className="fa fa-cart-plus mr-2"></i>Remove</button>
        } else {
            return null;
        }

    }

     

    function handler(event){
         
 
    }
      
     

  

     
 

    const increment =useCallback(() => {
        // console.log("Fired")
        if(qty<product.quantity){
            setQty(qty + 1)
           let num = qty+1;
        updateItem(product._id,num);
        }
 
      }, [qty])
      
      const decrement = useCallback(() => {
        if(qty>1){
            setQty(qty - 1)
       
        }
        
        if(qty!==1){
            // console.log(qty)
             updateItem(product._id,qty-1);
        }
      }, [qty])
 
     

    function updatequantity() {
        if (upateqty) {
            return (
                <>
                    <br />
                    <div className="col-md-12 mx-5 mt-3">
                        <div className="input-group mb-3">
                        <button className="btn btn-outline-info" onClick={decrement}>-</button> 
                            <input type="text" id="num" name="num"    onChange={handler}  value={qty} className=" col-md-3 col-sm-3 col-3  mx-1" width={10} />
                          <button onClick={increment}name="btnp" className="btn btn-outline-info">+</button> 
                        </div>

                    </div>

                </>
            )
        } else {
            return null;
        }

    }

  

    function showstock(qty) {
        if (qty > 0) {

            return  <span className="badge badge--success">In Stock</span>
        } else {
            return <span className="badge badge--info">Out Of Stock</span>
        }
    }

    return (
        <>
            {viewbthnvisible === false ? <>
                <div className="card border-none">
                    <div className="row ">
                        <div className="col-md-5">
                            <div className="card-img-actions"  > <ShowImage maxHeight="10vh" id={product._id} /> </div>
                        </div>
                        <div className="col-md-7 px-3 mt-3">
                            <div className="card-block px-6">
                                <h4 className="card-title">{product.name}</h4>
                                <p className="card-text" style={{ fontSize: "14px" }}>
                                    {product.descreption}
                                </p>
                                <p className="card-text" style={{ fontSize: "18px" }}>₹{product.price}</p>
                                <p className="card-text" style={{ fontSize: "18px" }}>Category:{cat}</p>
                                <p className="card-text">Added On {moment(product.createdAt).fromNow()}</p>
                                {showstock(product.quantity)}
                                <br />
                                {product.quantity>=0?sbtn():""}
                            </div>
                        </div>




                    </div>
                </div>

            </> : <>
                <div className="card  " style={{ border: "none" }}>
                    <div className="card-body">
                        <div className="card-img-actions"> <ShowImage height="300px" id={product._id} /> </div>
                    </div>
                    <div className="card-body bg-light text-center">
                        <div className=" ">
                            <h4 className="font-weight-semibold  "> <span className="text-default  " data-abc="true">{product.name}</span> </h4>
                            {/* {product.descreption.length>100? <p className="text-secondary  " style={{ fontSize: "13px" }}>{product.descreption.substr(0,100)}....</p>: <p className="text-secondary  " style={{ fontSize: "13px" }}>{product.description}</p>}  */}
                            {product.descreption.substr(0, 100)}
                        </div>
                        <h6 className="mb-0 " style={{ fontSize: "15px" }}> ₹{product.price}</h6>
                      
                         {product.quantity!==0?sbtn():showstock(product.quantity)}
                        <NavLink to={`/product/${product._id}`} pid="asfdfds" className="btn mx-1  btn-success  btnview  mt-2" >View product</NavLink>
                        {updatequantity()}
                        {rbtn()}
                    </div>
                </div>

            </>


            }









        </>

    )

}

export default Card;