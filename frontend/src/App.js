import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

import './index.css'

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ClassManagement from "./pages/Admin/ClassManagement";
import StudentManagement from "./pages/Admin/StudentManagement";
import TeacherManagement from "./pages/Admin/TeacherManagement";

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";

// Student Pages
import StudentDashboard from "./pages/Student/Dashboard";
import StudentProfile from "./pages/Student/Profile";
import StudentClasses from "./pages/Student/Classes";

// Teacher Pages
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherProfile from "./pages/Teacher/Profile";
import TeacherClasses from "./pages/Teacher/Classes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/classes" element={<ClassManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/teachers" element={<TeacherManagement />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["student"]} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/classes" element={<StudentClasses />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/profile" element={<TeacherProfile />} />
              <Route path="/teacher/classes" element={<TeacherClasses />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
