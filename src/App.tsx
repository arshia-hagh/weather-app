import { useEffect, useState } from "react";
import rain from "././assets/Rain.svg";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Switch} from "@mui/material";
import { getWeather } from "./services/api";
import { TWeather } from "./server/type";

interface TCity{
  id: string
  name: string,
  lat: string,
  lon: string
}
const cities = [
  {
    id: '1',
    name: "Tehran",
    lat: "35.7219",
    lon: "51.3347",
  },
  {
    id: '2',
    name: "Arak",
    lat: "34.0873",
    lon: "49.7022",
  },
  {
    id: '3',
    name: "Isfahan",
    lat: "32.6539",
    lon: "51.6660",
  },
  {
    id: '4',
    name: "Mashhad",
    lat: "36.2972",
    lon: "59.6067",
  },
];
function App() {
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [dataWe,setDataWe] = useState<TWeather>()
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked)
  };
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const {value} =  e.target
    const city : TCity = JSON.parse(value as string)
    getWeather({lat: city.lat,lon: city.lon}).then(result => {
      setDataWe(result)
    })
  }
  
  return (
    <div
      className={` h-screen  flex items-center justify-center ${
        darkMode ? `bg-background--secondery-1` : `bg-background--primery-1`
      }`}
    >
      <div
        className={` w-[60%]  relative  rounded-lg h-[50%] flex flex-col  ${
          darkMode ? "bg-background--secondery-2" : "bg-background--primery-2"
        }`}
      >
        <MaterialUISwitch   checked={darkMode}
          onChange={(e) => handleClick(e)}
          className="absolute left-10 top-5"
        />
        <div>
          <img src={rain} alt="img-weather" className="w-[40%] m-auto" />
        </div>
        <FormControl sx={{width: '50%',margin: '0px auto'}}>
          <InputLabel id="demo-simple-select-label">Cities</InputLabel>
          <Select onChange={(e) => handleChange(e)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="City"
          >
            {cities.map(items => (
              <MenuItem key={items.id} value={JSON.stringify(items)}>{items.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br/>
        <div className={`border-t-2 w-[70%] relative mx-auto ${darkMode ? 'border-color--secondery' : 'border-color--primery' }`}>
          <ul className={`flex pt-3 before:absolute before:top-0 before:left-32 before:h-full before:w-[2px] after:absolute after:top-0 after:right-32 after:h-full after:w-[2px] ${darkMode ? 'after:bg-color--secondery' : 'after:bg-color--primery' } ${darkMode ? 'before:bg-color--secondery' : 'before:bg-color--primery' } justify-around text-center`}>
            <li className={` flex  flex-col ${darkMode ? 'text-color--secondery' : 'text-color--primery' } `}>
              <a href="#">aa</a>
              <a href="#">a</a>
            </li>
            <li className={` flex  flex-col ${darkMode ? 'text-color--secondery' : 'text-color--primery' } `}>
              <a href="#">a</a>
              <a href="#">a</a>
            </li>
            <li className={` flex  flex-col ${darkMode ? 'text-color--secondery' : 'text-color--primery' } `}>
              <a href="#">a</a>
              <a href="#">a</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
