import React, { useState, useEffect } from 'react';
import { Chk } from "../User/Chkauth";
import { getBraintreeClientToken } from './APIcore';
import DropIn from 'braintree-web-drop-in-react';
import { paymentProcess } from './APIcore';
import { emptyCart } from "./CartHelper";
import swal from 'sweetalert';
import { createOrder } from './APIcore';
function Checkout({ products }) {
    let checkAuth = Chk();


    const [data, setData] = useState({
        loading: false,
        clientToken: null,
        instance: {},
        address: ''
    });




    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };


    const getToken = (token) => {
        console.log("token passed", token);
        getBraintreeClientToken(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log("client token okay", data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {

        if (checkAuth) {
            getToken(checkAuth.token);
        }

    }, []);

    const showCheckout = () => {
        return checkAuth ? (
            <div>{showDropIn()}</div>
        ) :

            ""
    };

  let dileveryAddress = data.address;

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then((data) => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            };
            paymentProcess(checkAuth.token, paymentData)
                .then(response => {
                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address:dileveryAddress


                    };
                    createOrder(checkAuth.user._id, checkAuth.token, createOrderData).then((data) => {
                        console.log(data);
                    })

                    swal("Good job!", "Your order Has Been Placed!", "success");
                    setTimeout(() => {
                        
                        emptyCart();

                    }, 2000);
                  
                   
                })

        }).catch((error) => {
            console.log(error);
        })
    }
    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group  ">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>


                    <DropIn
                        options={{
                            authorization: data.clientToken,

                        }}
                        onInstance={instance => (data.instance = instance)}
                    />

                </div>
            ) : null}
        </div>
    );

    return (
        <>
            <h2>Total:{getTotal()}</h2>
            {products && products.length > 0 ? <div className="row">

                {showCheckout()}
                <div className="col-md-12">
                    <hr />
                    {checkAuth ? <button onClick={buy} style={{ background: "#f5c71a", color: "white" }} className=" btn float-end mb-3 mt-0">Checkout</button> :
                        <button style={{ background: "#f5c71a", color: "white" }} className=" btn float-end mb-3 mt-0">Sign In to Checkout</button>
                    }

                </div>
            </div> : ""}
        </>
    )
}

export default Checkout;