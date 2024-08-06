import "./App.css";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import Categories from "./pages/categories";
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Books" element={<Books/>}/>
        <Route path="/Categories" element={<Categories/>}/>
        {/* <Route path="/users" element={<Users/>}/>
        <Route path="/Orders" element={<Orders/>}/>
        <Route path="/Reports" element={<Reports/>}/>
        <Route path="/settings" element={<Settings/>}/> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
