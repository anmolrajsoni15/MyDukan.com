import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate  } from 'react-router-dom'


function ProtectedRoute({isAdmin, element: Element, ...rest}) {

    const {loading, isAuthenticated, user} = useSelector((state) => state.user)

  return (
    <>
        {loading === false && (
            <Route
            {...rest}
            render={(props) => {
                if(isAuthenticated === false){
                    return <Navigate to ="/login"/>
                }
                if(isAdmin === true && user.role !== "admin"){
                    return <Navigate to ="/login"/>
                }
                return <Element {...props} />
            }}
        />
        )}
    </>
  )
}

export default ProtectedRoute