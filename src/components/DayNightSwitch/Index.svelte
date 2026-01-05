<!-- src/components/DayNightSwitch/Index.svelte -->
<script lang="ts">
  import Sky from "./Sky.svelte";
  import Halo from "./Halo.svelte";
  import Planet from "./Planet.svelte";
  import { theme, toggleTheme } from "../../lib/stores/theme";

  // 事件发射器
  export let onToggle: ((event: { detail: boolean }) => void) | undefined = undefined;

  // 响应式状态
  // 切换球体状态
  function toggleStatus() {
    toggleTheme();

    // 触发事件
    if (onToggle) {
      onToggle({ detail: $theme === "dark" });
    }
  }
</script>

<div
  class="flex shrink-0 relative z-10 overflow-hidden items-center align-items-center
         day-night-switch cursor-pointer"
  role="button"
  tabindex="0"
  onclick={toggleStatus}
  onkeydown={(e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleStatus();
    }
  }}
>
  <Sky active={$theme === "dark"} />
  <Halo active={$theme === "dark"} />
  <Planet active={$theme === "dark"} />
</div>

<style>
  .day-night-switch {
    --box-height: 2rem;
    --box-width: calc(var(--box-height) * 2);
    --planet-size: calc(var(--box-height) * 0.8);
    --planet-margin: calc(var(--box-height) * 0.1);
    --star-size: calc(var(--box-height) * 0.1);
    --near-cloud-size: calc(var(--box-height) * 1.3333);
    --far-cloud-size: calc(var(--box-height) * 1);
    --opacity-duration: 0.3s;
    --move-duration: 0.5s;
    --sky-duration: 0.5s;
    --near-cloud-duration: 0.5s;
    --far-cloud-duration: 0.5s;

    height: var(--box-height);
    width: var(--box-width);
    clip-path: inset(0 round var(--box-height));
    font-size: calc(var(--box-height) / 10);
    border-radius: calc(var(--box-height) / 2);
  }
</style>
