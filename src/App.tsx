import { useState } from "react";
import rain from "././assets/Rain.svg";
import { styled, Switch, SwitchProps } from "@mui/material";

const cities = [
  {
    name: "Tehran",
    lat: "35.7219",
    lon: "51.3347",
  },
  {
    name: "Arak",
    lat: "34.0873",
    lon: "49.7022",
  },
  {
    name: "Isfahan",
    lat: "32.6539",
    lon: "51.6660",
  },
  {
    name: "Mashhad",
    lat: "36.2972",
    lon: "59.6067",
  },
];
function App() {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#65C466",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  const [darkMode, setDarkMode] = useState<boolean>(false);
  console.log(darkMode);
  const handleClick = () => {
    setDarkMode((darkMode) => (darkMode ? false : true));
  };
  return (
    <div
      className={` h-screen  flex items-center justify-center ${
        darkMode ? `bg-background--secondery-1` : `bg-background--primery-1`
      }`}
    >
      <div
        className={` w-[60%]  relative rounded-lg h-[50%] flex flex-col  ${
          darkMode ? "bg-background--secondery-2" : "bg-background--primery-2"
        }`}
      >
        <IOSSwitch
          onClick={() => handleClick}
          className="absolute left-0 top-0"
        />
        <div>
          <img src={rain} alt="img-weather" className="w-[40%] m-auto" />
        </div>
        <div className="border-t-2 w-[70%] relative mx-auto border-[#000]">
          <ul className="flex pt-3 before:absolute before:top-0 before:left-32 before:h-full before:w-[2px] after:absolute after:top-0 after:right-32 after:h-full after:w-[2px] after:bg-black before:bg-black justify-around text-center">
            <li className="flex flex-col">
              <a href="#">aa</a>
              <a href="#">a</a>
            </li>
            <li className=" flex  flex-col ">
              <a href="#">a</a>
              <a href="#">a</a>
            </li>
            <li className="flex text-center flex-col">
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
