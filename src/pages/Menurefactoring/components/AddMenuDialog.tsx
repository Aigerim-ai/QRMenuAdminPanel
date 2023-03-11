import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { CardMedia, Grid } from '@material-ui/core'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import Select from '@mui/material/Select'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import { Card, CardActionArea, styled, Button, alpha, TextField, FormControl, InputLabel } from '@mui/material'
import { postPositionRequest } from 'src/tools/request'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { defaultimage, deletemenudefault } from '../../../assets/icons/index'

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
  select: {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#999999',
    },
  },
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      background: '#fff',
      fontWeight: 400,
      fontSize: 16,
      width: '351px',

      '&:hover fieldset': {
        borderColor: '#999999',
      },


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
      borderColor: '#999999',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #999999',
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
  restaurant: IRestaurantid
  price: string
  description: string
  category: string
  active: boolean
  created_at: string
  updated_at: string
}
interface IRestaurantid {
  id: number
}
interface IProduct {
  id: string
  name: string
  image: string
  desciption: string
  product_set: IMenu[]
}

interface ICategory {
  id: number,
  name: string,
  restaurant_name: string,
  image: string,
  description: string,
  restaurant: number,
  active: boolean

}

interface Props {
  openCategoryModal: boolean
  handleToggle: () => void 
  menuGetRequest: () => void
  getCategory: ()=> void
  categories: ICategory[]
}
interface IBasic {
  title: string,
  image: string,
  restaurant: number,
  price: number,
  description: string,
  category: string,
  active: boolean
}
interface ICategory {
  name: string,
  restaurant_name: string,
  image: string,
  description: string,
  restaurant: number,
  active: boolean

}
export default function AddMenuDialog({categories, getCategory,openCategoryModal, handleToggle, menuGetRequest}: Props) {
  const classes = useStyles()
  const [imageWarning, setImageWarning] = useState<string>("")
  const onSubmit: SubmitHandler<IBasic> = (data) => {
   
      postPosition(data)
      handleToggle()
      menuGetRequest()
      reset()
      setUrl("")
    
    
  }

  const [position, setPosition] = useState<
  | {
    title: string
    image: string
    restaurant: number
    price: number
    description: string
    category: string
    active: boolean
    }
  | null
  | undefined
>()
  const { setError,handleSubmit, control, register, formState, reset } = useForm<IBasic>({
    defaultValues: {
      title: position?.title,
      image: position?.image,
      restaurant: position?.restaurant,
      price: position?.price,
      description: position?.description,
      category: position?.category,
      active: position?.active
    },
    mode: 'onChange',
  })
  const [url, setUrl] = useState<any>(null)
  const [imagedata, setImagedata] = useState("")
  const [currentRestaurant, setCurrentRestaurant] = useState<any>(localStorage.getItem('userRestaurant'));
  const handleChangeImage = (e: any) => {
    setImagedata(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
    setImageWarning("")
  }
const handleImageError = (e: any) => {
  e.target.src = deletemenudefault
}
const postPosition = async (data: any) => {
  try {
    const response: any = await postPositionRequest({
      url: 'products/',
      body: {
        title: data.title,
        image: imagedata,
        restaurant: currentRestaurant,
        price: data.price,
        description: data.description,
        category: data.category,
        active: true
      },
    })
  }catch (error: any) {
    if(error.status === 400){
      setError('image', {
        type: "server",
        message: 'Пользователь с таким почтовым адресом уже существует',
      });
    }
  }
  menuGetRequest()
  }
const StyledDialog = styled(Dialog)`
.MuiBackdrop-root {
  background-color: rgba(0, 0, 0, 0.1);
}
.MuiPaper-root {
  box-shadow: none;
}
'& input:valid:focus + fieldset': {
  border: '1px solid #999999',
},
`;


React.useEffect(() => {
    getCategory()  
  }, []);
  return (
    <StyledDialog
    maxWidth='md'
    fullWidth 
    aria-labelledby="simple-dialog-title"
    open={openCategoryModal}
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
        Добавить позицию
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden', padding: '0px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid   container justifyContent='space-between' style={{ paddingLeft: '36px', paddingRight: '36px'}}>
              <Grid item container xs={6} direction='column' style={{height: '275px'}} justifyContent='space-between'>
                <Grid item>
                <Controller
                    control={control}
                    name='title'
                    render={({ field }) => (
                      <FormControl fullWidth variant='standard'>
                        <TextField
                          {...register('title', { required: true })}
                          style={{ fontSize: '16px',marginTop: '0px' }}
                          className={classes.root}
                          fullWidth
                          value={field.value}
                          size='small'
                          onChange={(e) => field.onChange(e)}
                          placeholder='Название позиции'
                          id='name-input'
                          helperText={field.value?.length === 0 ? "Название позиции не может быть пустым." : ""}
                          error ={field.value?.length > 0 ? false : true }
                          name='title'
                          type='text'
                        />
                      </FormControl>
                      )}
                />
                </Grid>
                <Grid item>
                <Controller
                    control={control}
                    name='category'
                    
                    render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel sx={{ bordeColor: '#999999', color: '#999999' }} htmlFor="demo-simple-select">Выберите категорию</InputLabel>
                    <Select
                      style={{ fontSize: '16px', borderRadius: '10px' }}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      // helperText={field.value?.length === 0 ? "Название позиции не может быть пустым." : ""}
                      error ={field.value ? false : true }
                      name='category'
                      value={field.value}
                      className={classes.root}
                      onChange={(e) => field.onChange(e)}
                    >
                        {categories.map((posts, index)=>(
                       <MenuItem key={index} value={posts.id}>{posts.name}</MenuItem>

                       ))}
                    </Select>
                  </FormControl>
                   )}
                   />
                </Grid>
                <Grid item>
                  <Controller
                    control={control}
                    name='description'
                    render={({ field }) => (
                      <FormControl fullWidth variant='standard'>
                        <TextField
                         style={{ fontSize: '16px' }}
                         size='small'
                         className={classes.root}
                         fullWidth
                         value={field.value}
                         placeholder='Введите описание'
                         id='name-input'
                          {...register('description')}
                          onChange={(e) => field.onChange(e)}
                          type='text'
                          name='description'
                        />
                      </FormControl>
                      )}
                />
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
                         value={field.value}
                         error ={field.value ? false : true }
                         placeholder={`Введите цену (в ${localStorage.getItem("currency")})`}
                         id='name-input'
                          {...register('price', { required: true })}
                          margin='normal'
                          onChange={(e) => field.onChange(e)}
                          type='number'
                          name='price'
                        />
                      </FormControl>
                      )}
                />
                </Grid>
              </Grid>
             
                        
              <Grid item container style={{width: '297px', border: '1px solid #CCCCCC', borderRadius: '10px'}}>
              <Controller
                      control={control}
                      {...register('image', { pattern:  {
                        value: /\.(jpg|jpeg|png|gif)$/,
                        message: 'Загрузите фотографию'
                        
                      },
                    })}
                    render={({ field }) => (
                <FormControl fullWidth variant='standard' >
                  <Grid item>
                  {url ?(
                     <CardMedia
                     style={{borderRadius: '10px', height: '270px', }}
                     component='img'
                     width='297px'
                     src={url ? url : deletemenudefault}
                     onError={handleImageError} 
                     
                   />
                  
                    ):(
                     
<CardAddAction  sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}} >    
                   <CardActionArea  sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}} >
                       <>
                         <Input
                           id='change-cover'
                           type='file'
                           style={{ margin: 8 }}
                           name='image'
                           onChange={handleChangeImage}
                           sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}}
                         />
                         
                         <label htmlFor='change-cover'>
                           <Button  sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}}  variant='text' style={{ border: 'none', boxShadow: 'none', textTransform: 'none', color: '#3EC293', fontSize: '14px'}} startIcon={<AddTwoToneIcon color='secondary' fontSize='small' />} component='span'>
                             Загрузить
                           </Button>
                         </label>
                       </>
                       </CardActionArea>
                 </CardAddAction>
                    )
                    }
                    
                  </Grid>
                </FormControl>
                 )}
                 />
              </Grid>
              <Grid item container xs={12}  justifyContent='space-between'>

                <Grid item xs={3}><p style={{color: "red", fontSize: "16px"}}>{imageWarning}</p></Grid>
                <Grid container  justifyContent='space-between' item xs={7} style={{paddingTop: '30px'}}>
                <Grid item>
                <Button
                    sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378' }}} 
                    onClick={handleToggle}
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
                   
                    type='submit'
                    variant='contained'
                    disableElevation
                    style={{
                      borderRadius: '5px',
                      color: 'white',
                      fontSize: '16px',
                      backgroundColor: '#0EB378',
                      border: 'none',
                      padding: '14px 35.5px',
                      width: '180px',
                      height: '49px'
                    }}
                  >
                    Добавить
                  </Button>
                </Grid>
                </Grid>

               
              </Grid>
            </Grid>
          </form>
      </DialogContent>
    </StyledDialog>
  )
}
