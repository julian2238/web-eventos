import { Navigate, useLocation } from 'react-router'
import useAuthStore from '../store/useAuthStore'

const PrivateRoutes = ({ children }) => {
    const { isAuthenticated } = useAuthStore()
    const location = useLocation()

    console.log('PrivateRoutes - isAuthenticated:', isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    return children
}

export default PrivateRoutes
