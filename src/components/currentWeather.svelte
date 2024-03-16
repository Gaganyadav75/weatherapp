

  
<script lang="ts">

  import { weatherStoredData ,selectedDateTime} from "../stores/store";
  import type { WeatherStructure  } from "$lib/weatherInfo";
  import WeatherStats from "./weatherStats.svelte";
  import { onMount } from "svelte";
 

    //subscribed to weather data and return requied data in data variable

    let data:Array<WeatherStructure>=[];

    weatherStoredData.subscribe((value:Array<WeatherStructure>)=>{
      data = value
        selectedDateTime.update((val)=>{return { date:value[0].list[0].date,time:value[0].list[0].list[0].time}});
    })


    let updateweather:{
        date: string,
        temperature: string,
        description: string,
        windSpeed: string,
        windDirection: string,
        humidity: string,
        visibility: string,
        pressure: string,
        icon:string,
        time: string,
    };

    //array of all times for selected current date 

    let TimeList:Array<string>

    //subscribed to selected date and time and it give current time list and updated weather and store updated weather in the varible name updateweahter

    selectedDateTime.subscribe(value=>{
    if (data.length>0) {
        data[0].list.map(ele=>{
        if (ele.date==value.date) {
         TimeList = ele.list.map(newele=>{
                if (newele.time==value.time) {
                    updateweather ={date:ele.date,...newele}
                }
                return newele.time
            })
        }
    })


    }

    })


//updatetime function runs on change of select time element

    function UpdateTime(e: Event){
        let selecttime = e.target as HTMLSelectElement;
        let val = selecttime.value;
        selectedDateTime.update((value) => { return {...value,time: val }});
    }

</script>


<div class="rounded-xl h-full md:h-[calc(100vh-120px)] overflow-y-scroll flex flex-col p-6 gap-5 bg-gray-200 dark:bg-gray-700 text-black dark:text-white">

    <div class="flex justify-between pl-2 pr-2">
        <div class="flex justify-start flex-col pr-5">
            <h1 class="inline text-3xl font-semibold">{data.length>0?data[0].city:'0'}</h1>
        </div>

        <div>
            <select class="rounded-lg text-black p-1 pl-2 pr-2" on:change={UpdateTime} id="selecttime">
                {#each TimeList as item}
                <option value={item} >{item.substring(0,5)}</option>
                {/each}
            </select>
        </div>
        
    </div>


    <div class="mt-6 flex justify-between items-center">

    
<div class="text-6xl flex-col self-center inline-flex items-start justify-start rounded-lg text-indigo-400">
    {#if data}

    <img id="weathericon" class="w-28 h-28" src={updateweather.icon.substring(0,2)+".png"} placeholder="#WeatherIcon" alt="#">

    {:else}
    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
    {/if}

    <div class="font-medium text-6xl">{updateweather?.temperature}ºC</div>


</div>


    <h1 class="break-words">{updateweather?.description}</h1>

    </div>

    <h1 class="dark:text-white text-black text-xl mt-4">Stats</h1>


    <div class="dark:text-white text-black grid gap-8 mb-8 md:grid-cols-2">

        <WeatherStats {...{data:["wind.png","Wind Speed",updateweather.windSpeed+" km/h",updateweather.windDirection]}}/>
        <WeatherStats {...{data:["humidity.png","Humidity",updateweather.humidity,"g/m³"]}}/>
        <WeatherStats {...{data:["pressure.png","Pressure",updateweather.pressure,"N/m²"]}}/>
        <WeatherStats {...{data:["visibility.png","Visibility",updateweather.visibility,"km"]}}/>

    </div>

</div>


