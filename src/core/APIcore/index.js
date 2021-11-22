export const getProduct = (sBy) => {
 

    let url = `${process.env.REACT_APP_API_URL}/products?sortBy=${sBy}&order=desc&limit=5`;
   
    return fetch(`${url}`, {

         method: "GET",
        
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}


export const getCategories = () => {
 

     let url = `${process.env.REACT_APP_API_URL}/category`;
    
     return fetch(`${url}`, {
 
          method: "GET",
         
     }).then((res) => {
          return res.json();
     }).catch((err) => {
          console.log(err);
     })
 }



 export const productsByfilters = (filter) => {


     let url = `${process.env.REACT_APP_API_URL}/products/by/search`;
 
     return fetch(url, {
         method: "POST",
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json', 
         },
         body: JSON.stringify({filter})
     }).then((res) => {
         return res.json();
     }).catch((err) => {
         console.log(err);
     })
 }


 export const productBysearch = (searchData) => {


    let url = `${process.env.REACT_APP_API_URL}/products/search`;

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(searchData)
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}
 

export const lsingleproduct = (product_id) => {
 

    let url = `${process.env.REACT_APP_API_URL}/product/${product_id}`;
   
    return fetch(`${url}`, {

         method: "GET",
        
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}


export const catByid = (cat_id) => {
 

    let url = `${process.env.REACT_APP_API_URL}/category/${cat_id}`;
   
    return fetch(`${url}`, {

         method: "GET",
        
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}


export const reletedProducts = (product_id) => {
 

    let url = `${process.env.REACT_APP_API_URL}/products/${product_id}`;
   
    return fetch(`${url}`, {

         method: "GET",
        
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}


export const getBraintreeClientToken = (token) => {
     return fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken`, {
         method: "GET",
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             "authorization": token
         }
     })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
 };
 

 export const paymentProcess = (token, paymentData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const createOrder = (userId, token, createOrderData) => {
    console.log("Create order fired");
    return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};