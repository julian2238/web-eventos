import { Navigate, Route, Routes } from 'react-router'
import PrivateRoutes from './routes/PrivateRoutes'
import PrivateLayout from './core/PrivateLayout/PrivateLayout'
import { Dashboard, Login, Users, Events, Categories } from './pages'

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
                    <Route index element={<Navigate to='/dashboard' replace />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='users' element={<Users />} />
                    <Route path='events' element={<Events />} />
                    <Route path='categories' element={<Categories />} />
                </Route>
                <Route path='*' element={<Navigate to='/login' replace />} />
            </Routes>
        </>
    )
}

export default App
