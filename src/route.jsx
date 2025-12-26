import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from './pages/Cart/Cart.jsx';
import Contact from './pages/Contect/Contact.jsx';
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children : [
        {
            path :'home',
            element:<Home />,
        }, 
         {
            path :'cart',
            element:<Cart />,
        }, 
         {
            path :'Contact',
            element:<Contact />,
        }, 
    ]
    
  },
    {
    path: "/auth",
    element: <AuthLayout />,
    children : [
        {
            path :'login',
            element:<Login />,
        }, 
         {
            path :'register',
            element:<Register />,
        }, 
    ]
    
  },
]);

export default router;