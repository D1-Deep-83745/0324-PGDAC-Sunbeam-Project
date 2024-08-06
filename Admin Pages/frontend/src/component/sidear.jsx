import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,
  BsBookFill,
  BsBook,
  BsBookHalf}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'
function Sidebar (){
   return (
    <aside id="sidebar" >
        
        <div className="sidebar-title">
        
            <div className="sidebar-brand">
                  <BsBook className="icon_header"/>Grantha-Verse
            </div>
            <span className="icon icon_close">X</span>
        </div>


        <ul className="sidebar-list">
        <Link to="/dashboard" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                  <BsGrid1X2Fill className="icon"/>Dashboard
            </li>
            </Link>
            <Link to="/Books" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsBookHalf className="icon"/>Books
            </li>
            </Link>
            <Link to="/Categories " className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsFillGrid3X3GapFill className="icon"/>Categories
            </li>
            </Link>
            <Link to="/users" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsPeopleFill className="icon"/>Users
            </li>
            </Link>
            <Link to="/Orders" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsListCheck className="icon"/>Inventory
            </li>
            </Link>
            <Link to="/Reports" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsMenuButtonWideFill className="icon"/>Reports
            </li>
                </Link>
            <Link to="/settings" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                   <BsFillGearFill className="icon"/>Settings
            </li>
            </Link>
        </ul>
    </aside>
   )

}

export default Sidebar