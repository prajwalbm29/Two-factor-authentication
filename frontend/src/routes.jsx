import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Setup2FA from './Pages/Setup2FA';
import Verify2FA from './Pages/Verify2FA';
import Error from './Pages/Error';
import ProtectedRouter from './Components/ProtectedRouter';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRouter />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: "/setup-2fa",
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: "/verify-2fa",
                element: <Verify2FA />,
                errorElement: <Error />
            },
        ]
    }

])

export default router