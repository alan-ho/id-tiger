import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import weaveTheme from './theme/weave'
import TopNav from './components/layout/TopNav'
import SupervisionNav from './components/layout/SupervisionNav'
import UserManagementPage from './components/user-management/UserManagementPage'

function App() {
  return (
    <ThemeProvider theme={weaveTheme}>
      <CssBaseline />
      {/* universal-header: border-b border-[var(--border-color/divider/heavy,#808080)] per Figma */}
      <Box sx={{ borderBottom: '1px solid #808080' }}>
        <TopNav />
        <SupervisionNav />
      </Box>
      {/* tint/slate.100 = #F9F9F9 — page body background per Figma */}
      <Box component="main" sx={{ bgcolor: '#F9F9F9', minHeight: '100vh' }}>
        <UserManagementPage />
      </Box>
    </ThemeProvider>
  )
}

export default App
