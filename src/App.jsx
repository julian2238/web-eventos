import { Route, Routes } from 'react-router'
import Login from './pages/login/Login'
import PrivateRoutes from './routes/PrivateRoutes'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route
                    path='dashboard'
                    element={
                        <PrivateRoutes user={'data'}>
                            <Dashboard />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </>
    )
}

export default App
