import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha, Typography, createTheme, ThemeProvider, Paper, styled } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    backgroundColor: '#F2F6F5',
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
interface Props {
  handleDeleteClose: () => void
  openDelete: boolean
}
const StyledPaper = styled(Paper)`
  background-color: #f2f6f5; // <-- this works
`
export default function RegistrationPop({ openDelete, handleDeleteClose }: Props) {
  const classes = useStyles()
  return (
    <Dialog
      PaperComponent={StyledPaper}
      open={openDelete}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          maxWidth: '455px',
          minHeight: '230px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    >
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' id='alert-dialog-title'>
        Проверьте почту
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Container>
          <Grid container>
            <Grid item container xs={10} direction='column' justify-content='center'>
              <Grid item style={{ paddingBottom: '16px' }}>
                <ThemeProvider theme={fonttheme}>
                  <Typography variant='body2' align='center'>
                    На ваш электронный адрес направлено письмо для подтверждения
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid container style={{ marginLeft: '25px' }} justifyContent='center'>
                <Button
                  onClick={handleDeleteClose}
                  variant='outlined'
                  style={{
                    borderRadius: '5px',
                    borderColor: '#0EB378',
                    backgroundColor: '#0EB378',
                    color: 'white',
                    padding: '14px 54px',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Ок
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
