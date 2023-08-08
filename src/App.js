import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Task from './pages/Task/index'
import EditTask from './pages/EditTask/index'
import TaskDetail from './pages/TaskDetail/index'
import { TaskProvider } from './contexts/taskContext'

function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="/task/:taskId/edit" element={<EditTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </TaskProvider>
    </Router>
  )
}

export default App
