import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import protect route
import PrivateRoute from "./hooks/PrivateRoute";

// Import components
import Header from "./components/Header";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";

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
      <Route path="/me" element={<PrivateRoute/>}>
        <Route path="/me" element={<Me/>}/>
      </Route>
    </Routes>
    
    </Router>
    </>
  );
}

export default App;
