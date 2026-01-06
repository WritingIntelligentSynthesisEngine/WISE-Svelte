<script lang="ts">
  export let active: boolean = false;

  type Halo = { size: number };

  const haloList: Halo[] = [{ size: 1.2 }, { size: 1.42 }, { size: 1.66 }];
</script>

<div class="halo-box absolute flex items-center overflow-hidden">
  <div class="absolute flex items-center rounded-full inset-0">
    {#each haloList as halo}
      <div
        class="halo absolute rounded-full z-30 bg-white/8"
        class:halo-left={!active}
        class:halo-right={active}
        style="
              height: calc(var(--halo-height) * {halo.size});
              width: calc(var(--halo-width) * {halo.size});
            "
      ></div>
    {/each}
  </div>
</div>

<style>
  .halo-box {
    height: var(--box-height);
    width: var(--box-width);
    border-radius: var(--box-height);
  }

  .halo {
    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
  }

  .halo-left {
    transform: translateX(calc(-1 * var(--planet-margin)));
  }

  .halo-right {
    transform: translateX(calc(var(--box-width) - 100% + var(--planet-margin)));
  }
</style>
