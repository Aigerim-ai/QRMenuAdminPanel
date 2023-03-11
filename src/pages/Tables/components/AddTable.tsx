import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Card, styled, Button, alpha, TextField, FormControl, Typography, Box, createTheme, ThemeProvider } from '@mui/material'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from 'src/assets/icons'

interface Props {
  handleCloseTable: () => void
  openTable: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  url: string
  GenerateQRCode: () => void
  qr: string
  removeImage: () => void
  postTableRequest: () => void
  style: any
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
    'label + &': {
      marginTop: theme.spacing(4),
      fontWeight: 400,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#FFFFFF',
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
      '&:hover fieldset': {
        borderColor: '#999999',
      },
    },
    '&:focus': {
      boxShadow: `${alpha('#999999', 0.0)} 0 0 0 0.2rem`,
      borderColor: '#999999',
    },
    '*.Mui-focused': {
      borderColor: '#999999',
      outline:'none',
    },
    '& .MuiOutlinedInput-input': {
      padding: '13px 10px',
    },
    '&.Mui-focused': {
      borderColor: '#999999',
    },
    '&.MuiTextField-root': {
      marginTop: '6px',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #999999',
    },

    '& .MuiInputLabel-root': {
      fontWeight: 400,
      fontSize: '16px',
      color: '#999999 !important',
    },
  },
  input: {
    color: '#333333 !important',
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

export default function AddTable({
  handleCloseTable,
  openTable,
  handleChange,
  url,
  GenerateQRCode,
  qr,
  removeImage,
  postTableRequest,
  style,
}: Props) {
  const classes = useStyles()
  return (
    <Dialog
      open={openTable}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
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
        <img src={Close} alt='logo' onClick={handleCloseTable} />
      </Box>
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' id='alert-dialog-title' className={classes.dialogTitle}>
        Добавить стол
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
                    name='title'
                    type='text'
                    onChange={handleChange}
                    placeholder='Введите название стола'
                    value={url}
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
                value={url}
                type='submit'
                variant='contained'
                disableElevation
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
                onClick={postTableRequest}
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
/*
onClick={() => removeImage()}
*/
