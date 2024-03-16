<script lang="ts">

    import Search from "./search.svelte";
    import { selectedDateTime } from "../stores/store";
    import { dayarray,monthsarry } from "$lib";


    // subscribed to selected Date and store the date in date variable if there is no date by default it has current date to show

    let date:Date=new Date()

    selectedDateTime.subscribe((value)=>{
        if (value) {
            let dt = value.date.split('-')
           date = new Date(Number(dt[0]),Number(dt[1])-1,Number(dt[2]))
        }
    })


</script>

<header class=" h-[135px] md:h-[100px] flex md:justify-between items-center flex-col md:flex-row md:gap-10  p-3 w-full 
text-black dark:text-white bg-gray-300 dark:bg-gray-900">
    
    <div class="flex justify-start flex-col pr-5">

        <h1 class="inline text-3xl font-semibold">
            {monthsarry[date.getMonth()]+"  " +date.getFullYear()} 
        </h1>
        <p class="inline" >
            {dayarray[date.getDay()] +", "+ monthsarry[date.getMonth()].substring(0,3).toLowerCase() + " " + date.getDate()+", " +date.getFullYear()}
        </p>

    </div>

    <div class="max-w-md w-[100%] flex flex-col dark:text-black bg-gray-300 dark:bg-gray-900 text-white">
        <Search/>
    </div>

</header>