import AdminRoot from "../components/admin/AdminRoot";
import SiteRoot from "../components/site/SiteRoot";
import AdminPage from "../pages/admin/AdminPage";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/login/login";
import Signup from "../pages/register/register";
import HomePage from "../pages/site/HomePage";

export const routes = [
    {
        path: '/',
        element: <SiteRoot />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
        ],

    },
    {
        path: '/admin',
        element: <AdminRoot />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Signup />,
    },
]