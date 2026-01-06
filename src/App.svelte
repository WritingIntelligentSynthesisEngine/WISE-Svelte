<!-- App.svelte -->
<script lang="ts">
  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";

  import Home from "./routes/Home.svelte";
  import Category from "./routes/Category.svelte";
  import Rank from "./routes/Rank.svelte";
  import Write from "./routes/Write.svelte";

  const routes: RouteConfig[] = [
    {
      component: Home,
    },
    {
      path: "/category",
      component: Category,
    },
    {
      path: "/rank",
      component: Rank,
    },
    {
      path: "/write",
      component: Write,
    },
    // {
    //   path: "*",
    //   component: Home,
    // },
  ];
</script>

<Router {routes} />
