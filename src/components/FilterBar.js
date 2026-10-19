import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { districts, taluks, rsks } from '../data/dummyData';

export default function FilterBar({ filters, onChange }) {
  const handleChange = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>District</InputLabel>
        <Select value={filters.district || ''} label="District" onChange={handleChange('district')}>
          <MenuItem value="">All</MenuItem>
          {districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Taluk</InputLabel>
        <Select value={filters.taluk || ''} label="Taluk" onChange={handleChange('taluk')}>
          <MenuItem value="">All</MenuItem>
          {taluks.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>RSK</InputLabel>
        <Select value={filters.rsk || ''} label="RSK" onChange={handleChange('rsk')}>
          <MenuItem value="">All</MenuItem>
          {rsks.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField size="small" type="date" label="From" InputLabelProps={{ shrink: true }}
        value={filters.from || ''} onChange={handleChange('from')} />
      <TextField size="small" type="date" label="To" InputLabelProps={{ shrink: true }}
        value={filters.to || ''} onChange={handleChange('to')} />
    </Box>
  );
}
