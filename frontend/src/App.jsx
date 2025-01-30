import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard', { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;