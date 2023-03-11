import { Box, Grid, TextField, InputAdornment, Popover, Typography, Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import {  makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Close } from 'src/assets/icons'
import theme from '../../Myprofilerefactoring/theme/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPopover-paper': {
      borderRadius: 15,
      border: '1px solid #CCCCCC',
      width: '353px',
      position: 'fixed',
      height: '476px',
      overflow: 'hidden',
    },
    'label + &': {
      marginTop: theme.spacing(6),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      fontWeight: 400,
      fontSize: 16,
      paddingRight: 0,
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
  },
}))

function valuetext(value: number) {
  return `${value}`
}
interface IRestaurantid {
  id: number
}
interface IMenu {
  id: string
  title: string
  image: string
  restaurant:  IRestaurantid
  price: string
  description: string
  category: string
  active: boolean
  created_at: string
  updated_at: string
}

export default function Actions() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const [openCategoryModal, setCategoryModal] = useState(false)
  const id = open ? 'simple-popover' : undefined
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  function handleToggle() {
    setCategoryModal((openCategoryModal: any) => !openCategoryModal)
  }

  return (
    <Grid item xs={12}>
      <Box p={2.5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <TextField
                size='small'
                className={classes.root}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button
                      variant='contained'
                      style={{
                        borderRadius: '0',
                        borderStartEndRadius: '10px',
                        borderEndEndRadius: '10px',
                        color: 'white',
                        border: 'none',
                        padding: '9px 32px',
                        backgroundColor: '#0EB378',
                      }}
                    >
                      Искать
                    </Button>
                  ),
                }}
                placeholder='Поиск...'
              />

              <Button
                aria-describedby={id}
                onClick={(e) => handleClick(e)}
                style={{
                  borderRadius: 10,
                  color: '#999999',
                  borderColor: '#CCCCCC',
                  minWidth: '0',
                }}
              >
                <FilterListIcon />
              </Button>
              <Popover
                className={classes.root}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box px={2} py={2} alignItems='space-between'>
                  <Box>
                    <Box display='flex' justifyContent='space-between'>
                      <Box pr={20}>
                        <Typography style={{ fontSize: '16px', fontWeight: 600 }}>По категории: </Typography>
                      </Box>
                      <Box>
                        <img src={Close} alt='logo' onClick={handleClose} />
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <Box pl={3} pr={3} pb={3} pt={3}>
                        <Button
                          style={{
                            borderRadius: '5px',
                            padding: '15px',
                            textAlign: 'center',
                            boxShadow: 'none',
                          }}
                          variant='outlined'
                        >
                          Очистить
                        </Button>
                      </Box>
                      <Box pr={3} pb={3} pt={3}>
                        <Button
                          variant='contained'
                          style={{
                            borderRadius: '5px',
                            color: 'white',
                            backgroundColor: '#0EB378',
                            border: 'none',
                            padding: '15px',
                            boxShadow: 'none',
                          }}
                        >
                          Использовать
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Popover>
              <Button
                     onClick={handleToggle}
                     style={{
                      borderRadius: 5,
                      minWidth: '200px',
                    }}
           
                    variant='outlined'
              >
                {'Добавить позицию'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
