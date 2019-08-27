import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginScreen from "../screens/login";
import HomeScreen from "../screens/home";
import Header from "../components/Header";
import TemporaryDrawer from "../components/Drawer";
import ProductsScreen from "../screens/products";

const PrivateRoute = ({ component: Component, ...rest }) => {

    return(
        <Route
            {...rest}
            render={props =>
                rest.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
            }
        />
    )
};

const Routes = (props) => (
    <BrowserRouter>
        {
            props.auth &&
            <div>
                <Header openDrawer={props.toggleDrawer}/>
                <TemporaryDrawer closeDrawer={props.toggleDrawer}
                                 open={props.openDrawer}/>
            </div>
        }
        <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <PrivateRoute exact isAuthenticated={props.auth} path="/" component={HomeScreen} />
            <PrivateRoute exact isAuthenticated={props.auth} path="/products" component={ProductsScreen} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;