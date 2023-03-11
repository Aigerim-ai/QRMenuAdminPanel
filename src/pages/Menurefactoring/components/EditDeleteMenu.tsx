import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { CardMedia, Grid } from '@material-ui/core'
import Select from '@mui/material/Select'
import { useState } from 'react'
import { defaultimage, deletemenudefault } from '../../../assets/icons/index'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import { Card, Tooltip, CardActionArea, styled, Button, alpha, TextField, FormControl, InputLabel } from '@mui/material'
import { deleteRequest, getRequest, putPositionRequest } from 'src/tools/request'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { resetWarningCache } from 'prop-types'
import { current } from '@reduxjs/toolkit'
import DeletePositionModal from './DeletePositionModal'

const Input = styled('input')({
  display: 'none',
})
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
   },
  dialogTitle: {
    paddingRight: '100px',
    fontWeight: 700,
    fontSize: '24px'
  },
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
      fontWeight: 400,
      fontSize: 16,
      width: '351px',


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
  description: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
      fontWeight: 400,
      fontSize: 16,
      width: '351px',
      height: '100px',


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
    '&.Mui-focused': {
      borderColor: '#fff',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid black',
    },
  }
}))

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: 'secondary' solid 1px;
        height: 100%;
        color: '#0EB378';
        transition: ${theme.transitions.create(['all'])};

        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
zzz
        .MuiTouchRipple-root {
          opacity: .2;
        }

        &:hover {
          border-color: '#0EB378';
        }
`
)
interface IMenu {
  id: string
  title: string
  image: string
  restaurant: number
  price: string
  description: string
  category: string
  active: boolean
  created_at: string
  updated_at: string
}

interface IProduct {
  id: string
  name: string
  image: string
  desciption: string
  product_set: IMenu[]
}
interface Props {
  handleCloseEditPosition: () => void,
  openPosition: boolean,
  currentMenu: IMenu | undefined,
  menuGetRequest: () => void
}
interface IBasic {
  title: string,
  image: any,
  restaurant: number,
  price: string,
  description: string,
  category: any,
  active: boolean
}
interface ICategory {
  id: number
  name: string,
  restaurant_name: string,
  image: string,
  description: string,
  restaurant: number,
  active: boolean

}
export default function EditMenu({handleCloseEditPosition, openPosition, currentMenu, menuGetRequest}: Props) {
  
  const [title, setTitle] = useState<any>()
  const [desrciption, setDescription] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [image, setImage] = useState<any>()

  const [url, setUrl] = useState<any>()
React.useEffect(()=>{
setTitle(currentMenu?.title)
setDescription(currentMenu?.description)

},[currentMenu])
  const [position, setPosition] = useState<
  | {
    title: string
    image: string
    restaurant: number
    price: string
    description: string
    category: string
    active: boolean
    }
  | null
  | undefined
>(currentMenu)
const [currentRestaurant, setCurrentRestaurant] = useState<any>(localStorage.getItem('userRestaurant'));
  const { handleSubmit, control, register, formState ,reset} = useForm<IBasic>({
    defaultValues: {
      title: position?.title,
      restaurant: currentRestaurant,
      price: position?.price,
      description: position?.description,
      category: position?.category,
      active: position?.active
    },
    mode: 'onChange',
  })
  const [imagedata, setImagedata] = useState<any>(null)
  const classes = useStyles()

  const handleChangeImage = (e: any) => {
    setImagedata(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }


  const onSubmit: SubmitHandler<IBasic> = (data) => {
    editPosition(data)
    handleCloseEditPosition()
  }
  const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.1);
   
  }
  .MuiPaper-root {
    box-shadow: none;
  }
  
  `;

  const editPosition = async (data: any) => {
    let file: any;
    try {
      if (typeof imagedata === "string") {
        const res: any = await fetch(imagedata).then(function (response) {
          if (response.ok) {
              return response.blob();
          }
      })
      file = new File([res], 'imageNotAvailable.png', {type: res.type});
    }
      const body: any = (imagedata) ? {
        title: data.title,
        image: (file) ? file : imagedata,
        price: data.price,
        restaurant: currentRestaurant,
        description: data.description,
        category: data.category,
        active: true
      } : {
        title: data.title,
        price: data.price,
        restaurant: currentRestaurant,
        description: data.description,
        category: data.category,
        active: true
      }

      await putPositionRequest({
        url: 'products/',
        body: body,
        id:  currentMenu?.id
      })
      menuGetRequest()
    } catch (error) {
      console.log(error)
    }
  }
  function remove(){
    const urll: string = deletemenudefault
    setUrl(urll)
    setImagedata(urll)
  }


  const [categories, setCategories] = useState<ICategory[]>([]);
  const getCategory =  async () => {
    try {
      const response: any = await getRequest({
        url: `restaurants/admin/get_categories/`,
      }).then((res)=>{
        setCategories(res)
      })
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    if(currentRestaurant && currentRestaurant!== 'null'){
      getCategory()
    }
    }, []);
    React.useEffect(() => {
       reset(currentMenu)
      }, [currentMenu]);

      const [openDelete, setOpenDelete] = React.useState<boolean>(false)
      const handleCloseDeletePosition = () => setOpenDelete((openDelete: any) => !openDelete)

  return (
    <><DeletePositionModal menuGetRequest={menuGetRequest} currentMenu={currentMenu}handleCloseDeletePosition={handleCloseDeletePosition} openDelete={openDelete}/>
    <StyledDialog
      maxWidth='md'
      fullWidth
      onClose={handleCloseEditPosition}
      aria-labelledby="simple-dialog-title"
      open={openPosition}
      PaperProps={{
        style: {
          borderRadius: '15px',
          backgroundColor: "none",
          boxShadow: "none",
          width: '739px',
          height: '503px'
        },
      }}
    >

      <DialogTitle textAlign='center' id='alert-dialog-title' className={classes.dialogTitle}>
        Редактировать позицию
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden', padding: '0px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent='space-between' style={{ paddingLeft: '36px', paddingRight: '36px' }}>
            <Grid item container xs={6} direction='column' style={{ maxHeight: '275px' }} justifyContent='space-between'>
              <Grid item>
                <Controller
                  control={control}
                  name='title'

                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                      <TextField
                        defaultValue={currentMenu?.title}
                        {...register('title', { required: true })}
                        style={{ fontSize: '16px', marginTop: '0px' }}
                        className={classes.root}
                        fullWidth
                        size='small'
                        value={field.value}

                        onChange={(e) => field.onChange(e)}
                        placeholder='Название позиции'
                        id='name-input'
                        type='text' />
                    </FormControl>
                  )} />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name='category'
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        style={{ fontSize: '16px', borderRadius: '10px' }}
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        defaultValue={currentMenu?.category}
                        {...register('category', { required: true })}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        name='category'
                      >
                        {categories.map((posts, index) => (
                          <MenuItem value={posts.id}>{posts.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )} />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                      <TextField
                        style={{ fontSize: '16px' }}
                        className={classes.description}
                        fullWidth
                        defaultValue={currentMenu?.description}
                        placeholder='Введите описание'
                        id='name-input'
                        {...register('description', { required: false })}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        type='text'
                        name='description' />
                    </FormControl>
                  )} />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name='price'
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                      <TextField
                        style={{ fontSize: '16px', marginTop: '0px' }}
                        size='small'
                        className={classes.root}
                        fullWidth
                        defaultValue={currentMenu?.price}
                        placeholder='Введите цену'
                        id='name-input'
                        {...register('price', { required: true })}
                        value={field.value}
                        margin='normal'
                        onChange={(e) => field.onChange(e)}
                        type='text'
                        name='price' />
                    </FormControl>
                  )} />
              </Grid>
            </Grid>
            <CardAddAction>
              <CardActionArea>
                <Grid item container style={{ width: '297px' }}>
                  <Grid item>
                    <CardMedia
                      style={{ borderRadius: '10px', height: '270px' }}
                      component='img'
                      alt='Contemplative Reptile'
                      width='297px'
                      title='Contemplative Reptile'
                      src={url || currentMenu?.image || defaultimage} />
                    <Grid container justifyContent='space-between' style={{ marginBottom: '6px' }}>
                      <Grid item>
                        <Button onClick={remove} variant='text' style={{ border: 'none', boxShadow: 'none', textTransform: 'none', color: '#DC1A00', fontSize: '12px' }}>Убрать</Button>
                      </Grid>
                      <Grid item>
                        <>
                          <Input
                            id='change-cover'
                            type='file'
                            style={{ margin: 8 }}
                            name='image'
                            onChange={handleChangeImage} />
                          <label htmlFor='change-cover'>
                            <Button variant='text' style={{ border: 'none', boxShadow: 'none', textTransform: 'none', color: '#3EC293', fontSize: '12px' }} component='span'>Изменить</Button>
                          </label>
                        </>

                      </Grid>
                    </Grid>


                  </Grid>
                </Grid>
              </CardActionArea>
            </CardAddAction>
            <Grid style={{ paddingTop: '30px' }} container xs={12} direction='row' justifyContent='space-between'>
              <Grid item xs={4}>
                <Button
                  variant='outlined'
                  sx={{ "&:hover": { backgroundColor: "#FFFFFF", borderColor: '#DC1A00' } }}
                  onClick={()=>{handleCloseEditPosition(); handleCloseDeletePosition()}}
                  style={{
                    borderRadius: '5px',
                    color: '#DC1A00',
                    padding: '9px 50px',
                    borderColor: '#DC1A00',
                    width: '180px',
                    height: '49px'
                  }}
                >
                  Удалить
                </Button>
              </Grid>
              <Grid item container xs={8} spacing={2} direction='row' justifyContent='space-between'>
                <Grid item style={{ paddingLeft: '40px' }}>
                  <Button
                    sx={{ "&:hover": { backgroundColor: "#FFFFFF", borderColor: '#0EB378' } }}
                    onClick={handleCloseEditPosition}
                    style={{
                      borderRadius: 5,
                      padding: '14px 35.5px',
                      color: '#0EB378',
                      borderColor: '#0EB378',
                      width: '180px',
                      height: '49px'
                    }}
                    variant='outlined'
                  >
                    Отменить
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    type='submit'
                    variant='contained'
                    style={{
                      borderRadius: '5px',
                      color: 'white',
                      backgroundColor: '#0EB378',
                      border: 'none',
                      padding: '14px 35.5px',
                      width: '180px',
                      height: '49px'
                    }}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </StyledDialog></>
  )
}
