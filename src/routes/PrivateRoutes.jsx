import { Navigate, useLocation } from 'react-router'
import useAuthStore from '../store/useAuthStore'

const PrivateRoutes = ({ children }) => {
    const token = useAuthStore((state) => state.token)
    const location = useLocation()

    console.log('PrivateRoutes - token:', token)

    if (!token) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    return children
}

export default PrivateRoutes
