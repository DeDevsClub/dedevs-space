import React from "react";

import { Icon } from "@iconify/react";
import type { NavDocument, NavMainItem, NavSecondaryItem } from "./types";

export const navMain: NavMainItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <Icon icon="lucide:layout-dashboard" />,
  },
];

export const navDocuments: NavDocument[] = [
  {
    name: "Academy",
    url: "/academy",
    icon: <Icon icon="lucide:graduation-cap" />,
  },
];

export const navSecondary: NavSecondaryItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings", 
    icon: <Icon icon="lucide:settings" />,
  },
];
