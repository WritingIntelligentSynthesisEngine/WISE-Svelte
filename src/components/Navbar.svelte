<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import { goto } from "@mateothegreat/svelte5-router";

  import NeumoButton from "./NeumoButton.svelte";
  import DayNightSwitch from "./DayNightSwitch/Index.svelte";

  type NavItem = {
    name: string;
    path: string;
  };

  const navbarContents: NavItem[] = [
    { name: "分类", path: "/category" },
    { name: "排行", path: "/rank" },
    { name: "写作", path: "/write" },
  ];

  let selectedIndex: number = $state(-1);

  // 监听路由变化, 更新选中项
  $effect(() => {
    const pathname = window.location.pathname;
    const index = navbarContents.findIndex((item) => item.path === pathname);
    selectedIndex = index !== -1 ? index : -1;
  });

  // 处理点击事件, 切换选中项并跳转路由
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
