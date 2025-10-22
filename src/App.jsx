import { Navigate, Route, Routes } from 'react-router'
import PrivateRoutes from './routes/PrivateRoutes'
import PrivateLayout from './core/PrivateLayout/PrivateLayout'
import { Dashboard, Login, Users } from './pages'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route
                    path='/'
                    element={
                        <PrivateRoutes>
                            <PrivateLayout />
                        </PrivateRoutes>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path='users' element={<Users />} />
                </Route>
                {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}
            </Routes>
        </>
    )
}

export default App
