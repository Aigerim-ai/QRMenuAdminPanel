import { TextField, Button, FormControl, InputLabel, alpha, ThemeProvider, Avatar, Typography, Grid, Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import theme from 'src/pages/SignIn/theme/theme'
import { deleteLogoRequest, getMainInformationRequest, getMyProfileRequest, postSetState, putProfileRequest } from 'src/tools/request'
import { createTheme } from '@mui/material/styles'
import styles from '../basic/basic.module.sass'
import ChangePassword from '../../components/Modal'
import { useOutletContext } from 'react-router'

interface IAccount {
  id: string
  first_name: string
  position: string
  phone_number: string
  IIN: string
  email: string
  password: string
  image: string
  currency: string
}
interface ICategory{
  id: any,
  name: any,
}
const useStyles = makeStyles(() => ({
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
  input: {
    color: '#333333 !important',
  },
}))

function Account({setImagedata, imagedata, handleChangeImage, accountData, setAccountData,profile, setProfile, urlAccount, setUrlAccount,getMyProfile, handleValueChangeWatchAccount, currentTab, setProgress, popupCaller, editStatus, setEditStatus, postRestaurantProfileState }: any) {
  
  const lg: string = useOutletContext();
  const classes = useStyles()
  const [restaurant, setRestaurant] = useState(localStorage.getItem('userRestaurant'))
  const { handleSubmit, control, register, watch } = useForm<IAccount>({ mode: 'onChange' })
  const { errors } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<IAccount> = (data) => {
    getMyProfile()
    getMainInformation()
    setEditStatus(false)
    updateMyProfile(data)
    if (data.IIN.length === 12) {
      popupCaller();
      updateMyProfile(data)
    }
  }
  


  const [accountadmin, setAccountadmin] = useState<
  | {
      name: string
      address: string
      description: string
      image: string
      phone_number: string
      category: ICategory[]
    }
  | null
  | undefined
>()
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

  const deleteLogo = async () =>{
    try {
      await deleteLogoRequest({
        url: 'users/delete-avatar/',
      })
    } catch (error) {

    }
  }
  const updateMyProfile = async (data: any) => {
    try {
      const res: any = await putProfileRequest({
        url: 'users/me/',
        body: {
          image: imagedata,
          first_name: data?.first_name,
          phone_number: data.phone_number,
          position: data.position,
          IIN: data.IIN,
        },
      }).then(()=>{
        if(accountadmin?.description === '' && profile === null){
          postRestaurantProfileState(45)
        }else if(accountadmin?.description === '' || profile === null){
          postRestaurantProfileState(70)
        }else{
          postRestaurantProfileState(100)
        }
      });
      getMyProfile()
    } catch (error) {
      console.log(error)
    }
    setEditStatus(false);
  }
  const [firstname, setFirstName] = useState(() => {
    if (accountData?.first_name) {
      return accountData.first_name;
    }

    return 'Напишите ФИО ответсвенного лица';
  });

  const [PositionPlaceholder, setPositionPlaceholder] = useState(() => {
    if (accountData?.position) {
      return accountData.position;
    }

    return 'Например, старший администратор';
  });

  const [PhonePlaceholder, setPhonePlaceholder] = useState(() => {
    if (accountData?.phone_number) {
      return accountData.phone_number;
    }

    return 'Напишите контактный телефон админа';
  });

  const [IINPlaceholder, setIINPlaceholder] = useState(() => {
    if (accountData?.IIN) {
      return accountData.IIN;
    }

    return 'Напишите ИИН';
  });


  const [openCategoryModal, setCategoryModal] = useState(false)
  const editMainInformationStatus = () => {
    setEditStatus(true);
  }
  const togglestatus = () => {
    setEditStatus(false);
  }
  function handleToggle() {
    setCategoryModal((openCategoryModal: any) => !openCategoryModal)
  }



  const getMainInformation = async () => {
    
    try {
      const response: any = await getMainInformationRequest({
        url: 'restaurants/admin/',
      })

      setAccountadmin((prevState) => ({
        ...prevState,
        name: response.name,
        address: response.address,
        description: response.description,
        image: response.image,
        phone_number: response.phone_number,
        category: response.category,
      }))
    } catch (error) {
      setAccountadmin(null)
    }
  }


  const watchedValue = watch("first_name"); 
  const watchedValue2 = watch("position")
  const watchedValue3 = watch("phone_number")
  const watchedValue8 = watch("IIN")
  const watchedValue5 = watch("email")
  const watchedValueimage = watch("image")



  
  
  useEffect(() => {
    handleValueChangeWatchAccount(watchedValue, watchedValue2, watchedValue3, watchedValue8,watchedValue5,watchedValueimage ); // call the parent component's function with the watched value
  }, [watchedValue, watchedValue2, watchedValue3, watchedValue8, watchedValue5, watchedValueimage]);

  return (
    <Box style={{paddingLeft: '77px', paddingRight: '77px', paddingBottom: '77px'}}>

           <ChangePassword openCategoryModal={openCategoryModal} handleToggle={handleToggle}/>
      {((accountData?.first_name === '' || editStatus === true)  && (
    

          <><Grid container display={"flex"} flexDirection={'row'} alignItems={'center'} xs={6} style={{ paddingTop: '20px', paddingBottom: '10px' }}>
            <Grid item xs={3}>
              <Avatar src={urlAccount} sx={{ backgroundColor: 'white', width: '90px', height: '90px', border: '1px solid #999999' }}>
                <Typography style={{ color: '#999999', fontSize: '10px', fontWeight: '400', paddingLeft: '20px' }}>Логотип не загружен</Typography>
              </Avatar>
            </Grid>
            <Grid item xs={2} style={{ paddingLeft: '10px' }}>
              <input  {...register('image')}  accept='image/*' type='file' onChange={handleChangeImage} id='icon-button' style={{ display: 'none' }} />
              <Grid>
                <label htmlFor='icon-button'>
                  <Button variant='text' component='span' className={styles.imageButton} size='small' sx={{ textTransform: 'capitalize' }} style={{ fontSize: '14px', fontWeight: 400, border: 'none', textTransform: 'none' }}>
                    Загрузить
                  </Button>
                </label>
              </Grid>
              <Grid>
                {(urlAccount && (
                  <Button variant='text' onClick={deleteLogo}  component='span' style={{ color: '#E34833',fontSize: '14px', fontWeight: 400, border: 'none', textTransform: 'none' }}>
                    Удалить
                  </Button>
                )) || null}
              </Grid>
            </Grid>
          </Grid><form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container xs={12} display={"flex"} justifyContent={'space-between'} gap={'10px'}>
                <Grid item xs={12}>
                  <InputLabel sx={{ color: 'black' }}><Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>ФИО:</Typography></InputLabel>
                  <Controller
                    control={control}
                    name='first_name'
                    defaultValue={accountData?.first_name}
                    render={({ field }) => (
                      <FormControl fullWidth variant='standard'>
                        <InputLabel sx={{ color: 'black' }}><Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>ФИО:</Typography></InputLabel>
                        <TextField
                          {...register('first_name', { required: true })}
                          size='small'
                          margin='normal'
                          className={classes.root}
                          fullWidth
                          style={{ fontSize: '14px', fontWeight: '400' }}
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          placeholder={firstname} //'Напишите ФИО ответсвенного лица'
                        />
                      </FormControl>
                    )} />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                    <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}> Должность:</Typography>

                  </InputLabel>
                  <Controller
                    control={control}
                    name='position'
                    defaultValue={accountData?.position}
                    render={({ field }) => (
                      <FormControl fullWidth variant='standard'>

                        <TextField
                          {...register('position', { required: true })}
                          size='small'
                          margin='normal'
                          style={{ fontSize: '14px', fontWeight: '400' }}
                          className={classes.root}
                          fullWidth
                          placeholder={PositionPlaceholder}
                          onChange={(e) => field.onChange(e)}
                          value={field.value} />
                      </FormControl>
                    )} />
                </Grid>
                <Grid item xs={12} container justifyContent={'space-between'}>
                  <Grid item xs={5.5}>
                    <InputLabel sx={{ color: 'black' }}>
                      <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>Телефон:</Typography>
                    </InputLabel>
                    <Controller
                      control={control}
                      name='phone_number'
                      defaultValue={accountData?.phone_number}
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>

                          <TextField
                            {...register('phone_number', {
                              required: true,
                              pattern: {
                                value: /^((\+77|77)+([0-9]){9})$/,
                                message: 'Ввведите существующий номер, который начинается с +77 или 77.'
                              },
                            })}
                            size='small'
                            margin='normal'
                            style={{ fontSize: '14px', fontWeight: '400' }}
                            className={classes.root}
                            fullWidth
                            error={!!errors.phone_number?.message}
                            helperText={errors.phone_number?.message}
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            placeholder={PhonePlaceholder} />
                        </FormControl>
                      )} />
                  </Grid>
                  <Grid item xs={5.5}>
                    <InputLabel sx={{ color: 'black' }}>
                      <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>  ИИН:</Typography>

                    </InputLabel>
                    <Controller
                      control={control}
                      name='IIN'
                      defaultValue={accountData?.IIN}
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <TextField
                            {...register('IIN', {
                              required: true,
                              pattern: {
                                value: /^[0-9]{12}$/,
                                message: 'Убедитесь, что это значение содержит 12 символов.'
                              },
                            })}
                            style={{ fontSize: '14px', fontWeight: '400' }}
                            size='small'
                            error={!!errors.IIN?.message}
                            helperText={errors.IIN?.message}
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => {
                              field.onChange(e)
                            } }
                            value={field.value}
                            placeholder={IINPlaceholder} //'Напишите ИИН'
                          />
                        </FormControl>
                      )} />
                  </Grid>


                </Grid>



                <Grid item xs={12} container justifyContent={'space-between'}>
                  <Grid item xs={5.5}>
                    <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                      <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>Почта (e-mail):</Typography>
                    </InputLabel>
                    <TextField
                      {...register('email', { required: true })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      style={{ fontSize: '14px', fontWeight: '400' }}
                      type='email'
                      value={accountData?.email}
                      placeholder={accountData?.email} //'asdfghj@gmail.com'
                    />

                  </Grid>
                  <Grid item xs={5.5}>
                    <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
                      <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}> Пароль:</Typography>
                    </InputLabel>
                    <TextField disabled value={accountData?.password} type='password' size='small' margin='normal' className={classes.root} fullWidth placeholder='*********' />
                    <ThemeProvider theme={theme}>
                      <Button
                        color='secondary'
                        variant='text'
                        onClick={handleToggle}
                        sx={{ border: 'none', fontSize: '12px', textTransform: 'none' }}
                      >
                        Изменить пароль
                      </Button>
                    </ThemeProvider>


                  </Grid>
                </Grid>
                <ThemeProvider theme={theme}>
                  <Button color='secondary' type='submit' variant='contained' sx={{ marginTop: 2, width: '350px', "&:hover": { backgroundColor: "#0EB378", borderColor: "#0EB378" } }}>
                    Сохранить
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button onClick={togglestatus} color='secondary' type='submit' variant='outlined' sx={{ marginTop: 2, width: '350px' }}>
                    Отменить
                  </Button>
                </ThemeProvider>
              </Grid>
            </form></>

  
      )) ||
        ((accountData?.first_name !== '' && accountData?.first_name !== null && editStatus  === false)  && (
          <ThemeProvider theme={fonttheme}>
          <Grid>
          <Grid container display={"flex"}  justifyContent={'space-between'} flexDirection={'row'} alignItems ={'center'} xs={12}  style={{ paddingTop: '20px', paddingBottom: '10px'}}>
              <Grid container alignItems='center' item xs={6}>
                  <Grid item xs={3}>
                    <Avatar src={accountData?.image}  sx={{ backgroundColor:'white', width: '90px', height: '90px', border: '1px solid #999999' }}>
                    <Typography style={{ color:'#999999', fontSize: '10px', fontWeight: '400', paddingLeft: '20px'}}>Логотип не загружен</Typography>
                    </Avatar>
                  </Grid>
                  <Grid item xs={2} style={{paddingLeft: '20px'}}>
                    <Typography style={{fontSize: '24px', fontWeight: 700}}>
                      {accountData?.first_name}
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
            <Grid container justifyContent='space-between' alignContent='center'>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={8}>
                  <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                    Должность:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                    {accountData?.position}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }} justifyContent='space-between'>
                <Grid item xs={6}>
                  <Grid item xs={8}>
                    <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      ИИН:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {accountData?.IIN}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={8}>
                    <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Телефон:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {accountData?.phone_number}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }} justifyContent='space-between'>
                <Grid item xs={6}>
                  <Grid item xs={8}>
                    <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Почта:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {accountData?.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={8}>
                    <Typography   style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Пароль:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      *******
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <ThemeProvider theme={theme}>           
                           <Button
                             color='secondary'
                             variant='text'
                             onClick={handleToggle}
                             sx={{ border: 'none', fontSize: '12px', textTransform: 'none'}}
                           >
                             Изменить пароль
                           </Button>
                    </ThemeProvider>
                    <ChangePassword openCategoryModal={openCategoryModal} handleToggle={handleToggle}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        ))}

    </Box>
  )
}

export default Account
