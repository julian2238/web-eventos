import { Outlet } from 'react-router'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'

const PrivateLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                {/* <Navbar /> */}
                <main style={{ backgroundColor: '#ffffff' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default PrivateLayout
