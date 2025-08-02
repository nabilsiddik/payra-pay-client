import Home from "@/Pages/Home"
import LoginPage from "@/Pages/LoginPage"
import SignUpPage from "@/Pages/SignUpPage"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/signup',
                element: <SignUpPage />
            },
            {
                path: '/login',
                element: <LoginPage/>
            }
        ]
    }
])

export default router
