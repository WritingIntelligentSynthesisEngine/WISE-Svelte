<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import { goto } from "@mateothegreat/svelte5-router";

  import NeumoButton from "./NeumoButton.svelte";
  import DayNightSwitch from "./DayNightSwitch/Index.svelte";

  interface NavItem {
    name: string;
    path: string;
  }

  interface Props {
    route?: { path: { pathname: string } };
  }

  let { route }: Props = $props();

  const navbarContents: NavItem[] = [
    { name: "分类", path: "/category" },
    { name: "排行", path: "/rank" },
    { name: "写作", path: "/write" },
  ];

  let selectedIndex: number = $state(-1);

  $effect(() => {
    const pathname = route?.path?.pathname ?? "/";
    const index = navbarContents.findIndex((item) => item.path === pathname);
    selectedIndex = index !== -1 ? index : -1;
  });

  function handleSelect(index: number): void {
    selectedIndex = index;
    goto(navbarContents[index].path);
  }
</script>

<div
  class="fixed flex top-0 left-0 right-0 z-50 py-2 px-2 items-center gap-4 shadow-md
         bg-white dark:bg-gray-700"
>
  {#each navbarContents as content, index}
    <NeumoButton content={content.name} active={index === selectedIndex} onClick={() => handleSelect(index)} />
  {/each}
  <div class="ml-auto">
    <DayNightSwitch onToggle={() => {}} />
  </div>
</div>
