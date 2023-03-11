import { createTheme, styled } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import { format } from 'date-fns'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { theme } from '../Myprofilerefactoring/theme/theme'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import moment from 'moment';
import axios from "axios";
import boopSfx from 'src/pages/NewOrders/mixkit-arcade-score-interface-217.mp3'
import { SortDown, sortDown24, sortUp24 } from '../../assets/icons/index'
import * as XLSX from 'xlsx';
import {
  CssBaseline,
  TableBody,
  TableCell,
  TableRow,
  ThemeProvider,
  TableContainer,
  TableHead,
  Table,
  Typography,
  LinearProgress,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Popover,
  Slider,
  FormControlLabel,
  Checkbox,
  Card,
} from '@mui/material'
import { makeStyles } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import Popup from './Components/Popup'
import { Close } from 'src/assets/icons'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import _ from 'lodash'
import { getRestaurant } from 'src/tools/request'
interface StyledTabProps {
  label: string
  value: string
}
const fonttheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontWeight: 700,
    },
  },
})
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPopover-paper': {
      borderRadius: 15,
      border: '0px solid #CCCCCC',
      width: '353px',
      position: 'fixed',
      height: '470px',
      overflow: 'hidden',
      paddingLeft: 8,
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
      paddingRight: 11,
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
  root2: {
    '& .MuiPopover-paper': {
      borderRadius: 15,
      border: '0px solid #CCCCCC',
      width: '373px',
      position: 'fixed',
      height: '370px',
      overflow: 'hidden',
    },
    'label + &': {
      marginTop: theme.spacing(6),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 15,
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
const tabs = [
  { value: 'Все заказы', label: 'Все заказы' },
  { value: 'В процессе', label: 'В процессе' },
  { value: 'Завершенные', label: 'Завершенные' },
]
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
interface IUser{
  first_name:string,
  last_name: string
}
interface OrderExport {
  id: string,
  created_at: string
  user: IUser
  total_price: string
  order_status: string
  return_order_status: string
  table_title: string
}
export default function Orders() {

  const lg: string = useOutletContext();
  const [orderCounter, setOrderCounter] = useState(0);
  const classes = useStyles()
  const [result, setResult] = useState<any>([])
  const [searched, setSearched] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [originalData, setOriginalData] = useState<any>([])
  const [originalInProgressData, setOriginalInProgressData] = useState<any>([])
  const [originalReadyData, setOriginalReadyData] = useState<any>([])
  const [restaurantItem, setRestaurantItem] = useState( localStorage.getItem('userRestaurant'));
  const [checkedToday, setCheckedToday] = useState<boolean>(false)
  const [checkedReturns, setCheckedReturns] = useState<boolean>(false)
  const [checkedDates, setCheckedDates] = useState<boolean>(false)
  const [chosenCheckedDateOne, setChosenCheckedDateOne] = useState<string | null>("");
  const [chosenCheckedDateTwo, setChosenCheckedDateTwo] = useState<string | null>("");
  const [checkedTime, setCheckedTime] = useState<boolean>(false)
  const [chosenCheckedTimeOne, setChosenCheckedTimeOne] = useState<string | null>("");
  const [chosenCheckedTimeTwo, setChosenCheckedTimeTwo] = useState<string | null>("");
  const [chosenCheckedTimeOneOrig, setChosenCheckedTimeOneOrig] = useState<string | null>("");
  const [chosenCheckedTimeTwoOrig, setChosenCheckedTimeTwoOrig] = useState<string | null>("");
  const [checkedTotal, setCheckedTotal] = useState<boolean>(false)
  const [checkedTable, setCheckedTable] = useState<boolean>(false)
  const [checkedDateSortDown, setCheckedDateSortDown] = useState<boolean>(false);
  const [checkedDateSortUp, setCheckedDateSortUp] = useState<boolean>(false);
  const [checkedTimeSortDown, setCheckedTimeSortDown] = useState<boolean>(false);
  const [checkedTimeSortUp, setCheckedTimeSortUp] = useState<boolean>(false);
  const [checkedTotalSortDown, setCheckedTotalSortDown] = useState<boolean>(false);
  const [checkedTotalSortUp, setCheckedTotalSortUp] = useState<boolean>(false);
  const [obj, setObje] = useState<{ total_income?: number }>()
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPriceInProgress, setTotalPriceInProgress] = useState<number>(0);
  const [totalCountInProgress, setTotalCountInProgress] = useState<number>(0);
  const [totalPriceReady, setTotalPriceReady] = useState<number>(0);
  const [totalCountReady, setTotalCountReady] = useState<number>(0);
  const [valueTotal, setValueTotal] = useState<number[]>([0, 5000]);




  const [searchUrl, setSearchUrl] = useState<string>("https://thearcanaqr.tech/api/restaurants/orders/?")
  const handleTotalCount = (val: string) => {
    switch(val) {
      case 'Все заказы':
        return totalCount
      case 'В процессе':
        return totalCountInProgress
      case 'Завершенные':
        return totalCountReady
    }
  }
  const handleChangeTotal = (event: Event, newValue: number | number[]) => {
    const arrTotal = newValue as number[];
    setValueTotal(arrTotal);
    setSearchUrl(searchUrl + `total_price__range=${arrTotal[0]},${arrTotal[1]}&`)
  };

  function valuetext(value: number) {
    return `${value} ₸`;
  }
  const [data, setData] = React.useState<any>([]);
  const [totalprice, setTotalPrice] = useState(0)

  React.useEffect(() => {

    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)

    const fetchData = () => {
      axios
        .get("https://thearcanaqr.tech/api/restaurants/orders/", {
          headers: {
            Authorization: `Token ${token}`,
            }
        })
        .then((r: any) =>{
   
          setData(r.results)
        } );
    };

    fetchData();
  }, []);


  const TotalPrice = async () =>{
    try{
      const response: any = await getRestaurant({
        url: 'restaurants/admin/income/',
      })
      const preres = response
      setObje(preres)
      
    }catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    TotalPrice()
  }, [])
  const [next, setNext] = useState<any>(null)
  const [previous, setPrevious] = useState<any>(null)

  const [nextInProcess, setNextInProcess] = useState<any>(null)
  const [previousInProcess, setPreviousInProcess] = useState<any>(null)

  const [nextReady, setNextReady] = useState<any>(null)
  const [previousReady, setPreviousReady] = useState<any>(null)

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageNumberInProgress, setPageNumberInProgress] = useState<number>(1)
  const [pageNumberReady, setPageNumberReady] = useState<number>(1)

  const goNext = () => {
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
  try{  
        fetch((currentTab === 'Все заказы' ? next : (currentTab === 'В процессе') ? nextInProcess : nextReady), {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (data) => {
            const newData = convertToDivisionByDate(data.results)
            
            if(currentTab === 'Все заказы') {
              setTotalCount(data?.count)
              setTotalPrice(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setResult(newData)
              setNext(data.next)
              setPrevious(data.previous)
              setPageNumber(data.page_number)
            } else if (currentTab === 'В процессе') {
              setTotalCountInProgress(data?.count)
              setTotalPriceInProgress(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setInProgress(newData)
              setNextInProcess(data.next)
              setPreviousInProcess(data.previous)
              setPageNumberInProgress(data.page_number)
            } else {
              setTotalCountReady(data?.count)
              setTotalPriceReady(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setReady(newData)
              setNextReady(data.next)
              setPreviousReady(data.previous)
              setPageNumberReady(data.page_number)
            }
           
            setIsLoading(false);
            
          },
          (err) => console.error(err)
        )

  }catch (error) {
    console.log(error)
  }
  }

  const goPrevious = () => {
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
  try{  
        fetch((currentTab === 'Все заказы' ? previous : currentTab === 'В процессе' ? previousInProcess : previousReady), {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (data) => {
            const newData = convertToDivisionByDate(data.results)
            if (currentTab === 'Все заказы') {
              setTotalCount(data?.count)
              setTotalPrice(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setResult(newData)
              setNext(data.next)
              setPrevious(data.previous)
              setPageNumber(data.page_number)
            } else if (currentTab === 'В процессе') {
              setTotalCountInProgress(data?.count)
              setTotalPriceInProgress(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setInProgress(newData)
              setNextInProcess(data.next)
              setPreviousInProcess(data.previous)
              setPageNumberInProgress(data.page_number)
            } else {
              setTotalCountReady(data?.count)
              setTotalPriceReady(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setReady(newData)
              setNextReady(data.next)
              setPreviousReady(data.previous)
              setPageNumberReady(data.page_number)
            }
           
            setIsLoading(false);
            
          },
          (err) => console.error(err)
        )

  }catch (error) {
    console.log(error)
  }
  }

  const handleMutePrev = () => {
    switch(currentTab) {
      case 'Все заказы':
        return previous
      case 'В процессе':
        return previousInProcess
      case 'Завершенные':
        return previousReady
    }
  }

  const handleMuteNext = () => {
    switch(currentTab) {
      case 'Все заказы':
        return next
      case 'В процессе':
        return nextInProcess
      case 'Завершенные':
        return nextReady
    }
  }

  const handlePageNumber = () => {
    switch(currentTab) {
      case 'Все заказы':
        return pageNumber
      case 'В процессе':
        return pageNumberInProgress
      case 'Завершенные':
        return pageNumberReady
    }
  }

  function convertToDivisionByDate(arr: any){
    const sorted = arr?.sort(
    (objA: any, objB: any) => objB.created_at - objA.created_at,
  );
    const monthName = (item:any) => moment(item.created_at, 'YYYY-MM-DD').format("D MMMM YYYY");
    const resultD = _.groupBy(sorted, monthName)
    return resultD
  }

  async function requestSearch(searchedVal: string | boolean) {
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    setIsLoading(true)
    Promise.all([
      await fetch((checkedReturns || checkedToday || searchedVal === false) ? `${searchUrl}` : `${searchUrl}search=${searchedVal}`, {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((res) => res.json())
          .then(
            (data) => {
              const newData = convertToDivisionByDate(data.results)
              setTotalCount(data?.count)
              setTotalPrice(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setResult(newData);
              setOriginalData(newData)
              setNext(data.next)
              setPrevious(data.previous)
              setIsLoading(false)
            },
            (err) => console.error(err)
          ),
          await fetch((checkedReturns || checkedToday) ? `${searchUrl}` : `${searchUrl}search=${searchedVal}&order_status=IN_PROCESS`, {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((res) => res.json())
          .then(
            (data) => {
              const newData = convertToDivisionByDate(data.results)
              setOriginalInProgressData(newData)
              setNextInProcess(data.next)
              setPreviousInProcess(data.previous)
              setTotalCountInProgress(data?.count)
              setTotalPriceInProgress(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setInProgress(newData);
            },
            (err) => console.error(err)
          ),
          await fetch((checkedReturns || checkedToday) ? `${searchUrl}` : `${searchUrl}search=${searchedVal}&order_status=READY`, {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((res) => res.json())
          .then(
            (data) => {
              const newData = convertToDivisionByDate(data.results)
              setOriginalReadyData(newData)
              setNextReady(data.next)
              setPreviousReady(data.previous)
              setTotalCountReady(data?.count)
              setTotalPriceReady(data?.results?.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.total_price);
              }, 0))
              setReady(newData);
              
            },
            (err) => console.error(err)
          )
    ])
    
  };
  const handleFormat = (val: number) => {
    return (val.toString().length === 1) ? `0${val}` : val
  }

  const handleTranslate = (val: string) => {
    switch(val){
      case 'January':
        return 'января'
      case 'February':
        return 'февраля'
      case 'March':
        return 'марта'
      case 'April':
        return 'апреля'
      case 'May':
        return 'мая'
      case 'June':
        return 'июня'
      case 'July':
        return 'июля'
      case 'August':
        return 'августа'
      case 'September':
        return 'сентября'
      case 'October':
        return 'октября'
      case 'November':
        return 'ноября'
      case 'December':
        return 'декабря'
    }
  }

  const handleDate = (key: any) => {
    const arr = key.split(" ")
    const t = handleTranslate(key.split(" ")[1])
    const today = moment(new Date().toISOString()).add(6, 'h').format("D MMMM YYYY");
    const yesterday = moment(new Date().toISOString()).subtract(18, 'h').format("D MMMM YYYY");
    if (key == today) {
      return `Сегодня - ${arr[0]} ${t} ${arr[2]}`
    } else if (key == yesterday) {
      return `Вчера - ${arr[0]} ${t} ${arr[2]}`
    } else {
      return `${arr[0]} ${t} ${arr[2]}`
    }
  }

  const handleChangeToday = (e: any) => {
    setCheckedToday(e.target.checked)
    if (e.target.checked) {
      setCheckedReturns(false)
      setCheckedDates(false)
      setSearchUrl("https://thearcanaqr.tech/api/restaurants/admin/today_orders/")
      setCheckedTable(false)
      setCheckedTime(false)
      setCheckedTotal(false)
    } else {
      setSearchUrl("https://thearcanaqr.tech/api/restaurants/orders/?")
    }
  }

  const handleChangeReturns = (e: any) => {
    setCheckedReturns(e.target.checked)
    if (e.target.checked) {
      setCheckedToday(false)
      setCheckedDates(false)
      setSearchUrl("https://thearcanaqr.tech/api/restaurants/admin/return_orders/")
      setCheckedTable(false)
      setCheckedTime(false)
      setCheckedTotal(false)
    } else {
      setSearchUrl("https://thearcanaqr.tech/api/restaurants/orders/?")
    }
  }

  const handleChangeDates = (e: any) => {
    setCheckedDates(e.target.checked)
    if (e.target.checked) {
      setCheckedToday(false)
      setCheckedReturns(false)
    } else {
      setSearchUrl(searchUrl.replace(`created_at__range=${chosenCheckedDateOne},${chosenCheckedDateTwo}&`, ""))
    }
  }

  const handleChangeDate1 = (newValue: any) => {
    const val = `${newValue.$y}-${handleFormat(newValue.$M+1)}-${handleFormat(newValue.$D)}`
    setChosenCheckedDateOne(val)
    if(chosenCheckedDateTwo) {
      setSearchUrl(searchUrl+`created_at__range=${val}${chosenCheckedTimeOne},${chosenCheckedDateTwo}${chosenCheckedTimeTwo}&`)
    }
  }

  const handleChangeDate2 = (newValue: any) => {
    const val = `${newValue.$y}-${handleFormat(newValue.$M+1)}-${handleFormat(newValue.$D)}`
    setChosenCheckedDateTwo(val)
    if(chosenCheckedDateOne) {
      setSearchUrl(searchUrl+`created_at__range=${chosenCheckedDateOne}${chosenCheckedTimeOne},${val}${chosenCheckedTimeTwo}&`)
    }
  }

  const handleChangeTimes = (e: any) => {
    setCheckedTime(e.target.checked)
    if (e.target.checked) {
      setCheckedToday(false)
      setCheckedReturns(false)
    }
  }

  const handleChangeTime1 = (newValue: any) => {
    const val = `T${handleFormat(newValue.$H)}:${handleFormat(newValue.$m)}:00`
    setChosenCheckedTimeOne(val)
    setChosenCheckedTimeOneOrig(newValue)
    if (chosenCheckedTimeTwo) {
      setSearchUrl(searchUrl+`created_at__range=${chosenCheckedDateOne}${val},${chosenCheckedDateTwo}${chosenCheckedTimeTwo}&`)
    }
  }

  const handleChangeTime2 = (newValue: any) => {
    const val = `T${handleFormat(newValue.$H)}:${handleFormat(newValue.$m)}:00`
    setChosenCheckedTimeTwo(val)
    setChosenCheckedTimeTwoOrig(newValue)
    if (chosenCheckedTimeOne) {
      setSearchUrl(searchUrl+`created_at__range=${chosenCheckedDateOne}${chosenCheckedTimeOne},${chosenCheckedDateTwo}${val}&`)
    }
  }

  const handleChangeTotals = (e: any) => {
    setCheckedTotal(e.target.checked)
    if (e.target.checked) {
      setCheckedToday(false)
      setCheckedReturns(false)
    }
  }

  const cancelSearch = () => {
    setSearched("");
    setResult(originalData);
    setInProgress(originalInProgressData);
    setReady(originalReadyData);
    requestSearch("");
  };
  const [inprogress, setInProgress] =  useState<any>([])
  const [ready, setReady] = useState<any>([])
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const open2 = Boolean(anchorEl2)
  const id2 = open2 ? 'simple-popover' : undefined
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }
  const [currentTab, setCurrentTab] = React.useState<string>('Все заказы')
  const navigate = useNavigate()

  const [currency, setCurrency] = useState('');
  const handleTabsChange = (event: React.ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }
if(restaurantItem && restaurantItem!='null'){
  useEffect(() => {
    requestSearch(searched);

  }, []);
}
  const resultCurrent = useMemo(() => {
    switch(currentTab) {
      case 'Все заказы':
        return result;
      case 'В процессе':
        return inprogress;
      case 'Завершенные':
        return ready;
      default:
        return result;
    }
  }, [currentTab, result, inprogress, ready]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
    if(!event.target.value){
      requestSearch("");
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget)
  }
const [dataXLS, setDataXLS] = useState<any[]>([]);
const fetchXLS = async () =>{
  try{
      await getRestaurant({
      url: 'restaurants/orders_wp/ ',
    }).then((data: any[]) => {
      // Save the retrieved data into state
      /*
        id: string;
    total_price: string;
    created_at: string;
    user: IUser[];
    order_status: string;
    return_order_status: string;
      */
        setDataXLS(data);
    })

  }catch (error) {
    console.log(error)
  }
}
React.useEffect(() => {
  fetchXLS()
}, [])

const exportToExcel = (dataXLS: OrderExport[]) => {
  
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(dataXLS);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Data');
  XLSX.writeFile(workbook, 'data.xlsx');
};




  
  return (
    <>
    
    <ThemeProvider theme={theme}>
      <Popup />
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
             
              <Container sx={{ maxWdith: '888px'}}>
              <Grid sx={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px', paddingBottom:'15px'}}>
                <ThemeProvider theme={fonttheme}>
                <Typography variant='subtitle1' component='h2'>
                    Заказы
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Card sx={{padding:'20px'}} style={{borderRadius: '10px'}}>
              <div>
      <button onClick={() => exportToExcel(dataXLS)}>Export to Excel</button>
    </div>
                <Box>
                    <Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} onChange={handleTabsChange} value={currentTab} aria-label='basic tabs example' indicatorColor='secondary'>
                      {tabs.map((tab) => (
                        
                        <Tab style={{ textTransform: 'none', padding: '20px' }} key={tab.value} label={`${tab.label} (${handleTotalCount(tab.value)})`} value={tab.value } />
                        
                      ))}
                    </Tabs>
                  </Box>
           
                  <Grid item  maxWidth='lg' style={{ paddingTop: '20px',display: 'flex', flexDirection: 'row', gap: '20px' }}>
                  <TextField
                size='small'
                className={classes.root}
                fullWidth
                value={searched}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button
                      variant='contained'
                      onClick={() => requestSearch(searched)}
                      style={{
                        borderRadius: '0',
                        borderStartEndRadius: '10px',
                        borderEndEndRadius: '10px',
                        color: 'white',
                        marginRight: "-11px",
                        border: 'none',
                        padding: '9px 32px',
                        backgroundColor: '#0EB378',
                        boxShadow: 'none'
                      }}
                      sx={{"&:hover": {backgroundColor: "transparent", borderColor:  "transparent"}}}
                    >
                      Искать
                    </Button>
                  ),
                }}
                placeholder={"Поиск"}
              />
                <Button
                aria-describedby={id}
                onClick={(e) => handleClick(e)}
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
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      <Box px={2} py={2} alignItems='center'>
        <Box>
          <Box display='flex'>
            <Box marginLeft="auto">
              <img src={Close} alt='logo' onClick={handleClose} />
            </Box>
          </Box>
          <Box display='flex' marginRight="auto">
            <Box >
              <Box>
              <FormControlLabel control={<Checkbox checked={checkedToday} onChange={handleChangeToday}/>} label={
                <Typography sx={{ fontSize: 16 }}>
                Только за сегодня
                </Typography>
              } />
              </Box>
              <Box>
              <FormControlLabel control={<Checkbox checked={checkedReturns} onChange={handleChangeReturns} />} label={
                <Typography sx={{ fontSize: 16 }}>
                Только возвраты
                </Typography>
              } />
              </Box>
              <Box>
              <FormControlLabel control={<Checkbox checked={checkedDates} onChange={handleChangeDates} />} label={
                <Typography sx={{ fontSize: 16 }}>
                По дате
                </Typography>
              } />
              </Box>
              <Box display='flex'>
              <Box sx={{ width: 140 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  
                >
                  <DatePicker
                  disabled={!checkedDates}
                    label="С"
                    value={chosenCheckedDateOne}
                    onChange={handleChangeDate1}
                    renderInput={(params: any) => <TextField size='small' {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{padding: "5px"}}>
                <Typography> - </Typography>
              </Box>
              <Box sx={{ width: 140 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="До"
                  disabled={!checkedDates}
                  value={chosenCheckedDateTwo}
                  onChange={handleChangeDate2}
                  renderInput={(params: any) => <TextField size='small' {...params} />}
                />
              </LocalizationProvider>
              </Box>
              </Box>
              <Box>
              <FormControlLabel control={<Checkbox checked={checkedTime} onChange={handleChangeTimes}/>} label={
                <Typography sx={{ fontSize: 16 }}>
                По времени
                </Typography>
              } />
              </Box>
              <Box display="flex">
                  <Box sx={{ width: 140 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    disabled={!checkedTime}
                    label="С"
                    value={chosenCheckedTimeOneOrig}
                    onChange={handleChangeTime1}
                    renderInput={(params) => <TextField size='small' {...params} />}
                  />
                </LocalizationProvider>
                  </Box>
                  <Box sx={{padding: "5px"}}>
                    <Typography> - </Typography>
                  </Box>
                    <Box sx={{ width: 140 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      disabled={!checkedTime}
                      label="До"
                      value={chosenCheckedTimeTwoOrig}
                      onChange={handleChangeTime2}
                      renderInput={(params) => <TextField size='small' {...params} />}
                    />
                  </LocalizationProvider>
                    </Box>
              </Box>
              
              <Box>
              <FormControlLabel control={<Checkbox checked={checkedTotal} onChange={handleChangeTotals}/>} label={
                <Typography sx={{ fontSize: 16 }}>
                По сумме заказа
                </Typography>
              } />
              </Box>
              <Box sx={{ width: 250 }} display="flex">
              <Slider
                getAriaLabel={() => 'Range'}
                value={valueTotal}
                max={50000}
                size="small"
                onChange={handleChangeTotal}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
              {}
            </Box>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box pl={3} pr={3} pb={3} pt={3}>
              <Button
                style={{
                  borderRadius: '5px',
                  padding: '15px',
                  textAlign: 'center',
                }}
                onClick={() => {
                  setSearchUrl(`https://thearcanaqr.tech/api/restaurants/orders/?`)
                  setCheckedDates(false)
                  setChosenCheckedDateOne("")
                  setChosenCheckedDateTwo("")
                  setChosenCheckedTimeOne("")
                  setChosenCheckedTimeTwo("")
                  setValueTotal([0, 5000])
                  setCheckedReturns(false)
                  setCheckedTable(false)
                  setCheckedTime(false)
                  setCheckedToday(false)
                  setCheckedTotal(false)
                  setCheckedDateSortDown(false)
                  setCheckedDateSortUp(false)
                  setCheckedTimeSortDown(false)
                  setCheckedTimeSortUp(false)
                  setCheckedTotalSortDown(false)
                  setCheckedTotalSortUp(false)
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
                  handleClose()
                  requestSearch(searched)
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
    <Button
                onClick={(e) => handleClick2(e)}
                variant='outlined'
                sx={{ width: '20%', borderColor: 'black', color: 'black', borderRadius: '10px', padding: '10px' }}
              >
                <Box display='flex' justifyContent='space-between' sx={{ width: ' 100%', lineHeight: '0' }}>
                  <Box>
                    <Typography style={{ fontSize: '12px' }} sx={{ textTransform: 'capitalize' }}>
                      По датe
                    </Typography>
                  </Box>
                  <Box>
                    <img src={SortDown} alt='sortdown' />
                  </Box>
                </Box>
              </Button>
              <Popover
                className={classes.root2}
                sx={{ top: '600px' }}
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: 50,
                  horizontal: -5,
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box px={2} py={2} display='flex'  alignItems='space-between'>
                  <Box>
                    <Box display='flex' justifyContent='right'>
                      <img src={Close} alt='logo' onClick={handleClose2} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', padding: "5px" }}>
                        <FormControlLabel
                                    control={<Checkbox 
                                      checked={checkedDateSortDown}
                                      onChange={(e) => {
                                        setCheckedDateSortDown(e.target.checked)
                                        setCheckedDateSortUp(false)
                                      }}
                                      />}
                                    sx={{ height: '30px' }} label="По дате: Сначала новые"/>
                        <img src={sortDown24} alt='Sort Down' />
                      </Box>
                      <Box sx={{ display: 'flex', padding: "5px" }}>
                        <FormControlLabel
                                    control={<Checkbox 
                                    checked={checkedDateSortUp}
                                    onChange={(e) => {
                                      setCheckedDateSortUp(e.target.checked)
                                      setCheckedDateSortDown(false)
                                    }}
                                    />}
                                    sx={{ height: '30px' }} label="По дате: Сначала старые"/>
                        <img src={sortUp24} alt='Sort Up' />
                      </Box>
                      <Box sx={{ display: 'flex', padding: "5px" }}>
                        <FormControlLabel
                                    control={<Checkbox 
                                    checked={checkedTimeSortDown}
                                    onChange={((e) => {
                                      setCheckedTimeSortDown(e.target.checked)
                                      setCheckedTimeSortUp(false)
                                      if(e.target.checked) {
                                        setSearchUrl(searchUrl + "ordering=+created_at&")
                                      } else {
                                        setSearchUrl(searchUrl.replace("ordering=+created_at&", ""))
                                      }
                                    })}
                                    />}
                                    sx={{ height: '30px' }} label="По времени: Сначала новые"/>
                        <img src={sortDown24} alt='Sort Down' />
                      </Box>
                      <Box sx={{ display: 'flex', padding: "5px"}}>
                        <FormControlLabel
                                    control={<Checkbox
                                    checked={checkedTimeSortUp}
                                    onChange={(e) => {
                                      setCheckedTimeSortUp(e.target.checked)
                                      setCheckedTimeSortDown(false)
                                      if(e.target.checked) {
                                        setSearchUrl(searchUrl + "ordering=-created_at&")
                                      } else {
                                        setSearchUrl(searchUrl.replace("ordering=-created_at&", ""))
                                      }
                                    }}
                                    />}
                                    sx={{ height: '30px' }} label="По времени: Сначала старые"/>
                        <img src={sortUp24} alt='Sort Up' />
                      </Box>
                      <Box sx={{ display: 'flex', padding: "5px" }}>
                        <FormControlLabel
                                    control={<Checkbox
                                    checked={checkedTotalSortDown}
                                    onChange={(e) => {
                                      setCheckedTotalSortDown(e.target.checked)
                                      setCheckedTotalSortUp(false)
                                      if (e.target.checked) {
                                        setSearchUrl(searchUrl + "ordering=+total_price&")
                                      } else {
                                        setSearchUrl(searchUrl.replace("ordering=+total_price&", ""))
                                      }
                                    }}
                                    />}
                                    sx={{ height: '30px' }} label="По возрастанию суммы"/>
                        <img src={sortDown24} alt='Sort Down' />
                      </Box>
                      <Box sx={{ display: 'flex', padding: "5px" }}>
                        <FormControlLabel
                                    control={<Checkbox
                                    checked={checkedTotalSortUp}
                                    onChange={(e) => {
                                      setCheckedTotalSortDown(false)
                                      setCheckedTotalSortUp(e.target.checked)
                                      if (e.target.checked) {
                                        setSearchUrl(searchUrl + "ordering=-total_price&")
                                      } else {
                                        setSearchUrl(searchUrl.replace("ordering=-total_price&", ""))
                                      }
                                    }}
                                    />}
                                    sx={{ height: '30px' }} label="По убыванию суммы"/>
                        <img src={sortUp24} alt='Sort Down' />
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Box pl={3} pr={3} pb={3} pt={3} sx={{ padding: '10px' }}>
                        <Button
                          onClick={() => {
                            handleClose2()
                            setCheckedDateSortDown(false)
                            setCheckedDateSortUp(false)
                            setCheckedTimeSortDown(false)
                            setSearchUrl(searchUrl.replace("ordering=-created_at&", ""))
                            setCheckedTimeSortUp(false)
                            setSearchUrl(searchUrl.replace("ordering=+created_at&", ""))
                            setCheckedTotalSortDown(false)
                            setSearchUrl(searchUrl.replace("ordering=-total_price&", ""))
                            setCheckedTotalSortUp(false)
                            setSearchUrl(searchUrl.replace("ordering=+total_price&", ""))
                          }}
                          style={{
                            borderRadius: '5px',
                            padding: '8px 35px',
                            textAlign: 'center',
                          }}
                          sx={{ padding: 0, border: '1px solid #0EB378', color: '#0EB378', textTransform: 'capitalize' }}
                          variant='outlined'
                        >
                          Очистить
                        </Button>
                      </Box>
                      <Box pr={3} pb={3} pt={3} sx={{ padding: '10px' }}>
                        <Button
                          variant='contained'
                          onClick={() => {
                            handleClose2()
                            requestSearch(searched)
                          }}
                          style={{
                            borderRadius: '5px',
                            color: 'white',
                            backgroundColor: '#0EB378',
                            border: 'none',
                            padding: '8px 30px',
                          }}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          Использовать
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Popover>


</Grid>

                  {isLoading && <LinearProgress sx={{backgroundColor: "#28bf3c"}}/>}
                  {restaurantItem === null ||  restaurantItem === 'null'? (
                     <><Table sx={{ minWidth: '650' }}>
                    <TableHead>
                      <TableRow>
                      <TableCell sx={{ textAlign: 'center' }}>#</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>ID заказа</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Время</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>ФИО клиента</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Сумма заказа</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Статус заказа</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Возврат</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Номер стола</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table><Grid display='flex' justifyContent='center' paddingTop='30px'>

                      <Typography sx={{ fontWeight: '400', fontSize: '16px', color: '#999999', textAlign: 'center' }} variant='caption'>
                        Нет Заказов
                      </Typography>
                    </Grid></>

         
): null}
          
                  
                  <TableContainer  >
                  <Grid display='flex' justifyContent={'space-between'} paddingTop='15px' paddingBottom='10px'>
                      <Button  variant='text' sx={{ "&:hover": { backgroundColor: 'transparent' }, shadows: 'none', color: '#666666' }} disableElevation disabled={!handleMutePrev()} onClick={() => goPrevious()}><Typography sx={{color: '#000000', fontSize: "16px", textTransform: 'none'}}>Предыдущая страница</Typography></Button>
                      {/* <Button variant='text' sx={{ "&:hover": { backgroundColor: 'transparent' }, shadows: 'none' }} disableElevation disabled={true}><Typography sx={{color: '#000000', fontSize: "16px", textTransform: 'none'}}>{`Общее количество: ${handleTotalCount()}`}</Typography></Button> */}
                      <Button variant='text' sx={{ "&:hover": { backgroundColor: 'transparent' }, shadows: 'none' }} disableElevation disabled={true}><Typography sx={{color: '#000000', fontSize: "16px", textTransform: 'none'}}>{`Страница ${handlePageNumber()}`}</Typography></Button>
                      {/* <Button variant='text' sx={{ "&:hover": { backgroundColor: 'transparent' }, shadows: 'none' }} disableElevation disabled={true}><Typography sx={{color: '#000000', fontSize: "16px", textTransform: 'none'}}>{`${handleTotalPrice()} тенге`}</Typography></Button> */}
                      <Button  variant='text' sx={{ "&:hover": { backgroundColor: 'transparent' }, shadows: 'none', color: '#666666' }} disableElevation disabled={!handleMuteNext()} onClick={() => goNext()}><Typography sx={{color: '#000000', fontSize: "16px", textTransform: 'none'}}>Следующая страница</Typography></Button>
                      <Typography> 
                      Общая сумма: {obj?.total_income} <span>{' ₸'}</span>  
    </Typography>
                    </Grid>
                  <>
                    {
                      Object.keys(resultCurrent)?.sort(function(a: any, b: any) {
                        const date1: any = new Date(a);
                        const date2: any = new Date(b);
                        if (checkedDateSortUp) {
                          return date1 - date2;
                        }
                        return date2 - date1; 
                      }).map((key: any, index: any) => {
                        return (
                          <>
                          <Typography
                          key={`text${key}`}
                        fontWeight={700}
                        fontSize={24}
                        sx={{marginTop: "10px"}}
                        >{`${handleDate(key)} (${resultCurrent[key].length})`}</Typography>
                        <Table key={key} sx={{ minWidth: 650 }}>
                      <TableHead key={`th${key}`}>
                        
                        <TableRow key={`tr${key}`} sx={{ paddingRight: '20px', paddingLeft: '20px'}}>
                        <TableCell sx={{ textAlign: 'center' }}>#</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>ID заказа</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Время</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>ФИО клиента</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Сумма заказа</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Статус заказа</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Возврат</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Номер стола</TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody  sx={{
                              '& .MuiTableRow-root:hover': {
                                backgroundColor: '#CFF0E4',
                              },
                            }}>
                        {resultCurrent[key].map((res: any, index: number) => (
                          <TableRow
                            key={res.id}
                       
               
                            style={{ textDecoration: 'none' }}
                            onClick={() => navigate(`${res.id}`, {
                              state: {
                                temp: 1,
                                id: res.id,
                                created_at: res.created_at,
                                table: res.table,
                                table_title: res.table_title,
                                first_name: res?.user?.first_name,
                                last_name: res?.user?.last_name,
                                order_status: res.order_status,
                                total_price: res.total_price,
                                size: res.orderitem_set.length,
                                orderitem_set: res.orderitem_set,
                              },
                            })}
                          >
                             <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{index+1}</TableCell> 
                              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{res.id?.toUpperCase()}</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{Array.from(format(new Date(res.created_at), 'h:mm'))}</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>
                                {res?.user?.first_name.charAt(0).toUpperCase() + res?.user?.first_name.slice(1).toLowerCase()}
                                {' '}
                                {res?.user?.last_name.charAt(0).toUpperCase() + res?.user?.last_name.slice(1).toLowerCase()}
                              </TableCell>
                              <TableCell sx={{ textAlign: 'center', color: '#666666' }}>{res.total_price}
                                {currency === 'рубль' ? (
                                  <span>{' ₽'}</span>
                                ) : (
                                  null
                                )}
                                {currency === 'тенге' ? (
                                  <span>{' ₸'}</span>
                                ) : (
                                  null
                                )}
                                {currency === 'доллар' ? (
                                  <span>{' $'}</span>
                                ) : (
                                  null
                                )}
                                {currency === 'eвро' ? (
                                  <span>{' €'}</span>
                                ) : (
                                  null
                                )}
                              </TableCell>


                              {res.order_status === 'PAYED' ? (
                                <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{'Новый заказ'}</TableCell>
                              ) : null}

                              {res.order_status === 'CANCELED' ? (
                                <TableCell sx={{ textAlign: 'center', color: '#E34833' }}>{'Отказан'}</TableCell>
                              ) : null}

                              {res.order_status === 'IN_PROCESS' ? (
                                <TableCell sx={{ textAlign: 'center', color: '#DBAB00' }}>{'В Процессе'}</TableCell>
                              ) : null}

                              {res.order_status === 'PARTIAL' ? (
                                <TableCell sx={{ textAlign: 'center', color: '#DBAB00' }}>{'PARTIAL?'}</TableCell>
                              ) : null}

                              {res.order_status === 'READY' ? (
                                <TableCell sx={{ textAlign: 'center', color: '#0EB378' }}>{'Завершен'}</TableCell>
                              ) : null}

                                <TableCell sx={{ textAlign: 'center' }}>{res.return_order_status}</TableCell>

                              <TableCell sx={{ textAlign: 'center' }}>{res.table_title}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table></>)
                      })
                    }</>
                  </TableContainer>
 
          
            </Card>
            </Container>
          </Box>
  </ThemeProvider>
  </>)
}


