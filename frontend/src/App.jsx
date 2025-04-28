import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MyEditor from "./components/Editor.jsx";
import NewsPortal from "./components/NewsPortal.jsx";
import PostDetail from "./components/PostDetails.jsx";
import Navbar from "./components/Navbar.jsx"; // Added Navbar
import Footer from "./components/Footer.jsx"; // Added Footer

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<AuthForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Admin Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Route>

            {/* Other Routes */}
            <Route path="/myeditor" element={<MyEditor />} />
            <Route path="/" element={<NewsPortal />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
