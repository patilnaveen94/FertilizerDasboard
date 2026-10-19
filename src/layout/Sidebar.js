import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, IconButton, Tooltip, Box, Divider, Avatar, Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export const DRAWER_WIDTH = 256;
export const MINI_DRAWER_WIDTH = 68;

const APP_VERSION = 'v1.0.0';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
  { text: 'Retailers', icon: <StoreIcon fontSize="small" />, path: '/retailers' },
  { text: 'Reports', icon: <AssessmentIcon fontSize="small" />, path: '/reports' },
];

// Gradient background for the sidebar
const SIDEBAR_BG = 'linear-gradient(180deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%)';

export default function Sidebar({ open, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
          overflowX: 'hidden',
          boxSizing: 'border-box',
          background: SIDEBAR_BG,
          color: '#fff',
          borderRight: 'none',
          boxShadow: '4px 0 20px rgba(13,71,161,0.18)',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
        },
      }}
    >
      {/* ── Brand Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: open ? 2 : 1,
          py: 1.5,
          minHeight: 64,
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, overflow: 'hidden' }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AgricultureIcon sx={{ fontSize: 22, color: '#fff' }} />
            </Box>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                noWrap
                sx={{ lineHeight: 1.2, letterSpacing: 0.3 }}
              >
                Fertilizer MIS
              </Typography>
              <Chip
                label={APP_VERSION}
                size="small"
                sx={{
                  height: 16,
                  fontSize: 10,
                  fontWeight: 700,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: 1,
                  '& .MuiChip-label': { px: 0.8 },
                }}
              />
            </Box>
          </Box>
        )}

        {!open && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AgricultureIcon sx={{ fontSize: 22, color: '#fff' }} />
          </Box>
        )}

        <IconButton
          onClick={onToggle}
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 1.5,
            ml: open ? 1 : 0,
            mt: open ? 0 : 1,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' },
          }}
        >
          {open ? <MenuOpenIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mx: open ? 2 : 1 }} />

      {/* ── Nav Label ── */}
      {open && (
        <Typography
          variant="caption"
          sx={{
            px: 3,
            pt: 2,
            pb: 0.5,
            display: 'block',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            fontSize: 10,
          }}
        >
          Main Menu
        </Typography>
      )}

      {/* ── Nav Items ── */}
      <List sx={{ flex: 1, px: open ? 1.5 : 0.75, pt: open ? 0.5 : 1.5 }}>
        {navItems.map(({ text, icon, path }) => {
          const active = location.pathname === path;
          return (
            <Tooltip key={text} title={open ? '' : text} placement="right" arrow>
              <ListItemButton
                onClick={() => navigate(path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                  justifyContent: open ? 'initial' : 'center',
                  px: open ? 1.5 : 1.5,
                  py: 1,
                  position: 'relative',
                  bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                  boxShadow: active ? 'inset 0 0 0 1px rgba(255,255,255,0.2)' : 'none',
                  '&:hover': {
                    bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  },
                  // Active left accent bar
                  '&::before': active
                    ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        height: '60%',
                        width: 3,
                        borderRadius: '0 3px 3px 0',
                        bgcolor: '#fff',
                      }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mx: open ? 2 : 1 }} />

      {/* ── User Info ── */}
      {open ? (
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'rgba(255,255,255,0.2)',
              fontSize: 14,
              fontWeight: 700,
              border: '2px solid rgba(255,255,255,0.3)',
              flexShrink: 0,
            }}
          >
            AD
          </Avatar>
          <Box sx={{ overflow: 'hidden', flex: 1 }}>
            <Typography variant="body2" fontWeight={700} noWrap sx={{ color: '#fff', lineHeight: 1.3 }}>
              Admin User
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>
              admin@fertilizer.gov
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
          <Tooltip title="Admin User" placement="right" arrow>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: 13,
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              AD
            </Avatar>
          </Tooltip>
        </Box>
      )}

      {/* ── Logout ── */}
      <List sx={{ px: open ? 1.5 : 0.75, pb: 2, pt: 0 }}>
        <Tooltip title={open ? '' : 'Logout'} placement="right" arrow>
          <ListItemButton
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 2,
              color: 'rgba(255,255,255,0.7)',
              justifyContent: open ? 'initial' : 'center',
              px: open ? 1.5 : 1.5,
              py: 1,
              '&:hover': { bgcolor: 'rgba(255,87,87,0.2)', color: '#ff8a80' },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: 0,
                mr: open ? 1.5 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}
