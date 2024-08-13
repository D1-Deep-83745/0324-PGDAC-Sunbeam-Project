import { useState } from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import imageSrc from '../images/facebook_profile_image.png';
import { Link } from 'react-router-dom';
 function Header(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const Opensidebar = ()=>{
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return(
       <div>
            <header className="header">
                <div className="menu-icon">
                    <BsJustify className="icon" onClick={Opensidebar}/>

                </div>
                <div className="header-left">
                      <img src={imageSrc} alt="" style={{height:"50px"}}/>
                </div>
                <div className="header-right">
                    <BsFillBellFill className="icon"/>
                    <BsFillEnvelopeFill className="icon"/>
                    <Link to="/profile"><BsPersonCircle className='icon'/></Link>
                </div>
            </header>
       </div>
    )
}

export default Header