import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Retailers from './pages/Retailers';
import RetailerDashboard from './pages/RetailerDashboard';
import Reports from './pages/Reports';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/retailers" element={<Retailers />} />
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
