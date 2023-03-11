import { createTheme } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import { Typography, ThemeProvider, Table, CardHeader, FormControl, TextField, InputAdornment } from '@mui/material'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import { Button, TableContainer, TableCell, Checkbox, TableBody, TableRow, makeStyles } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { getRequest, getSearchRequest, postTable } from 'src/tools/request'
import { GreenDwnld } from '../../assets/icons/index'
import { RedTrash } from '../../assets/icons/index'
import { Edit } from '../../assets/icons/index'
import { DeleteIcon } from '../../assets/icons/index'
import TableHeadContainer from './components/TableHeader'
import QRButton from './components/OpenQrButtonPopup'
import AddTable from './components/AddTable'
import EditTable from './components/EditTable'
import DeleteTable from './components/DeleteTable'
import Empty from './components/EmptyTableList'
import SearchIcon from '@mui/icons-material/Search'
import theme from './theme/theme'
import boopSfx from 'src/pages/NewOrders/mixkit-arcade-score-interface-217.mp3'
import { useOutletContext } from 'react-router'

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


interface ITable {
  id: number
  title: string
  urlName: string
  is_active: boolean
  restaurant: number
}
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPopover-paper': {
      borderRadius: 15,
      border: '1px solid #CCCCCC',
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
      fontSize: 16,
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
    },
  },
}))

export default function Tables() {
  const lg: string = useOutletContext();
  const mdTheme = createTheme()
  const [tableItemForEdit, setTableItemForEdit] = useState<null | ITable>(null)
  const [search, setSearch] = useState<any>();
  const [openTable, setOpenTable] =  useState(false)
  const handleOpenTable = () => setOpenTable(true)
  const handleCloseTable = () => setOpenTable(false)
  const [url, setUrl] = useState('') //url
  const [qr, setQr] = useState('')
  const [counter, setCount] = useState(0)
  const [tablelist, setTableList] = useState<ITable[]>([])
  const [title, setTableName] = useState('') 
  const [currentRestaurant, setCurrentRestaurant] = React.useState(localStorage.getItem('userRestaurant'));


  const classes = useStyles()
  const postTableRequest = async () => {
    try {
      const response: any = await postTable({
        url: 'tables/',
        body: {
          title,
          restaurant: currentRestaurant,
        },
      }).then(()=>{
         fetchData()
      })
    } catch (error) {
      console.log(error)
    }
    setQr('')
    setUrl('')
    handleCloseTable()
    setCount(counter + 1)
   
  }

  const fetchData = async () => {
    try {
      const response: any = await getRequest({
        url: 'restaurants/admin/table/',
      })
      setTableList(response)
     
    } catch (error) {
      console.log(error)
    }
    
  }
  const [ isAllSelected, setIsAllSelected] = useState(false)
  const [isChecked, setIsChecked] = useState(() =>
      tablelist.map((i) => false)
  );

  if(currentRestaurant &&  currentRestaurant != 'null'){
    React.useEffect(() => {
      fetchData()
    }, [isChecked])
  }
  
  const isCheckboxChecked = (index: any, checked: any) => {
    isChecked[index] = checked;
    setIsChecked([...isChecked]);
  };

  const handleSearchQuery = async (search : any) => {
    try {
      const response: any = await getSearchRequest({
        url: 'tables/',
        keyword: search,
      })
      setTableList(response.filter((item: any) => {
        return item.restaurant === Number(currentRestaurant)
      }))
    } catch (error) {
      console.log(error)
    }
  }
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 900,
        color: {
          dark: '#000000',
          light: '#EEEEEEFF',
        },
      },
      (err: any, url: any) => {
        if (err) return
        setQr(url)
      }
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    GenerateQRCode()
    setTableName(e.target.value)
  }

  const removeImage = () => {
    setQr('')
    setUrl('')
  }

const [is_active, setActivate] = useState(true)
const tablelistcopy= useRef(tablelist);
  const [currentTable, setCurrentTable] = useState<ITable | undefined>();
  const [currentTables, setCurrentTables] = useState<any[]>([]);
  const [openPosition, setOpenPostion] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  function handleOpenEditPosition(curr: ITable){
    setCurrentTable(curr)
    setOpenPostion((openPosition: any) => !openPosition)
}
function handleOpenDeletePosition(curr: ITable){
  setCurrentTable(curr)
  setOpenDelete((openDelete: any) => !openDelete)
}

function handleOpenDeletePositions(){
  currentTables.forEach(async (curr: any) => {
    try {
      await postTable({
        url: `restaurants/admin/table/${curr?.id}/delete/`,
        body: {

        },
      }).then(()=>{
        fetchData()
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const handleCloseEditPosition = () => setOpenPostion((openPosition: any) => !openPosition)
const handleCloseDeletePosition = () => setOpenDelete((openDelete: any) => !openDelete)
  return (
          <Box
            // component='main'
            sx={{
              backgroundColor: (k) => (k.palette.mode === 'light' ? '#F2F6F5' : '#F2F6F5'),
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
                  <Container   sx={{ maxWdith: '688px'}} >
             <Grid sx={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px', paddingBottom:'15px'}}>
                <ThemeProvider theme={fonttheme}>
                <Typography variant='subtitle1' component='h2'>
                    Столы заведения
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Card  sx={{padding:'20px'}} style={{borderRadius: '10px'}}>
              <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
                <Grid item xs={12}>

                    <CardHeader
                      action={
                        <Box p={2} minWidth={'1150px'}>
                          <FormControl fullWidth variant='outlined'>
                            <Grid container style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                              <Grid item xs={8}>
                              <TextField
      size='small'
      className={classes.root}
      fullWidth
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <Button onClick={()=>handleSearchQuery(search)}>
            <SearchIcon />
            </Button>
          
          </InputAdornment>
        ),
      }}
      placeholder='Поиск...'
    />
                              </Grid>
                      
                              <Grid item >
                                <Button
                                 disabled={!currentRestaurant}
                                  onClick={handleOpenTable}
                                  style={{
                                    border: '1px solid #0EB378',
                                    borderRadius: 5,
                                    minWidth: '200px',
                                    textTransform: 'none',
                                    color: '#0EB378',
                                  }}
                                  variant='outlined'
                                >
                                  Добавить
                                </Button>
                              </Grid>
                              <AddTable
                                handleCloseTable={handleCloseTable}
                                openTable={openTable}
                                handleChange={handleChange}
                                url={url}
                                GenerateQRCode={GenerateQRCode}
                                qr={qr}
                                removeImage={removeImage}
                                postTableRequest={postTableRequest}
                                style={style}
                              />
                            </Grid>
                            <Grid>
                              {is_active ? (
                                <>
                                  <Button variant='text' style={{ color: '#999999', textTransform: 'none' }} >
                                    Выбрано
                                  </Button>
                                  <Button onClick={() => {
                                    if (currentTables) {
                                      handleOpenDeletePositions()
                                    }
                                  }} style={{ color: '#DC1A00', textTransform: 'none' }} variant='text'>
                                    <img src={RedTrash} alt='red' />
                                    Удалить
                                  </Button>
                                  <Button style={{ color: '#0EB378', textTransform: 'none' }} variant='text' >
                                    {' '}
                                    <img src={GreenDwnld} alt='green' />
                                    Скачать
                                  </Button>
                                </>
                              ) : null}
                            </Grid>
                          </FormControl>
                        </Box>
                      }
                    />
                    <TableContainer>
                      <Table sx={{
    "& .MuiTableRow-root:hover": {
      backgroundColor: '#CFF0E4'
    }
  }}>
                        <TableHeadContainer  isSelect={isAllSelected} setIsSelect={setIsAllSelected} setIsCheckedChild={setIsChecked} tableList={tablelist} isCheckedChild={isChecked}/>
                        {tablelist.length === 0 ? (
                          <Empty />
                        ) : (
                          <TableBody>
                            {tablelist?.map((row: any, index: any) => (
                              <TableRow hover key={row?.id}>
                                <TableCell padding='checkbox' style={{ paddingLeft: '40px' }}>
                                  <Checkbox color='primary' checked={isChecked[index]} onChange={(e) => {
                                                      isCheckboxChecked(index, e.target.checked); setCurrentTables([...currentTables, row])}}  name={row.title}/>
                                </TableCell>
                                <TableCell align='right'>
                                  {' '}
                                  <Typography variant='body2' color='#666666' fontWeight={400} gutterBottom noWrap>
                                    {index + 1}
                                  </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                  {' '}
                                  <Typography variant='body2' color='#666666' fontWeight={400} gutterBottom noWrap>
                                    {row?.title}
                                  </Typography>
                                </TableCell>
                                <TableCell align='right'>
                                  <QRButton table={row} />
                                </TableCell>
                                <TableCell align='right'>
                                  <Button onClick={() => handleOpenEditPosition(row)} variant='text'>
                                    <img src={Edit} alt='edit' />
                                  </Button>
                                  <EditTable handleCloseEditPosition={handleCloseEditPosition} row={currentTable} openPosition={openPosition} fetchData={fetchData}/>
                                  <Button onClick={() => handleOpenDeletePosition(row)}>
                                    <img src={DeleteIcon} alt='del' />
                                  </Button>
                                  <DeleteTable
                                    row={currentTable}
                                    openDelete={openDelete}
                                    handleCloseDeletePosition={handleCloseDeletePosition}
                                    fetchData={fetchData}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
             
                  
                </Grid>
              </Grid> 
            </Card>
            </Container>
          </Box>
      
  )
}
