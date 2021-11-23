import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import Layout from '../core/Layout';
import AdminLayout from './AdminLayout';
import { getProduct } from './APIadmin';
import { fetchCategoryAPI } from './APIadmin';
import { categoryByid } from './APIadmin';
import { updateProduct } from './APIadmin';
import { Chk } from '../User/Chkauth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function UpdateProduct() {
    let history = useHistory();
    let { id } = useParams();
    let [category,setCategory]= useState();
    let checkAuth = Chk();
 
    const [values, setValues] = useState({
        name: '',
        category: '',
        price: '',
        categories: '',
        descreption: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        createdProduct: '',
        redirectoProfile: '',
        formData: ''

    })
    const { categories, formData } = values;
    console.log(formData);
   
     
    const handlaval = (event) => {
        let value;
        event.target.name === 'photo' ? value = event.target.files[0] : value = event.target.value;
        let name = event.target.name;
        formData.set(name, value);

        setValues((values) => {
            return {
                ...values,
                [name]: value
            }
        })
    }


    function showsuc() {
		toast.success("Product Added Successfully ", {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	function showEroor(error) {
		toast.error(error, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	}

        
    function loadProduct(){
        getProduct(id).then((product)=>{
            categoryByid(product.category).then((category)=>{
      
               setCategory(category.name);
            })
            // console.log(product.category);
           setValues({
               name:product.name,
               price:product.price,
               quantity:product.quantity,
               descreption:product.descreption,
               category:product.category,
               formData:new FormData()

           })
          
        })
    }

    async function fetchCat() {
        // let hidd= document.getElementById("ho");
        // hidd.style.display = "none";

		try {
			let data = await fetchCategoryAPI();
			setValues({ ...values, categories: data.categories });
		} catch (error) {

		}


	}
   

    function submitUpdate(event){
        event.preventDefault();
        
        console.log("submit fired");
        if(checkAuth){
            updateProduct(id,checkAuth.token,formData).then((data)=>{
              console.log(data);
              showsuc("Product Updated Successfully");
              setTimeout(() => {
                history.push("/admin/addProduct");
              }, 2000);
            }).catch((err)=>{
                console.log(err);
            })
        }
     
    }
   

    useEffect(()=>{
      
       loadProduct();
    },[])

    function UpdateForm() {
        return (
            <>
                <div className="col-md-9 mx-auto mt-5">
                    <form onSubmit={submitUpdate} >
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-secondary">Product Name</label>
                                    <input type="text" onChange={handlaval} value={values.name} name="name" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-secondary">Price(in numbers)</label>
                                    <input type="text" onChange={handlaval} value={values.price} name="price" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-secondary">Photo</label>
                                    <input type="file" onChange={handlaval} name="photo" className="form-control" />
                                </div>
                               
                                <div className="col-md-5 mx-3">
                                    <label className="control-label text-secondary">Category</label>
                                    {/* {console.log(values.category)} */}
                            
                                    <select onClick={fetchCat} name="category" value={values.category}   onChange={handlaval} className="form-control selectpicker">
                                      
                                          <option id="ho" className="text-info bg-seondar"  disabled >{category}</option>
                                        {categories ? Array.from(categories).map((c, i) => {
                                             
                                                return (
                                                    <option key={i}  value={c._id}  > {c.name} </option>
                                                )
                                            
                                           
                                        }) : ""}


                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <div className="row div-col-md-12">
                                <div className="col-md-6">
                                    <label className="control-label text-secondary">Quantity(in numbers)</label>
                                    <input onChange={handlaval} type="tel" value={values.quantity} name="quantity" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-secondary">Shipping</label>
                                    <select onChange={handlaval} name="shipping" className="form-control selectpicker">
                                        <option  > Select Shiping</option>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>



                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mt-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="control-label text-secondary">Description</label>
                                    <textarea onChange={handlaval} value={values.descreption} name="descreption" className="form-control" rows="5" ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-outline-success  ">Update Product</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }


    return (
        <Layout className="container">
            <AdminLayout>
                {UpdateForm()}
            </AdminLayout>
        </Layout>
    )
}

export default UpdateProduct;