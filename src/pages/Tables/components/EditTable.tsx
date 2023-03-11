import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Card, styled, Button, alpha, TextField, FormControl, Typography, Box, createTheme, ThemeProvider } from '@mui/material'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from 'src/assets/icons'
import QRCode from 'qrcode'
import { getRequest, postTable, putTableRequest } from 'src/tools/request'
import { useState } from 'react'

interface ITable {
  title: string
  urlName: string
  id: number
  is_active: boolean
  restaurant: number
}

interface Props {
  row: any
  handleCloseEditPosition: () => any
  openPosition: any,
  fetchData: ()=>void
}

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '100px',
  },
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
      color: '#CCCCCC',
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
    '&:focus': {
      boxShadow: `${alpha('#000000', 0.0)} 0 0 0 0.2rem`,
      borderColor: '#ccccc',
    },
    '& .MuiOutlinedInput-input': {
      padding: '13px 10px',
    },
    '&.Mui-focused': {
      borderColor: '#fff',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid black',
    },
  },
}))
const fonttheme = createTheme({
  typography: {
    body2: {
      fontSize: 16,
      fontWeight: 400,
      color: '#333333',
    },
  },
})

export default function EditTable({
  handleCloseEditPosition,
  openPosition,
  row,
  fetchData,
}: Props) {
  const [url, setUrl] = useState('') //url
  const classes = useStyles()
  const [tablename, setTableName] = React.useState<any>();
  const [qr, setQr] = useState('')
  const [tablelist, setTableList] = React.useState<ITable[]>([])
  

  const EditTableRequest = async (event: { preventDefault: () => void }) => {
    try {
      await postTable({
        url: `restaurants/admin/table/${row.id}/update/`,
        body: {
          title: tablename
        }
      }).then(() => {
        fetchData()
      })
     
    } catch (error) {
      console.log(error)
    }
   
    handleCloseEditPosition()

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


  return (
    <Dialog
    open={openPosition}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
      PaperProps={{
        sx: {
          maxWidth: '463px',
          minHeight: '326px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    > 
      <Box display='flex' justifyContent='flex-end'>
        <Button
        onClick={handleCloseEditPosition}
        >
          <img src={Close} alt='logo' />
        </Button>
        
      </Box>
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' id='alert-dialog-title' className={classes.dialogTitle}>
        Редактировать
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item container xs={12} direction='column'>
              <Grid item>
                <FormControl fullWidth variant='standard'>
                  <TextField
                    size='small'
                    className={classes.root}
                    fullWidth
                    id='name-input'
                    type='text'
                    defaultValue={row?.title}
                    placeholder='Введите название стола'
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container xs={12} direction='column' style={{ paddingLeft: '20px', paddingRight: '20px' }} justify-content='center'>
              <Grid item style={{ paddingBottom: '16px' }}>
                <ThemeProvider theme={fonttheme}>
                  <Typography variant='body2' align='center'>
                    QR код будет автоматически сгенерирован после сохранения
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Button
                type='submit'
                variant='contained'
                onClick={EditTableRequest}
                style={{
                  borderRadius: '5px',
                  color: 'white',
                  backgroundColor: '#0EB378',
                  border: 'none',
                  padding: '17px 32px',
                  textTransform: 'none',
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
