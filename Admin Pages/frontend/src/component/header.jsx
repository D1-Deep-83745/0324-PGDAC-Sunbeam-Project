import { useState, useRef, useEffect } from 'react';
import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import { BiSolidLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import imageSrc from '../images/facebook_profile_image.png';
import { BsGrid1X2Fill, BsBookHalf, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function Header() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
    setSidebarMenuOpen(!sidebarMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setSidebarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="menu-icon">
          <BsJustify className="icon" onClick={toggleSidebar} />
        </div>
        <div className="header-left">
          <img src={imageSrc} alt="" style={{ height: '50px' }} />
        </div>
        <div className="header-right">
          <div className="profile-icon-container" ref={dropdownRef}>
            <BsPersonCircle className="icon" onClick={toggleDropdown} />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="dropdown-item">
                  <BiSolidLogOut className="icon" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {sidebarMenuOpen && (
        <div className="sidebar-menu" ref={sidebarRef}>
          <button onClick={toggleSidebar} className="close-menu">Close Menu</button>
          
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
        </div>
      )}
      <style jsx>{`
        .profile-icon-container {
          position: relative;
          display: inline-block;
        }

        .dropdown-menu {
          display: block;
          position: absolute;
          right: 0;
          background-color: #1e2833;
          border: 1px solid #434a52;
          border-radius: 4px;
          box-shadow: 0 6px 7px -3px rgba(0, 0, 0, 0.35);
          z-index: 1000;
          top: 100%;
          margin-top: 5px;
          padding: 10px;
          min-width: 150px;
          max-width: calc(100vw - 20px);
          box-sizing: border-box;
          right: 0;
          left: auto;
        }

        .dropdown-item {
          display: block;
          padding: 10px;
          color: #ffffff;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
        }

        .dropdown-item:hover {
          background-color: #2a5b9f;
        }

        .sidebar-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #263043;
          color: #ffffff;
          box-shadow: 0 6px 7px -3px rgba(0, 0, 0, 0.35);
          padding: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sidebar-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-menu li {
          margin: 15px 0;
        }

        .sidebar-menu a {
          color: #ffffff;
          text-decoration: none;
        }

        .sidebar-menu a:hover {
          text-decoration: underline;
        }

        .close-menu {
          background-color: #ff0000;
          color: #ffffff;
          border: none;
          padding: 10px;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .close-menu:hover {
          background-color: #cc0000;
        }
      `}</style>
    </div>
  );
}

export default Header;
