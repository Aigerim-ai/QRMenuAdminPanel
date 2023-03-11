import { Box, Button, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import boopSfx from './mixkit-arcade-score-interface-217.mp3'
import { EGreen, exit, HamburgerIcon, HamburgerIconG, language, MenuIcon, MenuIconG, MyprofileIcon, MyprofileIconG, newOrder, newOrderG, OrdersIcon, OrdersIconG, soundoff, soundon, TablesIcon, TablesIconG } from 'src/assets/icons'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { exitAdmin } from 'src/tools/request'
import MenuItem from '@mui/material/MenuItem'
import t from 'src/locale/helper'
import { RestaurantTwoTone } from '@material-ui/icons'
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const Popover2 = withStyles((theme) => ({
  root: {
    minWidth: '244px', 
    minHeight: '132px'
  },
  paper: {
    borderRadius: '9px',
    border: '1px solid #CCCCCC',


  },
}))(Popover)

const drawerWidth: number = 289

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: "10px 15px",
      color: '#000000'
    },
  }),
);

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    gap: '70px',
    width: drawerWidth,
    backgroundColor: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(11),
      },
    }),
  },
}))


export default function Sidebar({lg, setLang}: any) {
//language

  const [restaurant, setRestaurant] = useState<string | null>(localStorage.getItem('userRestaurant'))
  const [dataSound, setDataSound] = useState(false);
  const [dataOrderLength, setDataOrderLength] = useState(0);
  const [saveError, setSaveError] = useState<string>("good");
  //sound
 const ref = useRef<HTMLAudioElement>(null);

 
 if(!restaurant){
  localStorage.setItem("sound", JSON.stringify(false))
 }

 

const [soundIcon, setSoundIcon] = useState(localStorage.getItem("sound"));

if(!restaurant){
  ref.current?.autoplay === false
}

function toggleSound(){
      if(soundIcon === "false"){
        activateSound()
       updateState()
       setSoundIcon("true")
       localStorage.setItem("sound", JSON.stringify(true))

      }else{
        deactivateSound()
        updateState()
        setSoundIcon("false")
        localStorage.setItem("sound", JSON.stringify(false))
      }
}




  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const navigate = useNavigate()
  const exitRequest = async () => {
    try {
      await exitAdmin({
        url: 'logout/',
      }).then(() => {
        localStorage.clear()
        navigate('/sign-in')
      })
    } catch (error) {
      console.log(error)
    }
  }
  const updateState = async () => {
    if(restaurant &&  restaurant != 'null'){
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    try {
    const response = await fetch('https://thearcanaqr.tech/api/restaurants/new_orders/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataSound(data.is_sound)
        setDataOrderLength(data.orders.length)
          
        },
        (err) => {
          console.error(err)         
        }
      )
 
    }catch (error) {
      console.log(error)
      setSaveError("something is wrong")
    }
  }
  }


  const deactivateSound = async () => {
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    fetch('https://thearcanaqr.tech/api/restaurants/new_orders/sound_deactivate/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  }
  const activateSound = async () => {
    const tokenObject = localStorage.getItem('userToken')
    if (!tokenObject) {
      throw Error('Token does not exist')
    }
    const { token } = JSON.parse(tokenObject)
    fetch('https://thearcanaqr.tech/api/restaurants/new_orders/sound_activate/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },

    })

  }
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(() => {
    if (localStorage.getItem('sound') === "true") {
      return 1;
    } else {
      return 3;
    }
  })



const buttonProps = (value: React.SetStateAction<number | undefined>) => ({
  selected: selectedIndex === value,
  onClick: () => setSelectedIndex(value),
});

useEffect(() => {

  if(restaurant &&  restaurant != 'null' && localStorage.getItem('userToken')){
    setInterval(updateState, 7000);
  } 
},[])



useEffect(()=>{
  if(soundIcon === "true"){

    if(dataSound === false){
      ref.current?.autoplay === false
      ref.current?.pause()
    }
     else if(dataSound === true && dataOrderLength === 0){
      ref.current?.autoplay === false
      ref.current?.pause()
    }else {
      ref.current?.autoplay === true
      ref.current?.play()
    }
  
  }else if(soundIcon === "false"){
    ref.current?.autoplay === false
    ref.current?.pause()
  }

}, [dataSound, dataOrderLength, restaurant])
//popover

const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

const handleClick = (event: any) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
const classes = useStyles();
const openPop = Boolean(anchorEl);
const id = openPop ? 'simple-popover' : undefined;


const [iconSrcX, setIconSrcX] = useState();

const [iconSrc1, setIconSrc1] = useState(OrdersIcon);
const [iconSrc2, setIconSrc2] = useState(newOrder);
const [iconSrc3, setIconSrc3] = useState(MenuIcon);
const [iconSrc4, setIconSrc4] = useState(MyprofileIcon);
const [iconSrc5, setIconSrc5] = useState(TablesIcon);

useEffect(()=>{

},[ iconSrc1,iconSrc2])

const menuItems = [
  ['/orders', iconSrc1,'Заказы', OrdersIconG, ()=>setIconSrc1(OrdersIconG),  ()=>setIconSrc1(iconSrc1), OrdersIcon], 
  ['/neworders', iconSrc2, 'Новые заказы', newOrderG, ()=>setIconSrc2(newOrderG),  ()=>setIconSrc2(iconSrc2), newOrder],
   ['/menu', iconSrc3, 'Меню', MenuIconG, ()=>setIconSrc3(MenuIconG),  ()=>setIconSrc3(iconSrc3),MenuIcon], 
   ['/profile', iconSrc4, 'Профиль', MyprofileIconG, ()=>setIconSrc4(MyprofileIconG),  ()=>setIconSrc4(iconSrc4),MyprofileIcon],
   ['/tables', iconSrc5, 'Столы Заведения', TablesIconG, ()=>setIconSrc5(TablesIconG),  ()=>setIconSrc5(iconSrc5), TablesIcon] 
];



  return (
    <>
    {/* <audio src={boopSfx} autoPlay ref={ref} loop/> */}
    <Drawer  variant='permanent' open={open} >
        <ListItemButton onMouseOver={() => setIconSrcX(HamburgerIconG)}
        onMouseOut={() => setIconSrcX(HamburgerIcon)}
        style={{marginLeft: '16px'}} sx={{
          "&.Mui-selected": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378'
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#F5F8F7",
            borderColor: "red",
            color: '#0EB378'
          },
          ":hover": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378',
            borderColor: "red",
          }}} onClick={toggleDrawer} >
          <ListItemIcon     >
            <img src={iconSrcX} 
            
            
            alt='logo' />
          </ListItemIcon>
          <ListItemText primary='Админ панель' />
        </ListItemButton>

  

      <Drawer  variant='permanent' open={open} >

      <List component='nav'>
      {menuItems.map(([url, iconSrc, primaryText, hoverIconSrc, setIconSrc, setIconSrcT, next], index) => (
        <ListItemButton 
       
        {...buttonProps(index)}  sx={{
          "&.Mui-selected": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378'
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#F5F8F7",
            borderColor: "red",
            color: '#0EB378'
          },
          ":hover": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378',
            borderColor: "red",
          },
        }} key={`${index}-sidebarroutes`}  component={RouterLink} to={url }  
        >
         <ListItem  key={`${index}-sidebarroutesitems`}>
          <ListItemIcon key={`${index}-sidebarroutesicons`} >
            <img key={`${index}-sidebarimgs`} src={iconSrc} 

          
            alt="My Icon"
             />
          </ListItemIcon>
          <ListItemText key={`${index}-sidebarroutestexts`} primary={primaryText}/>
          </ListItem>
        </ListItemButton>
         ))}
      </List>

      </Drawer>

      <Toolbar
        sx={{
          display: 'flex',
          marginLeft: '-50px',
          px: [0.4],
        }}
      >

        <Grid  paddingTop={'60px'} container display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
        <Grid paddingLeft={'67px'}>

          <ListItemButton onClick={handleClick}  aria-describedby={id}>
    <ListItemIcon >
                      <img src={language} alt='logo' />
                    </ListItemIcon>
         
       
        </ListItemButton>
    
          <Popover2 
           id={id}
           open={openPop}
           onClose={handleClose}
           elevation={0}
  anchorReference="anchorPosition"

  anchorPosition={{ top: 500, left: 100 }}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
>

<Box sx={{ borderRadius: '9px',width: '244px', height: '132px'}}>
<Typography onClick={()=> setLang("ru")}   sx={{ "&:hover": { backgroundColor: "#CFF0E4"}}} className={classes.typography}> Русский</Typography>
<Typography  onClick={()=> setLang("kz")}  sx={{ "&:hover": { backgroundColor: "#CFF0E4"}}}  className={classes.typography}>Қазақша</Typography>
<Typography  onClick={()=> setLang("en")}  sx={{ "&:hover": { backgroundColor: "#CFF0E4"}}}  className={classes.typography}>English</Typography>
</Box>
</Popover2>
       
    
        </Grid>
       
        <Grid paddingLeft={'70px'}>
        <ListItemButton onClick={toggleSound}>
        {
          
          soundIcon === "false" ? ( <><ListItemIcon>
                    <img src={soundoff} alt='logo' />
                  </ListItemIcon></>
          ) : (<><ListItemIcon>
                      <img src={soundon} alt='logo' />
                    </ListItemIcon></>
          )
        }
       
        </ListItemButton>
    
        </Grid>
      
        <Grid>
        <ListItemButton  style={{marginLeft: '25px'}} sx={{  "&.Mui-selected": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378'
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#F5F8F7",
            borderColor: "red",
            color: '#0EB378'
          },
          ":hover": {
            backgroundColor: "#F5F8F7",
            color: '#0EB378',
            borderColor: "red",
          },}} key={'logoutitembut'} component={RouterLink} to='/'>
            <ListItem key={`logout-sidebarroutesitem`}>
            <ListItemIcon style={{minWidth: '90px'}}>
              <img src={exit}      onMouseOver={(event) => {const target = event.target as HTMLImageElement;
        target.src = EGreen;
      }} 
      onMouseOut={(event) => {const target = event.target as HTMLImageElement;
        target.src = exit;
      }} 
      
      
      alt='logo' onClick={exitRequest} />
            </ListItemIcon>
            <ListItemText key={`text-sidebarroutestext`} primary={'Выйти'} onClick={exitRequest}/>
          </ListItem>
        </ListItemButton>
        </Grid>
        </Grid>
      </Toolbar>
    </Drawer>
    </>
    
  )
}
