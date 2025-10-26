import React, { useState } from "react";
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
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="content">
          <div className="container">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
              <Route path="/register" element={<Register />} />

              {/* Default protected route */}
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <UserList />
                  </ProtectedRoute>
                }
              />

              {/* User routes */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />

              {/* Detection routes */}
              <Route
                path="/detections"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <DetectionList />
                  </ProtectedRoute>
                }
              />
                          <Route
                            path="/detections/add"
                            element={
                              <ProtectedRoute loggedIn={loggedIn}>
                                <AddDetection />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/detections/:detectionId"
                            element={
                              <ProtectedRoute loggedIn={loggedIn}>
                                <DetectionDetail />
                              </ProtectedRoute>
                            }
                          />
                          {/* Disease routes */}
                          <Route
                            path="/diseases"
                            element={
                              <ProtectedRoute loggedIn={loggedIn}>
                                <DiseaseList />
                              </ProtectedRoute>
                            }
                          />
                                      <Route
                                        path="/diseases/add"
                                        element={
                                          <ProtectedRoute loggedIn={loggedIn}>
                                            <AddDisease />
                                          </ProtectedRoute>
                                        }
                                      />
                                      <Route
                                        path="/diseases/:diseaseId"
                                        element={
                                          <ProtectedRoute loggedIn={loggedIn}>
                                            <DiseaseDetail />
                                          </ProtectedRoute>
                                        }
                                      />            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
