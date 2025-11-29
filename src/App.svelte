<script>
  import { onMount } from "svelte";

  let backendStatus = "正在请求后端……";
  let backendMessage = "";
  let timestamp = "";

  onMount(() => {
    fetch("/api/status", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        backendStatus = data.status;
        backendMessage = data.message;
        timestamp = data.timestamp;
      })
      .catch((error) => {
        backendStatus = `error(${error.message})`;
      });
  });
</script>

<p class="text-2xl">
  <span class="font-bold">后端状态：</span>
  <span class="underline">{backendStatus}</span>
</p>

{#if backendMessage}
  <p class="text-2xl">
    <span class="font-bold">消息：</span>
    <span class="underline">{backendMessage}</span>
  </p>
  <p class="text-2xl">
    <span class="font-bold">时间：</span>
    <span class="underline">{timestamp}</span>
  </p>
{/if}
