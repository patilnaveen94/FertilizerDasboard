import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, LinearProgress } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import MainLayout from '../layout/MainLayout';
import SummaryCard from '../components/SummaryCard';
import ChartCard from '../components/ChartCard';
import { summaryCards, topSellingData, leastSellingData, posVsPhysicalData, retailerStockData } from '../data/dummyData';

const PIE_COLORS = ['#1565c0', '#43a047', '#fb8c00', '#e53935'];

export default function Dashboard() {
  return (
    <MainLayout title="" showFilters={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Section 1: Summary Cards */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {summaryCards.map((card) => (
            <Box sx={{ flex: 1, minWidth: 0 }} key={card.title}>
              <SummaryCard {...card} />
            </Box>
          ))}
        </Box>

        {/* Section 2: All Graphs in one row */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ChartCard title="Top Selling Fertilizers">
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
            <ChartCard title="Least Selling Items">
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
            <ChartCard title="POS vs Physical Stock">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={posVsPhysicalData} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pos" fill="#1565c0" name="POS" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="physical" fill="#43a047" name="Physical" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Box>
        </Box>

        {/* Section 3: Retailer-wise Stock Table */}
        <Card>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box sx={{ px: 2.5, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Retailer-wise Stock</Typography>
                <Typography variant="caption" color="text.secondary">{retailerStockData.length} retailers tracked</Typography>
              </Box>
              <Chip label="Live" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, fontSize: 11 }} />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}>Retailer</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}>Item</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }} align="right">POS Stock</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }} align="right">Physical Stock</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }} align="center">Accuracy</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#546e7a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }} align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {retailerStockData.map((row, i) => {
                    const accuracy = Math.round((Math.min(row.pos, row.physical) / Math.max(row.pos, row.physical)) * 100);
                    const isMatch = row.difference === 0;
                    return (
                      <TableRow key={row.id} sx={{
                        '&:hover': { bgcolor: '#f5f8ff' },
                        '&:last-child td': { borderBottom: 0 },
                        transition: 'background 0.15s',
                      }}>
                        <TableCell sx={{ color: '#90a4ae', fontWeight: 600 }}>{i + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#e3f2fd', color: '#1565c0' }}>
                              <StoreIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{row.retailer}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={row.item} size="small" variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>{row.pos}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>{row.physical}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={accuracy}
                              sx={{
                                flex: 1, height: 6, borderRadius: 3,
                                bgcolor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  bgcolor: accuracy === 100 ? '#43a047' : accuracy >= 90 ? '#fb8c00' : '#e53935',
                                },
                              }}
                            />
                            <Typography variant="caption" fontWeight={600} sx={{ minWidth: 32, color: accuracy === 100 ? '#43a047' : accuracy >= 90 ? '#fb8c00' : '#e53935' }}>
                              {accuracy}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={isMatch ? 'Match' : `Diff: ${row.difference}`}
                            size="small"
                            sx={{
                              fontWeight: 600, fontSize: 11,
                              bgcolor: isMatch ? '#e8f5e9' : '#ffebee',
                              color: isMatch ? '#2e7d32' : '#c62828',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}
