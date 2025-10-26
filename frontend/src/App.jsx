import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import DetectionList from "./components/DetectionList";
import AddDisease from "./components/AddDisease";
import DiseaseList from "./components/DiseaseList";
import DiseaseDetail from "./components/DiseaseDetail";
import UserDetail from "./components/UserDetail";
import AddDetection from "./components/AddDetection";
import DetectionDetail from "./components/DetectionDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AdminLayout from "./components/AdminLayout";
import MainLayout from "./components/MainLayout";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Routes without any layout */}
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes with AdminLayout */}
        <Route 
          element={
            <ProtectedRoute loggedIn={loggedIn} allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/edit/:userId" element={<EditUser />} />
          <Route path="/admin/users/:userId" element={<UserDetail />} />
          <Route path="/admin/diseases" element={<DiseaseList />} />
          <Route path="/admin/diseases/add" element={<AddDisease />} />
        </Route>

        {/* User Routes with MainLayout */}
        <Route 
          element={
            <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
              <MainLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<UserDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/detections" element={<DetectionList />} />
          <Route path="/detections/add" element={<AddDetection />} />
          <Route path="/detections/:detectionId" element={<DetectionDetail />} />
          <Route path="/diseases" element={<DiseaseList />} />
          <Route path="/diseases/:diseaseId" element={<DiseaseDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
