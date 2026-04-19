import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export default function ViewTabs() {
  return (
    <Box id="view-tabs" sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={0}
        appearance="quiet"
        variant="scrollable"
        scrollButtons={false}
        aria-label="account view selector"
        sx={{
          '& .MuiTab-root': {
            fontSize: '14px !important',
          },
        }}
      >
        <Tab id="view-tab-by-accounts" label="By accounts" />
        <Tab id="view-tab-by-product" label="By product" />
        <Tab id="view-tab-pending-approval" label="Pending approval" />
      </Tabs>
    </Box>
  )
}
