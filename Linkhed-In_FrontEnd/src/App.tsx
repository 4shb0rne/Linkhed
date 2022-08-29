import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import ForgetPassword from "./components/auth/forgetpassword";
import ResetPassword from "./components/auth/resetpassword";
import MainPage from "./pages/home";
import RegisterData from "./components/auth/registerdata";
import Profile from "./components/auth/profile";
import { AuthProvider } from "./utils/authContext";
import { RequireAuth } from "./utils/RequireAuth";
import { ModalProvider } from "./utils/modalContext";
import { PostsProvider } from "./utils/postContext";
import SearchPage from "./pages/searchpage";
import "../index.css";
function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <ModalProvider>
          <BrowserRouter>
            <Navbar></Navbar>
            <div className="body">
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
                <Route
                  path="/registerdata"
                  element={<RegisterData></RegisterData>}
                ></Route>
                <Route path="/home" element={<MainPage></MainPage>}></Route>
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile></Profile>
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/search/:query"
                  element={<SearchPage></SearchPage>}
                ></Route>
              </Routes>
            </div>
            <Footer></Footer>
          </BrowserRouter>
        </ModalProvider>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
