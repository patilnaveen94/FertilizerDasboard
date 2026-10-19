import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, MenuItem, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import MainLayout from '../layout/MainLayout';
import ChartCard from '../components/ChartCard';
import { districts, taluks, rsks, topSellingData, leastSellingData, posVsPhysicalData, reportData } from '../data/dummyData';

const PIE_COLORS = ['#1565c0', '#43a047', '#fb8c00', '#e53935', '#8e24aa'];

const columns = [
  { field: 'retailer', headerName: 'Retailer', flex: 1 },
  { field: 'district', headerName: 'District', width: 140 },
  { field: 'taluk', headerName: 'Taluk', width: 140 },
  { field: 'item', headerName: 'Item', width: 120 },
  { field: 'pos', headerName: 'POS Stock', width: 110, type: 'number' },
  { field: 'physical', headerName: 'Physical', width: 110, type: 'number' },
  { field: 'sales', headerName: 'Sales', width: 100, type: 'number' },
  { field: 'date', headerName: 'Date', width: 120 },
];

export default function Reports() {
  const [filters, setFilters] = useState({ district: '', taluk: '', rsk: '', retailer: '', from: '', to: '' });
  const set = (field) => (e) => setFilters({ ...filters, [field]: e.target.value });

  return (
    <MainLayout title="Reports" showFilters={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Filters */}
        <Card>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">Filters</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField label="District" select size="small" sx={{ minWidth: 150 }} value={filters.district} onChange={set('district')}>
                <MenuItem value="">All</MenuItem>
                {districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
              <TextField label="Taluk" select size="small" sx={{ minWidth: 150 }} value={filters.taluk} onChange={set('taluk')}>
                <MenuItem value="">All</MenuItem>
                {taluks.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <TextField label="RSK" select size="small" sx={{ minWidth: 120 }} value={filters.rsk} onChange={set('rsk')}>
                <MenuItem value="">All</MenuItem>
                {rsks.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
              <TextField label="Retailer" size="small" sx={{ minWidth: 160 }} value={filters.retailer} onChange={set('retailer')} />
              <TextField label="From" type="date" size="small" InputLabelProps={{ shrink: true }} value={filters.from} onChange={set('from')} />
              <TextField label="To" type="date" size="small" InputLabelProps={{ shrink: true }} value={filters.to} onChange={set('to')} />
            </Box>
          </CardContent>
        </Card>

        {/* Charts - all in one row */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ChartCard title="Item-wise Sales">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topSellingData} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1565c0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ChartCard title="Sales Distribution">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={leastSellingData} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={100} label>
                    {leastSellingData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ChartCard title="POS vs Physical Comparison">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={posVsPhysicalData} margin={{ bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pos" stroke="#1565c0" name="POS" strokeWidth={2} />
                  <Line type="monotone" dataKey="physical" stroke="#43a047" name="Physical" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Box>
        </Box>

        {/* Table */}
        <Card>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Detailed Report</Typography>
            <DataGrid rows={reportData} columns={columns} autoHeight
              pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              sx={{ border: 0 }} />
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}
