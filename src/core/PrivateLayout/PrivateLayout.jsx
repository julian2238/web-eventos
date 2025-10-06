import { Outlet } from 'react-router'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'

const PrivateLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default PrivateLayout
