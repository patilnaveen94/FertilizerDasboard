import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const iconMap = { Store: StoreIcon, Inventory: InventoryIcon, Warning: WarningIcon, Category: CategoryIcon };

export default function SummaryCard({ title, value, icon, color, trend }) {
  const Icon = iconMap[icon] || CategoryIcon;
  const isUp = !trend || trend >= 0;

  return (
    <Card sx={{
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
    }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500, textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              {isUp
                ? <TrendingUpIcon sx={{ fontSize: 16, color: '#43a047' }} />
                : <TrendingDownIcon sx={{ fontSize: 16, color: '#e53935' }} />}
              <Typography variant="caption" sx={{ color: isUp ? '#43a047' : '#e53935', fontWeight: 600 }}>
                {trend != null ? `${Math.abs(trend)}%` : '12%'}
              </Typography>
              <Typography variant="caption" color="text.secondary">vs last month</Typography>
            </Box>
          </Box>
          <Box sx={{
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon sx={{ fontSize: 24, color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
