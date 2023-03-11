import * as React from 'react';
import Box from '@mui/material/Box';
import {  makeStyles } from '@material-ui/core/styles'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { alpha, Button, Grid, TextField } from '@mui/material';
import { postCategory } from 'src/tools/request';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  dialogTitle: {
    paddingRight: '100px',
  },
  root: {

    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
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
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 473,
  height: 251,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '15px', 
  p: 4,
};
interface Props {
    openCategoryModal2: boolean
    handleToggleCategory: () => void
    getCategory: () => void
    menuGetRequest: () => void
}
export default function AddCategoryDialog({ menuGetRequest,openCategoryModal2, handleToggleCategory, getCategory }: Props) {
  const classes = useStyles()
  const [categoryName, setCategoryName] = React.useState<string|undefined>();
  const addCategory = async (categoryName: string | undefined) => {
    try {
      await postCategory({
        url: 'categories/',
        body: categoryName,
      }).then(()=>{
        getCategory()
        menuGetRequest()
        handleToggleCategory()
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Modal
        open={openCategoryModal2}
        onClose={handleToggleCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{display: 'flex',  justifyContent: 'center', fontWeight: '700', fontSize: '24px'}} id="modal-modal-title" variant="h6" component="h2">
           Добавить категорию
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
                size='small'
                className={classes.root}
                fullWidth
                id='name-input'
                placeholder='Введите категорию'
                type='text'
                onChange={(e) => {
                  setCategoryName(e.target.value)
                }}
              />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid item container style={{ paddingTop: '15px' }}>
            <Grid item xs={6}>
              <Button
               onClick={handleToggleCategory}
                style={{
                  borderRadius: '6px',
                  padding: '11px 50px',
                  textTransform: 'none',
                  color: '#DC1A00',
                  borderColor: '#DC1A00',
                }}
                variant='outlined'
              >
                Отмена
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
               onClick={()=>addCategory(categoryName)}
                variant='contained'
                disableElevation
                style={{
                  borderRadius: '5px',
                  color: 'white',
                  backgroundColor: '#0EB378',
                  textTransform: 'none',
                  padding: '9px 50px',
                }}
              >
                Cохранить
              </Button>
            </Grid>
          </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}