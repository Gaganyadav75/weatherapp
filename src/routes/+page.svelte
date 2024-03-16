<script lang="ts">

  import CurrentWeather from "../components/currentWeather.svelte";
  import ForecasteWeather from "../components/forecasteWeather.svelte";
  import LoadingBar from "../components/loadingBar.svelte";
  import { Loading, weatherStoredData } from "../stores/store";
  import type { WeatherStructure } from "$lib/weatherInfo";

  //subscribed to weather data and return requied data in data variable

  let data:Array<WeatherStructure>=[];

  weatherStoredData.subscribe(
    (value:Array<WeatherStructure>)=>{
        data = value
    })


    // subscribed to Loading State when it chagne it store a value in loding varibale

  let loading:boolean;

  Loading.subscribe(value=>{
    loading = value
  })



</script>


{#if data.length>0 && !loading}

<CurrentWeather/>

<ForecasteWeather/>

{:else}
<LoadingBar/> 

{/if}
