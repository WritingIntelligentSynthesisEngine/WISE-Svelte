export type NavbarItem = {
  name: string;
  path: string;
};

export const navbarItems: NavbarItem[] = [
  { name: "分类", path: "/category" },
  { name: "排行", path: "/rank" },
  { name: "写作", path: "/write" },
];
