import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { OutlinedInput, InputAdornment } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { Avatar } from '@weave-mui/avatar'
import { Search, CartFull, Notification, Globe } from '@weave-brand/icon'

const AUTODESK_LOGO_SVG = (
  <svg width="110" height="20" viewBox="0 0 110 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Autodesk">
    <text x="0" y="16" fill="white" fontSize="14" fontWeight="700" fontFamily="'ArtifaktElement', sans-serif">AUTODESK</text>
  </svg>
)

// Icon button — matches Figma px-[16px] py-[8px] rounded-[4px] plain container
// Static display-only in this iteration — no interactivity yet, so no role/tabIndex
function NavIconBtn({ id, children, ariaLabel }) {
  return (
    <Box
      id={id}
      component="span"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: '16px',
        py: '8px',
        borderRadius: '4px',
        color: 'white',
        cursor: 'default',
        height: '32px',
      }}
    >
      {children}
    </Box>
  )
}

export default function TopNav() {
  return (
    // background-color/brand = #000000 per Figma
    <AppBar id="top-nav" position="static" sx={{ backgroundColor: '#000000', boxShadow: 'none' }}>
      {/* backgroundColor: '#000000' overrides Weave theme's MuiToolbar #333 styleOverrides */}
      <Toolbar size="small" disableGutters sx={{ backgroundColor: '#000000', px: '0 !important', py: '0 !important' }}>
        {/* maxWidth 1296px, centered, h-[56px] px-[68px] per Figma */}
        <Box sx={{ maxWidth: '1296px', mx: 'auto', width: '100%', display: 'flex', alignItems: 'center', height: '56px', px: '68px' }}>
          {/* Logo */}
          <Box id="top-nav-logo" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            {AUTODESK_LOGO_SVG}
          </Box>

          {/* Search — Weave Search component per Supernova id:16304038
              h-[44px] rounded-[var(--border-radius/8, 8px)] per Figma */}
          <OutlinedInput
            id="top-nav-search"
            placeholder="Search"
            readOnly
            size="small"
            startAdornment={
              // text-color/on-accent at 70% opacity
              <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <SvgIcon sx={{ fontSize: 16 }}><Search /></SvgIcon>
              </InputAdornment>
            }
            inputProps={{ 'aria-label': 'global search' }}
            sx={{
              flex: 1,
              maxWidth: 400,
              height: '44px',
              borderRadius: '8px',
              // background-color/ghost/default ≈ rgba(204,204,204,0.2) on dark surface
              bgcolor: 'rgba(204,204,204,0.2)',
              fontSize: '16px',
              color: 'white',
              '& input': { color: 'white', py: '1px' },
              // border-color/default ≈ status-color/neutral/default (#cccccc)
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc', borderWidth: 2 },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
            }}
          />

          <Box sx={{ flex: 1 }} />

          {/* Action icons — px-[16px] py-[8px] rounded-[4px] per Figma */}
          <NavIconBtn id="top-nav-cart" ariaLabel="shopping cart">
            <SvgIcon sx={{ fontSize: 20 }}>
              <CartFull />
            </SvgIcon>
          </NavIconBtn>

          <NavIconBtn id="top-nav-notifications" ariaLabel="notifications">
            <SvgIcon sx={{ fontSize: 20 }}>
              <Notification />
            </SvgIcon>
          </NavIconBtn>

          {/* Locale: px-[16px] py-[8px] gap-[8px] */}
          <Box id="top-nav-locale" sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: '16px', py: '8px', cursor: 'default', height: '32px' }}>
            <SvgIcon sx={{ fontSize: 14, color: 'white' }}>
              <Globe />
            </SvgIcon>
            {/* text-[color:var(--text-color/on-accent,white)] text-[length:var(--typography/l,14px)] */}
            <Typography sx={{ color: 'white', fontSize: '14px', lineHeight: '20px' }}>US</Typography>
          </Box>

          {/* Avatar — bg-[var(--color/iris/500/100,#5f60ff)] size-[32px] rounded-[999px] pl-[16px] */}
          <Box id="top-nav-avatar" sx={{ pl: '16px', py: '8px', display: 'flex', alignItems: 'center' }}>
            {/* size="S" so namesChildrenCreator renders both initials; override size with sx */}
            <Avatar size="S" sx={{ bgcolor: '#5F60FF', cursor: 'default', width: 32, height: 32, fontSize: '14px' }}>A D</Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
