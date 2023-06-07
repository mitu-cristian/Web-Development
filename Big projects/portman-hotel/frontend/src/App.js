import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import protect route
import PrivateRoute from "./hooks/PrivateRoute";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import Booking from "./pages/Booking/Booking";
import SingleRoom from "./pages/Rooms/SingleRoom/SingleRoom";
import DoubleRoom from "./pages/Rooms/DoubleRoom/DoubleRoom";
import TripleRoom from "./pages/Rooms/TripleRoom/TripleRoom";

function App() {
  return (
    <>
    <ToastContainer transition={Zoom} theme="colored" position="top-center"/>
    <Router>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/me" element={<PrivateRoute/>}>
        <Route path="/me" element={<Me/>}/>
      </Route>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/single-room" element={<SingleRoom/>}/>
      <Route path="/double-room" element={<DoubleRoom/>}/>
      <Route path="/triple-room" element={<TripleRoom/>}/>
    </Routes>
    
    </Router>
    </>
  );
}

export default App;
