import React from 'react'
import Router from './router'

import LandingPage from './screens/LandingPage/index'

function App() {

  const paths = {
    landingPage: '/',
  }

  const routes = [
    { path: paths.landingPage, component: <LandingPage /> },
  ]

  return <Router routes={routes} />
}

export default App
