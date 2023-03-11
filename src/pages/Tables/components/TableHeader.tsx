import { TableCell, TableHead, TableRow, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function TableHeadContainer({isSelect, setIsSelect, setIsCheckedChild, tableList, isCheckedChild}: any) {
  return (
    <TableHead>
      <TableRow>
        {/* {isSelect.isSelect} */}
        <TableCell padding='checkbox' style={{ borderBottom: 'none', paddingLeft: '40px' }}>
          <Checkbox {...label} checked={isSelect} onChange={(e) => {
            setIsSelect(e.target.checked)
            if (e.target.checked) {
              setIsCheckedChild(
                () =>
                tableList.map((i: any) => true)
                )
            } else {
              setIsCheckedChild(
                () =>
                tableList.map((i: any) => false)
                )
            }
          }}/>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align='right'>
          #
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align='center'>
          {' '}
          <Typography variant='body2' fontWeight={400} gutterBottom noWrap>
            Название столика
          </Typography>{' '}
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align='right'>
          {' '}
          <Typography variant='body2' fontWeight={400} gutterBottom noWrap>
            QR - код
          </Typography>{' '}
        </TableCell>
        <TableCell style={{ borderBottom: 'none', paddingRight: '40px' }} align='right'>
          {' '}
          <Typography variant='body2' fontWeight={400} gutterBottom noWrap>
            Действия
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
