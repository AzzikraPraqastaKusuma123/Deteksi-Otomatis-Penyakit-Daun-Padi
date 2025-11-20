import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import DetectionList from "./components/DetectionList";
import AddDisease from "./components/AddDisease";
import EditDisease from "./components/EditDisease"; // Import EditDisease
import DiseaseList from "./components/DiseaseList";
import DiseaseDetail from "./components/DiseaseDetail";
import UserDetail from "./components/UserDetail";
import DetectionPage from "./components/DetectionPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AdminLayout from "./components/AdminLayout";
import MainLayout from "./components/MainLayout";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ProfilePage from "./components/ProfilePage";
import EditProfilePage from "./components/EditProfilePage";
import DetailedAnalysisPage from "./components/DetailedAnalysisPage"; // Import the new component
import AgriculturalResourcesPage from "./components/AgriculturalResourcesPage"; // Import AgriculturalResourcesPage
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
          <Route path="/admin/diseases/edit/:id" element={<EditDisease />} />
          <Route path="/admin/diseases/:diseaseId" element={<DiseaseDetail />} />
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
          <Route path="/detect" element={<DetectionPage />} />
          <Route path="/analysis-result" element={<DetailedAnalysisPage />} /> {/* Add the new route */}
          <Route path="/diseases" element={<DiseaseList />} />
          <Route path="/diseases/:diseaseId" element={<DiseaseDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/agricultural-resources" element={<AgriculturalResourcesPage />} /> {/* New combined route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;