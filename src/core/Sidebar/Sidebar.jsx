import { FaBars, FaChevronLeft } from 'react-icons/fa6'
import { FiHome, FiUsers, FiCalendar, FiTag, FiLogOut } from 'react-icons/fi'
import { Link, useLocation } from 'react-router'
import useAuthStore from '../../store/useAuthStore'
import './Sidebar.css'

const Sidebar = ({ children }) => {
    const location = useLocation()
    const { user, logout } = useAuthStore()

    const menuItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/users', icon: FiUsers, label: 'Usuarios' },
        { path: '/events', icon: FiCalendar, label: 'Eventos' },
        { path: '/categories', icon: FiTag, label: 'Categorías' },
    ]

    const handleLogout = () => {
        logout()
        window.location.href = '/login'
    }

    return (
        <aside className='sidebar-aside'>
            <nav className='sidebar-nav'>
                <div className='header'>
                    <div className='logo'>Eventos</div>
                </div>
                <ul className='sidebar-ul'>
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <li key={item.path} className={`sidebar-li ${isActive ? 'active' : ''}`}>
                                <Link to={item.path} className='sidebar-link'>
                                    <Icon className='sidebar-icon' />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className='footer'>
                    <img
                        src={`https://ui-avatars.com/api/name=${user?.fullName || 'User'}&?bold=true&background=random`}
                        alt='User Avatar'
                        className='sidebar-avatar'
                    />
                    <div className='footer-text'>
                        <h4>{user?.fullName || 'Usuario'}</h4>
                        <p>{user?.role || 'USUARIO'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='logout-btn'
                        title='Cerrar sesión'
                    >
                        <FiLogOut className='h-4 w-4' />
                    </button>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
