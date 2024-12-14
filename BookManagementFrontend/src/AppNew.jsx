import React, { useContext, useEffect } from 'react'
import { Registration } from './components/Registration'
import { Login } from './components/Login'
import { AuthContext } from './context/AuthProvider'

export const AppNew = () => {
  const auth = useContext(AuthContext);
  useEffect(() => {
    console.log("useEffect() got fired..")

    console.log("Context variable auth : " + JSON.stringify(auth))


  })
  return (
    <div>
      {/* <Registration/>  */}
      <Login />
    </div>
  )
}


