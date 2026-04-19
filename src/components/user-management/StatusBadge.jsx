import Chip from '@mui/material/Chip'

// Weave Brand status-color tokens (from @weave-brand/core theme palette)
const STATUS_CONFIG = {
  active: {
    label: 'Active',
    // status-color/success/default: #2ad0a9 | light: #2AD0A91A
    sx: { bgcolor: '#2AD0A91A', color: '#1a9a7d' },
  },
  inactive: {
    label: 'Inactive',
    // status-color/neutral/default: #cccccc | light: rgba(204,204,204,0.2)
    sx: { bgcolor: 'rgba(204, 204, 204, 0.2)', color: '#555' },
  },
  password_requested: {
    label: 'Password requested',
    // status-color/info/default confirmed by spec: #1278AF
    sx: { bgcolor: 'rgba(18, 120, 175, 0.10)', color: '#1278AF' },
  },
  approval_pending: {
    label: 'Approval pending',
    sx: { bgcolor: (theme) => `${theme.palette.error.main}1A`, color: 'error.main' },
  },
}

export default function StatusBadge({ status }) {
  const fallbackLabel = status != null ? String(status) : '—'
  const config = STATUS_CONFIG[status] ?? {
    label: fallbackLabel,
    sx: { bgcolor: 'rgba(204, 204, 204, 0.2)', color: '#555' },
  }

  return (
    <Chip
      id={`status-badge-${status ?? 'unknown'}`}
      label={config.label}
      size="small"
      variant="outlined"
      sx={{
        height: 24,
        fontSize: 12,
        fontWeight: 500,
        borderRadius: '12px',
        ...config.sx,
        border: 'none',
      }}
    />
  )
}
