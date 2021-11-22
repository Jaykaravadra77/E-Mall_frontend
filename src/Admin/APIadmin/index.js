
export const addcategoryAPI = (catName,token) => {


    let url = `${process.env.REACT_APP_API_URL}/category/create`;

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": token,
        },
        body: JSON.stringify(catName)
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}

export const addProductAPI = (formdata,token) => {
     

    let url = `${process.env.REACT_APP_API_URL}/product/create`;

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Authorization": token,
        },
        body: formdata
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}

export const fetchCategoryAPI = () => {
   
    let url = `${process.env.REACT_APP_API_URL}/category`;
   
    return fetch(`${url}`, {

         method: "GET",
        
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}

export const listOrders = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/list/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "authorization": token
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const orderByid = (id) => {
     

    let url = `${process.env.REACT_APP_API_URL}/order/${id}`;

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
        },
        body: id
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}


export const getStatusValues = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/status-values`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "authorization":token
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateOrderStatus = (token, orderId, status) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "authorization": token
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getProducts = () => {
    console.log("fired");
    return fetch(`${process.env.REACT_APP_API_URL}/products?limit=1000`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "authorization": token
        },
        body:JSON.stringify({productId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "authorization": token
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const categoryByid = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
