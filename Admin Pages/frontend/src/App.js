import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import Categories from "./pages/categories";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Books" element={<Books/>}/>
        <Route path="/Categories" element={<Categories/>}/>
        <Route path="/users" element={<Books/>}/>
        <Route path="/Orders" element={<Books/>}/>
        <Route path="/Reports" element={<Books/>}/>
        <Route path="/settings" element={<Books/>}/>
      </Routes>
    </div>
  );
}

export default App;
