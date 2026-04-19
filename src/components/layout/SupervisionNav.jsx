import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function SupervisionNav() {
  return (
    // background-color/surface/300 in dark/brand theme = black (#000000)
    // Inner shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.25) — top separator per Figma
    <AppBar
      id="supervision-nav"
      component="nav"
      aria-label="Primary navigation"
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#000000',
        boxShadow: 'inset 0px 1px 0px 0px rgba(255,255,255,0.25)',
      }}
    >
      {/* backgroundColor: '#000000' overrides Weave theme's MuiToolbar #333 styleOverrides */}
      <Toolbar size="small" disableGutters sx={{ backgroundColor: '#000000', px: '0 !important', py: '0 !important' }}>
        {/* maxWidth 1296px, centered, h-[40px] px-[68px] per Figma */}
        <Box sx={{ maxWidth: '1296px', mx: 'auto', width: '100%', display: 'flex', alignItems: 'center', height: '40px', px: '68px' }}>
          {/* Title — text-[16px] text-[color:var(--text-color/heavy/default,white)] pb-[12px] pt-[10px] pr-[16px] */}
          <Typography
            component="span"
            variant="headline-smaller"
            style={{ color: 'white' }}
            sx={{
              whiteSpace: 'nowrap',
              pb: '12px',
              pt: '10px',
              pr: '16px',
              fontSize: '16px',
              lineHeight: '20px',
            }}
          >
            Supervision Center
          </Typography>

          <Tabs
            id="supervision-nav-tabs"
            value={0}
            aria-label="main navigation"
            // TabIndicatorProps inline style overrides theme styleOverrides (highest specificity)
            // border-t-2 border-[var(--background-color/brand,white)] = white, 2px, top
            TabIndicatorProps={{ style: { backgroundColor: 'white', height: '2px', top: 0, bottom: 'auto', borderRadius: 0 } }}
            sx={{
              minHeight: '40px',
              // Rule A fix: Weave theme's && in styleOverrides generates .MuiTabs-root.MuiTabs-root [class*="MuiTab-root"]
              // (specificity 0,3,0). Matching that depth with && in sx produces equal specificity but styleOverrides
              // may inject AFTER sx in MUI v7's Emotion pipeline → sx loses. Using !important is the correct
              // escalation for a forced color-inversion context (dark surface, white text).
              '& .MuiTab-root': {
                minHeight: '40px',
                textTransform: 'none',
                // text-[14px] per Figma — all tabs same size
                fontSize: '14px !important',
                fontWeight: '700 !important',
                // pb-[12px] pt-[10px] px-[16px] per Figma
                pb: '12px',
                pt: '10px',
                px: '16px',
                // text-[color:var(--text-color/heavy/default,white)] — ALL tabs white, including inactive
                color: 'white !important',
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'white !important',
                // bg-[var(--background-color/ghost/activated/default,rgba(255,255,255,0.1))]
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Tab id="supervision-nav-tab-user-management" label="User management" />
            <Tab id="supervision-nav-tab-activity-tracking" label="Activity tracking" />
            <Tab id="supervision-nav-tab-notification" label="Notification" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
