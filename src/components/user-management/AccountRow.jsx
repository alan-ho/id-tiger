import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import { Avatar } from '@weave-mui/avatar'
import { Forward } from '@weave-brand/icon'
import StatusBadge from './StatusBadge'

export default function AccountRow({ account }) {
  const { username, avatarText, lastActive, status } = account

  return (
    <TableRow
      id={`account-row-${account.id}`}
      sx={{
        '&:hover': { bgcolor: 'action.hover' },
        cursor: 'default',
      }}
    >
      {/* Checkbox */}
      <TableCell padding="checkbox">
        <Checkbox size="small" inputProps={{ 'aria-label': `Select ${username}` }} />
      </TableCell>

      {/* User */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar size="XS" sx={{ bgcolor: '#006EAF', width: 32, height: 32, fontSize: 12 }}>
            {avatarText}
          </Avatar>
          <Typography variant="body2">{username}</Typography>
        </Box>
      </TableCell>

      {/* Last active */}
      <TableCell align="right">
        <Typography variant="body2" color="text.secondary">{lastActive}</Typography>
      </TableCell>

      {/* Status */}
      <TableCell>
        <StatusBadge status={status} />
      </TableCell>

      {/* Navigation arrow */}
      <TableCell align="right" sx={{ width: 48, p: 0 }}>
        <IconButton
          id={`account-row-${account.id}-forward-btn`}
          component="a"
          href="#"
          variant="quiet"
          size="medium"
          aria-label={`View ${username}'s account`}
        >
          <SvgIcon sx={{ fontSize: 20 }} aria-hidden="true"><Forward /></SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
