import React from 'react'
import { createContext , useEffect ,useState } from 'react'

export const TokenAuthContext=createContext()

function AuthContext({children}) {

    const [authContext,setAuthContext]=useState(false)

    useEffect(()=>{
        if (sessionStorage.getItem('token')) {
            
            setAuthContext(true)
        }else{

            setAuthContext(false)
        }
    },[])



  return (
    <>
        <TokenAuthContext.Provider value={{authContext,setAuthContext}}>

        {children}

        </TokenAuthContext.Provider>
    
    
    
    </>
  )
}

export default AuthContext