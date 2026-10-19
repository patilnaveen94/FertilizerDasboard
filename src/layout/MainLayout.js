import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, Typography, Avatar, Chip,
  Tooltip, IconButton, Divider,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Sidebar, { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from './Sidebar';
import FilterBar from '../components/FilterBar';

const APP_VERSION = 'v1.0.0';

export default function MainLayout({ title, children, showFilters = true }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({ district: '', taluk: '', rsk: '', from: '', to: '' });

  const drawerWidth = sidebarOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH;
  const showAppBar = title || showFilters;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: `calc(100% - ${drawerWidth}px)`,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: sidebarOpen
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        {showAppBar && (
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: '#fff',
              color: 'text.primary',
              borderBottom: '1px solid #e8eaf0',
              width: '100%',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
                minHeight: '64px !important',
                px: { xs: 2, sm: 3 },
              }}
            >
              {/* ── Left: Page Title ── */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ lineHeight: 1.2, color: 'text.primary', fontSize: 18 }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                    Fertilizer Management Information System
                  </Typography>
                </Box>
              </Box>

              {/* ── Center: Filters ── */}
              {showFilters && (
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
                  <FilterBar filters={filters} onChange={setFilters} />
                </Box>
              )}

              {/* ── Right: Actions + User ── */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Version badge */}
                <Chip
                  label={APP_VERSION}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 700,
                    bgcolor: '#e8f0fe',
                    color: '#1565c0',
                    borderRadius: 1,
                    '& .MuiChip-label': { px: 1 },
                  }}
                />

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />

                {/* Notifications */}
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      bgcolor: '#f5f5f5',
                      borderRadius: 1.5,
                      '&:hover': { bgcolor: '#e8f0fe', color: '#1565c0' },
                    }}
                  >
                    <NotificationsNoneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Help */}
                <Tooltip title="Help" arrow>
                  <IconButton
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      bgcolor: '#f5f5f5',
                      borderRadius: 1.5,
                      '&:hover': { bgcolor: '#e8f0fe', color: '#1565c0' },
                    }}
                  >
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />

                {/* User info */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    pl: 0.5,
                    pr: 1,
                    py: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#1565c0',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    AD
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ lineHeight: 1.2, color: 'text.primary', fontSize: 13 }}
                    >
                      Admin User
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', lineHeight: 1, fontSize: 11 }}
                    >
                      Administrator
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ p: 2, overflow: 'hidden' }}>{children}</Box>
      </Box>
    </Box>
  );
}
