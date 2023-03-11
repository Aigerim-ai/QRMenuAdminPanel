import { Button, Box, Popover, Typography, FormControlLabel, Checkbox } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Close } from 'src/assets/icons'
import theme from 'src/pages/Myprofilerefactoring/theme/theme'

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

const Popup = ({ click }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(click)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClose = () => {
    setAnchorEl(null)
  }
  const classes = useStyles()
  return (
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
          <Box display='flex'>
            <Box>
              <FormControlLabel control={<Checkbox checked={true} />} label='бfmgkfkmgfkmg' />
              <Typography style={{ fontSize: '16px', fontWeight: 600 }}>По цене: </Typography>
            </Box>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box pl={3} pr={3} pb={3} pt={3}>
              <Button
                style={{
                  borderRadius: '5px',
                  padding: '15px',
                  textAlign: 'center',
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
                }}
              >
                Использовать
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Popover>
  )
}

export default Popup
