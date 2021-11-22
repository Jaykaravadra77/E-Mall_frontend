import React from 'react';
import { Route } from 'react-router-dom';
 
import { Chk } from '../User/Chkauth';
import { Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
   
    let check = Chk();
    return (
        <Route {...rest} render={props => (
            check?
                <Component {...props} />
            : <Redirect to="/signin"/> 
        )} />
    );
};

export default PrivateRoute;