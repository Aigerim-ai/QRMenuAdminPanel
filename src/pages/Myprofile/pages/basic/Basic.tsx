import { TextField, Button, FormControl, InputLabel, alpha, ThemeProvider, Avatar, Typography, Grid, MenuItem, MenuListProps, CardActionArea,  Card, styled, CardMedia, ImageListItem, ImageList } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form'
import theme from 'src/pages/SignIn/theme/theme'
import { deleteLogoRequest, getMainInformationRequest, getMyProfileRequest, getRequest, postMainInformationRequest, postRequstImages, putRequestRestaurant } from 'src/tools/request'
import { createTheme } from '@mui/material/styles'
import styles from './basic.module.sass'
import { setRestaurant } from 'src/store/slices/userSlice'
import { useAppDispatch } from 'src/store'
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ArrowDropDown } from '@material-ui/icons';
import { Theme, useTheme } from '@mui/material/styles';
import id from 'date-fns/esm/locale/id/index.js'
import { DESTRUCTION } from 'dns'
import { blue, green } from '@mui/material/colors'
import { borderColor, fontSize} from '@mui/system'
import { Box, SvgIconTypeMap } from '@material-ui/core'
import { CommonProps } from '@material-ui/core/OverridableComponent'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { Navigate, useOutletContext } from 'react-router'
import { deleteIcon } from 'src/assets/icons'

const Input = styled('input')({
  display: 'none',
})

interface ICategory{
  id: any,
  name: any,
  image: any
}
interface IBasic {
  name: string
  address: string
  category: ICategory[]
  description: string
  image: string
  phone_number: string
  price: any
  rating: any
  state: any
  service_percent: number
  time_from: string
  time_before: string

}
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

const useStyles = makeStyles(() => ({
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px"
    }
  },
  paper: {
    overflowY: "scroll",
    height: "180px"
  },
  selected: {
    '&.Mui-selected': {
        backgroundColor: 'transparent',
    }
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
      padding: '15px 16.5px',
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
  MenuItem: {
    color: "#0EB378",
  },
  input: {
    color: '#333333 !important',
  },
  
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: '#CFF0E4'
    },
  },
};
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontSize: '14px'
  };
}

function Basic({ getMainInformation, handleValueChangeWatch,restaurantItem, setRestaurantItem,errorResponse, url, setUrl, personName, setPersonName, account, setAccount, handleCloseDeletePosition,currentTab, setProgress, popupCaller, progress, editStatus, setEditStatus, postRestaurantProfileState }: any) {
  
  const lg: string = useOutletContext();
  const theme = useTheme();
  const [personNameID, setPersonNameID] = React.useState<number[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    let current: number[] = [];

    categories.forEach(category => {
      if(value.indexOf(category.name) > -1){
        current = [...current, category.id]
      }
    })
    setPersonNameID(current)
  };
  const [imagedata, setImagedata] = useState(null)

  const [categories, setCategories] = useState<ICategory[]>([]);
  const dispatch = useAppDispatch()

  const classes = useStyles()
  const [price, setPrice] = useState(() => {
    if (account?.price) {
      return account.price;
    }

    return 'Cумма в тг';
  });
  const [service, setService] = useState(() => {
    if (account?.service_percent) {
      return account.service_percent;
    }

    return 'Процент %';
  });
  const [address, setAddress] = useState(() => {
    if (account?.address) {
      return account.address;
    }

    return 'Напишите адрес';
  });
  const [description, setDescription] = useState(() => {
    if (account?.description) {
      return account.description;
    }
    return 'Напишите какое-то описание. Например, какая кухня или как тут вкусно и красиво.';
  });
  const [ name, setName]  = useState(() => {
    if (account?.name) {
      return account.name;
    }
    return 'Напишите название';
  });

  const [ time_from, setTimeFrom]  = useState(() => {
    if (account?.time_from) {
      return account.time_from;
    }
    return '9:00';
  });

  const [ time_before, setTimeBefore]  = useState(() => {
    if (account?.time_before) {
      return account.time_before;
    }
    return '6:00';
  });

  const { handleSubmit, control, register, formState, watch } = useForm<IBasic>({
    defaultValues: {
      phone_number: account?.phone_number,
      address: account?.address,
      image: account?.image,
      price: account?.price,
      rating: 4,
      service_percent: account?.service_percent,
      time_from: account?.time_from,
      time_before: account?.time_before
    },

    mode: 'onChange',
  })
  const togglestatus = () => {
    setEditStatus(false);
  }
  const [position, setPosition] = useState();
  const [ CategoryNames,setCategoryNames] = useState<any>();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const getRestaurantCategories = async () => {
    try {
      const response: any = await getRequest({
        url: 'restaurants/category/',
      })
      setCategories(response)
      setCategoryNames(response.name)
    } catch (error) {
      setAccount(null)
    }
  }

  const deleteLogo = async () =>{
    try {
      await deleteLogoRequest({
        url: 'restaurants/admin/logo',
      })
      getMainInformation()
    } catch (error) {
      console.log(error)
    }
  }
  const [profile, setProfile] = useState<
  | {
      organization_name: string
      BIN: string
      bank_name: string
      BIK: string
      IBAN: string
      kbe: string
      currency: string
    }
  | null
  | undefined
>()
  const getMyProfile = async () => {
    try {
      const response: any = await getMyProfileRequest({
        url: 'users/me/',
      })
      
      setProfile((prevState) => ({
        ...prevState,
        organization_name: response.organization_name,
        BIN: response.BIN,
        bank_name: response.bank_name,
        BIK: response.BIK,
        IBAN: response.IBAN,
        kbe: response.kbe,
        currency: response.currency,
      }))
      setPosition(response.position)
    } catch (error) {
      setProfile(null)
      console.log(error)
    }
  }
  const editMainInformationStatus = () => {
    setEditStatus(true);
  }
  const handleClose = () => {
    setAnchorEl(null);
};
  const onSubmit: SubmitHandler<IBasic> = (data) => {
  
    
    getMyProfile()
    getMainInformation()
    popupCaller();

    if(editStatus === true){

      editMainInformationFunction(data)
      postRestaurantImages(images)
      setEditStatus(false)

    }else{
      setEditStatus(false)
      postMainInformationFunction(data)
     
      postRestaurantImages(images)
    
      errorResponse.current = true
    }
  
  
  }

  const postMainInformationFunction = async (data: any) => {
    try {
      const response: any = await postMainInformationRequest({
        url: 'restaurants/',
        body: {
          name: data.name,
          address: data.address,
          description: data.description,
          category: personNameID,
          image: imagedata,
          phone_number: data.phone_number,
          price: data.price,
          rating: data.rating,
          service_percent: data.service_percent,
          state: 45,
          time_from: data.time_from,
          time_before: data.time_before,
          weeks: days
        },
      }).then(()=>{
        getMainInformation()
      }).then(()=>{
        if(position === null && profile?.bank_name === null){
          postRestaurantProfileState(45)
        }else if(position === null || profile?.bank_name === null){
          postRestaurantProfileState(70)
        }else{
          postRestaurantProfileState(100)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const editMainInformationFunction = async (data: any) => {
    try {
      const response: any = await putRequestRestaurant({
        url: 'restaurants/admin/',
        body: {
          name: data.name,
          address: data.address,
          description: data.description,
          category: personNameID,
          image: imagedata,//imagedata,
          phone_number: data.phone_number,
          price: data.price,
          rating: data.rating,
          service_percent: data.service_percent,
          time_from: data.time_from,
          time_before: data.time_before,
          state: 45,
          weeks: days
        },
      })
      getMainInformation()
    } catch (error) {
      console.log(error)
    }
  }
  const fonttheme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 32,
        fontWeight: 700,
      },
      body2: {
        fontSize: 16,
        color: 'rgba(102, 102, 102, 1)',
      },
    },
  })
  const handleChangeImage = (e: any) => {
    setImagedata(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }


  useEffect(() => {

    getRestaurantCategories()
  }, [])


//images 
const [images, setImages] = useState<any[]>([]);
const [sendImages, setImagesSend] = useState<any[]>([])

const handleImageSelect = (event: any ) => {
  if (!event.target.files) return;

  const selectedImages = Array.from(event.target.files);
  setImages([...images, ...selectedImages]);

  const selectedImagesSend = Array.from(event.target.files[0]);
  setImagesSend([...sendImages, ...selectedImagesSend]);
 
};
// дни
const [days, setDays] = useState<any[]>([]);

const handleDaysSelect = (day: any) => {
  console.log(day)

  console.log(days)

  setDays(prevDays=>[...prevDays, day]);
 
};

function handleImageSelectDelete(index: any) {
  setImages(images => {
    const updatedImages = [...images];
    updatedImages[index].selected = true;
    return updatedImages;
  });
}



function handleDeleteSelectedImages() {
  setImages(images => images.filter(image => !image.selected));
}


const postRestaurantImages = async (sendImages: any[]) => {
  try {
    const response: any = await postRequstImages({
      url: 'restaurants/admin/logo/',
      body: sendImages,
    })

  } catch (error) {
    console.log(error)
  }
}
//delete image



function  handleDeleteImage(id: any ){
  deleteImageRequest(id);
}
const deleteImageRequest = async (id: any)=>{ 
  try {
     await deleteLogoRequest({
      url: `restaurants/${id}/image/`,
    })
    getMainInformation()
   
  } catch (error) {
    console.log(error)
  }
}
const renderImages = () => {
  return <>
  {images.map((image, index) => (
    <Grid key={index}>
      {!image.selected && (
        <ImageListItem>
          <CardMedia
            style={{ borderRadius: '10px', height: '117px', width: '121px' }}
            component='img'
            width='121px'
            image={URL.createObjectURL(image)}
            alt={`Image ${index}`}
          />
          <span
            onClick={() => handleImageSelectDelete(index)}
            style={{ position: 'absolute', top: '-7px', right: '15px', cursor: 'pointer' }}
          >
            <img src={deleteIcon} />
          </span>
        </ImageListItem>
      )}
    </Grid>
  ))}

</>

};



/*
watch
*/


const watchedValue = watch("name"); 
const watchedValue2 = watch("address")
const watchedValue3 = watch("description")
const watchedValue8 = watch("image")
const watchedValue4 = watch("phone_number")
const watchedValue5 = watch("category")
const watchedValue6 = watch("price")
const watchedValue7 = watch("service_percent")



useEffect(() => {
  handleValueChangeWatch(watchedValue, watchedValue2, watchedValue3, watchedValue8,watchedValue4, watchedValue5, watchedValue6, watchedValue7); // call the parent component's function with the watched value
}, [watchedValue, watchedValue2, watchedValue3, watchedValue8, watchedValue4, watchedValue6, watchedValue7]);

  return (
    <Box style={{paddingLeft: '77px', paddingRight: '77px', paddingBottom: '77px'}}>
      {((errorResponse.current === true  || editStatus === true) && (
        <>
          <Grid container display={"flex"} flexDirection={'row'} alignItems ={'center'} xs={6}  style={{ paddingTop: '20px', paddingBottom: '10px'}} >
              <Grid item xs={3}>
              <Avatar src={url} sx={{ backgroundColor:'white', width: '90px', height: '90px', border: '1px solid #999999' }}>
              <Typography style={{ color:'#999999', fontSize: '10px', fontWeight: '400', paddingLeft: '20px'}}>Логотип не загружен</Typography>
            </Avatar>
              </Grid>
              <Grid item xs={2} style={{paddingLeft: '10px'}}>
            <input  type='file' onChange={handleChangeImage} id='icon-button' style={{ display: 'none' }} />
            <Grid>
            <label htmlFor='icon-button'>
              <Button variant='text' component='span' className={styles.imageButton} style={{fontSize: '14px', fontWeight: 400, border: 'none', textTransform: 'none'}}>
                Загрузить
              </Button>
            </label>
            </Grid>
            <Grid>
            <label>
            {(url && (
              <Button variant='text' onClick={deleteLogo} component='span'   sx={{ textTransform: 'capitalize', border: 'none', fontSize: '14px', fontWeight: 400}}>
                Удалить 
              </Button>
            ))|| null}
            </label>
            </Grid>
            </Grid>

          </Grid>
          
             
          <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
          <Grid container xs={12} display={"flex"} justifyContent={'space-between'} gap={'10px'}>
            <Grid item xs={12}>
             <InputLabel sx={{ color: 'black' }}><Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>Название заведения:</Typography></InputLabel>
            <Controller
              control={control}
              name='name'
           
              defaultValue={account?.name}
              render={({ field }) => (
                <FormControl fullWidth variant='standard' >
                 
                  <TextField
                    {...register('name', { required: true })}
                    size='small'
                    margin='normal'
                    className={classes.root}
                    fullWidth
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    style={{fontSize: '14px', fontWeight: '400'}}
                    classes={{ root: classes.customTextField }}
                    placeholder={name}
                  />
                </FormControl>
              )}
            />
</Grid>
<Grid item xs={12}>
              <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
              <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>Описание заведения:</Typography> 
                      </InputLabel>
                <Controller
                  control={control}
                  name='description'
                  defaultValue={account?.description}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                      <TextField
                        {...register('description', { required: true })}
                        size='small'
                        margin='normal'
                        classes={{ root: classes.customTextField }}
                        className={classes.root}
                        fullWidth
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        placeholder={description}
                      />
                    </FormControl>
                  )}
                />
             
   </Grid>
   <Grid item xs={12}>
                 <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                 <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>Адрес заведения:</Typography>  
                      </InputLabel>
                <Controller
                  control={control}
                  name='address'
                  defaultValue={account?.address}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                     
                      <TextField
                        {...register('address', { required: true })}
                        size='small'
                        margin='normal'
                        classes={{ root: classes.customTextField }}
                        className={classes.root}
                        fullWidth
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        placeholder={address}
                      />
                    </FormControl>
                  )}
                />
         </Grid>
         <Grid item xs={12}>
              <InputLabel sx={{ color: 'black' }}  id="demo-controlled-open-select-label">
              <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}> Выберите категорию (макс. 4):</Typography>  
              </InputLabel>
            <FormControl fullWidth variant='standard'>  
            {personName.length === 0 &&  <InputLabel style={{ paddingLeft: '15px', color:"#999999", fontWeight: 400, fontSize: "14px"}} id="demo-controlled-open-select-label">Выберите</InputLabel>       }   
              <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              multiple
              label="Выберите"
              value={personName}
              style={{borderRadius: '10px', fontSize: '14px', fontWeight: 400}}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={{
                sx: {
                  "&& .Mui-selected": {
                    backgroundColor: "transparent",
                    "&: focused": {
                      borderColor: "transparent"
                    }
                  },
                },
                classes: {
                  paper: classes.paper
                }
              }}
             
             
            >
          {categories?.map((item: any) => (
            
            <MenuItem
              key={item.name}
              value={item.name}
              selected 
              
              className={classes.root}
              style={getStyles(item.name, personName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
         
        </Select>
      </FormControl>
          
      </Grid>
         <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                 <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>График работы:</Typography>  
                      </InputLabel>
         <Grid item xs={12} container display={'flex'}  flexDirection={'row'} alignContent='center'>
          <Grid item xs={3} container  alignItems={'center'} >
          <Grid item xs={1}>
            <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>c </Typography></Grid>
            <Grid item xs={2}>


            <Controller
                  control={control}
                  name='time_from'
                  defaultValue={account?.time_from}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                  <TextField
                     {...register('time_from', { required: true })}
                          id="time"
                          type="time"
                          classes={{ root: classes.customTextField }}
                          className={classes.root}
                        
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          sx={{ width:110 }}
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          placeholder={time_from}
                        />
                    </FormControl>
                  )}
                />





      </Grid>
      </Grid>
      <Grid item xs={3} container  alignItems={'center'} gap={'20px'}>
        <Grid item xs={1}><Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>до </Typography></Grid>
        <Grid item xs={2}>
        <Controller
                  control={control}
                  name='time_before'
                  defaultValue={account?.time_before}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                  <TextField
                     {...register('time_before', { required: true })}
                          id="time"
                          type="time"
                          classes={{ root: classes.customTextField }}
                          className={classes.root}
                        
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          sx={{ width:110 }}
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          placeholder={time_before}
                        />
                    </FormControl>
                  )}
                />
      </Grid>
      </Grid>
      <Grid item xs={5} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}  paddingTop={'10px'}>
        <Grid item><Button onClick={()=>handleDaysSelect("Monday")}sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}}  style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Пн</Typography></Button></Grid>
        <Grid><Button onClick={()=>handleDaysSelect("Tuesday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Вт</Typography></Button></Grid>
        <Grid><Button  onClick={()=>handleDaysSelect("Wednesday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Ср</Typography></Button></Grid>
        <Grid><Button  onClick={()=>handleDaysSelect("Thursday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Чт</Typography></Button></Grid>
        <Grid><Button  onClick={()=>handleDaysSelect("Friday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Пт</Typography></Button></Grid>
        <Grid><Button  onClick={()=>handleDaysSelect("Saturday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Сб</Typography></Button></Grid>
        <Grid><Button onClick={()=>handleDaysSelect("Sunday")} sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#0EB378 !important', color: '#0EB378 ' }, borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400'}}>Вс</Typography></Button></Grid>

      </Grid>
         </Grid>
         <Grid item  container xs={6} display={'flex'} gap={'53px'}>
            <Grid item xs={4}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                 <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>    Средний чек:</Typography> 
                      </InputLabel>
                <Controller
                  control={control}
                  name='price'
                  defaultValue={account?.price}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                     
                      <TextField
                        {...register('price', { required: true })}
                        size='small'
                        margin='normal'
                        className={classes.root}
                        classes={{ root: classes.customTextField }}
                        fullWidth
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        placeholder={price.toString()}
                      />
                    </FormControl>
                  )}
                />
             
            </Grid>
            <Grid item xs={4}>
                 <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                 <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}> Обслуживание:</Typography>  
                      </InputLabel>
                <Controller
                  control={control}
                  name='service_percent'
                  defaultValue={account?.service_percent}
                  render={({ field }) => (
                    <FormControl fullWidth variant='standard'>
                      <TextField
                        {...register('service_percent', { required: true })}
                        size='small'
                        margin='normal'
                        className={classes.root}
                        classes={{ root: classes.customTextField }}
                        fullWidth
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        placeholder={service.toString()}
                      />
                    </FormControl>
                  )}
                />
    
       
    </Grid>
             </Grid>
             <Grid  xs={12} >

        
               
                      <Grid item container xs={12}  style={{overflow: 'hidden'}} >
     
    <Typography style={{display:'inline',fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                              Фотографии заведения:   
                          </Typography>
                          <ImageList  sx={{ width: 800, paddingTop: '10px' }}  cols={5} rowHeight={117}>
                         
  {account?.restaurantimage_set?.map((image: any, index: any) => (

    <><Grid key={index}>
      {!image.selected && (
        <ImageListItem>
          <CardMedia
            style={{ borderRadius: '10px', height: '117px', width: '121px' }}
            component='img'
            width='121px'
            image={image.image} 
            alt={`Image ${index}`} />
          <span
            onClick={() => {handleDeleteImage(image.id)}}
            style={{ position: 'absolute', top: '-7px', right: '15px', cursor: 'pointer' }}
          >
            <img src={deleteIcon} />
          </span>
        </ImageListItem>
      )}
    </Grid>
    </>
  ))}
  {renderImages()} 
  <Input
                           id='change-cover'
                           type='file'
                           style={{ margin: 8 }}
                           name='image'
                           multiple onChange={handleImageSelect}
                           sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}}
                         />
                         

                         

  
          <span


          >
               <label htmlFor='change-cover'>
                           <Button  sx={{"&:hover": {backgroundColor: "#FFFFFF", borderColor: '#DC1A00' }}}  variant='outlined' style={{  border: '1px solid #CCCCCC', boxShadow: 'none', textTransform: 'none', color: '#3EC293', fontSize: '14px',  height: '117px', width: '121px'}} startIcon={<AddTwoToneIcon color='secondary' fontSize='small' />} component='span'>
                             Загрузить
                           </Button>
                         </label>
          </span>
</ImageList>        
           
              </Grid>
             </Grid>
          
             { editStatus === true ? (
          <ThemeProvider theme={theme}>
          <Button
            color='success'
            disabled={!formState.isValid}
            type='submit'
            onClick={()=>togglestatus()
            }
            variant='outlined'
            sx={{  color: '#0EB378',fontSize: '20px', fontWeight: '500', marginTop: 2, width: '351px', backgroundColor: 'white', height: '64px', border: '1px solid #0EB378',"&:hover": { backgroundColor: "transparent", borderColor: "#0EB378" } }}
          >
            Отменить
          </Button>
        </ThemeProvider>

        ): 
        null}
          
            <ThemeProvider theme={theme}>
              <Button
                color='success'
                disabled={!formState.isValid}
                type='submit'
                variant='contained'
                sx={{  color: 'white',fontSize: '20px', fontWeight: '500', marginTop: 2, width: '351px', backgroundColor: '#0EB378', height: '64px', border: 'none',"&:hover": { backgroundColor: "#0EB378", borderColor: "#0EB378" } }}
              >
                Сохранить
              </Button>
            </ThemeProvider>
  

        
          </Grid>
          </form>
          
        </>
      )) ||
        ((errorResponse.current === false && editStatus  === false) && (
          <ThemeProvider theme={fonttheme}>
              <Grid>
                  <Grid container display={"flex"}  justifyContent={'space-between'} flexDirection={'row'} alignItems ={'center'} xs={12}  style={{ paddingTop: '20px', paddingBottom: '10px'}}>

                      <Grid container alignItems='center' item xs={6}>
                            <Grid item xs={3}>
                             <Avatar src={account?.image} sx={{ backgroundColor:'white', width: '90px', height: '90px', border: '1px solid #999999' }}>
                                <Typography style={{ color:'#999999', fontSize: '10px', fontWeight: '400', paddingLeft: '20px'}}>Логотип не загружен</Typography>
                            </Avatar>
                             </Grid>
                            <Grid item xs={2} style={{paddingLeft: '20px'}}>
                            <Typography style={{fontSize: '24px', fontWeight: 700}}>
                            {account?.name}
                            </Typography>
                            </Grid>
                      </Grid>

                      <Grid item xs={2}> 
                          <ThemeProvider theme={theme}>           
                           <Button
                            onClick={editMainInformationStatus}
                             color='success'
                             type='submit'
                             variant='outlined'
                             sx={{ marginTop: 2, width: '138px', fontSize: '16px', height: '49px', color: '#0EB378', borderColor: '#0EB378' }}
                           >
                             Редактировать
                           </Button>
                         </ThemeProvider>
                      </Grid>

                    </Grid>
              </Grid>


            <Grid item container justifyContent='space-between' alignContent='center'>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={8}>
                    <Typography style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Описание заведения:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {account?.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Адрес заведения:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {account?.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Категории:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Box display="flex" flexWrap="wrap">
                  {account?.category.map((one: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }, inx: any)=>(
                     <Typography  sx={{ mr: 1 }} style={{display:'inline', fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                        <span>{one.name}{','}    </span>                  
                    </Typography>
               
                  ))}
                   </Box>
                     </Grid>
                </Grid>
                <Grid item xs={8} style={{paddingTop: '20px'}}>
                  <Typography style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      График работы:
                    </Typography>
                  </Grid>
         <Grid item xs={12} container display={'flex'}  flexDirection={'row'} alignContent='center'>
          <Grid item xs={3} container  alignItems={'center'} >
          <Grid item xs={1}>
            <Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>c </Typography></Grid>
            <Grid item xs={2}>
         <TextField
        id="time"
        type="time"
        classes={{ root: classes.customTextField }}
        className={classes.root}
        defaultValue="07:30"
        value={account?.time_from}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width:110 }}
      />
      </Grid>
      </Grid>
      <Grid item xs={3} container  alignItems={'center'} gap={'20px'}>
        <Grid item xs={1}><Typography style={{fontSize: '14px', fontWeight: 400, color: '#333333'}}>до </Typography></Grid>
        <Grid item xs={2}>
         <TextField
        id="time"
        type="time"
        classes={{ root: classes.customTextField }}
        className={classes.root}
        defaultValue="07:30"
        value={account?.time_before}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 110  }}
      />
      </Grid>
      </Grid>
      <Grid item xs={5} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}  paddingTop={'10px'}>
        <Grid item><Button sx={{ borderColor: '1px solid #0EB378',borderRadius: '50%'}}  style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #0EB378', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#0EB378'}}>Пн</Typography></Button></Grid>
        <Grid><Button sx={{ borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333' }}>Вт</Typography></Button></Grid>
        <Grid><Button sx={{ borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333'}}>Ср</Typography></Button></Grid>
        <Grid><Button sx={{borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333'}}>Чт</Typography></Button></Grid>
        <Grid><Button sx={{borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333'}}>Пт</Typography></Button></Grid>
        <Grid><Button sx={{ borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333'}}>Сб</Typography></Button></Grid>
        <Grid><Button sx={{borderRadius: '50%'}} style={{maxWidth:'43px', minWidth:'43px', height: '44px', padding: '0px', borderRadius: '10px', border: '0.5px solid #333333', margin: '0px'}}><Typography style={{ textTransform: 'none',fontSize: '14px', fontWeight: '400', color: '#333333'}}>Вс</Typography></Button></Grid>

      </Grid>
         </Grid>
                <Grid container xs={12}  sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                  <Grid item xs={12} container>
                      <Grid item xs={4}>
                          <Typography style={{display:'inline',fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                              Средний чек:   <Typography style={{display:'inline',fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                              {account?.price}{ ' тг'}
                          </Typography>
                          </Typography>
                      </Grid>
                      <Grid item >
                         <Typography style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                             Обслуживание:  <Typography style={{display:'inline', fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                             {account?.service_percent}{ ' %'}
                         </Typography>
                         </Typography>
                      </Grid>
                      
                   </Grid>
                 </Grid>
             
            </Grid>
            <Grid>
            <Grid item container xs={12}  style={{overflow: 'hidden'}}>
                          <Typography style={{display:'inline',fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                              Фотографии заведения:   
                          </Typography>
                          <ImageList  sx={{ width: 800, gap: '20px' }}  cols={5} rowHeight={117}>
  {account?.restaurantimage_set.map((image: any, index: any) => (
    <ImageListItem key={index}>
       <CardMedia       style={{borderRadius: '10px', height: '117px', width: '121px'}}
                     component='img'
                     width='121px'  image={image.image} alt={`Image ${index}`}  
       
  
  
          />
    </ImageListItem>
  ))}
</ImageList>
                </Grid>
            </Grid>
          </ThemeProvider>
        ))}

    </Box>
  )
}

export default Basic
