import { FaBars, FaChevronLeft } from 'react-icons/fa6'
import './Sidebar.css'

const Sidebar = ({ children }) => {
    return (
        <aside className='sidebar-aside'>
            <nav className='sidebar-nav'>
                <div className='header'>
                    <FaChevronLeft />
                </div>
                <ul className='sidebar-ul'>{children}</ul>
                <div className='footer'>
                    <img
                        src='https://ui-avatars.com/api/name=Julian+Valderrama&?bold=true&background=random'
                        alt='GitHub Logo'
                        className='sidebar-avatar'
                    />
                    <div className='footer-text'>
                        <h4>Julian Valderrama</h4>
                        <p>Julian2238@hotmail.com</p>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
