import { useEffect, useState } from "react";
import rain from "././assets/Rain.svg";
import snow from "././assets/Snow.svg";
import drizzle from "././assets/Drizzle.svg";
import clouds from "././assets/Clouds.svg";
import storm from "././assets/Thunderstorm.svg";
import clearD from "././assets/Clear-Day.svg";
import clearN from "././assets/Clear-Night.svg";
import {
  styled,
  Switch,
} from "@mui/material";
import { getWeather } from "./services/api";
import { TWeather } from "./server/type";
import { useLocalStorage } from "./Hooks/useLocalStorage";

interface TCity {
  id: string;
  name: string;
  lat: string;
  lon: string;
}
const cities = [
  {
    id: "1",
    name: "Tehran",
    lat: "35.7219",
    lon: "51.3347",
  },
  {
    id: "2",
    name: "Arak",
    lat: "34.0873",
    lon: "49.7022",
  },
  {
    id: "3",
    name: "Isfahan",
    lat: "32.6539",
    lon: "51.6660",
  },
  {
    id: "4",
    name: "Mashhad",
    lat: "36.2972",
    lon: "59.6067",
  },
];
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));
function App() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('theme',false);
  const [dataWe, setDataWe] = useState<TWeather>();
  const [dergeeTemp,setDergeeTemp] =  useState<string>('K')
  const [temp,setTemp] = useState<number>()
  console.log(temp)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const city: TCity = JSON.parse(value as string);
    getWeather({ lat: city.lat, lon: city.lon }).then((result) => {
      setDataWe(result);
      setTemp(Math.round(result.main.temp))
    });
  };
  const handleTemp = () => {
    if(dergeeTemp === 'K'){
      setTemp(getTemp(dataWe?.main.temp as number).far)
      setDergeeTemp('F')
    }
    else if(dergeeTemp === 'F'){
      setTemp(getTemp(dataWe?.main.temp as number).can)
      setDergeeTemp('C')
    }
    else{
      setTemp(getTemp(dataWe?.main.temp as number).kel)
      setDergeeTemp('K')
    }
  }
  useEffect(() => {
    getWeather({lat:'35.7219',lon:'51.3347'}).then(results => {
      setDataWe(results)
      setTemp(Math.round(results.main.temp))
    })
  },[setDataWe])
  const main = dataWe?.weather.find((items) => items.id === items.id)?.main;

  return (
    <div
      className={` h-screen   flex items-center justify-center ${
        darkMode ? `bg-background--secondery-1` : `bg-background--primery-1`
      }`}
    >
      <div
        className={` w-[50%]  relative overflow-hidden  rounded-lg h-[60%] flex flex-col  ${
          darkMode ? "bg-background--secondery-2" : "bg-background--primery-2"
        }`}
      >
        <MaterialUISwitch
          checked={darkMode}
          onChange={(e) => handleClick(e)}
          className="absolute left-[5%] top-[3%]"
        />
        <div>
          <img
            src={iconsimg(main as string)}
            alt="img-weather"
            className="lg:w-[30%] md:w-[50%] sm:w-[50%] mx-auto"
          />
        </div>
        
          <div className=" mx-auto lg:w-[30%] md:w-[50%] sm:w-[80%]">

          <select title="Cities" className="outline-none font-semibold w-full h-10 shadow-[4px_5px_3px_#000]  transition-all rounded border-2 focus:border-[#3f51b5]" autoFocus onChange={(e) => handleChange(e)}>
            {cities.map((items) => (
              <option className="rounded-none" key={items.id} value={JSON.stringify(items)}>
                {items.name}
              </option>
            ))}
          </select>
          </div>
        
        <br />
        <div
          className={`border-t-2 flex-wrap lg:w-[70%] md:w-full sm:w-full  relative mx-auto ${
            darkMode ? "border-color--secondery" : "border-color--primery"
          }`}
        >
          <ul
            className={`flex lg:flex-row md:flex-row pt-3 
              md:before:h-full md:before:w-[2px]  md:after:top-0 md:after:right-[32%] md:after:h-full md:after:w-[2px]
              sm:before:h-[2px]  sm:after:h-[2px] sm:after:w-full sm:flex-col sm:gap-4 sm:before:w-full sm:before:top-[35%] sm:before:left-0
              sm:after:top-[70%]
              before:absolute lg:before:top-0 lg:before:left-[27%] md:before:top-0 md:before:left-[27%] lg:before:h-full lg:before:w-[2px] after:absolute lg:after:top-0 lg:after:right-[32%] lg:after:h-full lg:after:w-[2px] ${
              darkMode ? "after:bg-color--secondery" : "after:bg-color--primery"
            } ${
              darkMode
                ? "before:bg-color--secondery"
                : "before:bg-color--primery"
            } justify-around text-center`}
          >
            <li
              className={` flex font-bold flex-col ${
                darkMode ? "text-color--secondery" : "text-color--primery"
              } `}
            >
              <a href="#">TEMP</a>
              <a href="#" onClick={() => handleTemp()}>{temp}{dergeeTemp}</a>
            </li>
            <li
              className={` flex font-bold  flex-col ${
                darkMode ? "text-color--secondery" : "text-color--primery"
              } `}
            >
              <a href="#">DISCRIPTION</a>
              <a href="#">{dataWe?.weather.map((item) => item.description)}</a>
            </li>
            <li
              className={` flex font-bold  flex-col ${
                darkMode ? "text-color--secondery" : "text-color--primery"
              } `}
            >
              <a href="#">HUMIDITY</a>
              <a href="#">{dataWe?.main.humidity}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
function dayornight() {
  const h = new Date().getHours();
  if (h >= 7 && h <= 14) {
    return clearD;
  } else if(h >= 15 && h <= 6) {
    return clearN;
  }
}
function getTemp(weTemp : number){
  const k = weTemp;
  const f = (k - 273.15) * 9/5 + 32;
  const c = k - 273.15;
  const temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
  return temp
}
function iconsimg(icon: string) {
  switch (icon) {
    case "Rain":
      return rain;
      break;
    case "Clear":
      return dayornight();
      break;
    case "Clouds":
      return clouds;
      break;
    case "Drizzle":
      return drizzle;
      break;
    case "Thunderstrom":
      return storm;
      break;
    case "Snow":
      return snow;
      break;
  }
}
export default App;
