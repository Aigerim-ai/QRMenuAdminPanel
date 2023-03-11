import { useState } from 'react'
import { TextField, InputLabel, FormControl, alpha, Button, ThemeProvider, Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@mui/material/Grid'
import IconButton from '@material-ui/core/IconButton'
import { setToken } from 'src/store/slices/userSlice'
import Container from '@mui/material/Container'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import { useAppSelector } from 'src/store'
import { useAppDispatch } from 'src/store'
import styles from '../SignIn/styles/signin.module.sass'
import { LogoIcon } from '../../assets/icons'
import { Back } from '../../assets/icons/index'
import { loginValidation, passwordValidation } from '../SignIn/constants/validation'
import { theme } from '../SignIn/theme/theme'

interface ISignUpForm {
  login: string
  password: string
  verifypassword: string
}

const useStyles = makeStyles(() => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(6),
      fontWeight: 400,
    },
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
      '&:hover fieldset': {
        borderColor: '#999999',
      },
    },
    '&:focus': {
      boxShadow: `${alpha('#000000', 0.0)} 0 0 0 0.2rem`,
      borderColor: '#',
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
export default function SignUp() {
  const lg: string = useOutletContext();
  const currentUser = useAppSelector((state: any) => state.user.currentUser)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setError, register, handleSubmit, control} = useForm<ISignUpForm>({
    defaultValues: {
      login: '',
      password: '',
      verifypassword: '',
    },
  })
  const { errors } = useFormState({
    control,
  })
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    setEmail(data.login)
    setPassword(data.password)
    await fetch('https://thearcanaqr.tech/api/register/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: data.login,
        password: data.password,
      }),
    })
      await fetch('https://thearcanaqr.tech/api/obtain_token/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: data.login,
          password: data.password,
        }),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => { 
          const token = res
          localStorage.setItem('userToken', JSON.stringify(token))
          dispatch(setToken(token))
          localStorage.setItem('state', JSON.stringify(0))
        
          navigate('/profile')
  
        })
        .catch((error) => {
          console.log(error)
          if(error.status === 400){
            setError('login', {
              type: "server",
              message: 'Пользователь с таким почтовым адресом уже существует',
            });
          }

        })

  }
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const NavigatetoSignin = () => {
    navigate('/')
  }
  const [openDelete, setOpenDelete] = useState(false)
  const handleDeleteOpen = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <IconButton onClick={NavigatetoSignin}>
          <img src={Back} alt='bacl' />
        </IconButton>
      </Box>
      <Container fixed component='main' maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {' '}
          <Grid xs={6} sx={{ ml: 1 }}>
            <img src={LogoIcon} alt='logo' />
          </Grid>
          <div className={styles.authform}>
            <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Grid container alignItems='center' alignContent='center' justifyContent='center'>
                  <Grid item xs={7}>
                    <Controller
                      control={control}
                      rules={loginValidation}
                      {...register('login', { pattern:  {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Введите существующую почту'
                      },
                    })}
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard' sx={{ marginTop: 2 }}>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                            E-mail:
                          </InputLabel>
                          <TextField
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.login?.message}
                            helperText={errors.login?.message}
                            placeholder='Введите почту'
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      control={control}
                      rules={passwordValidation}
                      name='password'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                            Пароль:
                          </InputLabel>
                          <TextField
                            size='small'
                            type='password'
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
                    <Controller
                      control={control}
                      rules={passwordValidation}
                      name='verifypassword'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                            Повторите пароль:
                          </InputLabel>
                          <TextField
                            size='small'
                            type='password'
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
                    <Button  disableElevation color='secondary' onClick={handleDeleteOpen} type='submit' variant='contained' fullWidth sx={{ marginTop: 2, "&:hover": {backgroundColor: "#6ED1AE", borderColor:  "#6ED1AE"}  }}>
                      Регистрация
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <div>{errors.login && errors.login.message}</div>
            </form>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
