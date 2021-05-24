import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Users from "./pages/UsersPages/Users";
import UserAdd from "./pages/UsersPages/UserAdd";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import { loadUserdata } from "./redux/actions/auth";
import PrivateRoute from "./routes/PrivateRoute";
import Products from "./pages/ProductPages/Products";
import ProductAdd from "./pages/ProductPages/ProductAdd";
import ProductEdit from "./pages/ProductPages/ProductEdit";
import CategoryPage from "./pages/CategoryPage";
import Orders from "./pages/OrderPages/Orders";


function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUserdata());
  }, []);

  return (
    <div className="wrap">
      <Navbar />

      <Switch>
        <PrivateRoute exact path="/products">
          <Products />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/categories">
          <CategoryPage />
        </PrivateRoute>
        <PrivateRoute exact path="/product/add">
          <ProductAdd />
        </PrivateRoute>
        <PrivateRoute exact path="/product/edit/:id">
          <ProductEdit />
        </PrivateRoute>
        <PrivateRoute exact path="/users/add">
          <UserAdd />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <Orders />
        </PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
