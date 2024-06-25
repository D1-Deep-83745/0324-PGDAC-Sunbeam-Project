import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,
  BsBookFill,
  BsBook,
  BsBookHalf}
 from 'react-icons/bs'

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
        <a href="/dashboard" className='text-decoration-none text-white menu'>
            <li className="sidebar-list-item">
                  <BsGrid1X2Fill className="icon"/>Dashboard
            </li>
            </a>
            <li className="sidebar-list-item">
                <a href="/Books">
                   <BsBookHalf className="icon"/>Books
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/Categories">
                   <BsFillGrid3X3GapFill className="icon"/>Categories
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/users">
                   <BsPeopleFill className="icon"/>Users
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/Orders">
                   <BsListCheck className="icon"/>Inventory
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/Reports">
                   <BsMenuButtonWideFill className="icon"/>Reports
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/settings">
                   <BsFillGearFill className="icon"/>Settings
                </a>
            </li>
        </ul>
    </aside>
   )

}

export default Sidebar