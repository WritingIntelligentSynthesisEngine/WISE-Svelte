<!-- src/components/DayNightSwitch/components/Sky.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  export let active: boolean = false;

  type Cloud = {
    size: number;
    top: string;
    right: string;
  };

  type Star = {
    id: number;
    size: number;
    top: string;
    left: string;
    delay: number;
  };

  type Meteor = {
    id: number;
    verticalOffset: number;
    delay: number;
  };

  // 内部动画状态
  let shakeActive: boolean = false;
  let meteorActive: boolean = false;

  // 近处云朵数据
  const cloudNearList: Cloud[] = [
    { size: 1.2, top: "15%", right: "-13%" },
    { size: 1.3, top: "39%", right: "-5%" },
    { size: 1.0, top: "66%", right: "5%" },
    { size: 1.5, top: "80%", right: "26%" },
    { size: 1.2, top: "75%", right: "38%" },
    { size: 1.3, top: "83%", right: "55%" },
    { size: 1.3, top: "89%", right: "68%" },
  ];

  // 远处云朵数据
  const cloudFarList: Cloud[] = [
    { size: 1.2, top: "2%", right: "-5%" },
    { size: 1.4, top: "25%", right: "5%" },
    { size: 1.0, top: "37%", right: "10%" },
    { size: 1.5, top: "58%", right: "30%" },
    { size: 1.2, top: "55%", right: "38%" },
    { size: 1.3, top: "70%", right: "57%" },
    { size: 1.1, top: "77%", right: "66%" },
  ];

  // 星星数据
  const starList: Star[] = [
    { id: 0, size: 1.5, top: "13%", left: "20%", delay: 0.1 },
    { id: 1, size: 0.5, top: "28%", left: "10%", delay: 0.7 },
    { id: 2, size: 0.7, top: "43%", left: "22%", delay: 0.3 },
    { id: 3, size: 0.3, top: "68%", left: "15%", delay: 1.1 },
    { id: 4, size: 0.2, top: "75%", left: "11%", delay: 0.5 },
    { id: 5, size: 0.4, top: "78%", left: "22%", delay: 0.9 },
    { id: 6, size: 1.3, top: "21%", left: "53%", delay: 0.2 },
    { id: 7, size: 0.4, top: "20%", left: "42%", delay: 0.8 },
    { id: 8, size: 0.4, top: "48%", left: "37%", delay: 1.3 },
    { id: 9, size: 0.6, top: "53%", left: "52%", delay: 0.4 },
    { id: 10, size: 0.8, top: "73%", left: "46%", delay: 1.0 },
  ];

  // 流星数据
  const meteorList: Meteor[] = [
    { id: 0, verticalOffset: 0, delay: 0 },
    { id: 1, verticalOffset: -0.05, delay: 0.4 },
    { id: 2, verticalOffset: -0.1, delay: 0.2 },
  ];

  // 启动白天动画(云朵摇晃)
  function startDayAnimations() {
    meteorActive = false;
    shakeActive = true;
  }

  // 启动夜晚动画(流星坠落)
  function startNightAnimations() {
    meteorActive = true;
    shakeActive = false;
  }

  // 根据 ballStatus 更新动画
  $: if (typeof document !== "undefined") {
    if (active) {
      startNightAnimations();
    } else {
      startDayAnimations();
    }
  }

  // 组件挂载时初始化动画
  onMount(() => {
    if (active) {
      startNightAnimations();
    } else {
      startDayAnimations();
    }
  });
</script>

<!-- 内阴影 -->
<div class="sky-size inner-shadow absolute rounded-full z-40"></div>

<!-- 背景色过渡 -->
<div class="sky-size sky-transition absolute" class:bg-blue-500={!active} class:bg-gray-900={active}></div>

<!-- 星星与云朵容器 -->
<div class="sky-size absolute overflow-hidden">
  <!-- 星星容器 -->
  <div class="sky-size star-box absolute" class:star-move={!active}>
    <!-- 星星 -->
    {#each starList as star}
      <div
        class="star absolute flex items-center justify-center"
        style="
            height: calc(var(--star-size) * {star.size});
            width: calc(var(--star-size) * {star.size});
            top: {star.top};
            left: {star.left};
            animation-delay: {star.delay}s;
          "
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M50,0 C62.5,37.5 62.5,37.5 100,50 C62.5,62.5 62.5,62.5 50,100 C37.5,62.5 37.5,62.5 0,50 C37.5,37.5 37.5,37.5 50,0" fill="white" />
        </svg>
      </div>
    {/each}

    <!-- 流星 -->
    {#each meteorList as meteor}
      <div
        class="meteor absolute rounded-full bg-linear-to-b from-transparent w-[1%] h-1/2 to-white"
        class:meteor-fall={meteorActive}
        style="
            --meteor-vertical-offset: {meteor.verticalOffset};
            transform: translate(
              calc(var(--box-height) * 1.5),
              calc(var(--box-height) * ({meteor.verticalOffset} - 0.5))
            ) rotate(255deg);
            animation-delay: {meteor.delay}s;
          "
      ></div>
    {/each}
  </div>

  <!-- 云朵容器 -->
  <div class="sky-size cloud-box absolute">
    <!-- 近处云朵 -->
    <div class="sky-size cloud-near absolute z-20" class:cloud-far-move={active}>
      {#each cloudNearList as cloud}
        <div
          class="absolute rounded-full bg-white z-20 {shakeActive ? 'cloud-near-shake' : ''}"
          style="
                height: calc(var(--near-cloud-size) / {cloud.size});
                width: calc(var(--near-cloud-size) / {cloud.size});
                top: {cloud.top};
                right: {cloud.right};
              "
        ></div>
      {/each}
    </div>

    <!-- 远处云朵 -->
    <div class="sky-size cloud-far absolute z-10" class:cloud-far-move={active}>
      {#each cloudFarList as cloud}
        <div
          class="absolute rounded-full bg-sky-200 z-10 {shakeActive ? 'cloud-far-shake' : ''}"
          style="
                height: calc(var(--far-cloud-size) / {cloud.size});
                width: calc(var(--far-cloud-size) / {cloud.size});
                top: {cloud.top};
                right: {cloud.right};
              "
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* 天空容器 */
  .sky-size {
    height: var(--box-height);
    width: var(--box-width);
  }

  .inner-shadow {
    border-radius: calc(var(--box-height) / 2);
    box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.6);
  }

  .sky-transition {
    transition: background-color var(--sky-duration);
  }

  /* 星星容器移动效果 */
  .star-box {
    transition: transform var(--move-duration) cubic-bezier(0.26, 0.97, 0.2, 1.08);
  }

  .star-move {
    transform: translateY(-100%);
  }

  /* 流星 */
  .meteor {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    transform: translate(calc(var(--box-height) * 1.75), calc(var(--box-height) * -0.35)) rotate(255deg);
    box-shadow: 0 0 0px rgba(255, 255, 255, 0.8);
  }

  /* 近处云朵容器 */
  .cloud-near {
    transition: transform var(--near-cloud-duration) cubic-bezier(0.49, 1.57, 0.04, 0.83);
  }

  /* 远处云朵容器 */
  .cloud-far {
    transition: transform var(--far-cloud-duration) cubic-bezier(0.49, 1.57, 0.28, 0.81);
  }

  /* 云朵移动效果 */
  .cloud-far-move {
    transform: translateY(100%);
  }

  .cloud-near-shake {
    animation: cloud-near-shake 3s linear infinite;
  }

  /* 近处云朵摇晃动画 */
  @keyframes cloud-near-shake {
    0%,
    100% {
      transform: translateY(0);
    }
    30%,
    70% {
      transform: translateY(2.8%);
    }
    42%,
    58% {
      transform: translateY(3.6%);
    }
    50% {
      transform: translateY(4%);
    }
  }

  .cloud-far-shake {
    animation: cloud-far-shake 4s linear infinite;
  }

  /* 远处云朵摇晃动画 */
  @keyframes cloud-far-shake {
    0%,
    100% {
      transform: translateY(0);
    }
    36%,
    64% {
      transform: translateY(3%);
    }
    50% {
      transform: translateY(4%);
    }
  }

  .meteor-fall {
    animation: meteor-fall 6s linear infinite;
  }

  /* 流星坠落动画 */
  @keyframes meteor-fall {
    0%,
    20% {
      transform: translate(calc(var(--box-height) * 1.75), calc(var(--box-height) * (var(--meteor-vertical-offset) - 0.35))) rotate(255deg);
    }
    40%,
    100% {
      transform: translate(calc(var(--box-height) * -0.625), calc(var(--box-height) * (var(--meteor-vertical-offset) + 0.3))) rotate(255deg);
    }
  }

  .star {
    transition: var(--twinkle-duration);
    animation: star-twinkle 3s ease-in-out infinite;
  }

  /* 星星闪烁效果 */
  @keyframes star-twinkle {
    0%,
    60% {
      opacity: 1;
    }
    30% {
      opacity: 0.7;
    }
    60%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    80% {
      opacity: 0.3;
      transform: scale(0.8);
    }
  }
</style>
