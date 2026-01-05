<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import NeumoButton from "./NeumoButton.svelte";
  import DayNightSwitch from "./DayNightSwitch/Index.svelte";

  export let contents: readonly string[];

  let selectedIndex: number = -1;

  function handleSelect(index: number): void {
    selectedIndex = index;
  }
</script>

<div
  class="fixed flex top-0 left-0 right-0 z-50 py-2 px-2 items-center gap-4 shadow-md
         bg-white dark:bg-gray-700"
>
  {#each contents as content, index}
    <NeumoButton {content} active={index === selectedIndex} onClick={() => handleSelect(index)} />
  {/each}
  <DayNightSwitch onToggle={() => {}} />
</div>
