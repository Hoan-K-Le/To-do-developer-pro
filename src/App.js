import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<abc />} />
        <Route path="/todo/:id" element={<abc />} />
      </Routes>
    </Router>
  )
}

export default App
