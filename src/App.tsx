import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from '../pages/Dashboard';
import ScheduleManagement from '../pages/ScheduleManagement';
import Students from '../pages/Students';
import StudentDetails from '../pages/StudentDetails';
import StudentForm from '../pages/StudentForm';
import Instructors from '../pages/Instructors';
import InstructorDetails from '../pages/InstructorDetails';
import InstructorForm from '../pages/InstructorForm';
import PhysicalEvaluation from '../pages/PhysicalEvaluation';
import PhysicalEvaluationForm from '../pages/PhysicalEvaluationForm';
import EvolutionRecords from '../pages/EvolutionRecords';
import Classes from '../pages/Classes';
import ClassForm from '../pages/ClassForm';
import Sidebar from '../components/Sidebar';
import Login from "../pages/Login";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { darkMode } = useTheme();
  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Layout><ScheduleManagement /></Layout></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><Layout><Students /></Layout></ProtectedRoute>} />
            <Route path="/students/new" element={<ProtectedRoute><Layout><StudentForm /></Layout></ProtectedRoute>} />
            <Route path="/students/:id/edit" element={<ProtectedRoute><Layout><StudentForm /></Layout></ProtectedRoute>} />
            <Route path="/students/:id" element={<ProtectedRoute><Layout><StudentDetails /></Layout></ProtectedRoute>} />
            <Route path="/instructors" element={<ProtectedRoute><Layout><Instructors /></Layout></ProtectedRoute>} />
            <Route path="/instructors/new" element={<ProtectedRoute><Layout><InstructorForm /></Layout></ProtectedRoute>} />
            <Route path="/instructors/:id/edit" element={<ProtectedRoute><Layout><InstructorForm /></Layout></ProtectedRoute>} />
            <Route path="/instructors/:id" element={<ProtectedRoute><Layout><InstructorDetails /></Layout></ProtectedRoute>} />
            <Route path="/physical" element={<ProtectedRoute><Layout><PhysicalEvaluation /></Layout></ProtectedRoute>} />
            <Route path="/physical/new" element={<ProtectedRoute><Layout><PhysicalEvaluationForm /></Layout></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><Layout><EvolutionRecords /></Layout></ProtectedRoute>} />
            <Route path="/classes" element={<ProtectedRoute><Layout><Classes /></Layout></ProtectedRoute>} />
            <Route path="/classes/new" element={<ProtectedRoute><Layout><ClassForm /></Layout></ProtectedRoute>} />
            <Route path="/classes/:id/edit" element={<ProtectedRoute><Layout><ClassForm /></Layout></ProtectedRoute>} />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} /> {/* Or a 404 page */}
        </Routes>
    );
}

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
