import {
  Tag,
  Users,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Settings
} from "lucide-react";
import { GearIcon } from "@radix-ui/react-icons";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/cds-sellers",
          label: "Sellers",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       icon: Tag
    //     }
    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}