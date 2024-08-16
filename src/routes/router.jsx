import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root/Root";
import Login from "../pages/root/signInUp/Login";
import Register from "../pages/root/signInUp/Register";
import Error from "../pages/404/Error";
import Products from "../pages/root/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Navigate to="products"></Navigate>,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
