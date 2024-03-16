<script lang="ts">
  import type { WeatherStructure } from "$lib/weatherInfo";
  import { onMount } from "svelte";
  import { selectedDateTime, weatherStoredData } from "../stores/store";
  import ForecasteEachCard  from "./forecasteEachCard.svelte";


  interface eachDate{
        date:string;
        description:string;
        temperature:string;
        icon:string;
  }

  //subscribed to Weatherdata store all date in array of named dataforEachDate

  let DataforEachDate:Array<eachDate>=[];

  weatherStoredData.subscribe((value:Array<WeatherStructure>)=>{
  DataforEachDate = value[0].list.map(ele=>{
    return {
        date:ele.date,
        description:ele.list[0].description,
        temperature:ele.list[0].temperature,
        icon:ele.list[0].icon.substring(0,2)+".png"
      }
})
  })


// on forecaste card click it update all required data in store

  
  function dateChange(item:eachDate){
    ActiveCard(item.date)
    selectedDateTime.update((value)=>{
      return {...value,date:item.date}
    })

  }


  function ActiveCard(val:string){
    let elements= document.querySelectorAll(".eachdatebutton")
      elements.forEach(ele=>{
      if (ele.getAttribute("id")==val) {
      ele.classList.add("is-active") 
      }else{
      ele.classList.remove("is-active") 
      }
    })
  }

  onMount(()=>{
    ActiveCard(DataforEachDate[0].date)
  })


</script>


<div class="rounded-xl grid h-full md:h-[calc(100vh-120px)] overflow-y-scroll gap-8 mb-8 p-6 md:grid-cols-1 dark:bg-gray-700 bg-gray-200">


    <div>
        <h1 class="dark:text-white text-black text-2xl ">
          forecast weather</h1>
    </div>

    {#each DataforEachDate as item}
    <button id={item.date} class="group eachdatebutton" on:click={()=>{
      dateChange(item)
    }}>
      <ForecasteEachCard {...item} />
    </button>

    {/each}


</div>