import { IconButton, Tooltip, Typography, Box } from '@mui/material'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Button from '@mui/material/Button'
import QRCode from 'qrcode'
import React, { useState } from 'react'
import styles from '../styles/table.module.sass'
import { QRBtn } from '../../../assets/icons'
import { downloadQR, closeQR } from '../../../assets/icons/index'
import { getRestaurant } from 'src/tools/request'
 
interface ITable {
  title: string
  urlName: string
  id: any
}

interface Props {
  table: ITable
}
interface IRestaurant {
  id: number
}

function QRButton({ table }: Props) {
  const [currentRestaurant, setCurrentRestaurant] = React.useState<IRestaurant>();
  const [temp, setTemp] = useState('')
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      currentRestaurant+","+table.id,
      {
        width: 900,
        color: {
          dark: '#000000',
          light: '#EEEEEEFF',
        },
        // eslint-disable-next-line no-shadow
      },
      // eslint-disable-next-line no-shadow, consistent-return
      (err: any, url: any) => {
        if (err) return
        setTemp(url)
      }
    )
  }
  const fetchRestaurant = async () =>{
    try{
      const response: any = await getRestaurant({
        url: 'restaurants/admin/',
      })
      setCurrentRestaurant(response.id)
    }catch (error) {
      console.log(error)
    }
  }
  function showqr(){
    GenerateQRCode()
  }
  React.useEffect(() => {
    fetchRestaurant();
  }, [])
  return (
    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap onClick={showqr}>
      <PopupState variant='popover' popupId='demo-popup-popover'  >
        {(popupState: any) => (
          <>
            <Button color='inherit' variant='text' {...bindTrigger(popupState)}>
              <img src={QRBtn} alt='logo' />
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box display='flex' justifyContent='flex-end'>
                <Tooltip title='download' arrow>
                  <IconButton color='inherit'>
                    <a href={temp} download='qrcode.png'>
                      <img src={downloadQR} alt='download' />
                    </a>
                  </IconButton>
                </Tooltip>
                <IconButton color='inherit'>
                  <img src={closeQR} alt='close' onClick={popupState.close} />
                </IconButton>
              </Box>

              <Typography>
                <img alt='' src={temp} className={styles.qrImg} />
              </Typography>
            </Popover>
          </>
        )}
      </PopupState>
    </Typography>
  )
}

export default QRButton
