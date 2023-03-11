import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
function Order(orders: any) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: 'center' }}>ID заказа</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Время</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>ФИО клиента</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Сумма заказа</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Статус заказа</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Возврат</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Номер стола</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key='8' sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}>
              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{order.id}</TableCell>
              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{order.time}</TableCell>
              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{order.fullName}</TableCell>
              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{order.price}</TableCell>
              <TableCell sx={{ textAlign: 'center', color: '#DBAB00' }}>{order.status}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{order.orderReturn}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{order.tableNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Order
