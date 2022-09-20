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
import Notification from "./pages/notification";
import JobDetail from "./pages/JobDetail";
import JobForm from "./pages/JobForm";
import Job from "./pages/job";
import ManageJob from "./pages/managejob";
import VerificationCode from "./components/auth/verificationcode";
import { GuestAuth } from "./utils/GuestAuth";
import "../index.css";
import { ThemeContext } from "./utils/themeContext";
import Follow from "./pages/follow";
import { useState } from "react";
import Chat from "./pages/chat";
import GoogleRegister from "./components/auth/googleregister";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AuthProvider>
          <PostsProvider>
            <ModalProvider>
              <BrowserRouter>
                <Navbar></Navbar>
                <div className={`body theme-${theme}`}>
                  <Routes>
                    <Route path="/"></Route>
                    <Route
                      path="/follow"
                      element={
                        <RequireAuth>
                          <Follow></Follow>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/login"
                      element={
                        <GuestAuth>
                          <Login></Login>
                        </GuestAuth>
                      }
                    ></Route>
                    <Route
                      path="/googleregister"
                      element={
                        <GuestAuth>
                          <GoogleRegister></GoogleRegister>
                        </GuestAuth>
                      }
                    ></Route>
                    <Route
                      path="/chat"
                      element={
                        <RequireAuth>
                          <Chat></Chat>
                        </RequireAuth>
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
                      path="/verificationcode"
                      element={
                        <GuestAuth>
                          <VerificationCode></VerificationCode>
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
                    <Route
                      path="/notification"
                      element={
                        <RequireAuth>
                          <Notification></Notification>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/job"
                      element={
                        <RequireAuth>
                          <Job></Job>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/jobform"
                      element={
                        <RequireAuth>
                          <JobForm></JobForm>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/jobdetail"
                      element={
                        <RequireAuth>
                          <JobDetail></JobDetail>
                        </RequireAuth>
                      }
                    ></Route>
                    <Route
                      path="/managejob"
                      element={
                        <RequireAuth>
                          <ManageJob></ManageJob>
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
      </ThemeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
