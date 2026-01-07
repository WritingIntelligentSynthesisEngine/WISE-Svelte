<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import { goto } from "@mateothegreat/svelte5-router";

  import { navbarItems } from "../lib/config/navbar-config";

  import NeumoButton from "./NeumoButton.svelte";
  import DayNightSwitch from "./DayNightSwitch/Index.svelte";

  // 导航栏选中索引
  let selectedIndex: number = $state(-1);

  // 监听路由变化，更新选中索引
  $effect(() => {
    const pathname = window.location.pathname;
    selectedIndex = navbarItems.findIndex((item) => item.path === pathname);
  });

  function handleSelect(index: number): void {
    selectedIndex = index;
    goto(navbarItems[index].path);
  }
</script>

<div
  class="fixed flex top-0 left-0 right-0 z-50 py-2 px-2 items-center gap-4 shadow-md
         bg-white dark:bg-gray-700"
>
  {#each navbarItems as content, index}
    <NeumoButton content={content.name} active={index === selectedIndex} onClick={() => handleSelect(index)} />
  {/each}
  <div class="ml-auto">
    <DayNightSwitch />
  </div>
</div>
