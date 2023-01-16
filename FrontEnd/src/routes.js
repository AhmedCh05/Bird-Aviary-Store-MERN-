
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import AddUsers from "views/AddUsers.js";
import ListUsers from "views/ListUsers.js";
import AddProducts from "views/AddProducts.js";
import Icons from "views/Icons.js";
import Products from "views/Products.js";
import ListOrders from "./views/ListOrders.js";
import productDetails from './views/productDetails';
import orderDetails from './views/OrderDetails';
import Login from './views/Login';


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    showInSideBar :true
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    showInSideBar :false
  },
  {
    path: "/user/:id",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    showInSideBar :false
  },
  {
    path: "/allusers",
    name: "List All Users",
    icon: "nc-icon nc-notes",
    component: ListUsers,
    layout: "/admin",
    showInSideBar :true

  },
  {
    path: "/product/:id",
    name: "Product Details",
    icon: "nc-icon nc-circle-09",
    component: productDetails,
    layout: "/admin",
    showInSideBar :false
  },
  {
    path: "/allproducts",
    name: "List All Products",
    icon: "nc-icon nc-bell-55",
    component: Products,
    layout: "/admin",
    showInSideBar :true

  },
  {
    path: "/adduser",
    name: "Add New User",
    icon: "nc-icon nc-notes",
    component: AddUsers,
    layout: "/admin"
  },
  {
    path: "/addproduct",
    name: "Add New Product",
    icon: "nc-icon nc-paper-2",
    component: AddProducts,
    layout: "/admin",
    showInSideBar :false
  },
  {
    path: "/allorders",
    name: "List All Orders",
    icon: "nc-icon nc-circle-09",
    component: ListOrders,
    layout: "/admin",
    showInSideBar :true
  },
  {
    path: "/order/:id",
    name: "Order Details",
    icon: "nc-icon nc-circle-09",
    component: orderDetails,
    layout: "/admin",
    showInSideBar :false
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    showInSideBar :false
  }
];

export default dashboardRoutes;
