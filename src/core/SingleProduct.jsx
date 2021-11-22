import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "./Layout";
import { lsingleproduct } from "./APIcore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "./Card";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { reletedProducts } from './APIcore';
import { catByid } from "./APIcore";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const override = css`
display: block;
margin: 0 auto;
border-color: pink;
`;
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function SingleProduct() {
    let { productid } = useParams();
    let [pd, setProduct] = useState({});
    let [load, setload] = useState(true);
    let [category, setCategory] = useState();
    let [relProducts, setRelProducts] = useState([]);





    function showError() {
        toast.error("", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }






    const fetchProduct = useCallback(() => {
        lsingleproduct(productid).then((data) => {
            if (data.error) {
                showError(data.error);
            } else {
                setProduct(data);

                catByid(data.category).then((category) => {
                    if (!category.error) {
                        setCategory(category.name);
                    
                    }
                    reletedProducts(data._id).then((data) => {
                        setRelProducts(data);
                        setload(false);
                    })


                })

            }


        })
    }, [productid])
    useEffect(() => {
        fetchProduct()
    }, [fetchProduct])


    return (

        <Layout className="container">
            {load ? <div style={{ marginTop: "30vh" }}>
                <HashLoader color={'#123abc'} loading={load} css={override} size={100} />
            </div> : <> < div className="col-md-12 mt-3" >
                <div className="col-md-12">
                    <Card product={pd} cat={category} viewbthnvisible={false} />
                </div>
            </div>
                <div className="row mt-2 gx-0" >
                    <h1 className="text-secondary mt-1 mx-1">Releted Products</h1>
                    <Carousel responsive={responsive}>
                         {relProducts.map((c,i)=>{
                   return (
                    <div key={i} className="col-md-12">
                        
                   <Card  product={c}/>
                   </div>
                   )
                })}
                    </Carousel>
                    {/* {relProducts.map((c,i)=>{
                   return (
                    <div key={i} className="col-md-4">
                        
                   <Card  product={c}/>
                   </div>
                   )
                })} */}
                </div>


            </>

            }



        </Layout>
    )

}


export default SingleProduct;