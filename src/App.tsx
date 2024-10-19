import { useState } from 'react'
import rain from '././assets/Rain.svg'
import { styled, Switch, SwitchProps } from '@mui/material';

const cities = [
  {
    name: 'Tehran',
    lat: '35.7219',
    lon: '51.3347'
  },
  {
    name: 'Arak',
    lat: '34.0873',
    lon: '49.7022'
  },
  {
    name:  'Isfahan',
    lat: '32.6539',
    lon: '51.6660'
  },
  {
    name: 'Mashhad',
    lat: '36.2972',
    lon: '59.6067'
  }
]
function App() {
  
  

  

  const [darkMode,setDarkMode] = useState<boolean>(false)

  const handleClick = () => {
    setDarkMode(darkMode => darkMode ? false : true)
  }
  return (
    <div className={` h-screen  flex items-center justify-center ${darkMode ? `bg-background--secondery-1` : `bg-background--primery-1`}`}>
      <div className={` w-[60%] relative rounded-lg h-[50%] flex flex-col  ${darkMode ? 'bg-background--secondery-2' : 'bg-background--primery-2'}`}>
        <div>
          <img src={rain} alt="img-weather" className='w-[50%] m-auto' />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default App
