import Header from "../component/header";
import UserTable from "../component/usertable";
import Sidebar from "../component/sidear";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blockUser, getAllUsers } from "../service/user";
import { toast } from "react-toastify";

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const Role = sessionStorage.getItem('role');

    useEffect(() => {
        loadOnStartUp();
    }, []);

    const loadOnStartUp = async () => {
        const userResult = await getAllUsers();
        if (userResult.status === 200) {
            setUsers(userResult.data);
            setFilteredUsers(userResult.data); 
        }
    };
     
    const handleBlock = async(id)=>{
              const blockResult = await blockUser(id)
              if(blockResult.status ===200){
                toast.success("User has been blocked Permanently")
                loadOnStartUp()
              }   
    }

    const handleSelectChange = (event) => {
        const selectedRole = event.target.value;
        if (selectedRole) {
            const filtered = users.filter(user => user.userRole === selectedRole);
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); 
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <Sidebar />
                </div>
                <div className="col ms-0">
                    <Header />
                    <div />
                    <main className="mt-4 container-fluid">
                        <div className="filters mt-3">
                            <div className="select-container">
                                <select id="category-filter" onChange={handleSelectChange} >
                                    <option value="">All Roles</option>
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="SALES">Sales</option>
                                </select>
                            </div>
                        </div>
                        <h2>User Data</h2>
                        <UserTable props={filteredUsers} onBlock={handleBlock}/>

                        {Role === "ADMIN" && (
                            <Link to="/registerSalesperson">
                                <button className="btn btn-primary btn-outline" style={{ width: "200px" }}>
                                    Add new Sales Person
                                </button>
                            </Link>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserList;
