import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HeaderComponent from "./components/HeaderComponent";
import NewTicketPage from "./pages/NewTicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import TicketPage from "./pages/TicketPage";
import VerifyEmailLinkPage from "./pages/VerifyEmailLinkPage";
import PrivateRouteComponent from "./components/PrivateRouteComponent";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <Router>
      <div className="container">
        <HeaderComponent/>
        <Routes>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/login" element = {<LoginPage/>}/>
          <Route path = "/register" element = {<RegisterPage/>}/>
          <Route path = "/ticket/:ticketId" element = {<TicketPage/>}/>
          <Route path = "/verify/:userId/:uniqueString" element = {<VerifyEmailLinkPage/>}/>
          
          {/* Private routes */}
          
          <Route path = "/new-ticket" element = {<PrivateRouteComponent/>}>
            <Route path = "/new-ticket" element = {<NewTicketPage/>}/>
          </Route>

          <Route path = "/my-tickets" element = {<PrivateRouteComponent/>}>
            <Route path = "/my-tickets" element = {<MyTicketsPage/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer/>

    </>
  )
}

export default App
