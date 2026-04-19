import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { OutlinedInput, InputAdornment } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { Search } from '@weave-brand/icon'

export default function AccountsToolbar() {
  return (
    <Box
      id="accounts-toolbar"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 2,
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        bgcolor: 'background.paper',
        mb: 2,
      }}
    >
      {/* Left: selection count + delete action */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* body-copy-medium = 16px per Weave variant */}
        <Typography id="accounts-toolbar-selection-count" variant="body-copy-medium" color="text.secondary">
          0 selected
        </Typography>
        <Button
          id="accounts-toolbar-delete-btn"
          variant="outlined"
          size="small"
          disabled
          sx={{ textTransform: 'none' }}
        >
          Delete user
        </Button>
      </Box>

      {/* Right: Weave Search component — w-[324px] h-[40px] per Figma, Supernova id:16304038 */}
      <OutlinedInput
        id="accounts-toolbar-search"
        placeholder="Search"
        readOnly
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon sx={{ fontSize: 16, color: '#999' }}><Search /></SvgIcon>
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search accounts' }}
        sx={{
          width: '324px',
          height: '40px',
          borderRadius: '8px',
          bgcolor: 'rgba(0,0,0,0.04)',
          fontSize: '16px',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        }}
      />
    </Box>
  )
}
