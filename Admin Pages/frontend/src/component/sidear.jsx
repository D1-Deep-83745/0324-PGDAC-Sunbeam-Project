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
            <li className="sidebar-list-item">
                <a href="/">
                   <BsGrid1X2Fill className="icon"/>Dashboard
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsBookHalf className="icon"/>Books
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsFillGrid3X3GapFill className="icon"/>Categories
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsPeopleFill className="icon"/>Users
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsListCheck className="icon"/>Inventory
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsMenuButtonWideFill className="icon"/>Reports
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/">
                   <BsFillGearFill className="icon"/>Settings
                </a>
            </li>
        </ul>
    </aside>
   )

}

export default Sidebar