import React from "react";

function ShowImage({id,height}){
    console.log("Show image firee");
  return    <img src={`${process.env.REACT_APP_API_URL}/products/photo/${id}`} className="img-fluid" style={{width:"100%",height:`250px`}}  alt="  Error"></img>
  
}


export default ShowImage;