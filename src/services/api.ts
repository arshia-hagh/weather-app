import axios from "axios";
let api = 'f0894defae7c5584798f8812232a40c2';

const client =  axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})
export async function getWeather({lat,lon} : {lat: string, lon: string}) {
    const {data} = await client(`/weather?lat=${lat}&lon=${lon}&appid=${api}`)
    return data
}