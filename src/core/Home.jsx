import React, {   useEffect, useState } from "react";
import Layout from "../core/Layout";
import { getProduct } from "./APIcore";
import Card from "./Card";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
function Home() {

    let [productBysell, setProductBysell] = useState([]);
    let [productByArrival, setProductByArrival] = useState([]);
    let [load,setLoad] = useState(false);

    async function pBysell() {
        try {
            setLoad(true);
            let data = await getProduct('sold');

            setProductBysell(data);



        } catch (error) {

        }


    }
     async function pByArrival() {
        try {

            let data = await getProduct('createdAt');
            setProductByArrival( data);
            setLoad(false);
        } catch (error) {

        }
    }
 
 
    useEffect(() => {
        let unmounted = false;
        setTimeout(() => {

            if(!unmounted){
                pBysell();
                pByArrival();
             }

        }, 1);
       
       
      

        return () => {
            console.log("Unmouted fire");
            unmounted = true;
        }

    }, [])

   

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: pink;
      `;
    return (
         <>
       
        <Layout className="container-fluid">
            {load? <>
                <div style={{marginTop:"30vh"}}>
                  <HashLoader  color={'#123abc'} loading={load} css={override} size={100} />
                </div>
               
            
            </>:<>
            
            <div className="row">
                <div className="col-md-11 mx-auto">
                    <div className="row gx-0">
                        <h3 style={{color:"lightskyblue"}} className="  mt-2">Product By sell</h3>
                        {productBysell.map((pro, index) => {
                            return <Card     product={pro} key={index} />

                        })}
                       
                       
                    </div>
                    <hr />
                </div>

            </div>
               
                
            
            <div className="row">
                <div className="col-md-11 mx-auto">
                    <div className="row gx-0">
                        <h3 style={{color:"lightskyblue"}} className="  mt-2">Product By New Arrival</h3>
                        {productByArrival.map((pro, index) => {
                            return <Card product={pro} key={index} />

                        })}
                       
                       
                    </div>
                </div>
            </div>

            
            
            
            </>}
            
        </Layout>
 </>
    )
}

export default Home;