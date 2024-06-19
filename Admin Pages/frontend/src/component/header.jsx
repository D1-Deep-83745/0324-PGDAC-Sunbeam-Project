import { useState } from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
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

                </div>
                <div className="header-right">
                    <BsFillBellFill className="icon"/>
                    <BsFillEnvelopeFill className="icon"/>
                    <BsPersonCircle className='icon'/>
                </div>
            </header>
       </div>
    )
}

export default Header