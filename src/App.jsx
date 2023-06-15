import { Toaster } from 'react-hot-toast'
import './App.css'
import Main from './layouts/Main'

function App() {

  return (
    <>
      <Main />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
