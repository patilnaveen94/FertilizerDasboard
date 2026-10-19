import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography, MenuItem, Snackbar, Alert, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainLayout from '../layout/MainLayout';
import { fertilizerItems, retailerEntries as initialEntries } from '../data/dummyData';

const columns = [
  { field: 'item', headerName: 'Item', flex: 1 },
  { field: 'pos', headerName: 'POS Stock', width: 130, type: 'number' },
  { field: 'physical', headerName: 'Physical Stock', width: 150, type: 'number' },
  {
    field: 'mismatch', headerName: 'Status', width: 130,
    renderCell: ({ row }) => {
      const match = row.pos === row.physical;
      return <Typography sx={{ color: match ? '#43a047' : '#e53935', fontWeight: 600 }}>{match ? 'Match' : 'Mismatch'}</Typography>;
    },
  },
  { field: 'date', headerName: 'Date', width: 130 },
];

export default function RetailerDashboard() {
  const [entries, setEntries] = useState(initialEntries);
  const [form, setForm] = useState({ item: '', pos: '', physical: '' });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: entries.length + 1,
      item: form.item,
      pos: Number(form.pos),
      physical: Number(form.physical),
      date: new Date().toISOString().split('T')[0],
    };
    setEntries([newEntry, ...entries]);
    setForm({ item: '', pos: '', physical: '' });
    setOpen(true);
  };

  return (
    <MainLayout title="Retailer Dashboard - Stock Entry" showFilters={false}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Submit Stock Entry</Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <TextField label="Item Name" select fullWidth required value={form.item}
                      onChange={(e) => setForm({ ...form, item: e.target.value })}>
                      {fertilizerItems.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="POS Stock" type="number" fullWidth required value={form.pos}
                      onChange={(e) => setForm({ ...form, pos: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="Physical Stock" type="number" fullWidth required value={form.physical}
                      onChange={(e) => setForm({ ...form, physical: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button type="submit" variant="contained" size="large" fullWidth>Submit Entry</Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Previous Entries</Typography>
              <DataGrid rows={entries} columns={columns} autoHeight
                pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-row': {
                    '&:hover': { bgcolor: '#f5f5f5' },
                  },
                }}
                getRowClassName={({ row }) => row.pos !== row.physical ? 'mismatch-row' : ''}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setOpen(false)}>Stock entry submitted successfully!</Alert>
      </Snackbar>
    </MainLayout>
  );
}
