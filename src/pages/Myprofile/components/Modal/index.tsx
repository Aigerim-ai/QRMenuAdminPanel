import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha, makeStyles } from '@material-ui/core/styles'
import { Button, FormControl, InputLabel, TextField } from '@mui/material'
import { Grid } from '@material-ui/core'
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form'
import React, { useState } from 'react'
import { theme } from '../../../SignIn/theme/theme'
import { passwordValidation } from '../../../SignIn/constants/validation'

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
    '& .MuiInputLabel-root': {
      fontWeight: 400,
      fontSize: '16px',
      color: '#000000 !important',
    },
  },
  input: {
    color: '#333333 !important',
  },
}))

interface Props {
  openCategoryModal: boolean
  handleToggle: any
}
interface ICangePassword {
  old_password: string
  new_password: string
  new_password2: string

}
function ChangePassword({ openCategoryModal, handleToggle }: Props) {
  const classes = useStyles()
  const [old_password, setOldPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [new_password2, setNewPassword2] = useState('')

  const { handleSubmit, control } = useForm<ICangePassword>({
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password2: ''
    },
  })
  const { errors } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<ICangePassword> = async (data) => {
    setOldPassword(data.old_password)
    setNewPassword(data.new_password)
    setNewPassword2(data.new_password2)
    const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
    fetch('https://thearcanaqr.tech/api/users/change-password/', {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        old_password: data.old_password,
        new_password: data.new_password,
        new_password2: data.new_password2
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <Dialog
        open={openCategoryModal}
        onClose={handleToggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle textAlign='center' id='alert-dialog-title'  style={{ fontWeight: '700', fontSize:'24px' }}>
          Изменение пароля
        </DialogTitle>
        <DialogContent
          style={{  display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxWidth: '463px' }}
        >
           <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
                <Grid container alignItems='center' alignContent='center' justifyContent='center'>
                  <Grid item xs={11}>
                    <Controller
                      control={control}
                      rules={passwordValidation}
                      name='old_password'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard' sx={{ marginTop: 2 }}>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                          Текущий пароль:
                          </InputLabel>
                          <TextField
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.old_password?.message}
                            helperText={errors.old_password?.message}
                            placeholder='Введите логин'
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Controller
                      control={control}
                      rules={passwordValidation}
                      name='new_password'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                          Новый пароль:
                          </InputLabel>
                          <TextField
                            type='password'
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.new_password?.message}
                            helperText={errors.new_password?.message}
                            placeholder='Введите пароль'
                          />
                        </FormControl>
                      )}
                    />
                      <Controller
                      control={control}
                      rules={passwordValidation}
                      name='new_password2'
                      render={({ field }) => (
                        <FormControl fullWidth variant='standard'>
                          <InputLabel className={classes.input} htmlFor='bootstrap-input'>
                          Подтвердите новый пароль:
                          </InputLabel>
                          <TextField
                            type='password'
                            size='small'
                            margin='normal'
                            className={classes.root}
                            fullWidth
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            error={!!errors.new_password2?.message}
                            helperText={errors.new_password2?.message}
                            placeholder='Введите пароль'
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
             <Grid xs={11} item container alignItems='center' alignContent='center' justifyContent='space-between'  style={{ margin: '15px' }}>
              <Grid item>
                <Button
                onClick={handleToggle}
                  variant='outlined'
                  style={{
                    borderRadius: '5px',
                    borderColor: '#0EB378',
                    color: '#0EB378',
                    padding: '14px 44px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Отменить
                </Button>
              </Grid>
              <Grid item>
                <Button
                type='submit'
                  variant='contained'
                  style={{
                    borderRadius: '5px',
                    color: 'white',
                    backgroundColor: '#0EB378',
                    padding: '14px 44px',
                  }}
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>             
                </Grid>
            </form>
        
           
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ChangePassword
