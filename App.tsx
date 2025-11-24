import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ScheduleManagement from './pages/ScheduleManagement';
import ScheduleCapacity from './pages/ScheduleCapacity';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import StudentForm from './pages/StudentForm';
import Instructors from './pages/Instructors';
import InstructorDetails from './pages/InstructorDetails';
import InstructorForm from './pages/InstructorForm';
import PhysicalEvaluation from './pages/PhysicalEvaluation';
import PhysicalEvaluationForm from './pages/PhysicalEvaluationForm';
import EvolutionRecords from './pages/EvolutionRecords';
import Classes from './pages/Classes';
import ClassForm from './pages/ClassForm';
import Sidebar from './components/Sidebar';

interface LayoutProps {
  children?: React.ReactElement;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Layout = ({ children, darkMode, toggleTheme }: LayoutProps) => {
  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar darkMode={darkMode} />
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement<any>, { darkMode, toggleTheme }) 
          : children}
      </div>
    </div>
  );
};

const App = () => {
  // Inicializa o estado lendo do localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Raiz é o Login */}
        <Route path="/" element={<Login darkMode={darkMode} />} />

        {/* Dashboard Principal */}
        <Route path="/dashboard" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <Dashboard darkMode={darkMode} toggleTheme={toggleTheme} />
          </Layout>
        } />

        {/* Rotas Protegidas */}
        <Route path="/schedule" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <ScheduleManagement darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/schedule/capacity" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <ScheduleCapacity darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/students" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <Students darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/students/new" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <StudentForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/students/:id/edit" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <StudentForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/students/:id" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <StudentDetails darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/instructors" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <Instructors darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/instructors/new" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <InstructorForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/instructors/:id/edit" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <InstructorForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/instructors/:id" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <InstructorDetails darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/physical" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <PhysicalEvaluation darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/physical/new" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <PhysicalEvaluationForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/records" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <EvolutionRecords darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/classes" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <Classes darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/classes/new" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <ClassForm darkMode={darkMode} />
          </Layout>
        } />
        <Route path="/classes/:id/edit" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <ClassForm darkMode={darkMode} />
          </Layout>
        } />
        
        {/* Redireciona 404 para Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;