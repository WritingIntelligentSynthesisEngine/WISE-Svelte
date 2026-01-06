<!-- src/App.svelte -->
<script lang="ts">
  import Navbar from "../components/Navbar.svelte";

  const navbarContents: readonly string[] = ["分类", "排行", "写作"];
</script>

<Navbar contents={navbarContents} />

<style>
  /* 全局样式 */
  :global(body) {
    background-color: white;
    color: black;
  }

  :global(.dark body) {
    background-color: #1f2937;
    color: white;
  }
</style>
