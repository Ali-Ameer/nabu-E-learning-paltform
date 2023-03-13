import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectUserLoggedIn } from '../features/userSlice'

export default function RequireAuth() {
  const isLoggedIn = useSelector(selectUserLoggedIn)
  let navigate = useNavigate()
  
  useEffect( () => {
    !isLoggedIn && navigate("/login")
  }, [isLoggedIn])

  return (
    isLoggedIn && <Outlet /> 
  )
}