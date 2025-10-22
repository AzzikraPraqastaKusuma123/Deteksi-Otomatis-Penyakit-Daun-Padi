import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import DetectionList from './components/DetectionList';
import DiseaseDetail from './components/DiseaseDetail';
import UserDetail from './components/UserDetail'; // We will create this next
import DetectionDetail from './components/DetectionDetail'; // We will create this next
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/detections">Detections</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to PadiGuard Frontend</h1>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/detections" element={<DetectionList />} />
          <Route path="/detections/:detectionId" element={<DetectionDetail />} />
          <Route path="/diseases/:diseaseId" element={<DiseaseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;