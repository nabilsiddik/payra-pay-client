import App from "@/App"
import SignUpPage from "@/Pages/SignUpPage"
import { createBrowserRouter } from "react-router"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/signup',
                element: <SignUpPage />
            }
        ]
    }
])

export default router
