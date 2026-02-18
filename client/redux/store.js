import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import productReducer from "../redux/slice/productSlice";
import cartReducer from "../redux/slice/cartSlice";
import checkoutReducer from "../redux/slice/checkoutSlice";
import orderReducer from "../redux/slice/orderSlice";
import adminReducer from "../redux/slice/adminSlice";
import adminProductReducer from "../redux/slice/adminProductSlice";
import adminOrderReducer from "../redux/slice/adminOrderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
  },
});
export default store;
