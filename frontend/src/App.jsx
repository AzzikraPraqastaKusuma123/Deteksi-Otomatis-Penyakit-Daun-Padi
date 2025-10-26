import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="content">
          <div className="container">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute loggedIn={loggedIn} allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Default protected route */}
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                    <UserList />
                  </ProtectedRoute>
                }
              />

              {/* User routes */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />

              {/* Detection routes */}
              <Route
                path="/detections"
                element={
                  <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                    <DetectionList />
                  </ProtectedRoute>
                }
              />
                          <Route
                            path="/detections/add"
                            element={
                              <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                                <AddDetection />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/detections/:detectionId"
                            element={
                              <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                                <DetectionDetail />
                              </ProtectedRoute>
                            }
                          />
                          {/* Disease routes */}
                          <Route
                            path="/diseases"
                            element={
                              <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user']}>
                                <DiseaseList />
                              </ProtectedRoute>
                            }
                          />
                                      <Route
                                        path="/diseases/add"
                                        element={
                                          <ProtectedRoute loggedIn={loggedIn} allowedRoles={['admin']}>
                                            <AddDisease />
                                          </ProtectedRoute>
                                        }
                                      />
                                      <Route
                                        path="/diseases/:diseaseId"
                                        element={
                                          <ProtectedRoute loggedIn={loggedIn} allowedRoles={['user', 'admin']}>
                                            <DiseaseDetail />
                                          </ProtectedRoute>
                                        }
                                      />            
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
