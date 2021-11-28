import Signin from "./User/Signinin";
import Signup from "./User/Signup";
// import Home from "./core/Home";
import SingleProduct from "./core/SingleProduct";
import Userdashboard from "./User/Dashboard";
import PrivateRoute from "./Auth/PrivateRoutes";
import AdminRoutes from "./Auth/AdminRoutes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./Admin/AddCategory";
import ManageProducts from "./Admin/ManageProduct";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Olist from "./Admin/OrderList";
import OrderDetail from "./Admin/OrderDetail";
import Aboutus from "./core/Aboutus";
import UpdateProduct from "./Admin/UpdateProduct";
import UserList from "./Admin/UserList";
import ResetPassword from "../src/core/ResetPasswrod";
import NewPassword from "../src/core/NewPasswrod";

function Routes() {
    return (
        <>

            <BrowserRouter>

                <Switch>
                    <Route exact path="/" component={Shop} />

                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/aboutus" component={Aboutus} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/product/:productid" component={SingleProduct} />
                    <PrivateRoute component={Userdashboard} path="/dashboard" exact />
                    <AdminRoutes component={AddCategory} path="/admin/addcategory" exact />
                    <AdminRoutes component={ManageProducts} path="/admin/addProduct" exact />
                    <AdminRoutes component={Olist} path="/admin/orderlist" exact />
                    <AdminRoutes component={OrderDetail} path="/admin/orderdetail/:orderid" exact />
                    <AdminRoutes component={UpdateProduct} path="/admin/updateproduct/:id" exact />
                    <AdminRoutes component={UserList} path="/admin/users" exact />
                    <Route exact path="/reset">
                        <ResetPassword />
                    </Route>
                    <Route path="/reset/:token">
                        <NewPassword />
                    </Route>
                </Switch>

            </BrowserRouter>
        </>
    )
}

export default Routes;