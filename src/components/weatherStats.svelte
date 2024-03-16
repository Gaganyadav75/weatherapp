

<script lang="ts">

//data prop to show on ui on render
  export let data:Array<string>

    
</script>

<div
class="min-w-0 p-5 justify-between flex items-end rounded-lg shadow-xs transition-all overflow-hidden hover:scale-105  bg-gray-400 dark:bg-gray-800"
>
<div class=" flex  items-center">
  <div
    class="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4"
  >
    <img class="w-5 h-5" src={data[0]} alt="$stats">
  </div>

  <div>
    <p class="mb-2 text-sm font-medium ">
      {data[1]}
    </p>
    <p class="text-lg font-semibold"> {data[2]}</p>
  </div>

</div>
<div>
    <span class="">{data[3]}</span>
</div>
</div>