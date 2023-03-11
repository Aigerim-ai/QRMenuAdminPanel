import { Typography } from '@mui/material'
import { TableCell, TableBody } from '@material-ui/core'

export default function Empty() {
  return (
    <TableBody>
      <TableCell align='right' />
      <TableCell align='right' />
      <TableCell align='right'>
        <Typography sx={{ color: '#999999' }} variant='caption'>
          Столы не добавлены
        </Typography>
      </TableCell>
      <TableCell align='right' />
      <TableCell align='right' />
    </TableBody>
  )
}
