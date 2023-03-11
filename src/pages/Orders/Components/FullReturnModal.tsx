import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, alpha, Typography, Box, createTheme, ThemeProvider } from '@mui/material'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from 'src/assets/icons'
import { useNavigate } from 'react-router-dom'

interface Props {
  value: string
  buttonClickfunction: () => void
  handleCloseReturn: () => void
  openReturn: boolean
  style: any
  rowid: string
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

export default function ReturnModal({
  buttonClickfunction,
  handleCloseReturn,
  openReturn,
  value,
}: Props) {
  const classes = useStyles();
  React.useEffect(() => {

  }, [value]); 
  const navigate = useNavigate();
  return (
    <Dialog
      open={openReturn}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          maxWidth: '463px',
          minHeight: '235px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    >
      <Box display='flex' justifyContent='flex-end'>
        <img src={Close} alt='logo' onClick={handleCloseReturn} />
      </Box>
      <Grid alignContent='center'>
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' alignContent='center' id='alert-dialog-title'>
        Подтверждение
      </DialogTitle>
      </Grid>
      <Grid style={{ overflow: 'hidden', padding: 'none' }}>
        <Container>
          <Grid container>
            <Grid item container xs={12} direction='column' style={{ paddingLeft: '20px', paddingRight: '20px' }} justify-content='center'>
              <Grid item style={{ paddingBottom: '20px' }}>
                <ThemeProvider theme={fonttheme}>
                  <Typography variant='body2' align='center'>
                  {value}
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid container justifyContent='space-between' >
              <Grid xs={6}>
              <Button
                onClick={handleCloseReturn}
                variant='outlined'
                sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378' }}} 
                style={{
                  borderRadius: '5px',
                  borderColor: '#0EB378',
                  color: '#0EB378',
                  padding: '14px 35.5px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Отменить
              </Button>
              </Grid>
              <Grid xs={6}>
              <Button
              onClick={()=>{buttonClickfunction; navigate(-1)}}
                type='submit'
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
                }}
              >
                Подтвердить
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
