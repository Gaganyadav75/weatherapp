
<script lang="ts">
  import { monthsarry } from "$lib";

  // all props to show on ui of forecaste date wise card

	export let temperature:any;
	export let description:any;
	export let date:any;
	export let icon:any;



</script>


<div
class="eachdatecard min-w-0 p-5 justify-between flex items-center rounded-lg shadow-xs transition-all overflow-hidden 
hover:scale-105 dark:hover:bg-white dark:hover:text-black
bg-gray-500 dark:bg-gray-800 dark:text-white 
group-[.is-active]:bg-gray-700 
hover:bg-gray-700 
dark:group-[.is-active]:bg-gray-200 
group-[.is-active]:text-white 
group-[.is-active]:scale-105
dark:group-[.is-active]:text-black 
dark:group-[is-active]:text-white "
>
  <div class=" flex  items-center">
      <div
        class="p-1 rounded-full text-teal-500 dark:text-teal-100    bg-teal-100 dark:bg-teal-500 mr-4"
        >
        <img class="w-9 h-9" src={icon} alt="#Icon" placeholder="#Icon">
      </div>

      <div class="text-left">
          <p class="mb-2 text-sm font-medium ">
              {description}
          </p>

          <p class="text-lg font-semibold ">{temperature}</p>
      </div>

  </div>

  <div>
    <span>{monthsarry[Number(date.split('-')[1])]} { date.split('-')[2]}</span>
  </div>

</div>