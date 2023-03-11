import { Box, Grid, TextField, InputAdornment, Popover, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Close } from 'src/assets/icons'
import theme from '../../../Myprofilerefactoring/theme/theme'
import { SortDown, sortDown24, sortUp24 } from '../../../../assets/icons/index'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPopover-paper': {
      borderRadius: 15,
      border: '1px solid #CCCCCC',
      width: '353px',
      top: '600px',
      left: '1300px',
      position: 'fixed',
      height: 'auto',
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
  value: string
  changeInput: (e: any) => void
  sortTypes: any
  onChange: (e: any) => void
  onCancel: (e: any) => void
  onUseSort: (e: any) => void
}
export default function SearchFilters({ value, changeInput, sortTypes, onChange, onCancel, onUseSort }: Props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Grid item xs={12}>
      <Box p={2.5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <TextField
                size='small'
                type='text'
                value={value}
                onChange={changeInput}
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
                        backgroundColor: '#0EB378',
                        border: 'none',
                        padding: '9px 32px',
                      }}
                    >
                      Искать
                    </Button>
                  ),
                }}
                placeholder='Поиск...'
              />

              <Button>
                <FilterListIcon
                  sx={{ color: 'black', border: '1px solid black', padding: '5px', fontSize: '40px', borderRadius: '10px' }}
                />
              </Button>
              <Button
                onClick={(e) => handleClick(e)}
                variant='outlined'
                sx={{ width: '20%', borderColor: 'black', color: 'black', borderRadius: '10px', padding: '10px' }}
              >
                <Box display='flex' justifyContent='space-between' sx={{ width: ' 100%', lineHeight: '0' }}>
                  <Box>
                    <Typography style={{ fontSize: '14px' }} sx={{ textTransform: 'capitalize' }}>
                      По датe
                    </Typography>
                  </Box>
                  <Box>
                    <img src={SortDown} alt='sortdown' />
                  </Box>
                </Box>
              </Button>
              <Popover
                className={classes.root}
                sx={{ top: '600px' }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 50,
                  horizontal: -5,
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box px={2} py={2} alignItems='space-between'>
                  <Box>
                    <Box display='flex' justifyContent='right'>
                      <img src={Close} alt='logo' onClick={handleClose} />
                    </Box>
                    <Box display='flex'>
                      <Box>
                        <FormGroup>
                          {sortTypes.map((type: { id: any; label: any; checked: boolean }) => (
                            <Box sx={{ display: 'flex' }}>
                              <FormControlLabel
                                control={<Checkbox onClick={() => onChange(type.id)} checked={type.checked} />}
                                label={type.label}
                                sx={{ height: '30px' }}
                              />
                              <img src={type.id % 2 !== 0 ? sortDown24 : sortUp24} alt='Sort Down' />
                            </Box>
                          ))}
                        </FormGroup>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Box pl={3} pr={3} pb={3} pt={3} sx={{ padding: '10px' }}>
                        <Button
                          onClick={onCancel}
                          style={{
                            borderRadius: '5px',
                            padding: '8px 35px',
                            textAlign: 'center',
                          }}
                          sx={{ padding: 0, border: '1px solid #0EB378', color: '#0EB378', textTransform: 'capitalize' }}
                          variant='outlined'
                        >
                          Очистить
                        </Button>
                      </Box>
                      <Box pr={3} pb={3} pt={3} sx={{ padding: '10px' }}>
                        <Button
                          variant='contained'
                          onClick={onUseSort}
                          style={{
                            borderRadius: '5px',
                            color: 'white',
                            backgroundColor: '#0EB378',
                            border: 'none',
                            padding: '8px 30px',
                          }}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          Использовать
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Popover>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
