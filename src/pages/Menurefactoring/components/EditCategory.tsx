import * as React from 'react';
import Box from '@mui/material/Box';
import {  makeStyles } from '@material-ui/core/styles'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { alpha, Button, Grid, TextField } from '@mui/material';
import { deleteCategoryRequest, putRequest } from 'src/tools/request';
import DeleteCategoryModal from './DeleteCategoryModal';
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

export default function BasicModal({openEditCategory, handleCloseEditCategory,  currentIDCategory, currentCategory, getCategory}: any) {
  const [currentRestaurant, setCurrentRestaurant] = React.useState<any>(localStorage.getItem('userRestaurant'));
  const classes = useStyles()
  const [newname, setNewname] = React.useState<string|undefined>();

  const updateCategory = async () => {
    try {
      await putRequest({
        url: 'categories/',
        id: currentIDCategory,
        body: newname,
      }).then(()=>{
        getCategory()
      })
    } catch (error) {
      console.log(error)
    }
    handleCloseEditCategory()

  }

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
    handleCloseEditCategory()

  }
  const [openDelete, setOpenDelete] = React.useState<boolean>(false)
  const handleCloseDeletePosition = () => setOpenDelete((openDelete: any) => !openDelete)
  

  
  return (
    <div>
      <DeleteCategoryModal currentIDCategory={currentIDCategory} getCategory={getCategory} handleCloseDeletePosition={handleCloseDeletePosition} openDelete={openDelete}/>
      <Modal
        open={openEditCategory}
        onClose={handleCloseEditCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{display: 'flex',  justifyContent: 'center', fontWeight: '700', fontSize: '24px'}} id="modal-modal-title" variant="h6" component="h2">
          Редактировать категорию 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
                size='small'
                className={classes.root}
                fullWidth
                id='name-input'
                type='text'
                defaultValue={currentCategory}
                onChange={(e) => {
                  setNewname(e.target.value)
                }}
              />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid item container style={{ paddingTop: '15px' }}>
            <Grid item xs={6}>
              <Button
              onClick={()=>{handleCloseDeletePosition(); handleCloseEditCategory()}}
                style={{
                  borderRadius: '6px',
                  padding: '11px 50px',
                  textTransform: 'none',
                  color: '#DC1A00',
                  borderColor: '#DC1A00',
                }}
                variant='outlined'
              >
                Удалить
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
              onClick={updateCategory}
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