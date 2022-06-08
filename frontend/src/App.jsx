import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Login from "./component/User/Login";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from "./component/scroll-to-top/scroll-to-top";
import SignUp from "./component/User/SignUp";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";
import NotFound from "./component/layout/Not Found/NotFound.jsx";
import Categories from "./component/Admin/Categories.jsx";
import NewCategory from "./component/Admin/NewCategory.jsx";
import UpdateCategory from "./component/Admin/UpdateCategory.jsx";
import ProductListMen from "./component/Product/ProductListMen";
import ProductListNew from "./component/Product/ProductListNew";
import categoryList from "./component/Categories/CategoryList";
import CategoryDetails from "./component/Categories/CategoryDetails";
import ProductListWomen from "./component/Product/ProductListWomen";




function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Deoid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />


        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/profile/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUp} />


        
        <Route exact path="/products-men" component={ProductListMen} />
        <Route exact path="/products-new" component={ProductListNew} />
        <Route exact path="/products-women" component={ProductListWomen} />

        <Route exact path="/categories" component={categoryList} />

        <Route exact path="/category/:category/:id" component={CategoryDetails} />


        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />


      <ProtectedRoute
          exact
          path="/admin/categories"
          isAdmin={true}
          component={Categories}
        />
        <ProtectedRoute
          exact
          path="/admin/category"
          isAdmin={true}
          component={NewCategory}
        />

        <ProtectedRoute
          exact
          path="/admin/category/:id"
          isAdmin={true}
          component={UpdateCategory}
        />
{/* 
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
