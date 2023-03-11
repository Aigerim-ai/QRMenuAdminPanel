import { ThemeProvider, Toolbar, Typography, Grid, Divider} from '@mui/material'
import { theme } from './theme/theme'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import Card from '@mui/material/Card'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { makeStyles } from '@material-ui/core'
import { createTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import styles from '../Myprofile/profile.module.sass'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useAppDispatch } from 'src/store'
import React from 'react'
import { setRestaurant } from '../../store/slices/userSlice/index'
import BorderLinearProgress from '../Myprofile/components/CustomizedProgressBars'
import { defaultimage} from '../../../src/assets/icons/index'
import boopSfx from 'src/pages/NewOrders/mixkit-arcade-score-interface-217.mp3'
import Basic from '../Myprofile/pages/basic/Basic'
import { getMainInformationRequest, getMyProfileRequest, postSetState } from 'src/tools/request'
import ChangesSavedModal from '../Myprofile/components/ChangesSavedModal'
import Account from '../Myprofile/pages/account/Account'
import Requisities from '../Myprofile/pages/requisities/Requisities'
import ConfirmationModal from '../Myprofile/components/ConfirmationModal'
import { useOutletContext } from 'react-router'

const fonttheme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 32,
        fontWeight: 700,
      },
    },
  })

const tabs = [
    { value: 'main', label: 'Основная информация' },
    { value: 'account', label: 'Данные аккаунта' },
    { value: 'requisites', label: 'Реквизиты' },
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
  interface IBasic {
    name: string
    address: string
    category: ICategory[]
    description: string
    image: string
    phone_number: string
    price: any
    rating: any
    state: any
    restaurantimage_set: any
    service_percent: number
  }
  interface CustomizedState {
    id?: string,
    myState?: string 
    orderitem_set: IItems[],
  }
export default function MyProfilrefactoring() {

  const lg: string = useOutletContext();
  const [account, setAccount] = useState<
  | {
      name: string
      address: string
      description: string
      image: string
      phone_number: string
      category: ICategory[]
      price: number
      service_percent: number
      restaurantimage_set: any,
      time_from: string,
      time_before: string
    }
  | null
  | undefined
>()
const [personName, setPersonName] = React.useState<string[]>([]);
const [restaurantItem, setRestaurantItem] = useState( localStorage.getItem('userRestaurant'));
const dispatch = useAppDispatch()
const [url, setUrl] = useState<any>()
const errorResponse = React.useRef<boolean>(false);
//main info fetch
const getMainInformation = async () => {
  try {
    const response: any = await getMainInformationRequest({
      url: 'restaurants/admin/',
    })
    setAccount((prevState) => ({
      ...prevState,
      name: response.name,
      address: response.address,
      description: response.description,
      image: response.image,
      phone_number: response.phone_number,
      category: response.category,
      price: response.price,
      service_percent: response.service_percent,
      restaurantimage_set: response.restaurantimage_set,
      time_from: response.time_from,
      time_before: response.time_before
    }))

    setProgress((prevState: any) => ({
      ...prevState,
      state: response.state
    }))

    let current: string[] = []
    response?.category.forEach((cat: any) => {
      current = [...current, cat.name]
    });
    setPersonName(current)
    
    localStorage.setItem('userRestaurant', JSON.stringify(response.id))
    setRestaurantItem(localStorage.getItem('userRestaurant'))
    dispatch(setRestaurant(response.id))
    setUrl(response.image)

  } catch (error) {
    console.log(error)
    errorResponse.current = true
    setAccount(null)
  }
}
//account fetch
const [accountData, setAccountData] = useState<
| {
    id: string
    first_name: string
    position: string
    phone_number: string
    IIN: string
    email: string
    password: string
    image: string
    currency: string
  }
| null
| undefined
>()
const [profile, setProfile] = useState()
const [imagedata, setImagedata] = useState(null)
const [urlAccount, setUrlAccount] = useState<any>()

const handleChangeImage = (e: any) => {
  setImagedata(e.target.files[0])
  setUrlAccount(URL.createObjectURL(e.target.files[0]))

}
const getMyProfile = async () => {
  try {
    const response: any = await getMyProfileRequest({
      url: 'users/me/',
    })
    setAccountData((prevState) => ({
      ...prevState,
      id: response.name,
      first_name: response?.first_name,
      position: response.position,
      phone_number: response.phone_number,
      IIN: response.IIN,
      email: response.email,
      password: response.password,
      image: response.image,
      currency: response.currency
    }))
    setProfile(response.bank_name)
    setUrlAccount(response.image)
    setProgress(response.state)
  } catch (error) {
    setAccountData(null)
    console.log(error)
  }
}
const [requisites, setRequisites] = useState<
| {
    organization_name: string
    BIN: string
    bank_name: string
    BIK: string
    IBAN: string
    kbe: string
    currency: string
  }
| null
| undefined
>()
const getMyRequisites = async () => {
  try {
    const response: any = await getMyProfileRequest({
      url: 'users/me/',
    })
    setRequisites((prevState) => ({
      ...prevState,
      organization_name: response.organization_name,
      BIN: response.BIN,
      bank_name: response.bank_name,
      BIK: response.BIK,
      IBAN: response.IBAN,
      kbe: response.kbe,
      currency: response.currency,
    }))
  } catch (error) {
    setRequisites(null)
    console.log(error)
  }
}


useEffect(() => {
  getMyRequisites()
  getMyProfile()
  getMainInformation()
}, [])




  const [openDelete, setOpenDelete] = React.useState<boolean>(false)
  const handleCloseDeletePosition = () => setOpenDelete((openDelete: any) => !openDelete)


  const [editStatus1, setEditStatus1] = useState<boolean>(false);
  const [editStatus2, setEditStatus2] = useState<boolean>(false);
  const [editStatus3, setEditStatus3] = useState<boolean>(false);
  const [progress, setProgress] = useState<any>(localStorage.getItem('state'))

  const postRestaurantProfileState = async (percent: any) => {
    try {
      const response: any = await postSetState({
        url: `restaurants/admin/set_state/${percent}/`,
      }).then(()=>{
        getMainInformationPercentage()
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    setProgress(localStorage.getItem('state'))
  },[progress])

  const [valueWatcher, setValueWatcher] = useState<any>([]);
  const [valueWatcherAccount, setValueWatcherAccount] = useState<any>([]);
  const [valueWatcherRequisites, setValueWatcherRequisites] = useState<any>([]);
  
  function handleValueChangeWatch(watchedValue: any, watchedValue2: any, watchedValue3: any, watchedValue8: any,watchedValue4: any, watchedValue5: any, watchedValue6: any, watchedValue7: any) {
    setValueWatcher([watchedValue, watchedValue2, watchedValue3, watchedValue8,watchedValue4, watchedValue5, watchedValue6, watchedValue7]);
  }
  function handleValueChangeWatchAccount(watchedValue: any, watchedValue2: any, watchedValue3: any, watchedValue8: any, watchedValue9: any, watchedValueimage: any) {
    setValueWatcherAccount([watchedValue, watchedValue2, watchedValue3, watchedValue8, watchedValue9, watchedValueimage]);
  }
  function handleValueChangeWatchRequisites(watchedValue: any, watchedValue2: any, watchedValue3: any, watchedValue8: any, watchedValue9: any, watchedValue7: any,watchedValue4: any) {
    setValueWatcherRequisites([watchedValue, watchedValue2, watchedValue3, watchedValue8, watchedValue9, watchedValue7, watchedValue4]);
  }
  const [all, setAll] = useState()
  function handleAllWatch(value: any){
    setAll(value)
  }


  const getMainInformationPercentage = async () => {
    try {
      const response: any = await getMainInformationRequest({
        url: 'restaurants/admin/',
      })
      setProgress(response.state)
      localStorage.setItem('state', response.state)
      localStorage.setItem('userRestaurant', JSON.stringify(response.id))
      setRestaurantItem(localStorage.getItem('userRestaurant'))
      dispatch(setRestaurant(response.id))

  
    } catch (error) {
      console.log(error)
    }
  }
  const handleOpen = () => {
      setOpen(true)
    setTimeout(function() {
      handleCloseReturn()
      setEditStatus1(false)
      setEditStatus2(false)
      setEditStatus3(false)
    }, 2000)
  }
  const [openReturn, setOpen] = useState(false)
  const handleCloseReturn = () => {
    setOpen(false)
  }



    const [currentTab, setCurrentTab] = useState<string>('main')

  /*


watch
*/



    const handleTabsChange = (event: React.ChangeEvent<{}>, value: string): void => {
      
      if(editStatus1 || editStatus2 || editStatus3){
        handleCloseDeletePosition()
      }else{
        setCurrentTab(value)
      }

    
    
    }

    function popupCaller(){
        handleOpen()
      
    }


    useEffect(() => {

        if (accountData?.first_name !== valueWatcherAccount[0] && currentTab!="account" && editStatus2=== true && valueWatcherAccount[0]!== undefined) {
     
          handleCloseDeletePosition()
        }
        if (accountData?.position !== valueWatcherAccount[1] && currentTab!="account" && editStatus2=== true && valueWatcherAccount[1]!== undefined) {
          handleCloseDeletePosition()
        

        }

        if (accountData?.IIN !== valueWatcherAccount[2] && currentTab!="account" && editStatus2=== true&& valueWatcherAccount[2]!== undefined) {
          handleCloseDeletePosition()


        }
        if (accountData?.phone_number !== valueWatcherAccount[3] && currentTab!="account" && editStatus2=== true&& valueWatcherAccount[3]!== undefined) {
          handleCloseDeletePosition()
   

        }
        if (accountData?.email !== valueWatcherAccount[4] && currentTab!="account" && editStatus2=== true&& valueWatcherAccount[4]!== undefined) {
          handleCloseDeletePosition()
   

        }
        if (urlAccount && currentTab!="account" && editStatus2=== true&& valueWatcherAccount[5]!== undefined) {

          handleCloseDeletePosition()
   

        }
   

    }, [currentTab])




    useEffect(() => {

      if (account?.name !== valueWatcher[0] && currentTab!="main" && editStatus1=== true && valueWatcher[0]!== undefined) {
     
        handleCloseDeletePosition()
      }
      if (account?.address !== valueWatcher[1] && currentTab!="main" && editStatus1=== true && valueWatcher[1]!== undefined) {
        handleCloseDeletePosition()


      }
      if (account?.description !== valueWatcher[2] && currentTab!="main" && editStatus1=== true&& valueWatcher[2]!== undefined) {
        handleCloseDeletePosition()


      }
      if (account?.image !== valueWatcher[3] && currentTab!="main" && editStatus1=== true&& valueWatcher[3]!== undefined) {
        handleCloseDeletePosition()


      }
      if (account?.phone_number !== valueWatcher[4] && currentTab!="main" && editStatus1=== true&& valueWatcher[4]!== undefined) {
        handleCloseDeletePosition()


      }
  
      if (account?.category !== valueWatcher[5] && currentTab!="main" && editStatus1=== true&& valueWatcher[5]!== undefined) {
        handleCloseDeletePosition()
    

      }
      if (account?.price !== valueWatcher[6] && currentTab!="main" && editStatus1=== true&& valueWatcher[6]!== undefined) {
        handleCloseDeletePosition()
     

      }
      if (account?.service_percent !== valueWatcher[7] && currentTab!="main" && editStatus1=== true&& valueWatcher[7]!== undefined) {
        handleCloseDeletePosition()
 

      } 

  }, [currentTab])
    


  useEffect(() => {

    if (requisites?.organization_name !== valueWatcherRequisites[0] && currentTab!="requisites" && editStatus3=== true && valueWatcherRequisites[0]!== undefined) {

      handleCloseDeletePosition()
    }
    if (requisites?.BIN !== valueWatcherRequisites[1] && currentTab!="requisites" && editStatus3=== true && valueWatcherRequisites[1]!== undefined) {
      handleCloseDeletePosition()

    }
  
    if (requisites?.bank_name !== valueWatcherRequisites[2] && currentTab!="requisites" && editStatus3=== true&& valueWatcherRequisites[2]!== undefined) {
      handleCloseDeletePosition()


    }
    if (requisites?.BIK !== valueWatcherRequisites[3] && currentTab!="requisites" && editStatus3=== true&& valueWatcherRequisites[3]!== undefined) {
      handleCloseDeletePosition()


    }
    if (requisites?.IBAN !== valueWatcherRequisites[4] && currentTab!="requisites" && editStatus3=== true&& valueWatcherRequisites[4]!== undefined) {
      handleCloseDeletePosition()


    }
    if (requisites?.kbe !== valueWatcherRequisites[5] && currentTab!="requisites" && editStatus3=== true&& valueWatcherRequisites[5]!== undefined) {
      handleCloseDeletePosition()


    }
    if (requisites?.currency !== valueWatcherRequisites[6] && currentTab!="requisites" && editStatus3=== true&& valueWatcherRequisites[6]!== undefined) {
      handleCloseDeletePosition()
 

    }


}, [currentTab])



    return(  

      <>
   <ConfirmationModal openDelete={openDelete} handleCloseDeletePosition={handleCloseDeletePosition}/>
       <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
              flexGrow: 1,
              height: 'auto',
              overflowY: 'scroll'
            }}
          >
                 <Container sx={{maxWidth: '888px', height: '1200px'}}>
                  
              <Grid sx={{ paddingTop: '30px'}}>
                <ThemeProvider theme={fonttheme}>
                <Typography variant='subtitle1' component='h2'>
                    Профиль заведения
                  </Typography>
                </ThemeProvider>
                
              </Grid>
              <Grid style={{paddingBottom: '15px'}}>
              {parseInt(progress) < 100 ? (
                  <div className={styles.isComplete}>
                    <Typography style={{fontSize:'16px', fontWeight: 400}}>Вам нужно заполнить все данные, чтобы приступить к работе</Typography>
                    <div className={styles.progress}>
                      <Typography  style={{fontSize:'16px', fontWeight: 400}} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        Завершенность :
                        <Typography  style={{fontSize:'16px', fontWeight: 400}} align='right'>
                          {progress}%
                        </Typography>
                      </Typography>
                      <BorderLinearProgress variant='determinate' value={parseInt(progress)} />
                    </div>
                  </div>
                ) : null}
         </Grid>
            <Card sx={{padding:'15px'}} style={{borderRadius: '10px', width: '888px'}} >
              
              <Grid container direction='row' justifyContent='center' spacing={3} maxWidth='lg'  maxHeight='lg' sx={{overflowY: 'hidden'}}>
                <Grid item xs={12} style={{paddingTop: '15px'}}>   
                    <Box >
                    <Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} onChange={handleTabsChange} value={currentTab} aria-label='basic tabs example' indicatorColor='secondary'>
                        {tabs?.map((tab) => (
                          <Tab style={{ textTransform: 'none', fontSize:'14px', fontWeight: 400}} key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                      </Tabs>
                      <ChangesSavedModal 
                                handleCloseReturn={handleCloseReturn}
                                openReturn={openReturn}
                              />
             
                      {currentTab === 'main' ? (
                            <Basic  handleValueChangeWatch={handleValueChangeWatch} getMainInformation={getMainInformation} errorResponse={errorResponse} setPersonName={setPersonName} personName={personName} url={url} setUrl={setUrl} restaurantItem={restaurantItem} setRestaurantItem={setRestaurantItem} account={account} setAccount={setAccount} handleCloseDeletePosition={handleCloseDeletePosition} currentTab={currentTab} popupCaller={popupCaller} setProgress={setProgress} progress={progress} editStatus={editStatus1} setEditStatus={setEditStatus1} postRestaurantProfileState={postRestaurantProfileState}/>
                      ) : null}
                      {currentTab === 'account'  ? (
                        
                     <Account  setImagedata={setImagedata} imagedata={imagedata} handleChangeImage={handleChangeImage} getMyProfile={getMyProfile} urlAccount={urlAccount} setUrlAccount={setUrlAccount} profile={profile} setProfile={setProfile} accountData={accountData} setAccountData={setAccountData} handleValueChangeWatchAccount={handleValueChangeWatchAccount} currentTab={currentTab}  popupCaller={popupCaller} setProgress={setProgress} progress={progress} editStatus={editStatus2} setEditStatus={setEditStatus2} postRestaurantProfileState={postRestaurantProfileState}/>
                      ) : null}
                         {currentTab === 'requisites' ? (
                        
                        <Requisities  setRequisites={setRequisites} requisites={requisites} getMyRequisites={getMyRequisites} handleValueChangeWatchRequisites={handleValueChangeWatchRequisites} currentTab={currentTab}   popupCaller={popupCaller} setProgress={setProgress} progress={progress} editStatus={editStatus3} setEditStatus={setEditStatus3} postRestaurantProfileState={postRestaurantProfileState}/>
                         ) : null}
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