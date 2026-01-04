<!-- src/components/NeumoButton.svelte -->
<script lang="ts">
  type Props = {
    content: string;
    active?: boolean;
    onClick?: () => void;
  };

  const { content, active = false, onClick }: Props = $props();
</script>

<div
  class="w-28 h-10 z-10 flex justify-center items-center rounded-full
         neumo-button cursor-pointer transition-all duration-300 ease-in-out
         bg-white dark:bg-gray-700"
  class:active
  role="button"
  tabindex="0"
  onclick={() => onClick?.()}
  onkeydown={(e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  }}
>
  <p
    class="relative z-20 font-sans font-semibold tracking-wide select-none
           text-black dark:text-gray-300"
  >
    {content}
  </p>
</div>

<style>
  .neumo-button {
    --shadow-base: 12px 12px 24px rgba(0, 0, 0, 0.2);
    --shadow-hover: 18px 18px 30px rgba(0, 0, 0, 0.3);
    --shadow-active: 6px 6px 12px rgba(0, 0, 0, 0.1), inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9);
    box-shadow: var(--shadow-base);

    &.active {
      box-shadow: var(--shadow-active);
    }

    &:not(.active):hover {
      box-shadow: var(--shadow-hover);
    }
  }

  :global(.dark) .neumo-button {
    --shadow-base: 12px 12px 24px rgba(0, 0, 0, 0.4);
    --shadow-hover: 18px 18px 30px rgba(0, 0, 0, 0.6);
    --shadow-active: 6px 6px 12px rgba(0, 0, 0, 0.2), inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.1);
  }
</style>
