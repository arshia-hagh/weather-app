import { useState } from 'react'

function App() {
  const [darkMode,setDarkMode] = useState<boolean>(false)
  const handleClick = () => {
    setDarkMode(darkMode => darkMode ? false : true)
  }
  return (
    <div className={darkMode ? `bg-background--secondery-1` : `bg-background--primery-1`}>
      <div>
        
      </div>
    </div>
  )
}

export default App
