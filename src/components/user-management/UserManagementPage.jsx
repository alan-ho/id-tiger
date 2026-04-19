import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import SvgIcon from '@mui/material/SvgIcon'
import { Home } from '@weave-brand/icon'
import ViewTabs from './ViewTabs'
import AccountsTable from './AccountsTable'

export default function UserManagementPage() {
  useEffect(() => {
    document.title = 'User Management – Supervision Center'
  }, [])

  return (
    // maxWidth 1296px, centered — px-[72px] pt-[24px] pb-[40px] per Figma "Page body" layer
    <Box id="user-management-page" sx={{ maxWidth: '1296px', mx: 'auto', pt: '24px', pb: '40px', px: '68px' }}>
      {/* Breadcrumb */}
      <Box id="user-management-breadcrumb" component="nav" aria-label="Breadcrumb" sx={{ mb: 1.5 }}>
        <Breadcrumbs component="div">
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            aria-label="Home"
          >
            <SvgIcon sx={{ fontSize: 16 }} aria-hidden="true"><Home /></SvgIcon>
          </Link>
          <Typography color="text.primary" variant="body2" aria-current="page">User management</Typography>
        </Breadcrumbs>
      </Box>

      {/* Page heading — headline-larger = Artifakt Legend 800 28px per Weave typography */}
      <Typography id="user-management-heading" variant="headline-larger" component="h1" sx={{ mb: 2 }}>
        User management
      </Typography>

      {/* View tabs */}
      <ViewTabs />

      {/* Accounts table */}
      <AccountsTable />
    </Box>
  )
}
