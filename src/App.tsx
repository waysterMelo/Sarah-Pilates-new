
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

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

// Layout agora consome o tema do contexto
const Layout = ({ children }: LayoutProps) => {
  const { darkMode } = useTheme(); // Obtenha o darkMode do contexto
  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        {/* Não precisamos mais clonar elementos, o filho também usará o contexto se precisar */}
        {children}
      </div>
    </div>
  );
};

// Componente que contém as rotas e a lógica principal
const AppRoutes = () => {
    // Se precisar de darkMode ou toggleTheme aqui, use o hook useTheme()
    // const { darkMode, toggleTheme } = useTheme();

    return (
        <Routes>
            {/* A página de Login também usará o contexto */}
            <Route path="/login" element={<Login />} />

            {/* Rotas com Layout */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/schedule" element={<Layout><ScheduleManagement /></Layout>} />
            <Route path="/students" element={<Layout><Students /></Layout>} />
            <Route path="/students/new" element={<Layout><StudentForm /></Layout>} />
            <Route path="/students/:id/edit" element={<Layout><StudentForm /></Layout>} />
            <Route path="/students/:id" element={<Layout><StudentDetails /></Layout>} />
            <Route path="/instructors" element={<Layout><Instructors /></Layout>} />
            <Route path="/instructors/new" element={<Layout><InstructorForm /></Layout>} />
            <Route path="/instructors/:id/edit" element={<Layout><InstructorForm /></Layout>} />
            <Route path="/instructors/:id" element={<Layout><InstructorDetails /></Layout>} />
            <Route path="/physical" element={<Layout><PhysicalEvaluation /></Layout>} />
            <Route path="/physical/new" element={<Layout><PhysicalEvaluationForm /></Layout>} />
            <Route path="/records" element={<Layout><EvolutionRecords /></Layout>} />
            <Route path="/classes" element={<Layout><Classes /></Layout>} />
            <Route path="/classes/new" element={<Layout><ClassForm /></Layout>} />
            <Route path="/classes/:id/edit" element={<Layout><ClassForm /></Layout>} />

            {/* Redirecionamentos */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}


const App = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
