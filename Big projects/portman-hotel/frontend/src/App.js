import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Header from "./components/Header";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <>
    <ToastContainer transition={Zoom} theme="colored" position="top-center"/>
    <Router>

    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    
    </Router>
    </>
  );
}

export default App;
