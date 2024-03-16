import axios from 'axios';
import { Loading } from '../stores/store';

export type EachList = {
    date:string;
    list:Array<{
        temperature:string;
        description:string;
        windSpeed:string;
        windDirection:string;
        time:string;
        humidity: string;
        icon:string;
        pressure:string;
        visibility:string;
      }>
    }
  




export type WeatherStructure = {
  city:string;
  list:Array<EachList>
  };


// Function to fetch current weather data for a location
export async function fetchCurrentWeather(location: string): Promise<WeatherStructure> {
  const apiKey = 'dd3983cf2385eb390d982b40b0ad38fb'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${apiKey}&units=metric`;

  try {
    Loading.set(true)
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data)
    let weatherData:WeatherStructure= {
      city:data.city.name,
      list:ArrangeData(data),
    }

    return weatherData;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }finally{
    Loading.set(false)
  }
}

// Function to convert wind direction degrees to cardinal direction
function getWindDirection(degrees: number): string {
  const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return sectors[index];
}


function ArrangeData(data:any):Array<EachList>
  {

  let date:string;
  let index=0;

  let datatoreturn:Array<EachList>= []

  data.list.map((ele:any)=>{
    let dt = ele.dt_txt.split(" ")
    let datatopush = {
        time:dt[1],
        temperature: ele.main.temp,
        description: ele.weather[0].description,
        windSpeed: String(ele.wind.speed),
        windDirection: getWindDirection(ele.wind.deg),
        humidity: ele.main.humidity,
        icon: ele.weather[0].icon,
        pressure: ele.main.pressure,
        visibility:ele.visibility
    }
    
    if (dt[0]!=date) {
      date = dt[0]
      index=index+1;
      datatoreturn.push({date:dt[0],list:[datatopush]})
    }
    else{
      datatoreturn[index-1].list.push(datatopush)
    }
  })



 return datatoreturn
}




