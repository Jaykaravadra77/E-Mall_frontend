import { React, useEffect, useState } from "react";
import Layout from "../core/Layout";
import AdminLayout from "./AdminLayout";
import { Chk } from "../User/Chkauth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addcategoryAPI, fetchCategoryAPI, deleteCategory,updateCategory,categoryByid } from "./APIadmin";


function AddCategory() {
    let jwt = Chk();
    const [name, setName] = useState({
        value: ""
    });
    const [catagories, setcategories] = useState([]);
    const handleval = (event) => {

        const nvalue = event.target.value;
        setName({ value: nvalue });
    }
   
    let [updatecategory,setupdatecategory] = useState();
    let [sid ,setsid] = useState();

    useEffect(() => {
        loadCategories();
    }, [])

    function loadCategories() {
        fetchCategoryAPI().then((data) => {
            if (data.error) {
                showEroor(data.error)
            } else {
                setcategories(data);
            }
        })
    }


    function showsuc(msg) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 2000,
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

    function submitBtnEvent(event) {
        event.preventDefault();

        addcategoryAPI(name, jwt.token).then((data) => {
            if (data.error) {
                showEroor(data.error);
            } else {
                showsuc("Category Added Successfully");
                loadCategories();
                setName({ value: "" })
            }


        })
    }

    function deletcat(id) {
        if (jwt) {
            deleteCategory(jwt.token, id).then(() => {
                console.log("Success");
                loadCategories()
                showsuc("Category Deleted Successfully");
            })

        }
    }


    function categoryForm() {
        return (
            <>
                <h3 className="mt-3 text-primary">Add Category</h3>
                <h3 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">   </h3>
                <div className="row justify-content-center  mx-5 mt-4">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group">
                                <h6>Add Category</h6>
                                <input type="text" onChange={handleval} className="form-control" value={name.value} name="category" placeholder="Enter Category Name" />

                            </div>

                            <div className="form-group">
                                <button onClick={submitBtnEvent} className="btn btn-success col-md-4 mt-3">Add</button>

                            </div>
                        </form>
                    </div>
                </div>


            

            </>
        )
    }


    function handlcate(event){
        let value =event.target.value;
        setupdatecategory(value);
    }

    function lcate(id){
         
        if(jwt){
            categoryByid(id).then((data)=>{
                console.log(data);
                setupdatecategory(data.name);
                setsid(data._id);
            })
        }
      
    }

    function submitcatup(){
        if(jwt){
          
            updateCategory(jwt.token,sid,updatecategory).then((data)=>{
                 loadCategories();
                 showsuc("Category Fetched Sussessfully");
            })
        }
     
    }

    function listCategory() {
        return (
            <>
                <div className="col-md-8 mx-auto">
                    <h4 className=" mt-4 mb-3">Available Categories</h4>
                    {catagories.categories ? catagories.categories.map((c, i) => {
                        return (
                            <div key={i}>
                                <button className="btn btn-outline-info text-dark " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>lcate(c._id)}>Update</button>
                                <button className="btn btn-outline-danger mx-2 text-dark " onClick={() => { deletcat(c._id) }}>Delete</button>
                                <ul className="list-group mb-4">
                                    <li className="list-group-item"><span className="text-primary">Category id:</span> {c._id}</li>
                                    <li className="list-group-item"><span className="text-primary">Category Name:</span>   {c.name} </li>
                                </ul>
                            </div>
                            
                        )
                    }) : ""}
                </div>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                             
                            <div className="modal-body">
                           
                            <input type="text" onChange={handlcate} value={updatecategory || ''} className="form-control"   name="updatecategory"   />

                            </div>
                            <div className="modal-footer">
                    
                                <button type="button" onClick={submitcatup} className="btn btn-primary">Update Category</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Layout className="container">

            <AdminLayout >
                <ToastContainer />
                {categoryForm()}
                {listCategory()}

            </AdminLayout>
        </Layout>
    )
}

export default AddCategory;