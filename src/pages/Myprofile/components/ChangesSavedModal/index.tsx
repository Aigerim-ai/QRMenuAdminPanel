import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha, Box, Typography } from '@mui/material'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from 'src/assets/icons'
import { checkcircle } from 'src/assets/icons'
interface Props {
  handleCloseReturn: () => void
  openReturn: boolean
}
const useStyles = makeStyles((theme) => ({
  root: {
    '&:focus': {
      boxShadow: `${alpha('#000000', 0.0)} 0 0 0 0.2rem`,
      borderColor: '#ccccc',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #CCCCCC',
    },
  },
}))

export default function ChangesSavedModal({
  handleCloseReturn,
  openReturn,
}: Props) {
  const classes = useStyles(); 
  return (
    <Dialog
      open={openReturn}
      aria-labelledby='alert-dialog-title'
      scroll="paper"
      PaperProps={{
        sx: {
          maxWidth: '375px',
          minHeight: '72px',
          borderRadius: '10px',
          verticalAlign: 'top',
          position: "fixed", top: 10, right: 10, m: 0,
        },
      }}
      fullWidth
    > 
      <DialogTitle  fontSize={20} fontWeight={500} textAlign='center' alignContent='center' id='alert-dialog-title'>
        <Grid alignContent='center' container justifyContent='space-between' >
          <img src={checkcircle} alt='circle'  /><span> Изменения сохранены</span>
          <img src={Close} alt='logo' onClick={handleCloseReturn} />
        </Grid>
      </DialogTitle>
    </Dialog>
  )
}