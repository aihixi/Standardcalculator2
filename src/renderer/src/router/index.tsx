// src/router/index.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/Home' // 确保此路径正确

function RouterConfig(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 重定向 /home 到 / */}
      <Route path="/home" element={<Navigate to="/" />} />

      {/* 404 页面兜底 */}
      <Route path="*" element={<h2>404 - 页面不存在</h2>} />
    </Routes>
  )
}

export default RouterConfig
