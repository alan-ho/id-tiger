import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { Down } from '@weave-brand/icon'
import { getAccounts } from '../../services/accountsService'
import AccountsToolbar from './AccountsToolbar'
import AccountRow from './AccountRow'

export default function AccountsTable() {
  const [accounts, setAccounts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Static moderator ID for this mock-only iteration
    getAccounts('moderator-001')
      .then(({ accounts: list, totalCount: count }) => {
        setAccounts(list)
        setTotalCount(count)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  if (error) {
    return (
      <Box>
        <AccountsToolbar />
        <Box sx={{ p: 3 }}>
          <Typography color="error" variant="body2">
            {error.status === 403
              ? 'You do not have permission to view these accounts.'
              : 'Failed to load accounts. Please try again.'}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <AccountsToolbar />

      <Paper id="accounts-table-paper" variant="outlined" sx={{ borderRadius: '16px', overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small" aria-label="supervised accounts">
            {/* Table header — US4 */}
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.paper' }}>
                {/* Checkbox column */}
                <TableCell padding="checkbox" scope="col">
                  <Checkbox
                    size="small"
                    inputProps={{ 'aria-label': 'Select all accounts' }}
                  />
                </TableCell>

                {/* User column with total count */}
                <TableCell scope="col">
                  <Typography variant="body2" fontWeight={600}>
                    User ({totalCount})
                  </Typography>
                </TableCell>

                {/* Last active — sort indicator */}
                <TableCell align="right" aria-sort="descending" scope="col">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                    <Typography variant="body2" fontWeight={600}>Last active</Typography>
                    <SvgIcon sx={{ fontSize: 14 }} aria-hidden="true"><Down /></SvgIcon>
                  </Box>
                </TableCell>

                {/* Status */}
                <TableCell scope="col">
                  <Typography variant="body2" fontWeight={600}>Status</Typography>
                </TableCell>

                {/* Arrow column — no label */}
                <TableCell sx={{ width: 48 }} scope="col" />
              </TableRow>
            </TableHead>

            {/* Table body — US1 / US5 */}
            <TableBody>
              {accounts.map(account => (
                <AccountRow key={account.id} account={account} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
