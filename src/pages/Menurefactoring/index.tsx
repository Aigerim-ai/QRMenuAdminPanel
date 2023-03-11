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
import { useEffect, useState } from 'react'
import { getRequest, postActiveOrderItem } from 'src/tools/request'
import { styled } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import EditMenu from '../Menurefactoring/components/EditDeleteMenu'
import FormControlLabel from '@mui/material/FormControlLabel'
import IOSSwitch from '../Menurefactoring/components/Switch/Switch'
import { Close, Edit, language } from 'src/assets/icons'
import Actions from './components/PopoverSearch'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddMenuDialog from './components/AddMenuDialog'
import { useForm } from 'react-hook-form'
import EditCategory from './components/EditCategory'
import { useLocation, useNavigate } from 'react-router'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useAppDispatch } from 'src/store'
import AddCategoryDialog from './components/AddCategoryDialog'
import React from 'react'
import { defaultimage, deletemenudefault } from '../../../src/assets/icons/index'
import boopSfx from 'src/pages/NewOrders/mixkit-arcade-score-interface-217.mp3'
import t from 'src/locale/helper'
import { useOutletContext } from 'react-router'

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
    { value: 'dishes', label: 'Блюда' },
    { value: 'categories', label: 'Категории' },
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
    count: string
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
  const RootWrapper = styled(Box)(
    ({ theme }) => `
          @media (min-width: ${theme.breakpoints.values.md}px) {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
  `
  )
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
export default function MenuRefactoring() {
  const lg: string = useOutletContext();
  
  const [restaurantItem, setRestaurantItem] = useState(localStorage.getItem('userRestaurant'));
  const [itemcount, setItemCount] = useState(0);
  const [currentCategory, setcurrentCategory] = useState();
  const [currentIDCategory, setcurrentIDCategory] = useState();
  const [openEditCategory, setOpenEditCategory] = React.useState(false);
  const handleOpenEditCategory = (val: any, val2: any) =>{
    setOpenEditCategory(true);
    setcurrentCategory(val2);
    setcurrentIDCategory(val);
  }
  const handleCloseEditCategory = () => setOpenEditCategory(false);
    const classes = useStyles()
    const [currentRow, setCurrentRow] = useState<any>()
    const [open, setOpen] = useState(false)
    const [currentRestaurant, setCurrentRestaurant] = useState<any>(localStorage.getItem('userRestaurant'));
    const [currentTab, setCurrentTab] = useState<string>('menu')
    const [menu, setMenu] = useState<IProduct[]>([]);
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
    const [CategoryChecked, setCategoryChecked] = useState<boolean>();

   const toggleActive = (itemIndex: any, active: boolean)=> async () => {
    setChecked(active);

      if(active === true){
        try {
          const response: any = await postActiveOrderItem({
            url: `products/${itemIndex}/deactivate/`,
          })
        } catch (error) {
          console.log(error)
        }
      }else{
        try {
          const response: any = await postActiveOrderItem({
            url: `products/${itemIndex}/activate/`,
          })
        } catch (error) {
          console.log(error)
        }

      }
      menuGetRequest();
      getCategory();

   }


   const toggleActiveCategory = (itemIndex: any, active: boolean)=> async () => {

    setChecked(active);

      if(active === true){
        try {
          const response: any = await postActiveOrderItem({
            url: `restaurants/${itemIndex}/category_deactive/`,
          })
        } catch (error) {
          console.log(error)
        }
      }else{
        try {
          const response: any = await postActiveOrderItem({
            url: `restaurants/${itemIndex}/category_active/`,
          })
        } catch (error) {
          console.log(error)
        }

      }
      menuGetRequest();
      getCategory();

   }

    const menuGetRequest = async () => {
        try {
          const response: any = await getRequest({
            url: `restaurants/admin/get_menu/`,
          })
          setMenu(response)
          return response
        } catch (error) {
          console.log(error)
        }
    }
    const [isChecked, setIsChecked] = useState(() =>
      categoriesFilter?.map((i) => false)
    );

    const [checkedNames, setCheckedNames] = useState<string[]>([]);

    const isCheckboxChecked = (index: any, checked: any) => {
        isChecked[index] = checked;
        setIsChecked([...isChecked]);
    };

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
          setMenu(response?.filter((item: any) => {
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
    function isActive(){
      getCategory()
    }

    const getCategoryFilter =  async () => {
      try {
        const response: any = await getRequest({
          url: `restaurants/admin/get_categories/`,
        })
        const newData = response?.filter(function (item: any) {
          return item.active == true
        })
        setCategoriesFilter(newData)
      } catch (error) {
        console.log(error)
      }
    }

    //!!!!
    const [currentCount, setCurrentCount] = useState(()=>{
      // menu
    
    });
    //for changing count of the product

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
    requestSearch(searched);
  },[checkedNames])
  
}

      const navigate = useNavigate();

      const handleClick = () => {
       localStorage.setItem('userOrderSaved', JSON.stringify(true))
       navigate(-1)
      };
    return(  
      <>
      <EditMenu handleCloseEditPosition={handleCloseEditPosition} currentMenu={currentMenu} openPosition={openPosition} menuGetRequest={menuGetRequest} />
      <AddMenuDialog categories={categories} getCategory={getCategory} openCategoryModal={openCategoryModal} handleToggle={handleToggle} menuGetRequest={menuGetRequest} />
      <EditCategory openEditCategory={openEditCategory} handleCloseEditCategory={handleCloseEditCategory} currentCategory={currentCategory} currentIDCategory={currentIDCategory} getCategory={getCategory}/><ThemeProvider theme={theme}>
        {/* <Box sx={{ display: 'flex' }}> */}
          {/* <CssBaseline /> */}
          {/* <Sidebar /> */}
          <Box
            component='main'
            sx={{
              backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
                 <Container sx={{maxWidth: '888px'}}>
              <Grid sx={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px', paddingBottom:'15px'}}>
                <ThemeProvider theme={fonttheme}>
                <Typography variant='subtitle1' component='h2'>
                    {t(lg).menu}
                  </Typography>
                </ThemeProvider>
              </Grid>
     
     
            <Card sx={{padding:'20px'}} style={{borderRadius: '10px'}}>
     
              <Grid container direction='row' justifyContent='center' spacing={3} maxWidth='lg' sx={{overflowY: 'hidden'}}>
                <Grid item xs={12}>   
                    <Box >
                    <Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} onChange={handleTabsChange} value={currentTab} aria-label='basic tabs example' indicatorColor='secondary'>
                        {tabs?.map((tab) => (
                          <Tab style={{ textTransform: 'none', padding: '20px' }} key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                      </Tabs>
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
                                      startAdornment: (
                                        <InputAdornment position='start'>
                                          <SearchIcon />
                                        </InputAdornment>
                                      ),
                                      endAdornment: (
                                        <Button
                                          variant='contained'
                                          onClick={() => {
                                            requestSearch(searched)
                                          }}
                                          style={{
                                            borderRadius: '0',
                                            borderStartEndRadius: '10px',
                                            borderEndEndRadius: '10px',
                                            color: 'white',
                                            border: 'none',
                                            padding: '9px 32px',
                                            backgroundColor: '#0EB378',
                                            boxShadow: 'none'
                                          }}
                                          sx={{ "&:hover": { backgroundColor: "transparent", borderColor: "transparent" } }}
                                        >
                                          Искать
                                        </Button>
                                      ),
                                    }}
                                    placeholder='Поиск...' />

                                  <Button
                                    onClick={(e) => handleClickAnchor(e)}
                                    style={{
                                      borderRadius: 10,
                                      color: '#999999',
                                      borderColor: '#CCCCCC',
                                      minWidth: '0',
                                    }}
                                  >
                                    <FilterListIcon />
                                  </Button>
                                  <Popover
                                    className={classes.root}
                                    anchorEl={anchorEl}
                                    open={openAnchor}
                                    onClose={handleCloseAnchor}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}>
                                    <Box px={2} py={2} alignItems='center'>
                                      <Box>
                                        <Box display='flex'>
                                          <Box marginLeft="auto">
                                            <img src={Close} alt='logo' onClick={handleCloseAnchor} />
                                          </Box>
                                        </Box>
                                        <Box display='flex' marginRight="auto">
                                          <Box>
                                            {categoriesFilter?.map((item, index) => {
                                              return (
                                                <>
                                                  <Box>
                                                    <FormControlLabel control={<Checkbox checked={isChecked[index]} onChange={(e) => {
                                                      isCheckboxChecked(index, e.target.checked);
                                                      if(e.target.checked) {
                                                        setCheckedNames([...checkedNames, item.name])
                                                      } else {
                                                        setCheckedNames(checkedNames?.filter((itemm: any) => {
                                                          itemm !== item.name
                                                        }))
                                                      }
                                                    }} />} label={<Typography sx={{ fontSize: 16 }}>
                                                      {item.name}
                                                    </Typography>} />
                                                  </Box>
                                                </>
                                              )
                                            })}
                                          </Box>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                          <Box pl={3} pr={3} pb={3} pt={3}>
                                            <Button
                                              onClick={() => {
                                                handleCloseAnchor()
                                                setCheckedNames([])
                                                setIsChecked(() =>
                                                categoriesFilter?.map((i) => false))
                                                requestSearch(searched)
                                              }}
                                              style={{
                                                borderRadius: '5px',
                                                padding: '15px',
                                                textAlign: 'center',
                                              }}
                                              variant='outlined'
                                            >
                                              Очистить
                                            </Button>
                                          </Box>
                                          <Box pr={3} pb={3} pt={3}>
                                            <Button
                                              variant='contained'
                                              onClick={() => {
                                                requestSearch(searched)
                                                handleCloseAnchor()
                                              }}
                                              style={{
                                                borderRadius: '5px',
                                                color: 'white',
                                                backgroundColor: '#0EB378',
                                                border: 'none',
                                                padding: '15px',
                                              }}
                                            >
                                              Использовать
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Popover>
                                  <AddCategoryDialog menuGetRequest={menuGetRequest} openCategoryModal2={openCategoryModal2} handleToggleCategory={handleToggleCategory} getCategory={getCategory} />
                                 
                                    {currentTab === 'categories' ?

                                      <Button
                                        onClick={handleToggleCategory}
                                        style={{
                                          borderRadius: 5,
                                          minWidth: '200px',
                                        }}
                                        sx={{ "&:hover": { backgroundColor: "transparent", borderColor: "#0EB378" } }}
                                        variant='outlined'
                                      >
                                        {'Добавить категорию'}
                                      </Button> : <Button
                                      
                                        onClick={handleToggle}
                                        style={{
                                          borderRadius: 5,
                                          minWidth: '200px',
                                        }}
                                        sx={{ "&:hover": { backgroundColor: "transparent", borderColor: "#0EB378" } }}

                                        variant='outlined'
                                      >
                                        {'Добавить позицию'}
                                      </Button>}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                  
                      </Grid>
                      {currentTab === 'categories' ? (categories?.map((posts, index) => (
                        <Grid item container display='flex' flex-direction='column' justifyContent={'space-between'} alignContent='center' sx={{ opacity: posts.active ? 1 : 0.4 }}>
                          <Toolbar key={posts.id} sx={{ mt: 2 }}>
                            <Grid item xs={10}>
                              <ThemeProvider theme={fonttheme}>
                                <Typography variant='subtitle1' component='h2'>
                                  {posts.name}
                                </Typography>
                              </ThemeProvider>
                            </Grid>
                          </Toolbar>
                          <Grid item xs={2}>
                            <Box
                              sx={{
                                paddingTop: 2.5,
                              }}
                            >
                              {' '}
                              <FormControlLabel
                                control={<>
                                  <IOSSwitch checked={posts.active} onChange={toggleActiveCategory(posts.id, posts.active)} />
                                  <Button variant='text' sx={{ border: 'none' }} onClick={()=>handleOpenEditCategory(posts.id, posts.name)}>
                                    <img src={Edit} alt='edit' />
                                  </Button>
                                </>}
                                label='' />
                            </Box>
                          </Grid>
                        </Grid>
                      ))) : null}



                      {currentTab === 'dishes' || currentTab === 'menu' ? (
                        
                        menu?.map((posts, index) => (
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

                            {posts.product_set?.map((it, idx) => (
                              
                              <>
                              
                                <Box key={it.id} display='flex' alignItems='center' sx={{ opacity: it.active ? 1 : 0.4 }}>
                                  <CardMedia
                                    component='img'
                                    sx={{ width: 158, ml: 2, borderRadius: '5%', height: 100 }}
                                    image={it.image ? it.image : defaultimage}
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


                                        {currentTab === 'dishes' ? (
                                          <><Grid key={it.id} item xs={3}>
                                            <Box
                                              sx={{
                                                paddingTop: 2.5,
                                              }}
                                            >
                                       
                                                  <IOSSwitch checked={it.active} onChange={toggleActive(it.id, it.active)} />
                                                  <Button variant='text' onClick={() => handleOpenEditPosition(it)} sx={{ border: 'none' }}>
                                                    <img src={Edit} alt='edit' />
                                                  </Button>
                                     
                                            </Box>
                                          </Grid></>
                                        ) : null}

                                      </Grid>
                                      <Divider style={{ width: '1000px' }} />
                                    </CardContent>
                                  </Box>

                                </Box>


                              </>

                            ))}
                          </>
                        ))
                      ) : null}


{(currentRestaurant === null || currentRestaurant === 'null') && (currentTab==='dishes' || currentTab ==='menu') ? (
<Grid display='flex' justifyContent='center' paddingTop='30px'>
<Typography sx={{ fontWeight: '400', fontSize:'16px',color: '#999999', textAlign: 'center' }} variant='caption'>
У вас нет добавленных позиции 
</Typography>
</Grid>): null}
{(currentRestaurant === null  || currentRestaurant === 'null' )&& (currentTab==='categories') ? (
<Grid display='flex' justifyContent='center' paddingTop='30px'>
<Typography sx={{ fontWeight: '400', fontSize:'16px',color: '#999999', textAlign: 'center' }} variant='caption'>
У вас нет созданных категории
</Typography>
</Grid>): null}

                    </Box>


      
                  
                </Grid>
              </Grid>

           
            </Card>
            </Container>
          </Box>
        {/* </Box> */}

      </ThemeProvider></>
    
    )
}
