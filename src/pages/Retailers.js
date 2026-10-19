import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography, MenuItem, Snackbar, Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, CircularProgress, Divider, InputAdornment, Dialog, DialogContent } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layout/MainLayout';
import { districts, taluks, rsks } from '../data/dummyData';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

const initial = { shopName: '', gst: '', email: '', phone: '', district: '', taluk: '', place: '', rsk: '' };

function generateUserId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'RET-';
  for (let i = 0; i < 6; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

export default function Retailers() {
  const [form, setForm] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'retailers'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setRetailers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error('Firestore listener error:', err);
      setLoading(false);
    });
    return unsub;
  }, []);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const userId = generateUserId();
      const payload = { ...form, userId, createdAt: serverTimestamp() };
      console.log('Saving retailer payload:', payload);
      const docRef = await addDoc(collection(db, 'retailers'), payload);
      console.log('Retailer saved with doc ID:', docRef.id, '| userId:', userId);
      setOpen(true);
      setForm(initial);
      setDialogOpen(false);
    } catch (err) {
      console.error('Error adding retailer:', err);
      setError(err.message || 'Failed to save retailer. Check Firestore rules.');
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setForm(initial);
  };

  const copyId = (userId) => {
    navigator.clipboard.writeText(userId);
    setCopied(userId);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <MainLayout title="Retailer Onboarding" showFilters={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Retailers List */}
        <Card>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box sx={{ px: 2.5, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Registered Retailers</Typography>
                <Typography variant="caption" color="text.secondary">{retailers.length} retailers</Typography>
              </Box>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}
                sx={{ textTransform: 'none', fontWeight: 600 }}>
                Add Retailer
              </Button>
            </Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
            ) : retailers.length === 0 ? (
              <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>No retailers registered yet.</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      {['#', 'Shop Name', 'User ID', 'GST', 'Email', 'Phone', 'District', 'Taluk', 'Place', 'RSK'].map((h) => (
                        <TableCell key={h} sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}>{h}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {retailers.map((r, i) => (
                      <TableRow key={r.id} sx={{ '&:hover': { bgcolor: '#f5f8ff' }, transition: 'background 0.15s' }}>
                        <TableCell sx={{ color: '#90a4ae', fontWeight: 600 }}>{i + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#e3f2fd', color: '#1565c0' }}>
                              <StoreIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{r.shopName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {r.userId ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Chip label={r.userId} size="small" sx={{ fontFamily: 'monospace', fontWeight: 700, bgcolor: '#e8eaf6', color: '#283593', fontSize: 12 }} />
                              <Tooltip title={copied === r.userId ? 'Copied!' : 'Copy ID'}>
                                <IconButton size="small" onClick={() => copyId(r.userId)}>
                                  <ContentCopyIcon sx={{ fontSize: 14, color: copied === r.userId ? '#43a047' : '#90a4ae' }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>—</Typography>
                          )}
                        </TableCell>
                        <TableCell><Chip label={r.gst} size="small" variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} /></TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.phone}</TableCell>
                        <TableCell><Chip label={r.district} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 500, fontSize: 12 }} /></TableCell>
                        <TableCell>{r.taluk}</TableCell>
                        <TableCell>{r.place}</TableCell>
                        <TableCell>{r.rsk}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Create Retailer Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>
        {/* Dialog Header */}
        <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#1565c0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 40, height: 40 }}>
              <PersonAddIcon sx={{ color: '#fff' }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>New Retailer</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Fill in the details to onboard</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <Box component="form" id="retailer-form" onSubmit={handleSubmit}>
            {/* Business Details */}
            <Typography variant="overline" sx={{ color: '#1565c0', fontWeight: 700, letterSpacing: 1 }}>Business Details</Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Shop Name" fullWidth required size="small" value={form.shopName} onChange={set('shopName')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><StoreIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="GST Number" fullWidth required size="small" value={form.gst} onChange={set('gst')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }} />
              </Grid>
            </Grid>

            {/* Contact Details */}
            <Typography variant="overline" sx={{ color: '#1565c0', fontWeight: 700, letterSpacing: 1, mt: 2.5, display: 'block' }}>Contact Details</Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Email" type="email" fullWidth required size="small" value={form.email} onChange={set('email')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Phone Number" fullWidth required size="small" value={form.phone} onChange={set('phone')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }} />
              </Grid>
            </Grid>

            {/* Location Details */}
            <Typography variant="overline" sx={{ color: '#1565c0', fontWeight: 700, letterSpacing: 1, mt: 2.5, display: 'block' }}>Location Details</Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="District" select fullWidth required size="small" value={form.district} onChange={set('district')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }}>
                  {districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Taluk" select fullWidth required size="small" value={form.taluk} onChange={set('taluk')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }}>
                  {taluks.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Place" fullWidth required size="small" value={form.place} onChange={set('place')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="RSK" select fullWidth required size="small" value={form.rsk} onChange={set('rsk')}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon sx={{ color: '#90a4ae', fontSize: 18 }} /></InputAdornment> }}>
                  {rsks.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        {/* Dialog Footer */}
        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end', gap: 1.5, borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
          <Button variant="outlined" onClick={handleClose} sx={{ px: 3 }}>Cancel</Button>
          <Button type="submit" form="retailer-form" variant="contained" disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <PersonAddIcon />}
            sx={{ px: 3 }}>
            {submitting ? 'Creating...' : 'Create Retailer'}
          </Button>
        </Box>
      </Dialog>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setOpen(false)}>Retailer created successfully!</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
    </MainLayout>
  );
}
