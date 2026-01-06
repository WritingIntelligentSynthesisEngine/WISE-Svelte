<!-- App.svelte -->
<script lang="ts">
  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";

  import Home from "./routes/Home.svelte";

  const routes: RouteConfig[] = [
    {
      component: Home,
    },
  ];
</script>

<Router {routes} />
