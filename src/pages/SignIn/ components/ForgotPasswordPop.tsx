import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha, Typography, createTheme, ThemeProvider, Paper, styled, FormControl, TextField, Divider } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Box, Container, textAlign } from '@mui/system'
import { newClose } from 'src/assets/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    position: 'absolute',
    top: theme.spacing(5),
    backgroundColor: '#F2F6F5',
  },
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
      color: '#333333',
      fontWeight: 400,
      fontSize: 16,
      width: 334,
      height: 50,

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
      '&:hover fieldset': {
        borderColor: '#999999',
      },
    },
    '&:focus': {
      boxShadow: `${alpha('#999999', 0.0)} 0 0 0 0.2rem`,
      borderColor: '#999999',
    },
    '& .MuiOutlinedInput-input': {
      padding: '13px 10px',
    },
    '&.Mui-focused': {
      borderColor: '#999999',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #999999',
    },
  },
}))
const fonttheme = createTheme({
  typography: {
    body2: {
      fontSize: 16,
      fontWeight: 400,
      color: '#333333', 
      width: '438px',
      textAlign: 'center'
    },
  },
})
interface Props {
  handleClose: () => void
  open: boolean
}

export default function ForgotPasswordPop({ open, handleClose }: Props) {
  const classes = useStyles()
  const [itemName, setItemName] = React.useState('')
  const changePassword = async () => {

    fetch(`https://thearcanaqr.tech/api/users/forgot-password/ 
    `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       
        email: itemName,
      }),
    })
      .then((res) => res.json())
      handleClose()
  }
  
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          width: '508px',
          height: '365px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    >
       <Box display='flex' justifyContent='flex-end'>
        <Button variant='text' sx={{border: 'none'}} onClick={handleClose}
        >
          <img src={newClose} alt='logo' />
        </Button>
        
      </Box>
      <DialogTitle sx={{padding: '0px'}} fontSize={24} fontWeight={700} textAlign='center' id='alert-dialog-title'>
        Забыли пароль?
      </DialogTitle>
      <Grid 
                  container
                  justifyContent="center"
                  style={{ paddingBottom: '15px'}}
                  alignItems="center"> <Divider  sx={{ height: '3px', width: '74px', background: '#0EB378' }} />
      </Grid>

      <Grid item justify-content='center' alignContent='center' style={{paddingBottom: '16px', paddingLeft: '40px', paddingRight: '40px' }}>
                <ThemeProvider theme={fonttheme}>
                  <Typography  align='center'>
                    Вы можете получить новый пароль по подтвержденному электронному адресу 
                  </Typography>
                </ThemeProvider>
        </Grid>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Container>
          <Grid container  direction='column' justify-content='center'>
                <Grid  item style={{paddingBottom: '15px',paddingLeft: '40px', paddingRight: '40px'}}>
                  <TextField   value={itemName}
                  onChange={(e) => setItemName(e.target.value)} placeholder='Введите почту' size='small' className={classes.root} fullWidth id='name-input' name='title' type='text' />
                </Grid>
                <Grid item style={{paddingBottom: '15px',paddingLeft: '40px', paddingRight: '40px'}}>
                <Button
                fullWidth
                  onClick={changePassword}
                  variant='outlined'
                  style={{
                    borderRadius: '5px',
                    borderColor: '#0EB378',
                    backgroundColor: '#0EB378',
                    color: 'white',
                    padding: '17px 54px',
                    fontSize: '20px',
                    fontWeight: '400',
                    
                  }}
                >
                  Получить пароль
                </Button>
                </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
