import "./App.css";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import { ToastContainer } from "react-toastify";
import EditBooks from "./pages/editBook";
import AddBook from "./pages/addbook";
import UserList from "./pages/users";
import RegisterSalesPerson from "./pages/registerSalesman";
import InventoryTable from "./pages/bookInventory";
import Review from "./pages/review";
import Settings from "./pages/settings";
import AllInvoices from "./pages/allInvoices";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Books" element={<Books/>}/>
        <Route path="/editBooks/:id" element={<EditBooks />} />
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/registerSalesperson" element={<RegisterSalesPerson/>}/>
        <Route path="/inventory" element={<InventoryTable/>}/>
        <Route path="/review" element={<Review/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/invoices" element={<AllInvoices/>}/>
       </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
