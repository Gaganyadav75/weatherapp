<script lang="ts">
  import { fetchCurrentWeather } from "$lib/weatherInfo";
  import type { WeatherStructure} from "$lib/weatherInfo";
  import { onMount } from "svelte";
  import { weatherStoredData } from "../stores/store";

  // it handle the submit if there are data in input field otherwise it alert the user to fill input

    const handleSubmit = (e:SubmitEvent)=>{
        e.preventDefault()
        let inputValue = document.getElementById("location") as HTMLInputElement
if (inputValue.value.length>0) {
    fetchCurrentWeather("q="+inputValue.value).then((data:WeatherStructure)=>{
            weatherStoredData.set([data])
    }).catch((err)=>{
        console.log(err);
        alert("something went wrong")
        
    })

    inputValue.value = ""

}
else{
    alert("Please Enter zip-code")
}
       
    };
  
      // it handle the input feild to whether to show nearyby location weather or input location weather button

    const handleInput = (e:Event)=>{
        let ele = e.target as HTMLInputElement;
        let search =  document.querySelector(".serachbar");
        let currentlocationsearch = document.querySelector(".currentlocationsearch");
        if (ele.value === '') {
            search?.classList.add("hidden");
            currentlocationsearch?.classList.remove("hidden");
        } else {
            search?.classList.remove("hidden");
            currentlocationsearch?.classList.add("hidden");
      
        }
    };


    //it fetch the location of users device and call the api with that data

    const currentLocationWeather = ()=>{
        window.navigator.geolocation.getCurrentPosition((position)=>{
            // fetch weather info when user allow location permision to windows
            fetchCurrentWeather(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then((data:WeatherStructure)=>{
                 weatherStoredData.set([data])
             }).catch((err)=>{
                console.log(err)
            alert("Something went wrong")
             })
        
        },(error)=>{
           console.log(error)
           alert("Please allow location permission")
        })
    }

    // on element render currentlocation function called auto

    onMount(()=>{
        currentLocationWeather()
    })

  </script>



  
  <form class="w-full m-2 md:mr-[50%]" on:submit|preventDefault={handleSubmit}>

      <div class="flex justify-center items-center gap-1 relative w-full">
       
          <input 
            id="location"
              type="text" 
              class="locationinput p-2 rounded-xl w-full bg-gray-900 dark:bg-white dark:text-black text-white dark:focus-within:text-black focus-within:text-white" 
              name="location" 
              placeholder="Enter location"
              on:input={handleInput}
          />
          
        <div class="search absolute right-0 rounded-lg p-1 grid place-items-center h-full">
            <button title="search" type="submit" class="serachbar rounded-lg bg-green-600  p-1 z-10 hidden opacity-0 transition-opacity duration-300 text-white text-center">
                    Search
            </button>

            <button type="button" on:click={currentLocationWeather} class="currentlocationsearch rounded-lg bg-green-600 pr-2 pl-2  h-8 w-8 z-10 transition-opacity duration-300 text-black">
                <img src="currentlocation.png" alt="#" title="weather nearby" class=" w-full" />
            </button>
    
        </div>
       
      </div>
  
  </form>


  <style>
    @keyframes inandoutopacity{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 100%;
        }
    }
    .serachbar,.currentlocationsearch{
        animation: inandoutopacity 1s ease-in-out forwards;
    }
  </style>
  