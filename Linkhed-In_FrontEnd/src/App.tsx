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
import UserProfile from "./pages/userprofile";
import SearchPage from "./pages/searchpage";
import NetworkPage from "./pages/networkpage";
import Connection from "./pages/connection";
import { GuestAuth } from "./utils/GuestAuth";
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
                <Route
                  path="/login"
                  element={
                    <GuestAuth>
                      <Login></Login>
                    </GuestAuth>
                  }
                ></Route>
                <Route
                  path="/register"
                  element={
                    <GuestAuth>
                      <Register></Register>
                    </GuestAuth>
                  }
                ></Route>
                <Route
                  path="/forgetpassword"
                  element={
                    <GuestAuth>
                      <ForgetPassword></ForgetPassword>
                    </GuestAuth>
                  }
                ></Route>
                <Route
                  path="/resetpassword"
                  element={
                    <GuestAuth>
                      <ResetPassword></ResetPassword>
                    </GuestAuth>
                  }
                ></Route>
                <Route
                  path="/registerdata"
                  element={
                    <GuestAuth>
                      <RegisterData></RegisterData>
                    </GuestAuth>
                  }
                ></Route>
                <Route
                  path="/home"
                  element={
                    <RequireAuth>
                      <MainPage></MainPage>
                    </RequireAuth>
                  }
                ></Route>
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
                  element={
                    <RequireAuth>
                      <SearchPage></SearchPage>
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/openprofile/:id"
                  element={
                    <RequireAuth>
                      <UserProfile></UserProfile>
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/networkpage"
                  element={
                    <RequireAuth>
                      <NetworkPage></NetworkPage>
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/connection"
                  element={
                    <RequireAuth>
                      <Connection></Connection>
                    </RequireAuth>
                  }
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
