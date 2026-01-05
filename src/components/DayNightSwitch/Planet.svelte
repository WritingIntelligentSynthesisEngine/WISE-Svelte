<!-- src/components/DayNightSwitch/components/Planet.svelte -->
<script lang="ts">
  export let active = false;

  // 月球陨石坑数据
  type Crater = { id: number; size: number; top: string; left: string };
  const craterList: readonly Crater[] = [
    { id: 1, size: 0.18, top: "15%", left: "38%" },
    { id: 2, size: 0.32, top: "46%", left: "13%" },
    { id: 3, size: 0.22, top: "61%", left: "61%" },
  ];
</script>

<!-- 太阳/月亮球体 -->
<div class="absolute rounded-full" style="height: var(--planet-size); width: var(--planet-size);">
  <div class="planet-gradient absolute rounded-full z-50" style="height: var(--planet-size); width: var(--planet-size);" class:to-left={!active} class:to-right={active}>
    <!-- 太阳 -->
    <div class="sun absolute rounded-full z-10" style="height: var(--planet-size); width: var(--planet-size);" class:hidden={active}></div>

    <!-- 月亮 -->
    <div class="moon planet-rotate absolute rounded-full z-10" style="height: var(--planet-size); width: var(--planet-size);" class:hidden={!active}>
      {#each craterList as crater}
        <div
          class="moon-crater absolute rounded-full"
          style="
                height: calc(var(--planet-size) * {crater.size});
                width: calc(var(--planet-size) * {crater.size});
                top: {crater.top};
                left: {crater.left};
              "
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .to-left {
    transform: translateX(var(--planet-margin));
  }

  .to-right {
    transform: translateX(calc(var(--box-width) - var(--planet-size) - var(--planet-margin)));
  }

  .planet-gradient {
    box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.6);
    transition: transform var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
  }

  .sun {
    background-color: rgb(243, 198, 43);
  }

  .moon {
    background-color: rgb(195, 201, 211);
  }

  .moon-crater {
    background-color: rgb(145, 151, 165);
  }

  .sun,
  .moon {
    box-shadow:
      inset 0.3em 0.3em 0.3em rgba(255, 255, 255, 0.8),
      inset -0.3em -0.3em 1em rgba(0, 0, 0, 0.4);
  }

  .planet-rotate {
    animation: planet-rotate 30s linear infinite;
  }

  @keyframes planet-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
