
export type NavigationItem = {
  label: string;
  href: string;
  icon: IconName;
  dividerBefore?: boolean
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
    dividerBefore: true
  },
] as const;

export const adminNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Collections",
    href: "/admin/Collections",
    icon: "LibraryBig",
  },
  {
    label: "Types",
    href: "/admin/types",
    icon: "LayoutGrid",
  },
  {
    label: "Areas",
    href: "/admin/areas",
    icon: "Scan",
  },
  {
    label: "Tags",
    href: "/admin/tags",
    icon: "Tag",
  },
  {
    label: "Settings",
    href: "/admin/Settings",
    icon: "Settings",
    dividerBefore: true
  },
];
