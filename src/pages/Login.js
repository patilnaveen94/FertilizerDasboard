import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');
  const [form, setForm] = useState({ email: '', password: '', userId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (role === 'admin') {
      setLoading(false);
      navigate('/dashboard');
    } else {
      try {
        const q = query(collection(db, 'retailers'), where('userId', '==', form.userId.toUpperCase()));
        const snap = await getDocs(q);
        if (snap.empty) {
          setError('Invalid User ID. Please check and try again.');
        } else {
          const retailer = { id: snap.docs[0].id, ...snap.docs[0].data() };
          localStorage.setItem('retailer', JSON.stringify(retailer));
          navigate('/retailer-dashboard');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Card sx={{ width: 420, maxWidth: '90%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <AgricultureIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" gutterBottom>Fertilizer Monitoring System</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Government Dashboard</Typography>

          <ToggleButtonGroup value={role} exclusive onChange={(_, v) => { if (v) { setRole(v); setError(''); } }} fullWidth sx={{ mb: 3 }}>
            <ToggleButton value="admin" sx={{ textTransform: 'none', fontWeight: 600, gap: 1 }}>
              <AdminPanelSettingsIcon fontSize="small" /> Admin
            </ToggleButton>
            <ToggleButton value="retailer" sx={{ textTransform: 'none', fontWeight: 600, gap: 1 }}>
              <StoreIcon fontSize="small" /> Retailer
            </ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {role === 'admin' ? (
              <>
                <TextField label="Email" type="email" fullWidth required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <TextField label="Password" type="password" fullWidth required
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </>
            ) : (
              <TextField label="User ID" fullWidth required placeholder="e.g. RET-A3K9NP"
                value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })}
                inputProps={{ style: { fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1 } }} />
            )}

            {error && <Typography variant="body2" color="error" sx={{ textAlign: 'left' }}>{error}</Typography>}

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 1 }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            {role === 'admin' && <Link href="#" variant="body2" sx={{ mt: 1 }}>Forgot Password?</Link>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
