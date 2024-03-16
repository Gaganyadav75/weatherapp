<script lang="ts">
  import Header from "../components/header.svelte";
  import Mode from "../components/mode.svelte";
  import "./global.css"


</script>




<div class="relative maintopdiv dark w-[100vw] h-[100vh]">
    <Header/>

    <div class="md:grid-cols-[1fr,0.6fr] relative gap-3 h-full grid-cols-1 grid overflow-y-scroll  p-3 w-full  
    dark:text-black bg-gray-400 dark:bg-gray-800 text-white">
        <slot/>

    </div>


    <Mode/>

</div>



