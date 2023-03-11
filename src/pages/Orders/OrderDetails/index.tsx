import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/system'
import { CssBaseline, Toolbar, Grid, Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import FullReturnModal from '../Components/FullReturnModal'
import ButtonGroup from '@mui/material/ButtonGroup'
import { FullReturnOrderRequest, getRequest, PartialReturnOrderRequest } from 'src/tools/request'

const fonttheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontWeight: 700,
    },
    body2: {
      fontSize: 16,
      color: 'rgba(102, 102, 102, 1)',
    },
  },
})
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
      }
`
)
interface IProduct {
  id: number
  title: string
  image: string
  price: number
  desciption: string
}
interface IItems {
  id: number
  product: IProduct
  count: number
  price_item: string
  total: string
}
interface CustomizedState {
  id: string
  myState: string
  created_at: string
  table: string
  table_title: string
  first_name: string
  last_name: string
  order_status: string
  total_price: string
  size: number
  orderitem_set: IItems[]
}
const StyledButtonGroup = styled(ButtonGroup)({
  '& .MuiButtonGroup-grouped': {
    color: 'black',
  },
  '& .MuiButton-root': {
    backgroundColor: '#EAEAEA',
  },
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: 'white',
  },
})

export default function OrderDetails() {

  const lg: string = useOutletContext();
  const navigate = useNavigate()
  const [data, setData] = useState<string>("s")
  const location = useLocation()
  const handleOpen = () => {
    setData('Вы действительно хотите совершить полный возврат заказа?')
    setOpen(true)
  }
  const handleOpen2  = () =>{
    setData(`Вы действительно хотите совершить возврат на сумму ${result?.order_return_total_price} ₸?`)
    setOpen(true)
  }
  const [openReturn, setOpen] = useState(false)
  const handleCloseReturn = () => setOpen(false)
  const state = location.state as CustomizedState 
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(true)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const [result, setResult] = useState<any>();

  const fetchCurrentOrderReturn = async () => {
    try {
      const response: any = await getRequest({
        url: `orders/${state.id}/`,
      });
      setResult(response)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const PartialReturnOrder = async (card_id: any, c: any) => {
      try {
        await PartialReturnOrderRequest({
          url: 'return_orders/',
          body: {
            card_id,
            c
          }
        })
        fetchCurrentOrderReturn()

      } catch (error) {
        console.log(error)
      }
    } 

    const PartialReturnOrderInc = async (card_id: any, c: any) => {
      try {
        await PartialReturnOrderRequest({
          url: 'return_orders2/',
          body: {
            order_item_id: card_id,
		        quantity: c
          },
        })
        fetchCurrentOrderReturn()

      } catch (error) {
        console.log(error)
      }
    } 



  const handleClose = () => {
    setAnchorEl(null)
  }
  const FullReturnOrder = async () => {
    try {
      await FullReturnOrderRequest({
        url: 'return_orders/',
        id: state.id,
      })
      setData('Вы действительно хотите совершить полный возврат заказа?')
    } catch (error) {
      console.log(error)
    }
  }
  const Mockfunction = ()=>{
    FullReturnOrder()
    setOpen(false)
  }
  const open = Boolean(anchorEl)
  const idX = open ? 'simple-popover' : undefined
  React.useEffect(()=>{
    fetchCurrentOrderReturn()
  },[])

  return (
    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <Sidebar />
      <Box
        component='main'
        sx={{
          backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mb: 4 }}>
          <Grid item container justifyContent='space-between' alignContent='center'>
            <Grid item>
              <ThemeProvider theme={fonttheme}>
                <Typography variant='subtitle1' sx={{ ml: 2 }} component='h2'>
                  Заказ № {result?.id}
                </Typography>
              </ThemeProvider>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClick}
                variant='outlined'
                style={{
                  borderRadius: '5px',
                  color: '#DC1A00',
                  padding: '14px 30px',
                  borderColor: '#DC1A00',
                  marginRight: '10px',
                  textTransform: 'none',
                }}
              >
                Сделать возврат
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography  style={{cursor: 'pointer'}} onClick={handleOpen} sx={{ p: 2 }}>Полный возврат</Typography>
                <FullReturnModal
                  value = {data}
                  handleCloseReturn={handleCloseReturn}
                  buttonClickfunction={FullReturnOrder}
                  openReturn={openReturn}
                  style={style}
                  rowid={result?.id}
                />
                <Typography style={{cursor: 'pointer'}} onClick={onClick} sx={{ p: 2 }}>Частичный возврат</Typography>
              </Popover>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 600,
                borderRadius: '10px',
              },
            }}
          >
            <Paper elevation={0}>
              <ThemeProvider theme={fonttheme}>
                <Grid item container justifyContent='space-between' alignContent='center'>
                  <Grid item sx={{ m: 2 }}>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        Время заказа:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2 }}>
                        {`${new Date(result?.created_at).getHours()}:${new Date(result?.created_at).getMinutes()}`}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        Номер стола:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2 }}>
                        {result?.table_title}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        ФИО Клиента:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2 }}>
                        {result?.user?.first_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mr: 25, mt: 2, ml: 2 }}>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        Статус:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2, color: '#DBAB00' }}>
                        {result?.order_status}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        Сумма заказа:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2 }}>
                        {result?.total_price}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='body2' component='h2' display='inline' sx={{ mb: 2, ml: 3, mt: 2 }}>
                        Количество позиции:
                      </Typography>
                      <Typography variant='body1' component='h2' display='inline' sx={{ mb: 2, ml: 1, mt: 2 }}>
                        {result?.total_item}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {result?.orderitem_set.map((item: any, id: any) => (
                  <Grid key={id} container direction='row' justifyContent='center' spacing={3} maxWidth='lg'>
                    <Grid item xs={12}>
                      <RootWrapper>
                        <>
                          <Box display='flex' alignItems='center' sx={{ mt: 2 }}>
                            <Box ml={2}>
                              <CardMedia
                                component='img'
                                sx={{ width: 200, ml: 2, borderRadius: '5%', height: 100 }}
                                image={item.product.image}
                                alt='Live from space album cover'
                              />
                            </Box>
                            <Box ml={2}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component='div' variant='h6'>
                                  {item.product.title}
                                </Typography>
                                <Typography variant='subtitle2' color='text.secondary' component='div'>
                                  {item.product.desciption}
                                </Typography>
                                <Typography variant='body1' component='div' sx={{ pt: 2 }}>
                                  {item.price_item}
                                </Typography>
                              </CardContent>
                            </Box>
                          </Box>
                        </>
                        <Box
                          sx={{
                            display: { xs: 'none', lg: 'flex' },
                            alignContent: 'flex-start',
                            paddingTop: 5,
                            paddingLeft: 10,
                            paddingRight: 15,
                          }}
                        >
                          <Box>
                          <Typography variant='body1'>
                           X {item.count}  = {item.total}
                          </Typography>
                          </Box>
                          { showResults ?  <Box>
                          <StyledButtonGroup disableElevation variant='contained' aria-label='Disabled elevation buttons'>
                          <Button onClick={()=>PartialReturnOrder(item.id, 1)}>-</Button>
                            <Typography style={{ margin: 10 }} variant='body1'>
                              {item.count_for_return}
                            </Typography>
                            <Button onClick={()=>PartialReturnOrderInc(item.id, 1)}>+</Button>
                          
                          </StyledButtonGroup>
                        </Box> : null }
                        </Box>
                      </RootWrapper>
                      <Divider />
                    </Grid>
                  </Grid>
                ))}
              </ThemeProvider>
              { showResults ?
              <><Grid container justifyContent='space-between'>
                  <Grid xs={8}>
                  </Grid>
                  <Grid xs={4}>
                    <Typography>Итого к возврату: {result?.order_current_return_counter} позиций из {result?.total_item}</Typography>
                    <Typography>Сумма возврата: {result?.order_return_total_price} ₸</Typography>
                  </Grid>
                </Grid><Grid container justifyContent='space-between'>
                    <Grid sx={{ marginLeft: '35px' }} container xs={8.5}>
                      <Grid xs={3}>
                        <Button
                          variant='outlined'
                          onClick={ ()=>navigate(-1)}
                          style={{
                            borderRadius: '5px',
                            borderColor: '#0EB378',
                            color: '#0EB378',
                            padding: '14px 35.5px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            width: '180px'
                          }}
                        >
                          Отменить
                        </Button>
                      </Grid>
                      <Grid xs={3}>
                        <Button
                          type='submit'
                          onClick={handleOpen2}
                          variant='contained'
                          style={{
                            borderRadius: '5px',
                            color: 'white',
                            backgroundColor: '#0EB378',
                            border: 'none',
                            padding: '14px 35.5px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            width: '180px'
                          }}
                        >
                          Подтвердить
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid></>
              : null }
              <FullReturnModal
                value = {data}
                buttonClickfunction={Mockfunction}
                handleCloseReturn={handleCloseReturn}
                openReturn={openReturn}
                style={style}
                rowid={state.id}
              />
            </Paper>
          </Box>
        </Container>
      </Box>
  )
}
