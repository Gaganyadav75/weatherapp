
<script lang="ts">

  //it toggle the darkmode or light mode in the ui

function modeswitch(){
  document.querySelector(".maintopdiv")!.classList.toggle("dark")
}

</script>


    <button 
    class="modeswitch z-50 w-8 h-8 overflow-hidden absolute bottom-2 left-3 bg-white rounded-xl"
    on:click={modeswitch}
    >
        <img class="dark:hidden w-full h-full" src="https://img.icons8.com/?size=25&id=9313&format=png" alt="Day"/>
        <img class="dark:flex w-full h-full " src="https://img.icons8.com/?size=25&id=xlD3xOrQjTJO&format=png" alt="Night"/>

    </button>

