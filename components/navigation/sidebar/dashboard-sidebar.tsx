"use client";

import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export function DashboardSidebar({ username }: { username: string }) {
  return (
    <Sidebar>
      {/* Top-level navigation */}
      <nav className="flex flex-col gap-2 p-2">
        <Link href={`/dashboard`} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
          <Icon icon="mdi:home" className="text-primary w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href={`/profile/${username}`} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
          <Icon icon="mdi:account-circle-outline" className="text-primary w-5 h-5" />
          <span className="font-medium">View Profile</span>
        </Link>

        {/* Collapsible: Learn */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <Icon icon="mdi:school-outline" className="text-blue-500 w-5 h-5" />
            <span className="font-medium flex-1 text-left">Learn</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 flex flex-col gap-1">
            <Link href="/dashboard/learn/courses" className="block px-2 py-1 rounded hover:bg-muted">Courses</Link>
            <Link href="/dashboard/learn/resources" className="block px-2 py-1 rounded hover:bg-muted">Resources</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Content */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <Icon icon="mdi:file-document-outline" className="text-emerald-500 w-5 h-5" />
            <span className="font-medium flex-1 text-left">Content</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 flex flex-col gap-1">
            <Link href="/dashboard/content/articles" className="block px-2 py-1 rounded hover:bg-muted">Articles</Link>
            <Link href="/dashboard/content/videos" className="block px-2 py-1 rounded hover:bg-muted">Videos</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Skills */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <Icon icon="mdi:star-outline" className="text-yellow-500 w-5 h-5" />
            <span className="font-medium flex-1 text-left">Skills</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 flex flex-col gap-1">
            <Link href="/dashboard/skills" className="block px-2 py-1 rounded hover:bg-muted">All Skills</Link>
            <Link href="/dashboard/skills/add" className="block px-2 py-1 rounded hover:bg-muted">Add Skill</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Experience */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <Icon icon="mdi:briefcase-outline" className="text-indigo-500 w-5 h-5" />
            <span className="font-medium flex-1 text-left">Experience</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 flex flex-col gap-1">
            <Link href="/dashboard/experience" className="block px-2 py-1 rounded hover:bg-muted">Work Experience</Link>
            <Link href="/dashboard/experience/add" className="block px-2 py-1 rounded hover:bg-muted">Add Experience</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Settings */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <Icon icon="mdi:cog-outline" className="text-gray-500 w-5 h-5" />
            <span className="font-medium flex-1 text-left">Settings</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 flex flex-col gap-1">
            <Link href="/dashboard/settings/profile" className="block px-2 py-1 rounded hover:bg-muted">Profile Settings</Link>
            <Link href="/dashboard/settings/account" className="block px-2 py-1 rounded hover:bg-muted">Account</Link>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </Sidebar>
  );
}
