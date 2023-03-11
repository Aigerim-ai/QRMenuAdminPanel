import {  useEffect, useState } from 'react'
import { TextField, InputLabel, FormControl, alpha, Button, ThemeProvider, Link, Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import { useAppSelector } from 'src/store'
import { useAppDispatch } from 'src/store'
import { setToken } from 'src/store/slices/userSlice'
import styles from './styles/signin.module.sass'
import { LogoIcon } from '../../../src/assets/icons'
import { loginValidation, passwordValidation } from './constants/validation'
import { theme } from './theme/theme'
import ForgotPasswordPop from './ components/ForgotPasswordPop'
import { getMainInformationRequest } from 'src/tools/request'
import React from 'react'

interface ISignInForm {
  login: string
  password: string
}
interface ICategory{
  id: any,
  name: any,
  image: any
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

export default function AuthForm() {
  const lg: string = useOutletContext();
  const currentUser = useAppSelector((state: any) => state.user.currentUser)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleSubmit, control } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  })
  const { errors } = useFormState({
    control,
  })
  const [account, setAccount] = useState<
  | {
      name: string
      address: string
      description: string
      image: string
      phone_number: string
      category: ICategory[]
      price: number
      service_percent: number
    }
  | null
  | undefined
>()
const [url, setUrl] = useState<any>();
const [errMess, setErrMess] = useState<any>();


  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    setEmail(data.login)
    setPassword(data.password)
    await fetch('https://thearcanaqr.tech/api/obtain_token/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: data.login,
        password: data.password,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(async (res) => {
        const token = res
        localStorage.setItem('userToken', JSON.stringify(token))
        // dispatch(setToken(token))
       
      })
      .catch(async (error) => {
        const errMessage = await error.json();
        (errMessage?.message) ? setErrMess(errMessage.message) : (errMessage?.non_field_errors) ? setErrMess(errMessage?.non_field_errors[0]) : setErrMess(null)
      })

      try {
        const response_admin: any = await getMainInformationRequest({
          url: 'restaurants/admin/',
        })

        localStorage.setItem('userRestaurant', JSON.stringify(response_admin.id))
        navigate('/')
      } catch (error) {
        localStorage.setItem('state', JSON.stringify(0))
        navigate('/profile')
      }
  }
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const NeedTohaveFormDataHere2 = () => {
    navigate('/sign-up')
  }

  useEffect(() => {
    localStorage.clear()
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 9,
          }}
        >
          <Grid xs={6} sx={{ ml: 1 }}>
            <img src={LogoIcon} alt='logo' />
          </Grid>
          <div className={styles.authform}>
            <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Grid container alignItems='center' alignContent='center' justifyContent='center'>
                  <Grid item xs={7}>
                  <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                            E-mail:
                  </InputLabel>
                    <Controller
                      control={control}
                      rules={loginValidation}
                      name='login'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <TextField
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.login?.message || errMess}
                            helperText={errors.login?.message || errMess}
                            placeholder='Введите '
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                  <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                            Пароль:
                          </InputLabel>
                    <Controller
                      control={control}
                      rules={passwordValidation}
                      name='password'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <TextField
                            type='password'
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth

                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                            placeholder='Введите пароль'
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Button  color='secondary'  disableElevation type='submit' variant='contained' sx={{ "&:hover": {backgroundColor: "#6ED1AE", borderColor:  "#6ED1AE"} , marginTop: 2}} fullWidth>
                      Вход
                    </Button>
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      color='primary'
                      variant='outlined'
                      onClick={NeedTohaveFormDataHere2}
                      fullWidth
                      disableElevation
                      sx={{ marginTop: 2, marginBottom: 2, "&:hover": {backgroundColor: "#F2F6F5", borderColor:  "#0EB378"} }}
                    >
                      Регистрация
                    </Button>
                  </Grid>
                  <Grid container justifyContent='center'>
                    <Link onClick={handleClickOpen} color='secondary' underline='always'>
                      Забыли Пароль?
                    </Link>
                  </Grid>
                  <ForgotPasswordPop open={open} handleClose={handleClose} />
                </Grid>
              </Box>
            </form>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
