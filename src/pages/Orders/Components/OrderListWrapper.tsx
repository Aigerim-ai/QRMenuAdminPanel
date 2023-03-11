import { useEffect, useState } from 'react'
import { createTheme } from '@mui/material/styles'
import { TableBody, TableCell, TableRow, ThemeProvider, Toolbar, TableContainer, TableHead, Table, Typography, Button } from '@mui/material'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'

interface IProduct {
  id: string
  title: string
  image: string
  price: string
  description: string
}

interface IItem {
  product: IProduct
  count: string
  price_item: string
  total: string
}
interface IOrders {
  id: string
  created_at: string
  user: string
  totalPrice: string
  orderStatus: string
  isReturn: boolean
  table: string
  orderitem_set: IItem[]
}

interface Props {
  data: IOrders[]
}

interface TypeOrderByDate {
  created_at: string
  data: IOrders[]
}
const fonttheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontWeight: 700,
    },
  },
})
export default function OrderListWrapper({ data }: Props) {
  const navigate = useNavigate()
  const [ordersByDate, setOrdersByDate] = useState<TypeOrderByDate[]>([])
  useEffect(() => {
    const dates = Array.from(new Set(data.map((item: any) => format(new Date(item.created_at), 'yyyy-MM-dd'))))

    const newOrders = dates.map((date: string) => {
      const obj: TypeOrderByDate = {
        created_at: date,
        data: [],
      }

      obj.data = data.filter((item: any) => obj.created_at === format(new Date(item.created_at), 'yyyy-MM-dd'))

      return obj
    })

    setOrdersByDate(newOrders)
  }, [data])

  const handleChangeDateToString = (date: any) => {
    const orderDate = new Date(date)
    const todaysDate = new Date()
    let monthString = ''

    if (todaysDate.getMonth() === orderDate.getMonth() && todaysDate.getDate() === orderDate.getDate()) {
      monthString += 'Сегодня - '
    } else if (todaysDate.getMonth() === orderDate.getMonth() && todaysDate.getDate() - 1 === orderDate.getDate()) {
      monthString += 'Вчера - '
    }
    if (orderDate.getMonth() === 0) {
      monthString += `${orderDate.getDate()} января`
    } else if (orderDate.getMonth() === 1) {
      monthString += `${orderDate.getDate()} февраля`
    } else if (orderDate.getMonth() === 2) {
      monthString += `${orderDate.getDate()} марта`
    } else if (orderDate.getMonth() === 3) {
      monthString += `${orderDate.getDate()} апреля`
    } else if (orderDate.getMonth() === 4) {
      monthString += `${orderDate.getDate()} мая`
    } else if (orderDate.getMonth() === 5) {
      monthString += `${orderDate.getDate()} июня`
    } else if (orderDate.getMonth() === 6) {
      monthString += `${orderDate.getDate()} июля`
    } else if (orderDate.getMonth() === 7) {
      monthString += `${orderDate.getDate()} августа`
    } else if (orderDate.getMonth() === 8) {
      monthString += `${orderDate.getDate()} сентября`
    } else if (orderDate.getMonth() === 9) {
      monthString += `${orderDate.getDate()} октября`
    } else if (orderDate.getMonth() === 10) {
      monthString += `${orderDate.getDate()} ноября`
    } else if (orderDate.getMonth() === 11) {
      monthString += `${orderDate.getDate()} декабря`
    }

    return monthString
  }
  const navigateToConfirmed = (item: IOrders) => {
    navigate(`${item.id}`, {
      state: { item },
    })
  }
  return (
    <>
      {ordersByDate.map((order) => (
        <>
          <Toolbar sx={{ mt: 2 }}>
            <ThemeProvider theme={fonttheme}>
              <Typography variant='subtitle1' component='h2'>
                {`${handleChangeDateToString(order.created_at)}, `}
                <Typography variant='subtitle1' component='span' sx={{ color: '#999999' }}>
                  {order.data.length}
                </Typography>
              </Typography>
            </ThemeProvider>
          </Toolbar>

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
                {order.data.map((item) => (
                  
                  <TableRow
                    style={{ textDecoration: 'none' }}
                    onClick={() => navigateToConfirmed(item)}
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{item.id}</TableCell>
                    <TableCell sx={{ textAlign: 'center', color: '#666666' }}>
                      {`${new Date(item.created_at).getHours()}:${new Date(item.created_at).getMinutes()}`}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{item?.user}</TableCell>
                    <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{item.totalPrice}</TableCell>
                    {item.orderStatus === 'Завершен' ? (
                      <TableCell sx={{ textAlign: 'center', color: '#0EB378' }}>{item.orderStatus}</TableCell>
                    ) : (
                      <TableCell sx={{ textAlign: 'center', color: '#DBAB00' }}>{item.orderStatus}</TableCell>
                    )}
                    <TableCell sx={{ textAlign: 'center' }}>{!item.isReturn ? '-' : '+'}</TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>{item.table}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  )
}
