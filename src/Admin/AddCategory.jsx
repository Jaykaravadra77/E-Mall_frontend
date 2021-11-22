import { React, useState } from "react";
import Layout from "../core/Layout";
import AdminLayout from "./AdminLayout";
import { Chk } from "../User/Chkauth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {addcategoryAPI} from "./APIadmin";
function AddCategory() {
    let jwt = Chk();
    const [name, setName] = useState();
    const handleval = (event) => {

        const nvalue = event.target.value;
        setName({ value: nvalue });
    }

   

    
    function showsuc() {
        toast.success("Category Created ", {
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

        addcategoryAPI(name,jwt.token).then((data) => {
            if (data.error) {
               showEroor(data.error);
            }else{
                showsuc();
            }
         

        })
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
                                <input type="text" onChange={handleval} className="form-control" name="category" placeholder="Enter Category Name" />

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

    return (
        <Layout className="container">

            <AdminLayout >
                <ToastContainer />
                {categoryForm()}

            </AdminLayout>
        </Layout>
    )
}

export default AddCategory;