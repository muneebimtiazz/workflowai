
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import UploadCVPage from './pages/UploadCVPage';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { HRDashboard } from './components/HRDashboard';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { UserStatusProvider } from './contexts/UserStatusContext';

function EmployeeRoute() {
  const navigate = useNavigate();
  return <EmployeeDashboard onLogout={() => navigate('/')} />;
}

function ManagerRoute() {
  const navigate = useNavigate();
  return <ManagerDashboard onLogout={() => navigate('/')} />;
}

function HRRoute() {
  const navigate = useNavigate();
  return <HRDashboard onLogout={() => navigate('/')} />;
}

function ExecutiveRoute() {
  const navigate = useNavigate();
  return <ExecutiveDashboard onLogout={() => navigate('/')} />;
}

function AppContent() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload-cv" element={<UploadCVPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={<EmployeeRoute />} />
          <Route path="/manager" element={<ManagerRoute />} />
          <Route path="/hr" element={<HRRoute />} />
          <Route path="/executive" element={<ExecutiveRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default function App() {
  return (
    <UserStatusProvider>
      <AppContent />
    </UserStatusProvider>
  );
}