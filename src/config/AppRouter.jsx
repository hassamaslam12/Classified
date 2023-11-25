import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '../utils/Router'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            {routes.map((e,i)=>{
                return(
                    <Route path={e.path} element={e.element} key={i}/>
                )
            })}

        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default AppRouter
