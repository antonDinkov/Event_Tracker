import { ToastContainer } from 'react-toastify'
import { EventTrackerApp } from './components/editor/EventTrackerApp'
import './App.css'

function App() {
  return (
    <>
      <EventTrackerApp />
      <ToastContainer position="bottom-right" autoClose={2200} theme="light" />
    </>
  )
}

export default App
