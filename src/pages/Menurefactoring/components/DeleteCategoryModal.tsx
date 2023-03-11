import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha, Typography, createTheme, ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/system'
import { makeStyles } from '@material-ui/core/styles'
import { deleteCategoryRequest, deleteRequest, deleteRequestTable, getRequest, postTable } from 'src/tools/request'

interface ITable {
  id: number
  title: string
  urlName: string
  is_active: boolean
  restaurant: number
}
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
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
  handleCloseDeletePosition: () => void
  openDelete: boolean
  currentIDCategory: any
  getCategory: ()=> void
}
export default function DeleteCategoryModal({  handleCloseDeletePosition,
  openDelete,
  currentIDCategory,
  getCategory,}: Props) {
  const classes = useStyles()

  const deleteCategory = async () => {
    try {
      await deleteCategoryRequest({
        url: 'categories/',
        id: currentIDCategory,
      }).then(()=>{
        getCategory()
      })
    } catch (error) {
      console.log(error)
    }
    handleCloseDeletePosition()

  }
  return (
    <Dialog
      open={openDelete}
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          maxWidth: '500px',
          minHeight: '230px',
          borderRadius: '10px',
        },
      }}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth
    >
      <DialogTitle fontSize={24} fontWeight={700} textAlign='center' id='alert-dialog-title'>
        Подтверждение
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Container>
          <Grid container>
            <Grid item container xs={10} direction='column' justify-content='center'>
              <Grid item style={{ paddingBottom: '16px' }}>
                <ThemeProvider theme={fonttheme}>
                  <Typography variant='body2' align='center'>
                    Вы действительно хотите удалить категорию? При удалении категории все позиции в меню также будут удалены в данной категории.
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid container style={{ marginLeft: '25px' }} justifyContent='space-between'>
                <Button
                  variant='outlined'
                  onClick={deleteCategory}
                  style={{
                    borderRadius: '5px',
                    color: '#DC1A00',
                    borderColor: '#DC1A00',
                    padding: '14px 35.5px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Удалить
                </Button>
                <Button
                  onClick={handleCloseDeletePosition}
                  variant='outlined'
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
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
