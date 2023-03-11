import { TextField, Button, FormControl, InputLabel, alpha, ThemeProvider, Autocomplete, Typography, Grid, Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import theme from 'src/pages/SignIn/theme/theme'
import { getMainInformationRequest, getMyProfileRequest, putRequisitesRequest } from 'src/tools/request'
import { createTheme } from '@mui/material/styles'
import styles from './requisities.module.sass'
import { useOutletContext } from 'react-router'

interface IRequisities {
  organization_name: string
  BIN: string
  bank_name: string
  BIK: string
  IBAN: string
  kbe: string
  currency: string
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
      fontSize: '14px',
      color: '#999999 !important',
    },
  },
  input: {
    color: '#333333 !important',
  },
}))


function Requisities({requisites,setRequisites, getMyRequisites,handleValueChangeWatchRequisites, currentTab, setProgress,popupCaller, editStatus, setEditStatus, postRestaurantProfileState }: any) {

  const lg: string = useOutletContext();
  const [restaurant, setRestaurant] = useState(localStorage.getItem('userRestaurant'))
  // const [editstatus, setEditStatus] = useState<boolean>(false);
  const editMainInformationStatus = () => {
    setEditStatus(true);
  }
  const [position, setPosition] = useState();
  const [description, setDesciption] = useState();
  const getMainInformation = async () => {
    try {
      const response: any = await getMainInformationRequest({
        url: 'restaurants/admin/',
      })
      setDesciption((prevState: any) => ({
        ...prevState,
        description: response.description,
      }))
      setProgress((prevState: any) => ({
        ...prevState,
        state: response.state
      }))
      setPosition((prevState: any) => ({
        ...prevState,
        position: response.position
      }))
  
    } catch (error) {
      console.log(error)
    }
  }
    
  const currencies = ['тенге', 'рубль', 'доллар', 'евро']
  const classes = useStyles()
  const { handleSubmit, control, register, formState, watch } = useForm<IRequisities>({
    defaultValues: {
      currency: currencies[0],
    },
    mode: 'onChange',
  })
  const { errors } = useFormState({
    control,
  })
  const togglestatus = () => {
    setEditStatus(false);
  }
  const onSubmit: SubmitHandler<IRequisities> = (data) => {
    popupCaller()
    localStorage.setItem('userProgress', JSON.stringify(100))
    if(position === '' && description === ''){
      postRestaurantProfileState(45)
    }else if(position === '' || description === ''){
      postRestaurantProfileState(70)
    }else{
      postRestaurantProfileState(100)
    }
    updateMyProfile(data)
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
  const updateMyProfile = async (data: any) => {
    try {
      const response: any = await putRequisitesRequest({
        url: 'users/me/',
        body: {
          organization_name: data.organization_name,
          BIN: data.BIN,
          bank_name: data.bank_name,
          BIK: data.BIK,
          IBAN: data.IBAN,
          kbe: data.kbe,
          currency: data.currency,
        },
      });
      getMyRequisites()
    } catch (error) {
      console.log(error)
    }
    setEditStatus(false);
  }
  useEffect(() => {
    getMyRequisites()
  }, [])

/*
watch
*/

const watchedValue = watch("organization_name"); 
const watchedValue2 = watch("BIN")
const watchedValue3 = watch("bank_name")
const watchedValue8 = watch("BIK")
const watchedValue4 = watch("IBAN")
const watchedValue5 = watch("kbe")
const watchedValue6 = watch("currency")


useEffect(() => {

  handleValueChangeWatchRequisites(watchedValue, watchedValue2, watchedValue3, watchedValue8,watchedValue4, watchedValue5, watchedValue6); // call the parent component's function with the watched value
}, [watchedValue, watchedValue2, watchedValue3, watchedValue8, watchedValue4,watchedValue5, watchedValue6]);



  return (
    <Box style={{paddingLeft: '77px', paddingRight: '77px', paddingBottom: '77px'}}>
      {((requisites?.organization_name === null || editStatus === true)  && (
        <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
          <Grid  xs={12} style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                <InputLabel sx={{ color: 'black' }}> <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}> Наименование организации:</Typography></InputLabel>
          <Controller
            control={control}
            name='organization_name'
            defaultValue={requisites?.organization_name}
            render={({ field }) => (
              <FormControl fullWidth variant='standard' >

                <TextField
                  {...register('organization_name', { required: true })}
                  size='small'
                  margin='normal'
                  className={classes.root}
                  fullWidth
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  placeholder='Например, ТОО “Luckee Yu”'
                />
              </FormControl>
            )}
          />
</Grid>
<Grid  xs={12} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
  <Grid item xs={5.5}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>  БИН организации:</Typography>  
                    </InputLabel>
              <Controller
                control={control}
                name='BIN'
                defaultValue={requisites?.BIN}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
                   
                    <TextField
                       {...register('BIN', { required: true,                
                        pattern:  {
                          value: /^[0-9]{12}$/,
                          message: 'Убедитесь, что это значение содержит 12 символов.'
                        },
                      })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      error={!!errors.BIN?.message}
                      helperText={errors.BIN?.message}
                      value={field.value}
                      placeholder='Напишите БИН'
                    />
                  </FormControl>
                )}
              />
              </Grid>
              <Grid item xs={5.5}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>  Банк:</Typography>     
                    </InputLabel>
              <Controller
                control={control}
                name='bank_name'
                defaultValue={requisites?.bank_name}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
                    <TextField
                      {...register('bank_name', { required: true })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      placeholder='Напишите банк'
                    />
                  </FormControl>
                )}
              />
 

 </Grid>
  </Grid>
  <Grid  xs={12} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
  <Grid item xs={5.5}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}> БИК:</Typography>   
                    </InputLabel>
              <Controller
                control={control}
                name='BIK'
                defaultValue={requisites?.BIK}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
                    <TextField
                       {...register('BIK', { required: true,                
                        pattern:  {
                          value: /^[a-zA-Z,0-9]{8}$/,
                          message: 'Убедитесь, что это значение содержит 8 символов.'
                        },
                      })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      error={!!errors.BIK?.message}
                      helperText={errors.BIK?.message}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      placeholder='Напишите БИК'
                    />
                  </FormControl>
                )}
              />
</Grid>
<Grid item xs={5.5}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>    IBAN:</Typography> 
                    </InputLabel>
              <Controller
                control={control}
                name='IBAN'
                defaultValue={requisites?.IBAN}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
                    <TextField
                           {...register('IBAN', { required: true,                
                            pattern:  {
                              value: /^[a-zA-Z,0-9]{20}$/,
                              message: 'Убедитесь, что это значение содержит 20 символов.'
                            },
                          })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      error={!!errors.IBAN?.message}
                      helperText={errors.IBAN?.message}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      placeholder='Номер расчетного счета'
                    />
                  </FormControl>
                )}
              />
 </Grid>
 </Grid>
 <Grid  xs={12} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
 <Grid item xs={5.5}>
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>  Кбе:</Typography> 
                    </InputLabel>
              <Controller
                control={control}
                name='kbe'
                defaultValue={requisites?.kbe}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
                    <TextField
                      {...register('kbe', { required: true })}
                      size='small'
                      margin='normal'
                      className={classes.root}
                      fullWidth
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      placeholder='Напишите Кбе'
                    />
                  </FormControl>
                )}
              />
   </Grid>
   <Grid item xs={5.5} >
            <InputLabel sx={{ color: 'black' }} htmlFor='bootstrap-input'>
            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#333333' }}>    Валюта:</Typography>   
            </InputLabel>
              <Controller
                control={control}
                name='currency'
                defaultValue={requisites?.currency}
                render={({ field }) => (
                  <FormControl fullWidth variant='standard'>
      
                    <Autocomplete
                      {...register('currency', { required: true })}
                      value={field.value}
                      onChange={(_event, newValue) => field.onChange(newValue)}
                      options={currencies}
                      className={classes.root}
                      size="small"
                      sx={{ mt: 0, p: 0 }}
                      renderInput={(params) => (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <TextField {...params} placeholder='Выберите вылюту' sx={{ mt: 0, p: 0 }} />
                      )}
                    />
                  </FormControl>
                )}
              />
</Grid>
</Grid>
          <Grid xs={12} container justifyContent={'space-between'}>
          <ThemeProvider theme={theme}>
            <Button color='secondary' disabled={!formState.isValid} type='submit' variant='contained' sx={{ marginTop: 2, width: '350px' }}>
              Сохранить
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button onClick={togglestatus} color='success' type='button' variant='outlined' sx={{ marginTop: 2, width: '350px', color: '#0EB378', borderColor: '#0EB378' }}>
              Отменить
            </Button>
          </ThemeProvider>
          </Grid>
        </form>
      )) ||
        ((requisites?.organization_name !== '' && requisites?.organization_name !== null)  && (
          <ThemeProvider theme={fonttheme}>
            <Grid  >
            <Grid container display={"flex"}  justifyContent={'space-between'} flexDirection={'row'} alignItems ={'center'} xs={12}  style={{ paddingTop: '20px', paddingBottom: '10px'}}>
                  <Grid item xs={3}>
                  <Typography style={{fontSize: '24px', fontWeight: 700}}>
                      {requisites?.organization_name}
                    </Typography>
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
              <Grid container xs={12} sx={{ mt: 2 }} justifyContent='space-between'>
                <Grid item xs={5.5}>
                <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                    БИН:
                  </Typography>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                    {requisites?.BIN}
                  </Typography>
                </Grid>

                <Grid item xs={5.5}>
         
                  <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Банк:
                    </Typography>
                    <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {requisites?.bank_name}
                    </Typography>

                
                </Grid>
              </Grid>
              <Grid container xs={12} sx={{  mt: '26px'}} justifyContent='space-between'>
                <Grid item xs={5.5}>
                 
                  <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      БИК:
                    </Typography>
                 
                
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {requisites?.BIK}
                    </Typography>
               
                </Grid>
                <Grid item xs={5.5}>
                  <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      IBAN:
                    </Typography>
                  <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {requisites?.IBAN}
                    </Typography>
                </Grid>
              </Grid>

              <Grid container  sx={{ mt: '26px' }} justifyContent='space-between'>
                <Grid item xs={5.5}>
                <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      kbe:
                    </Typography>
                    <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {requisites?.kbe}
                    </Typography>
                </Grid>
                <Grid item xs={5.5}>
                <Typography  style={{fontSize: '14px', fontWeight: 400, color: '#999999'}}>
                      Валюта:
                    </Typography>
                    <Typography style={{fontSize: '16px', fontWeight: 400, color: '#333333'}}>
                      {requisites?.currency}
                    </Typography>
                 
                 
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        ))}

    </Box>
  )
}

export default Requisities
