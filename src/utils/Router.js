import Cart from "../screens/Cart";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Sell from "../screens/Sell";
import Signup from "../screens/Signup";



const routes = [
    {
        path:'/',
        element:<Home />

    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/cart',
        element:<Cart />
    },
    {
        path:'/sell',
        element:<Sell />
    },
]


export {
    routes
}