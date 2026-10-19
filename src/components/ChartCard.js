import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function ChartCard({ title, children }) {
  return (
    <Card>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>{title}</Typography>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
