<script lang="ts">
  export let active: boolean = false;

  const halos: readonly string[] = ["inner", "middle", "outer"];
</script>

<div class="halo-box absolute flex items-center overflow-hidden" style="height: var(--box-height); width: var(--box-width); border-radius: var(--box-height);">
  <div class="halo-flex absolute flex items-center rounded-full inset-0">
    {#each halos as halo}
      <div class="halo-{halo} absolute rounded-full z-30" class:halo-left={!active} class:halo-right={active}></div>
    {/each}
  </div>
</div>

<style>
  .halo-inner,
  .halo-middle,
  .halo-outer {
    background-color: rgba(255, 255, 255, 0.08);
    transition: all var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
  }

  .halo-inner {
    height: calc(var(--halo-height) * 1.2);
    width: calc(var(--halo-width) * 1.2);
  }

  .halo-middle {
    height: calc(var(--halo-height) * 1.42);
    width: calc(var(--halo-width) * 1.42);
  }

  .halo-outer {
    height: calc(var(--halo-height) * 1.66);
    width: calc(var(--halo-width) * 1.66);
  }

  .halo-left {
    transform: translateX(calc(-1 * var(--planet-margin)));
  }

  .halo-right {
    transform: translateX(calc(var(--box-width) - 100% + var(--planet-margin)));
  }
</style>
