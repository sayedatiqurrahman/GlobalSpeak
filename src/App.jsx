import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainLay from './Pages/LayOuts/MainLay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainLay />
    </>
  )
}

export default App
