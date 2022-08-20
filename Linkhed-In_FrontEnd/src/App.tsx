import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import ForgetPassword from "./components/auth/forgetpassword";
import ResetPassword from "./components/auth/resetpassword";
import MainPage from "./pages/home";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/forgetpassword"
          element={<ForgetPassword></ForgetPassword>}
        ></Route>
        <Route
          path="/resetpassword"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/home" element={<MainPage></MainPage>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
