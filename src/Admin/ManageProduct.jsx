import Layout from "../core/Layout";
import AdminLayout from "./AdminLayout";
import React, { useEffect, useState } from "react";
import { addProductAPI, fetchCategoryAPI, deleteProduct } from "./APIadmin";
import { Chk } from "../User/Chkauth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from "./APIadmin";
import { NavLink } from "react-router-dom";



function ManageProducts() {
	let jwt = Chk();
	let [products, setPoructs] = useState([]);
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
		formData: new FormData()


	})
	const { categories, formData } = values;


	useEffect(() => {
		loadProducts();
	}, [])

	function loadProducts() {
		console.log("Use Effect Fired");
		getProducts().then((data) => {
			setPoructs(data)
		}).catch((err) => {
			console.log(err);
		})
	}

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




	function submitData(event) {
		event.preventDefault();
		addProductAPI(formData, jwt.token).then((data) => {
			if (data.error) {
				showEroor(data.error);
			} else {
				loadProducts();
				showsuc()
				setValues({
					name: '',
					descreption: '',
					quantity: '',
					price: '',
					shipping: '',
					photo: ''
				})
			}
		})


	}

	async function fetchCat() {
		try {
			let data = await fetchCategoryAPI();
			setValues({ ...values, categories: data.categories });
		} catch (error) {

		}


	}

	function delProduct(id) {
		deleteProduct(id, jwt.token).then((data) => {
			showsuc("Product Deleted Successfully");
			loadProducts();
		})
	}


	function listProducts() {
		return (
			<div className="row justify-content-center">
				<h3 className="     b-b-default mt-3 ">   </h3>
				<h4 className="text-center mt-2">Products</h4>
				<div className="col-md-10">
					{products.length>0?
						products.map((p, i) => {
							return (<>
								<h3 className="mb-4"> </h3>
								<NavLink to={`/admin/updateproduct/${p._id}`} className="btn btn-outline-info text-dark"> Update</NavLink>
								<button className="btn btn-danger mx-1" onClick={() => { delProduct(p._id) }}>Delete</button>
								<ul class="list-group" key={i}>
									<li class="list-group-item"><span className="text-primary">Product Name:</span> 	{p.name}</li>
									<li class="list-group-item"><span className="text-primary">Price:</span>	{p.price}</li>
									<li class="list-group-item"><span className="text-primary">Descreption</span>	{p.descreption}</li>
									<li class="list-group-item"><span className="text-primary">Quantity</span>	{p.quantity}</li>
									<li class="list-group-item"><span className="text-primary">Category</span>   {p.category.name}</li>
								</ul></>)
						})
					:<h5 className="mt-5 text-center">You Have No Products</h5>}
				</div>
			</div>
		)
	}


	function addProdctForm() {
		return (
			<div className="row">

				<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Add Product
				</button>


				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div className="modal-header">

								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<form onSubmit={submitData} >
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
												<select onClick={fetchCat} name="category" value={values.category} onChange={handlaval} className="form-control selectpicker">
													<option>Pease select Category</option>

													{categories ? Array.from(categories).map((c, i) => {
														return (
															<option key={i} value={c._id}>{c.name} {i}</option>
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
												<button className="btn btn-outline-success  ">Add Product</button>
											</div>
										</div>
									</div>
								</form>

							</div>

						</div>
					</div>
				</div>


			</div>
		)
	}


	function ManageProducts() {
		return (
			<>

				<h2 className="mt-1 text-primary">Manage Products</h2>
				<h3 className="     b-b-default ">   </h3>
				<div className="row  ">
					<div className="col-md-2 mx-3">

						{addProdctForm()}


					</div>
				</div>
				{listProducts()}
			</>
		)
	}

	return (
		<Layout className="container">
			<AdminLayout>
				{ManageProducts()}
			</AdminLayout>
		</Layout>
	)

}

export default ManageProducts;