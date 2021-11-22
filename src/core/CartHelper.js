import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function showErr() {
    toast.error("Item Has Been already Added to the cart ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

function showSuc() {

    toast.success("Item Has Been Added to the cart ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

}

export const addItem = (item = [], pid, count = 0) => {
    let flagSuc=true;
    let cart = [];
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((c, i) => {
        if (c._id === pid) {
            showErr();
            flagSuc=false;
        }
        return null;
    })

    cart.push({
        ...item,
        count: 1
    });
    // console.log(flagSuc);
    if(flagSuc){
        showSuc();
    }
    

    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
    });



    localStorage.setItem('cart', JSON.stringify(cart));


};


export const itemTotal = () => {

    if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length;
    }

    return 0;
};



export const getCart = () => {

    if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'));
    }

    return 0;
};


export const updateItem = (productId, count) => {
 
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
            return null;
        });
        // console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};


export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
             
            }
            return null;
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart =() => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
    }
};