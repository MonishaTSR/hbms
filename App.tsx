
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Wards from './pages/Wards';
import Ambulances from './pages/Ambulances';
import Specialists from './pages/Specialists';
import Statistics from './pages/Statistics';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wards" element={<Wards />} />
          <Route path="/ambulances" element={<Ambulances />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
