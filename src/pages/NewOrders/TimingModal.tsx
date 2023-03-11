import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Card, styled, Button, alpha, TextField, FormControl, Typography, Box, createTheme, ThemeProvider, Divider } from '@mui/material'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from 'src/assets/icons'
import { FullReturnOrderRequest, postTimerRequest } from 'src/tools/request'

interface Props {
  handleCloseTimer: () => void
  openTimer: boolean
  style: any
  value: any
  currentRowClear: () => void;
  secondTime: any
}
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    top: theme.spacing(2),
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        '&+.MuiDialogContent-root': {
          paddingTop: '20px !important',
        },
      },
    },
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
    '& input:valid:focus + fieldset': {
      border: '1px solid #CCCCCC',
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

export default function TimingModal({
    handleCloseTimer,
  openTimer,
  style,
  value,
  currentRowClear,
  secondTime,
}: Props) {
  const classes = useStyles();
  const [time, setTime] = React.useState();

  const postTimer = async (time: any) => {
    setTime(time);
    try {
      const response: any = await postTimerRequest({
        url: `restaurants/new_orders/${value?.id}/time/${time}/`,
      })
    } catch (error) {
      console.log(error)
    }
    handleCloseTimer()
    currentRowClear()
  }

  return (
    <Dialog
      open={openTimer}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          maxWidth: '563px',
          minHeight: '202px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    >
      <Box display='flex' justifyContent='flex-end'>
        <img src={Close} alt='logo' onClick={handleCloseTimer} />
      </Box>
      <Grid>
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' alignContent='center' id='alert-dialog-title'>
      {secondTime === false ? "Выберите время приготовления": "Добавить время" }
      <Grid>
      <Divider sx={{bgcolor: '#0EB378', width: '74px',height: '3px', position: 'center', marginLeft: '190px'}}orientation="horizontal" variant="middle" flexItem />
      </Grid>
      </DialogTitle>
      </Grid>
      <Grid style={{ overflow: 'hidden', padding: 'none' }}>
        <Container>
          <Grid container>
            <Grid item container direction='column'>
              <Grid container justifyContent='space-between' style={{paddingBottom:'25px'}}>
            <Grid>
              <Button
                onClick={()=>postTimer(0)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                0
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(2)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                2
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(5)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                5
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(10)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                10
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(15)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                15
              </Button>
              </Grid>
              </Grid>
              <Grid container justifyContent='space-between' >
              <Grid>
              <Button
                onClick={()=>postTimer(30)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  borderColor: '#0EB378',
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                30
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(45)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  borderColor: '#0EB378',
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                45
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(60)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  borderColor: '#0EB378',
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                60
              </Button>
              </Grid>
              <Grid>
              <Button
               onClick={()=>postTimer(75)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}} 
                style={{
                  borderColor: '#0EB378',
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                75
              </Button>
              </Grid>
              <Grid>
              <Button
                onClick={()=>postTimer(90)}
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important' }, borderRadius: '50%'}}  
                style={{
                  borderColor: '#0EB378',
                  color: '#333333',
                  width: '73px',
                  height: '74px',
                  border: '3px solid #CFF0E4',
                }}
              >
                90
              </Button>
              </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Dialog>
  )
}

