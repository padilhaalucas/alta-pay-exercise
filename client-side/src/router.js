import React from 'react'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

const Router = ({ routes }) => {
  return (
    <BrowserRouter>
      <Routes>
        { routes?.map((route, i) => {
          return (
            <Route
              key={i}
              exact
              path={route.path}
              element={route.component}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default Router