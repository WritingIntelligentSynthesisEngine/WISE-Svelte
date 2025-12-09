<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  interface ErrorDetail {
    field: string;
    message: string;
  }

  interface StatusResponse {
    message: string;
    data: string | null;
    errors: ErrorDetail | null;
    timestamp: string;
  }

  let statusMessage: string = "正在请求后端……";
  let statusData: string | null = null;
  let statusErrors: ErrorDetail | null = null;
  let statusTimestamp: string | null = null;

  onMount(() => {
    fetch("/api/status", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response: Response) => {
        return response.json() as Promise<StatusResponse>;
      })
      .then((data: StatusResponse) => {
        statusMessage = data.message;
        statusData = data.data;
        statusErrors = data.errors;
        statusTimestamp = dayjs(data.timestamp).format("YYYY年MM月DD日HH时mm分ss秒");
      })
      .catch((error: Error) => {
        statusMessage = "error";
        statusErrors = {
          field: "network",
          message: `${error.message}`,
        };
        statusTimestamp = dayjs().format("YYYY年MM月DD日HH时mm分ss秒");
      });
  });
</script>

<p class="text-2xl">
  <span class="font-bold">消息：</span>
  <span class="underline">{statusMessage}</span>
</p>

{#if statusData}
  <p class="text-2xl">
    <span class="font-bold">数据：</span>
    <span class="underline">{statusData}</span>
  </p>
{/if}

{#if statusErrors}
  <p class="text-2xl text-red-500">
    <span class="font-bold">错误：</span>
    <span class="underline">{statusErrors.message}</span>
    <span class="font-bold">字段：</span>
    <span class="underline">{statusErrors.field}</span>
  </p>
{/if}

{#if statusTimestamp}
  <p class="text-2xl">
    <span class="font-bold">时间：</span>
    <span class="underline">{statusTimestamp}</span>
  </p>
{/if}
