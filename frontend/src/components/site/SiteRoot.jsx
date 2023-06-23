import React from 'react'
import { Outlet } from 'react-router-dom'

const SiteRoot = () => {
  return (
    <>
      <h1>HomePage Header</h1>
      <Outlet />
    </>
  )
}

export default SiteRoot