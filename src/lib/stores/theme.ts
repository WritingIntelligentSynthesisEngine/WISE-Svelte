import { writable } from "svelte/store";

type Theme = "light" | "dark";

const defaultTheme: Theme = "dark";

// 创建响应式存储, 可以在 Svelte 组件中通过 $theme 语法访问和自动订阅更新
export const theme = writable<Theme>(getTheme());
// 只有在浏览器环境中才设置订阅和 DOM 操作
if (typeof window !== "undefined") {
  // 订阅存储的变化, 每当 theme 改变时执行此回调
  theme.subscribe((value) => {
    // 将新主题值持久化到 localStorage
    localStorage.setItem("theme", value);
    // 根据主题值更新 HTML 元素的 CSS 类
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
}

// 获取主题
function getTheme(): Theme {
  // 服务器端直接返回默认主题
  if (typeof window === "undefined") {
    return defaultTheme;
  }
  const stored: string | null = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : defaultTheme;
}

// 切换主题
export function toggleTheme(): void {
  // 使用 update 方法获取当前值并返回新值
  theme.update((current) => (current === "light" ? "dark" : "light"));
}

// 设置主题
export function setTheme(value: Theme): void {
  // 使用 set 方法直接设置新值
  theme.set(value);
}
