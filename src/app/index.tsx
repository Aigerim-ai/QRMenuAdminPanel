import {  useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import '../styles/global.sass'
import React from 'react'
import Box from '@mui/material/Box'
import {  Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar'
import t from 'src/locale/helper'


function App(){
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('userToken'))
  const [restaurant, setRestaurant] = useState<string | null>(localStorage.getItem('userRestaurant'))
  const navigate = useNavigate()
  const [lg, setLg] = useState<string>("ru")

  useEffect(() => {
    setAuthToken(authToken)
    setRestaurant(restaurant)
    if(localStorage.getItem('sound') === "true") {
      navigate('/neworders')
    } else if(!authToken && !restaurant){
      navigate('/sign-in')
    }else{
      navigate('/profile')
    } 


  }, [])

  return (
    <>
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar lg={lg} setLang={setLg}/>
      <Outlet  context={lg}/>
    </Box>
    </>
  )
}
export default App
