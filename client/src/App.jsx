import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./component/layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./component/product/ProductDetails";
import CheckOut from "./component/cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./component/layout/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./component/admin/UserManagement";
import ProductManagement from "./component/admin/ProductManagement";
import EditProductPage from "./component/admin/EditProductPage";
import OrderManagementPage from "./component/admin/OrderManagementPage";

import { Provider } from "react-redux";
import store from "../redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route
              path="order/confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route
              path="order/confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>

          <Route>
            {/* {Admin Layout} */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
              <Route path="orders" element={<OrderManagementPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
