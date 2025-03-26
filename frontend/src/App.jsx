import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx"; // Example component
import Dashboard from "./components/Dashboard.jsx"; // Example component
import Customers from "./pages/Customers.jsx"; // Example page
import Products from "./pages/Products.jsx"; // Example page
import Employees from "./pages/Employees.jsx"; // Example page
import KanbanBoard from "./Apps/KanbanBoard.jsx"; // Example page
import CalendarApp from "./Apps/CalendarApp.jsx"; // Example page
import AuthForm from "./components/AuthForm.jsx"; // Login form
import ForgotPassword from "./components/ForgotPassword.jsx"; // Password recovery
import ProtectedRoute from "./components/ProtectedRoute"; // Your ProtectedRoute
import Unauthorized from "./pages/Unauthorized.jsx"; // Unauthorized page
import UserDashboard from "./pages/UserDashboard.jsx"; // User Dashboard page
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Admin Dashboard page
import MyEditor from "./components/Editor.jsx";
import NewsPortal from "./components/NewsPortal.jsx";
import PostDetail from "./components/PostDetails.jsx";
const App = () => {
  return (
    <Router>
      <div className="flex">
        <main className="flex-1 p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            {/* Protect User Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/userdashboard" element={<UserDashboard />} />
            </Route>

            {/* Protect Admin Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Route>

            {/* Any other routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<CalendarApp />} />
            <Route path="/myeditor" element={<MyEditor />} />
            <Route path="/newsportal" element={<NewsPortal />} />
            <Route path="/post/:id" element={<PostDetail />} />
          {/* <Route path="/postdetails" element={<PostDetails />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
