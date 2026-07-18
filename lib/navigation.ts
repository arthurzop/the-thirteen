export type NavigationItem = {
  label: string;
  href: string;
  icon: IconName;
  dividerBefore?: boolean;
};

export type IconName =
  | "House"
  | "Shapes"
  | "LibraryBig"
  | "Info"
  | "LayoutDashboard"
  | "LayoutGrid"
  | "Scan"
  | "Tag"
  | "Settings";

export const publicNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "House",
  },
  {
    label: "Explore",
    href: "/explore",
    icon: "Shapes",
  },
  {
    label: "Collections",
    href: "/collections",
    icon: "LibraryBig",
  },
  {
    label: "About",
    href: "/about",
    icon: "Info",
    dividerBefore: true,
  },
] as const;

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Collections", href: "/admin/collections", icon: "LibraryBig" },
  { label: "Taxonomy", href: "/admin/taxonomy", icon: "LayoutGrid" },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings",
    dividerBefore: true,
  },
];
