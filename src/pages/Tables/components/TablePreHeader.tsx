import { Typography } from '@mui/material'
import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import theme from '../theme/theme'

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

interface Props {
  size: number
  handleOpen: () => any
  handleSelect: () => any
  handleDeleteAll: () => any
  selected: boolean
}

export default function TablePreHeader({ size, handleOpen, handleSelect, selected, handleDeleteAll }: Props) {
  const classes = useStyles()
  return (
    <div>
      <Typography variant='subtitle1'>{`Столы заведения(${size})`}</Typography>
      {selected ? <Button onClick={handleDeleteAll}>Удалить</Button> : null}
      <Button
        onClick={handleOpen}
        style={{
          borderRadius: 5,
          minWidth: '200px',
        }}
        variant='outlined'
      >
        Добавить
      </Button>
      <Button onClick={handleSelect}>Выбрать</Button>
    </div>
  )
}
