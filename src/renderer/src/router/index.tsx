// src/router/index.tsx
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from '../views/Home'
import Drawing from '../views/Drawing'

function AnimatedRoutes(): React.JSX.Element {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/drawing"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Drawing />
            </motion.div>
          }
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<h2>404 - 页面不存在</h2>} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
