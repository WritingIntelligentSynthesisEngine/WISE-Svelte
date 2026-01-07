<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import { goto } from "@mateothegreat/svelte5-router";

  import { navbarItems } from "../lib/config/navbar-config";

  import NeumoButton from "./NeumoButton.svelte";
  import DayNightSwitch from "./DayNightSwitch/Index.svelte";

  // 导航栏选中索引
  let selectedIndex: number = $state(-1);

  // 收起状态
  let isCollapsed: boolean = $state(false);

  // 鼠标悬浮状态
  let isHovered: boolean = $state(false);

  // 监听路由变化, 更新选中索引
  $effect(() => {
    const pathname = window.location.pathname;
    selectedIndex = navbarItems.findIndex((item) => item.path === pathname);
  });

  // 导航栏点击项
  function handleSelect(index: number): void {
    selectedIndex = index;
    goto(navbarItems[index].path);
  }

  // 收起/展开导航栏
  function toggleCollapse(): void {
    isCollapsed = !isCollapsed;
  }

  // 导航栏鼠标悬浮状态
  function handleMouseEnter(): void {
    isHovered = true;
  }

  // 导航栏鼠标移出状态
  function handleMouseLeave(): void {
    isHovered = false;
  }
</script>

<div
  class="
        fixed flex flex-col top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-700
      "
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="navigation"
>
  <!-- 导航栏主体 -->
  <div
    class="
          flex py-2 px-2 items-center gap-4 w-full
          shadow-md transition-all duration-300 ease-in-out
          {isCollapsed ? 'absolute -translate-y-full' : ''}
        "
    class:collapsed={isCollapsed}
  >
    {#if !isCollapsed}
      {#each navbarItems as content, index}
        <NeumoButton content={content.name} active={index === selectedIndex} onClick={() => handleSelect(index)} />
      {/each}
    {/if}
    <div class="ml-auto">
      <DayNightSwitch />
    </div>
  </div>
  <!-- 收起/展开按钮 -->
  <div
    class="
      w-full {isHovered ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0'}
      bg-linear-to-r cursor-pointer transition-all duration-300 ease-in-out
      from-transparent via-gray-200 to-transparent dark:from-gray-800 dark:via-transparent dark:to-gray-800
    "
    onclick={toggleCollapse}
    role="button"
    tabindex="0"
    onkeydown={(e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCollapse();
      }
    }}
  >
    <div class="flex justify-center items-center h-full">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 text-gray-600 dark:text-gray-400">
        {#if isCollapsed}
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        {/if}
      </svg>
    </div>
  </div>
</div>
