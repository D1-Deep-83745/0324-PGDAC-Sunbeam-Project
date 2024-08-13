import { BsGrid1X2Fill, BsBookHalf, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBook } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside id="sidebar" className={isOpen ? 'open' : ''}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <BsBook className="icon_header" />Grantha-Verse
                </div>
                <span className="icon icon_close" onClick={toggleSidebar}>X</span>
            </div>
            <ul className="sidebar-list">
                <Link to="/dashboard" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsGrid1X2Fill className="icon" />Dashboard
                    </li>
                </Link>
                <Link to="/Books" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsBookHalf className="icon" />Books
                    </li>
                </Link>
                <Link to="/users" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsPeopleFill className="icon" />Users
                    </li>
                </Link>
                <Link to="/inventory" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsListCheck className="icon" />Inventory
                    </li>
                </Link>
                <Link to="/review" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsMenuButtonWideFill className="icon" />Reviews
                    </li>
                </Link>
                <Link to="/settings" className='text-decoration-none text-white menu'>
                    <li className="sidebar-list-item">
                        <BsFillGearFill className="icon" />Settings
                    </li>
                </Link>
            </ul>
        </aside>
    );
}

export default Sidebar;
