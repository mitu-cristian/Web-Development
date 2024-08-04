import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";

const App = () => {
  return (
    <>
    <Header/>
    <Container className="my-2">
      <Outlet/>
    </Container>
    <h1>Mern Auth</h1>
    </>
  )
}

export default App;