import { ThemeProvider, CssBaseline, Toolbar, Typography, Grid, Divider, Button, TextField, InputAdornment, Popover, Checkbox} from '@mui/material'
import { theme } from '../Myprofilerefactoring/theme/theme'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import Card from '@mui/material/Card'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@material-ui/core'
import { createTheme } from '@mui/material/styles'
import { useEffect, useRef, useState } from 'react'
import { getRequest, postActiveOrderItem } from 'src/tools/request'
import { styled } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { useLocation, useNavigate, useOutletContext } from 'react-router'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useAppDispatch } from 'src/store'
import React from 'react'

const fonttheme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 32,
        fontWeight: 700,
      },
    },
  })
  const StyledButtonGroup = styled(ButtonGroup)({
    // change the text color for all buttons
   
    '& .MuiButton-root': {
      backgroundColor: '#9FE1C9',
      height: '30px'
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
      borderColor: '#333333',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderLeft:  '0.2px solid #333333',
      borderTop: '0.2px solid #333333',
      borderBottom: '0.2px solid #333333',
      borderRight: 'none'
    },
    '& .MuiButtonGroup-grouped:not(:first-of-type)' :{
      borderColor: '#333333',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      borderRight:  '0.2px solid #333333',
      borderLeft: 'none',
      borderTop: '0.2px solid #333333',
      borderBottom: '0.2px solid #333333',
  }
  })

  const StyledButtonGroupWhite = styled(ButtonGroup)({
    // change the text color for all buttons
   
    '& .MuiButton-root': {
      backgroundColor: '#FFFFFF',
      height: '30px'
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
      borderColor: '#333333',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderLeft:  '0.2px solid #333333',
      borderTop: '0.2px solid #333333',
      borderBottom: '0.2px solid #333333',
      borderRight: 'none'
    },
    '& .MuiButtonGroup-grouped:not(:first-of-type)' :{
      borderColor: '#333333',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      borderRight:  '0.2px solid #333333',
      borderLeft: 'none',
      borderTop: '0.2px solid #333333',
      borderBottom: '0.2px solid #333333',
  }
  })
const tabs = [
    { value: 'menu', label: 'Меню заведения' },
  ]
  interface IMenu {
    id: string
    title: string
    image: string
    restaurant: number
    price: string
    description: string
    category: string
    active: boolean
    created_at: string
    updated_at: string
    count: number
  }
  interface IProduct {
    id: any
    active: boolean
    name: string
    image: string
    desciption: string
    product_set: IMenu[]
  }
  interface ICategory {
    id: number,
    name: string,
    restaurant_name: string,
    image: string,
    description: string,
    restaurant: number,
    active: boolean

  }
  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiPopover-paper': {
        borderRadius: 15,
        border: '0px solid #CCCCCC',
        width: '353px',
        position: 'fixed',
        height: '476px',
        overflow: 'hidden',
      },
      'label + &': {
        marginTop: theme.spacing(6),
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        fontWeight: 400,
        border: '0px solid #CCCCCC',
        borderColor: '#CCCCCC',
        fontSize: 16,
        paddingRight: 0,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '& fieldset': {
          borderColor: '#CCCCCC',
        },
        '&:hover fieldset': {
          borderColor: '#CCCCCC',
        },
        '&.Mui-focused fieldset': {
          border: '1px solid #CCCCCC',
        },
      },
      
    },
  }))
  interface IItems {
    id: number
    product: IProduct
    count: number
    price_item: string
    total: string
  }
  interface CustomizedState {
    id?: string,
    myState?: string 
    orderitem_set: IItems[],
  }
export default function currentOrder() {
  const lg: string = useOutletContext();
  
  const [MenuWithCount, setMenuWithCount] = useState<any[]>([]);
  const [restaurantItem, setRestaurantItem] = useState(localStorage.getItem('userRestaurant'));
  const [itemcount, setItemCount] = useState(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [currentCategory, setcurrentCategory] = useState();
  const [currentIDCategory, setcurrentIDCategory] = useState();
  const location = useLocation()
  const state = location.state as CustomizedState 
  if(state){
    const { myState } =  state
  }
  const [openEditCategory, setOpenEditCategory] = React.useState(false);
  const handleOpenEditCategory = (val: any, val2: any) =>{
    setOpenEditCategory(true);
    setcurrentCategory(val2);
    setcurrentIDCategory(val);
  }
    const classes = useStyles()
    const [currentRow, setCurrentRow] = useState<any>()
    const [open, setOpen] = useState(false)
    const [currentRestaurant, setCurrentRestaurant] = useState<any>(localStorage.getItem('userRestaurant'));
    const [currentTab, setCurrentTab] = useState<string>('menu')
    let [menu, setMenu] = useState<any[]>([]);
    const [currentMenu, setCurrentMenu] = useState<IMenu | undefined>();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoriesFilter, setCategoriesFilter] = useState<ICategory[]>([]);
    const [idx, setIdx] = useState<number>();
    const [idxItem, setIdxItem] = useState<string>();
    const [name, setName] = useState<string>();
    const [openCategoryModal, setCategoryModal] = useState<boolean>(false)
    const [openCategoryModal2, setCategoryModal2] = useState<boolean>(false)
    const [openPosition, setOpenPostion] = useState<boolean>(false)

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const handleCloseAnchor = () => {
      setAnchorEl(null)
    }
    const openAnchor = Boolean(anchorEl)
    const handleClickAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const dispatch = useAppDispatch()
    const handleOpen = (item: number, name: string) =>{
      setOpen(true)
      setIdx(item)
      setName(name)

    } 
    const handleClose = () => setOpen(false)
    function handleOpenEditPosition(curr: IMenu){
      setCurrentMenu(curr)
      setOpenPostion((openPosition: any) => !openPosition)
  }
  const handleCloseEditPosition = () => setOpenPostion((openPosition: any) => !openPosition)

    function handleToggle() {
      setCategoryModal((openCategoryModal: any) => !openCategoryModal)
    }

    function handleToggleCategory(){
        setCategoryModal2((openCategoryModal2: any) => !openCategoryModal2)
    }


    const handleTabsChange = (event: React.ChangeEvent<{}>, value: string): void => {
        setCurrentTab(value)
    }
  
    //onClick={toggleclick(it.id)}

    const [checked, setChecked] = useState<boolean>();


    const menuGetRequest = async () => {
        try {
          const response: any = await getRequest({
            url: `restaurants/admin/get_menu/`,
          })
          let arrWithCounts = response.map((item: any, idx: any)=>({
            ...item,
            product_set: item.product_set.map((obj: any) => ({ ...obj, count: 0 }))
          }))
          setMenu(arrWithCounts)

    
    }catch(error){
      console.log(error)
    }
  }
    const [isChecked, setIsChecked] = useState(() =>
      categoriesFilter.map((i) => false)
    );
    const [checkedNames, setCheckedNames] = useState<string[]>([]);
    const [searched, setSearched] = useState("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearched(event.target.value);
      if(!event.target.value){
        requestSearch("");
      }
    };
    const requestSearch = async (val: any) => {
      try {
        const response: any = await getRequest({
          url: `restaurants/admin/get_menu/?search=${val}`,
        })
        if (checkedNames.length !== 0) {
          setMenu(response.filter((item: any) => {
            return checkedNames.includes(item.name)
          }))
        } else {
          setMenu(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const getCategory =  async () => {
      try {
        const response: any = await getRequest({
          url: `restaurants/admin/get_categories/`,
        })
        setCategories(response)
      } catch (error) {
        console.log(error)
      }
    }

    const getCategoryFilter =  async () => {
      try {
        const response: any = await getRequest({
          url: `restaurants/admin/get_categories/`,
        })
        const newData = response.filter(function (item: any) {
          return item.active == true
        })
        setCategoriesFilter(newData)
      } catch (error) {
        console.log(error)
      }
    }
    const trigger = async (id : any) => {
      if(!id){
        return
      }
      const tokenObject = localStorage.getItem('userToken')
      if (!tokenObject) {
        throw Error('Token does not exist')
      }
      const { token } = JSON.parse(tokenObject)
      fetch(`https://thearcanaqr.tech/api/orders/${id}/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (data) => {
            const date = new Date(data.created_at)
            setCurrentRow({
              ...data,
              createdDate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()-2000}${', '}${date.getHours()}:${date.getMinutes()}`,
            })
          },

          (err) => console.error(err)
        )
    }
    const changeQuantity = (id: any, count: any) => {
      if(!id){
        return
      }
      const tokenObject = localStorage.getItem('userToken')
      if (!tokenObject) {
        throw Error('Token does not exist')
      }
      const { token } = JSON.parse(tokenObject)
      fetch(`https://thearcanaqr.tech/api/restaurants/new_orders/${id}/change_quantity/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
          count: count,
        }),
      })
        .then((res) => res.json())
        .then(()=>trigger(state?.id))
       
    }
    const getRestaurantCategories = async () => {
      try {
        const response: any = await getRequest({
          url: 'restaurants/category/',
        })
        setCategories(response)
      } catch (error) {
      }
    }
    const [toggleProduct, setToggleProduct] = useState(false);

   
    const changeProduct = (id: any, count: any) => {
      setToggleProduct(true)
      if(!id){
        return
      }
      const tokenObject = localStorage.getItem('userToken')
      if (!tokenObject) {
        throw Error('Token does not exist')
      }
      const { token } = JSON.parse(tokenObject)
      fetch(`https://thearcanaqr.tech/api/restaurants/new_orders/${state.id}/change_product/
      `, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: id,
          count: count,
        }),
      })
        .then((res) => res.json())
        .then(()=>trigger(state?.id))
    }

if(restaurantItem &&  restaurantItem != 'null'){
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(()=>{
    getRestaurantCategories()
  },[])

  useEffect(()=>{
    getCategoryFilter();
  },[])
  useEffect(()=>{
    menuGetRequest()
  },[])
  // useEffect(()=>{
  //   requestSearch(searched);
  // },[checkedNames])
  
useEffect(() =>{
    trigger(state?.id)
    toggleNewOrderMenu();
  },[])
}
      const toggleNewOrderMenu = () => {
        if(state?.id){
            setToggle(true)
        }else{
          setToggle(false)
        }
      }
      const navigate = useNavigate();

      const handleClick = () => {
        trigger(state?.id)
       localStorage.setItem('userOrderSaved', JSON.stringify(true))
       navigate(-1)
      };
    return(  
      <><ThemeProvider theme={theme}>
        {/* <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Sidebar /> */}
          <Box
            component='main'
            sx={{
              backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
              <Grid sx={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px', paddingBottom:'15px'}}>
                <ThemeProvider theme={fonttheme}>
                  <Typography variant='subtitle1' component='h2'>
                    Изменить заказ: №{state?.id}
                  </Typography> 
                </ThemeProvider>
              </Grid>
            <Card sx={{marginLeft: '30px', marginRight: '30px',minHeight: '862px'}} style={{borderRadius: '10px'}}>
            <Container maxWidth='xl'>
              <Grid container direction='row' justifyContent='center' spacing={3} maxWidth='lg' sx={{overflowY: 'hidden'}}>
                <Grid item xs={12}>          
                    <Box >
                      <Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} onChange={handleTabsChange} value={'menu'} aria-label='basic tabs example' indicatorColor='secondary'><Tab style={{ textTransform: 'none', padding: '20px' }} key={'menu'} label={'Меню заведения'} value={'menu'} /> <Typography variant='subtitle1' component='h2' /></Tabs>         
                      <Grid spacing={0} container>
                        <Grid item xs={12}>
                          <Box p={2.5}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Grid item style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                  <TextField
                                    size='small'
                                    className={classes.root}
                                    fullWidth
                                    value={searched}
                                    onChange={handleChange}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment onClick={() => {
                                          requestSearch(searched)
                                        }} position='start'>
                                        <SearchIcon />
                                      </InputAdornment>
                                       
                                      ),
                                    }}
                                    placeholder='Поиск' />
                                    <Button
                                      onClick={handleClick}
                                      style={{
                                        borderRadius: 5,
                                        minWidth: '200px',
                                      }}

                                      variant='outlined'
                                    >
                                      {'Cохранить'}
                                    </Button> 
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                            <Toolbar sx={{ mt: 2 }}>
                              <ThemeProvider theme={fonttheme}>
                                <Typography variant='subtitle1' component='h2'>
                                  Актуальный заказ
                                </Typography>
                              </ThemeProvider>
                            </Toolbar>
                            {currentRow?.orderitem_set.map((item: any, index: any) => (
                              <Card sx={{ display: 'flex', pt: 2, pl: 2, pb: 2 }} elevation={0}>
                                <Grid container display={'flex'} flexDirection={'column'}>
                                  <Grid item container display={'flex'} justifyContent={'space-between'} flexDirection={'row'} alignItems="center">
                                    <Grid xs={10} item container display={'flex'} flexDirection={'row'}>
                                      <Grid item>
                                        <CardMedia sx={{ display: 'flex', pt: 2, pl: 2, pb: 2, width: 181 }} component='img' image={item.product.image} alt='Live from space album cover' />
                                      </Grid>
                                      <Grid item>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component='div' variant='h6'>
                                              {item.product.title}
                                            </Typography>
                                            <Typography variant='subtitle2' color='text.secondary' component='div'>
                                              {item.product.description}
                                            </Typography>
                                            <Typography variant='subtitle1' component='div' sx={{ pt: 2 }}>
                                              {item.product.price}
                                            </Typography>
                                          </CardContent>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={2} key = {index}>
                                      <Box
                                      >
                                        <StyledButtonGroup sx={{ "&:hover": { backgroundColor: 'transparent' } }} disableElevation variant='contained' aria-label='Disabled elevation buttons'>
                                        <Button style={{ color: '#333333' }} sx={{ "&:hover": { backgroundColor: '#9FE1C9' } }} onClick={() => changeQuantity(item.id, item.count - 1)}><Typography>-</Typography></Button>
                                          <Grid style={{ alignItems: 'center', height: '30px', backgroundColor: '#9FE1C9', borderTop: '0.2px solid #333333', borderBottom: '0.2px solid #333333' }}>
                                            <Typography style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#9FE1C9' }} variant='body1'>
                                              {item.count}
                                            </Typography>
                                          </Grid>
                                          <Button style={{ color: '#333333' }} sx={{ "&:hover": { backgroundColor: '#9FE1C9' } }} onClick={() => changeQuantity(item.id, item.count + 1)}><Typography>+</Typography></Button>
                                        </StyledButtonGroup>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Divider style={{ width: '1000px' }} />
                                  </Grid>
                                </Grid>
                              </Card>
                            ))}   
                        </Grid>
                      </Grid>
                      {menu?.map((posts, index) => (
                          <>
                            <Toolbar key={posts.id} sx={{ mt: 2 }}>
                              <Grid item xs={10} sx={{ opacity: posts.active ? 1 : 0.4 }}>
                                <ThemeProvider theme={fonttheme}>
                                  <Typography variant='subtitle1' component='h2'>
                                    {posts.name}
                                  </Typography>
                                </ThemeProvider>
                              </Grid>
                            </Toolbar>

                            {posts?.product_set.map((it: any, idx: any) => (
                              
                              <>
                              
                                <Box key={it.id} display='flex' alignItems='center' sx={{ opacity: it.active ? 1 : 0.4 }}>
                                  <CardMedia
                                    component='img'
                                    sx={{ width: 158, ml: 2, borderRadius: '5%', height: 100 }}
                                    image={it.image}
                                    alt='Live from space album cover' />
                                  <Box sx={{ width: '700px' }} justifyContent='space-between'>
                                    <CardContent>
                                      <Grid item container display='flex' flex-direction='column' justifyContent={'space-between'} alignContent='center' alignItems={'center'}>
                                        <Grid item xs={7}>
                                          <Typography component='div' variant='h6'>
                                            {it.title}
                                          </Typography>
                                          <Typography variant='subtitle2' color='text.secondary' component='div'>
                                            {it.description}
                                          </Typography>
                                          <Typography variant='body1' component='div' sx={{ pt: 2 }}>
                                            {it.price + ' ₸'}
                                          </Typography>
                                        </Grid>
                                          <StyledButtonGroupWhite  key={idx} sx={{ "&:hover": { backgroundColor: 'transparent' } }} disableElevation variant='contained' aria-label='Disabled elevation buttons'>
                                             <Button style={{ color: '#333333' }} sx={{ "&:hover": { backgroundColor: '#FFFFFF' } }} ><Typography></Typography></Button>
                                      
                                            <Grid style={{ alignItems: 'center', height: '30px', backgroundColor: '#FFFFFF', borderTop: '0.2px solid #333333', borderBottom: '0.2px solid #333333' }}>
                                              <Typography style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#FFFFFF' }} variant='body1'>
                                                {it.count}
                                              </Typography>
                                            </Grid>
                                            <Button style={{ color: '#333333' }} sx={{ "&:hover": { backgroundColor: '#FFFFFF' } }} onClick={() => changeProduct(it.id, itemcount + 1)}><Typography>+</Typography></Button>
                                          </StyledButtonGroupWhite>                       
                                      </Grid>
                                      <Divider style={{ width: '1000px' }} />
                                    </CardContent>
                                  </Box>

                                </Box>


                              </>

                            ))}
                          </>
                        ))
                      }
                    </Box>              
                </Grid>
              </Grid>

            </Container>
            </Card>
          </Box>
        {/* </Box> */}

      </ThemeProvider></>
    
    )
}



