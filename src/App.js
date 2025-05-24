import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Computer as ComputerIcon,
  NetworkCheck as NetworkIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// 创建现代化主题
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
      light: '#8fa4f3',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#764ba2',
      light: '#9575cd',
      dark: '#512da8',
    },
    background: {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
  },
});

function App() {
  const [ports, setPorts] = useState([]);
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('zh');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, pid: null, processName: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // 文本内容
  const texts = {
    zh: {
      title: 'PortMan - 端口管理工具',
      refresh: '刷新',
      systemInfo: '系统信息',
      portList: '端口列表',
      protocol: '协议',
      localAddress: '本地地址',
      remoteAddress: '远程地址',
      state: '状态',
      pid: '进程ID',
      processName: '进程名',
      actions: '操作',
      kill: '终止',
      confirmKill: '确认终止进程',
      confirmKillMessage: '确定要终止进程吗？',
      cancel: '取消',
      confirm: '确认',
      platform: '平台',
      hostname: '主机名',
      uptime: '运行时间',
      memory: '内存使用',
      refreshSuccess: '刷新成功',
      killSuccess: '进程终止成功',
      killError: '进程终止失败',
      loadError: '加载数据失败',
    },
    en: {
      title: 'PortMan - Port Management Tool',
      refresh: 'Refresh',
      systemInfo: 'System Info',
      portList: 'Port List',
      protocol: 'Protocol',
      localAddress: 'Local Address',
      remoteAddress: 'Remote Address',
      state: 'State',
      pid: 'PID',
      processName: 'Process',
      actions: 'Actions',
      kill: 'Kill',
      confirmKill: 'Confirm Kill Process',
      confirmKillMessage: 'Are you sure you want to kill this process?',
      cancel: 'Cancel',
      confirm: 'Confirm',
      platform: 'Platform',
      hostname: 'Hostname',
      uptime: 'Uptime',
      memory: 'Memory Usage',
      refreshSuccess: 'Refresh successful',
      killSuccess: 'Process killed successfully',
      killError: 'Failed to kill process',
      loadError: 'Failed to load data',
    }
  };

  const t = texts[language];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [portsResult, systemResult] = await Promise.all([
        window.electronAPI.getPorts(),
        window.electronAPI.getSystemInfo()
      ]);

      if (portsResult.success) {
        setPorts(portsResult.data);
      } else {
        showSnackbar(t.loadError, 'error');
      }

      setSystemInfo(systemResult);
      showSnackbar(t.refreshSuccess, 'success');
    } catch (error) {
      showSnackbar(t.loadError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKillProcess = async () => {
    try {
      const result = await window.electronAPI.killProcess(deleteDialog.pid);
      if (result.success) {
        showSnackbar(t.killSuccess, 'success');
        loadData(); // 重新加载数据
      } else {
        showSnackbar(t.killError, 'error');
      }
    } catch (error) {
      showSnackbar(t.killError, 'error');
    }
    setDeleteDialog({ open: false, pid: null, processName: '' });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatMemory = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const getStateColor = (state) => {
    switch (state.toUpperCase()) {
      case 'LISTEN':
        return 'success';
      case 'ESTABLISHED':
        return 'primary';
      case 'TIME_WAIT':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* 顶部导航栏 */}
        <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Toolbar>
            <NetworkIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t.title}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={language === 'en'}
                  onChange={(e) => setLanguage(e.target.checked ? 'en' : 'zh')}
                />
              }
              label={<LanguageIcon />}
            />
            <Button
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={loadData}
              disabled={loading}
            >
              {t.refresh}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* 系统信息卡片 */}
          {systemInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <ComputerIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {t.systemInfo}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {t.platform}
                        </Typography>
                        <Typography variant="h6">
                          {systemInfo.platform} ({systemInfo.arch})
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {t.hostname}
                        </Typography>
                        <Typography variant="h6">
                          {systemInfo.hostname}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t.uptime}
                        </Typography>
                        <Typography variant="h6">
                          {formatUptime(systemInfo.uptime)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          <MemoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t.memory}
                        </Typography>
                        <Typography variant="h6">
                          {formatMemory(systemInfo.freeMemory)} / {formatMemory(systemInfo.totalMemory)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          )}

          {/* 端口列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <NetworkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {t.portList} ({ports.length})
              </Typography>
              
              {loading ? (
                <Box display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t.protocol}</TableCell>
                        <TableCell>{t.localAddress}</TableCell>
                        <TableCell>{t.remoteAddress}</TableCell>
                        <TableCell>{t.state}</TableCell>
                        <TableCell>{t.pid}</TableCell>
                        <TableCell>{t.processName}</TableCell>
                        <TableCell>{t.actions}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {ports.map((port, index) => (
                          <motion.tr
                            key={`${port.localAddress}-${port.pid}-${index}`}
                            component={TableRow}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <TableCell>
                              <Chip
                                label={port.protocol}
                                color={port.protocol === 'TCP' ? 'primary' : 'secondary'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{port.localAddress}</TableCell>
                            <TableCell>{port.remoteAddress}</TableCell>
                            <TableCell>
                              <Chip
                                label={port.state}
                                color={getStateColor(port.state)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{port.pid}</TableCell>
                            <TableCell>{port.processName}</TableCell>
                            <TableCell>
                              {port.pid !== '-' && (
                                <Tooltip title={t.kill}>
                                  <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() =>
                                      setDeleteDialog({
                                        open: true,
                                        pid: port.pid,
                                        processName: port.processName
                                      })
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </motion.div>
        </Container>

        {/* 确认删除对话框 */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, pid: null, processName: '' })}
        >
          <DialogTitle>{t.confirmKill}</DialogTitle>
          <DialogContent>
            <Typography>
              {t.confirmKillMessage}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              PID: {deleteDialog.pid} - {deleteDialog.processName}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, pid: null, processName: '' })}>
              {t.cancel}
            </Button>
            <Button onClick={handleKillProcess} color="error" variant="contained">
              {t.confirm}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 消息提示 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
