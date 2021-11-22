import React, { useEffect, useState } from "react";
import { getCategories } from "./APIcore";
import Layout from "./Layout";
import Checkboxcat from "./Checkboxcat";
import { productsByfilters } from "./APIcore";
import Card from "./Card";
import { getProduct } from "./APIcore";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { productBysearch } from "./APIcore";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shop() {
    let [categories, setCategories] = useState([]);
    let [fl, setfl] = useState([]);
    let [prodByarrival, setprodByarrival] = useState([]);
    let [prodBysell, setProdBysell] = useState([]);
    let [load, setLoad] = useState(false);
    let [catfSearch, setCatfSearch] = useState([]);
    let [sresult, setSresult] = useState([]);
    let [input, setInput] = useState("");
 

 
   

       
    function showerr() {
        toast.error("Product not Found ", {
             position: "top-right",
             autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
        });
   }
    async function getCate() {
        try {
            let categoriess = await getCategories();
            setCategories(categoriess.categories);

        } catch (error) {
            alert(error)
        }

    }

    useEffect(() => {
        let unmounted = false;
       let a= setTimeout(() => {

            if (!unmounted) {
                getCate();
            }

        }, 1);
        return () => {
            unmounted = true;
            clearTimeout(a);
        }

    }, [])

    async function pByArrival() {
        try {

            let data = await getProduct('createdAt');
            setprodByarrival(data);


        } catch (error) {

        }
    }



    async function pBysell() {
        try {
            console.log("Fired")
            let data = await getProduct('sold');
            setProdBysell(data);
        } catch (error) {
            console.log(error);
        }

    }
 


 
    


    useEffect(() => {
        setLoad(true);
       let a= setTimeout(() => {
            setLoad(false);
        }, 2000);
       return ()=>{
           clearTimeout(a);
       }
    }, [])

    const getdata = async (length) => {

        //   console.log(length);
        if (length.length === 0) {
            pByArrival();
            pBysell();

        }
        productsByfilters(length).then((data) => {
            setfl(data);
        })

    }


    async function filterHandler(filter) {

        let datafl = Array.from(filter)
        setCatfSearch(datafl);
        getdata(datafl);
    }












    useEffect(() => {
        let mount = true;
        setTimeout(() => {
            if(mount){
                if (fl.length === 0) {
                    pByArrival();
                    pBysell();
        
                }     
            }
               
        }, 10);
        
        return ()=>{
            
            mount=false;
        }
    }, [])


    const override = css`
  display: block;
  margin: 0 auto;
  border-color: pink;
`;


    const handlivalue = (event) => {

        setInput(event.target.value);
    }

    const searchformsub = ( ) => {
        let selectcat = document.getElementById('selectcat');
        let name= input;
        let catfSearch =selectcat.value; 
        productBysearch({ name, catfSearch }).then((data) => {
             
              if(data.data.length === 0){
                 showerr();
              }  
            
            console.log(data);
            setSresult(data);
             
            setInput("");
         
        })

    }

    const clearsRes = () => {
        setSresult([]);
         
        
        
    }

    function ShowProducts() {
        return (<>


            <Layout className="container-fluid">
       
                {load ? <>
                    <div style={{ marginTop: "30vh" }}>
                        <HashLoader color={'#123abc'} loading={load} css={override} size={100} />
                    </div>


                </> : <>



                    <div className="row">
                        <div className="col-md-11 mx-auto">
                            <div className="row">
                                <h4 className="mt-3">Select Categories</h4>
                                <div className="col-md-3" style={{ boxShadow: "2px 2px 1px 1px whitesmoke", maxHeight: "60vh" }}>

                                    <Checkboxcat filterHandler={(filter) => filterHandler(filter)} category={categories} />
                                    <h5 className="mt-4">Search By Name</h5>
                                    <div className="col-md-12">
                                        <select name="selectcat" className="form-select"  id="selectcat">
                                            <option value="All">Select Category</option>
                                            {categories ? categories.map((c, i) => {
                                                return <option key={i} value={c._id}>{c.name}</option>
                                            }) : ""}


                                        </select>

                                        <br />
                                        <span>Enter Product Name</span>
                                        <input   value={input} onChange={handlivalue} type="text" className="form-control" name="txt" placeholder="Enter Book Name" /><br />

                                        <button className="btn btn-info mt-1" onClick={searchformsub} type="submit" >Search</button>
                                       
                                  
                                    <button className="btn btn-outline-danger text-dark mx-1 mt-1 " onClick={clearsRes} >Clear Results</button>
                                    </div>
                                </div>

                                <div className="col-md-9 mt-2">
                              
                              

                                        <div className="row gx-1">
                                        {sresult.data && sresult.data.length>0 ? <h4>{sresult.data.length>1} {sresult.data.length} Product Found</h4>:""}
                                       
                                            {sresult.data ? Array.from(sresult.data).map((pro, i) => {
                                                return (
                                                 <div  key={i} className="col-md-4">
                                                 <Card from="flproduct" product={pro} />
                                                     </div>

                                                )


                                            }) :  ""
                                            }

                                        </div>

                                        <div className="row gx-1">

                                            {fl.data ? Array.from(fl.data).map((pro, i) => {
                                                return (
                                                    <div  key={i} className="col-md-4">
                                                    <Card from="flproduct" product={pro} />
                                                        </div>
   
                                                   )

                                            }) :
                                                ""
                                            }
                                        </div>

                                        <div className="row gx-0">
                                        {(prodByarrival && fl.data === undefined) || (fl.data && fl.data.length === 0) ?   <h4>Product By New Arrival</h4>:""}
                                         
                                            {(prodByarrival && fl.data === undefined) || (fl.data && fl.data.length === 0) ? prodByarrival.map((pro, i) => {
                                                return (
                                                    <div  key={i} className="col-md-4">
                                                    <Card from="flproduct" product={pro} />
                                                        </div>
   
                                                   )
                                            }) : ""}

                                        </div>

                                        <div className="row gx-1">
                                        {(prodBysell && fl.data === undefined) || (fl.data && fl.data.length === 0)?<h4>Product By Sell</h4>:""}
                                            {(prodBysell && fl.data === undefined) || (fl.data && fl.data.length === 0) ? prodBysell.map((pro, i) => {
                                                
                                                return (
                                                    <div  key={i} className="col-md-4">
                                                    <Card from="flproduct" product={pro} />
                                                        </div>
   
                                                   )

                                            }) : ""}

                                        </div>


                                    </div>
                                </div>



                            </div>
                        </div>


             




                </>}




            </Layout>
        </>)
    }




    return (

        <>
            {ShowProducts()}

        </>
    )

}


export default Shop;