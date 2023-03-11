import { createTheme, styled } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import Paper from '@mui/material/Paper';
import { theme } from '../Myprofilerefactoring/theme/theme'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { useLocation, useNavigate, useOutletContext } from 'react-router'
import styles from './styles/signin.module.sass'
import CircularProgress from '@mui/material/CircularProgress';
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  Pagination,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import ChangesSavedModal from '../Myprofile/components/ChangesSavedModal';
import TimingModal from './TimingModal';
import { empty } from 'src/assets/icons';
import moment from 'moment';
import { getMainInformationRequest, getMyProfileRequest } from 'src/tools/request';

interface StyledTabProps {
  label: string
  value: string
}
interface CustomizedState {
  id?: any,
  myState?: any
}
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

const fonttheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 32,
      fontWeight: 700,
      color: '#999999',
    },
  },
})
const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
      }
`
)
const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(10),
  color: 'black',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    "Inter",
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: 'black',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'black',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#28bf3c',
  },
}))
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default function NewOrders() {

  const lg: string = useOutletContext();
  const [restaurantItem, setRestaurantItem] = useState( localStorage.getItem('userRestaurant'));
  const handleOpenTimer = () => setOpenTimer(true)
  const [secondTime, setSecondTime] = useState(false)
  const [openTimer, setOpenTimer] = useState(false)
  const handleCloseTimer = () => setOpenTimer(false)
  const isMount = useIsMount();
  const mdTheme = createTheme()
  const location = useLocation();
  const [result, setResult] = React.useState<any[]>([])
  const [currentRow, setCurrentRow] = React.useState<any>(null)
  const [firstOrder, setFirstOrder] = React.useState<any>("")
  const [openReturn, setOpenPop] = useState(false)
  const handleCloseReturn = () => setOpenPop(false)
  const isFirstRender = useRef(true);
  const handleOpenPop = () => setOpenPop(true)
  const isCurrentRowChosen = useRef(false);

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const updateState = async () => {
    if(restaurantItem &&  restaurantItem != 'null'){
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    try {
    const response = await fetch('https://thearcanaqr.tech/api/restaurants/new_orders/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        let refresh = window.localStorage.getItem('refresh');
        if (refresh===null){
            window.location.reload();
            window.localStorage.setItem('refresh', "1");
        }

        if (!isCurrentRowChosen.current) {
          if(currentRow != null){
            setIsLoading(false)
          }
          setCurrentRow(data.orders[0])
          isCurrentRowChosen.current = true;
        }

   
          setResult(data.orders?.sort((a: any, b: any) => {
          const date1: any = new Date(a.created_at)
          const date2: any = new Date(b.created_at)
          return date1 - date2
        }))

          setFirstOrder((prevState: any) => {
            if(prevState == data.orders[0]){
              return prevState; 
            }
          
          else{
            return {...prevState, ...data.orders[0]}; 
          }
          
         
            
          });

        },
    
        (err) => {
          setIsLoading(false)
          console.error(err)
          
        }
        
      )
 
    }catch (error) {
      console.log(error)
    }
  
  }

  }


  const getMainInformation = async () => {
    try {
      const response: any = await getMyProfileRequest({
        url: 'users/me',
      });
  
      localStorage.setItem('currency', JSON.stringify(response.currency))
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleDateFormat = (val: any) => {
    const time = moment(val, "").format("hh:mm, DD.MM.YYYY")
    return time
  }
 

  const trigger = async (id : any) => {
    if(!id){
      return
    }
    const newData = result.find((o: any) => {
      return o.id === id
    })

    setCurrentRow(newData)
    isCurrentRowChosen.current = true;
  }
  const navigate = useNavigate();
  const setOrder =  async (id : any) => {
    
    if(!id){
      return
    }

    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    fetch(`https://thearcanaqr.tech/api/orders/${id}/set_admin_order_status/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())

  } 
  const unsetOrder =  async (id : any) => {
    if(!id){
      return
    }
    //updateState()
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    fetch(`https://thearcanaqr.tech/api/orders/${id}/unset_admin_order_status/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
  }

  const OrderIsReady =  async (id : any) => {
    if(!id){
      return
    }
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    fetch(`https://thearcanaqr.tech/api/orders/${id}/ready/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      setCurrentRow(null)
  }


  const [toggleOrder, setToggleOrder] = useState(false)
function AcceptOrder(){
  handleOpenTimer()
  setOrder(currentRow?.id)
  setToggleOrder(true)
  if (result.length <= pageSize) {
    setPage(1)
  } else if (result.length % pageSize === 0) {
    setPage((prevState) => prevState - 1)
  }
  updateState()
}
function AddTime(){
  setOpenTimer(prev => !prev)
  setOpenTimer(prev => !prev)
  
}
function currentRowClear(){
    setCurrentRow(null)
}

  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const pageSize = 12
  const [page, setPage] = useState(1)
  function paginate(result: any, pageNumber: any, pageSizer: any) {
    const startIndex = (pageNumber - 1) * pageSizer
    return [...result].splice(startIndex, pageSizer)
  }
  const pageCount = Math.ceil(result.length / pageSize)
  const userCrop = paginate(result, page, pageSize)

  useEffect(()=>{

    const saved = localStorage.getItem('userOrderSaved')
    if(saved === 'true'){
      handleOpenPop()
    }
    if(restaurantItem &&  restaurantItem != 'null' && localStorage.getItem('userToken')){
      getMainInformation()
      
       updateState()
       setInterval(updateState, 5000);
    }
      localStorage.setItem('userOrderSaved', JSON.stringify(false))
      
  },[])

  return (
 <>
 <ThemeProvider theme={theme}>
      {/* <Box sx={{ display: 'flex' }}> */}
          {/* <CssBaseline /> */}
          {/* <Sidebar /> */}
        <Box
          sx={{
            backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <ChangesSavedModal
            handleCloseReturn={handleCloseReturn}
            openReturn={openReturn} />
  
          <Container maxWidth='lg'>
          <Toolbar   >
            <ThemeProvider theme={fonttheme}>
              <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={4}>
                <Grid >
                  <Typography variant='subtitle1' component='h2' display='inline'>
                      Новые заказы  
                  </Typography>
                </Grid>
                <Grid >
             
  
                </Grid> 
              </Grid>
    
            </ThemeProvider>
          </Toolbar>
            <Box
              sx={{
                display: 'flex',
                // flexWrap: 'wrap',
                '& > :not(style)': {
                  width: '400px',
                  minHeight: '753px',
                },
              }}
            >
              <Paper elevation={8} style={{borderTopLeftRadius:'15px', borderBottomLeftRadius:'15px'}}>
                {userCrop.length >= 1 ? (
                  <TableContainer>
                  <Table  aria-label="customized table">
                  <TableBody>
                  {userCrop.map((res, index) => (
                    
                      <TableRow key={index} onClick={() => trigger(res?.id)}
                        sx={{
                          '& .MuiTableRow-root:hover': {
                            backgroundColor: '#CFF0E4',
                          },
                        }}
                        hover
                      >
                        <React.Fragment>
                        <Grid xs={12} container justifyContent={'space-between'} paddingTop='7px' paddingBottom='7px' paddingLeft='10px' paddingRight='16px'>
                        
                          <Grid xs={6} display={'flex'} >
                          
                            <Grid marginRight='10px'>
                              <Typography fontSize={16}>{index + 1}</Typography>
                            </Grid>
                            <Grid>
                            
                              <Grid>
                                <Typography fontSize={16}>{res?.user?.first_name}{" "}{res?.user?.last_name}</Typography>
                              </Grid>
                              <Grid container display={'flex'} justifyContent={'space-between'}>
                              
                                <Grid marginRight='12px'>
                                  <Typography fontSize={14} sx={{ color: '#666666' }}>{res.id?.toUpperCase()}</Typography>
                                </Grid>
                                <Grid>
                                  <Typography fontSize={14} sx={{ color: '#666666' }}>{res.table_title}</Typography>
                                </Grid>
                              
                                
                              </Grid>
                              
                              
                            </Grid>
                            
                            
                          </Grid>
                          
                        
                          <Grid xs={3} container  direction={'column'} display={'flex'} justifyContent={'space-between'} >
                            <Grid>
                            <Typography fontSize={14} sx={{ color: '#666666' }}>{Array.from(format(new Date(res.created_at), 'hh:mm'))}</Typography>
                            </Grid>
                        
   <Grid >
   {res?.order_status === "IN_PROCESS" ?

   <Typography sx={{ color: '#DBAB00' }} fontSize={12} variant='body1' display='inline'>
     {' '}{res?.order_status}
   </Typography>
: <Typography fontSize={12} variant='body1' display='inline'>
{' '}
</Typography>}
 
 </Grid>
                           
                          </Grid>
                         



                           



                        </Grid>
                        <Divider />
                        </React.Fragment>
                      </TableRow>                     
                  ))}
                  </TableBody>
                  </Table>
                  {pageCount > 1 ? (
            <Stack spacing={2} className={styles.flex}>
              <Pagination count={pageCount} showFirstButton showLastButton onChange={(_, num) => setPage(num)} />
            </Stack>
          ) : null}

                  </TableContainer>
                )  : (
                  
                  <>
                    
                        <Grid display='flex' sx={{  minHeight: '687px',paddingTop: '110px' }} flexDirection='column'>
                    <Grid>
                      <Typography variant='subtitle1' component='h2' style={{ display: 'inline-block', fontWeight: '700', fontSize: '19.5px', width: '100%', paddingBottom: '10px', paddingLeft: '80.5px', paddingRight: '55.5px', alignContent:'center'}}>У вас нет новых заказов</Typography>
                    </Grid>
                    <Grid>
                      <Typography style={{ display: 'inline-block', fontWeight: '400', fontSize: '16px', textAlign: 'center', paddingLeft: '40px', paddingRight: '40px' ,alignContent:'center'}}> Все актуальные заказы будут отображаться на этой странице</Typography>
                    </Grid>
                    <Grid sx={{ justifyContent:'center'}}>
                    {isLoading &&   <Typography style={{ display: 'inline-block', fontWeight: '400', fontSize: '16px', textAlign: 'center', paddingLeft: '160px', paddingRight: '40px', paddingTop: '30px' }}> <CircularProgress style={{color: '#0EB378'}}/></Typography>}  
                    </Grid>
                   
                  </Grid>
               
                  </>
                )}
                
              </Paper>
         
              <Box
                sx={{
                  '& > :not(style)': {
                    width: '600px',
                    minHeight: '753px',
                  },
                }}>
                <Paper elevation={4} style={{ width: '600px', minHeight: '753px' , borderTopRightRadius: '15px',  borderBottomRightRadius: '15px'}}>
                  {currentRow?.id != null ? (
                    <><Grid item container justifyContent='space-between'>
                      <Grid item sx={{ mt: '25px', ml: '30px', mr: '30px' }}>
                        <ThemeProvider theme={fonttheme}>
                          <Typography variant='subtitle1' sx={{ fontSize: '20px', fontWeight: '700' }}>
                            Заказ № {currentRow?.id?.toUpperCase()}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                        { currentRow.restaurant_admin_status === "WAITING" ?
  <Grid item sx={{ mt: '25px', ml: '30px', mr: '30px' }}>
  <Button
    variant='outlined'
    onClick={() => navigate(`${currentRow?.id}`, {
      state: {
        temp: 1,
        id: currentRow?.id,
      },
    })}
    style={{
      borderRadius: '5px',
      color: '#0EB378',
      padding: '10px 35px',
      borderColor: '#0EB378',
      marginRight: '10px',
      textTransform: 'none',
    }}
  >
    Изменить заказ
  </Button>
</Grid>
: null}

{ currentRow.restaurant_admin_status === "ACCEPTED" ?
  <Grid item sx={{ mt: '25px', ml: '30px', mr: '30px' }}>
  <Button
    onClick={() => OrderIsReady(currentRow?.id)}
    variant='outlined'
    style={{
      borderRadius: '5px',
      color: '#0EB378',
      padding: '10px 35px',
      borderColor: '#0EB378',
      marginRight: '10px',
      textTransform: 'none',
    }}
  >
   Завершить заказ
  </Button>
</Grid>
: null}
                    

                    </Grid>

                      <ThemeProvider theme={fonttheme}>
                        <Grid container justifyContent='space-between'>
                          <Grid item xs={5} sx={{ mt: 2, marginLeft: '30px', mb: 2 }}>
                            <Grid>
                              <Typography fontSize={16} sx={{ color: '#666666' }} variant='body2' display='inline'>
                                Время заказа:
                              </Typography>
                              <Typography fontSize={16} display='inline' sx={{ mb: 2, mt: 2 }}>
                                {" " + handleDateFormat(currentRow?.created_at)}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography sx={{ color: '#666666' }} fontSize={14} variant='body2' display='inline'>
                                ФИО Клиента:
                              </Typography>
                              <Typography fontSize={16} variant='body1' display='inline'>
                                {" " + currentRow?.user?.first_name}{" "}{currentRow?.user?.last_name}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid xs={5} item sx={{ mt: 2, ml: 2 }}>

                            <Grid>
                              <Typography sx={{ color: '#666666' }} fontSize={16} variant='body2' display='inline'>
                                Сумма заказа:
                              </Typography>
                              <Typography fontSize={16} variant='body1' component='h2' display='inline'>
                                {" " + currentRow?.total_price}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography sx={{ color: '#666666' }} fontSize={16} variant='body2' display='inline'>
                                Номер стола:
                              </Typography>
                              <Typography fontSize={16} variant='body1' display='inline'>
                                {' '}{currentRow?.table_title}
                              </Typography>
                            </Grid>
                         
                          </Grid>
                        </Grid>
                      </ThemeProvider>
                      <Divider />
                      <Grid item xs={12} sm container sx={{ width: 'auto', mt: 2, marginLeft: '30px', mb: 2, marginRight: '30px' }}>
                        <Grid item xs container direction="column" wrap="nowrap">
                          <Grid item xs zeroMinWidth>
                            <Typography fontSize={16} variant='body2' component='h2' display='inline'>
                              Комментарий клиента:
                            </Typography>
                          </Grid>
                          <Grid item zeroMinWidth>

                            <Typography variant='body2' component='h2' display='inline' style={{ overflowWrap: 'break-word' }}>{currentRow?.comment}</Typography>


                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider /></>
                  ) :
                    <Grid display='flex' sx={{ maxWidth: '531px', paddingTop: '237.44px' }} flexDirection='column'>
                      <Grid sx={{ paddingLeft: '135px', paddingRight: '136px', paddingBottom: '25px' }}>
                        <img src={empty} alt='empty' />
                      </Grid>
                      <Grid sx={{ paddingLeft: '66px', paddingRight: '66px' }}>
                        <Typography style={{ fontWeight: '400', fontSize: '16px', textAlign: 'center' }}>  Детали заказа будут отображаться тут</Typography>
                      </Grid>
                    </Grid>}
              
                  {currentRow?.orderitem_set?.map((item: any) => (
                    item != null ? (
                      <Grid container direction='row' justifyContent='center' spacing={3} maxWidth='lg'>
                        <Grid item xs={12}>
                          <RootWrapper>
                            <>
                              <Box display='flex' alignItems='center'>
                                <Box ml={2}>
                                  <CardMedia
                                    component='img'
                                    sx={{ width: 70, ml: 2, borderRadius: '5%', height: 79 }}
                                    image={item.product.image}
                                    alt='Live from space album cover' />
                                </Box>
                                <Box ml={2}>
                                  <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant='subtitle2'>
                                      {item.product.title}
                                    </Typography>
                                    <Typography variant='subtitle2' color='text.secondary'>
                                      {item.product.desciption}
                                    </Typography>
                                    <Typography variant='body1' sx={{ pt: 2 }}>
                                      {item.price_item}
                                    </Typography>
                                  </CardContent>
                                </Box>
                              </Box>
                            </>
                            <Box
                              sx={{
                                display: { xs: 'none', lg: 'flex' },
                                // alignContent: 'flex-start',
                                paddingTop: 5,
                                paddingLeft: 10,
                                paddingRight: 15,
                              }}
                            >
                              <Box>
                                <Typography variant='body1'>
                                 < Typography style={{ fontWeight:'bold'}}>{item.count}</Typography> X {item.price_item} = {item.total}
                                </Typography>
                              </Box>
                            </Box>
                          </RootWrapper>
                          <Divider />
                        </Grid>
                      </Grid>
                    ) : null
                  ))}
                            
                  {currentRow?.id != null ? (
                    <Grid justifyContent="flex-end" alignItems="flex-end" container sx={{ paddingTop: '25px', paddingRight: '25px' }}>
                            { currentRow.restaurant_admin_status === "ACCEPTED" ?
  <Grid item sx={{ mt: '25px', ml: '30px', mr: '30px' }}>
       <TimingModal
                            handleCloseTimer={handleCloseTimer}
                            openTimer={openTimer}
                            style={style}
                            secondTime={secondTime}
                            value={currentRow}
                            currentRowClear={currentRowClear} />
  <Button
  onClick={() => { handleOpenTimer(); setSecondTime(true);}}
    variant='outlined'
    style={{
      borderRadius: '5px',
      color: '#0EB378',
      padding: '10px 35px',
      borderColor: '#0EB378',
      marginRight: '10px',
      textTransform: 'none',
    }}
  >
    Добавить время
  </Button>
</Grid>
: null}

{ currentRow.restaurant_admin_status === "WAITING" ?
  <><Button
                          onClick={() => unsetOrder(currentRow?.id)}
                          variant='outlined'
                          style={{
                            borderRadius: '5px',
                            color: '#E34833',
                            padding: '14px 35px',
                            borderColor: '#E34833',
                            marginRight: '10px',
                            textTransform: 'none',
                            fontSize: '14px'
                          }}
                        >
                          Отклонить
                        </Button>
                        
                        <TimingModal
                            secondTime={secondTime}
                            handleCloseTimer={handleCloseTimer}
                            openTimer={openTimer}
                            style={style}
                            value={currentRow}
                            currentRowClear={currentRowClear} />
                            
                            <Button
                              onClick={AcceptOrder}
                              variant='contained'
                              style={{
                                borderRadius: '5px',
                                color: 'white',
                                backgroundColor: '#0EB378',
                                padding: '14px 35px',
                                textTransform: 'none',
                                fontSize: '14px'
                              }}
                            >
                            Принять
                          </Button></>
: null}
                      
                    </Grid>
                  ) : null}
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>
    </ThemeProvider></>
  )
}

