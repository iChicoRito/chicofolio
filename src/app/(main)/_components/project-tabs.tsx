"use client";

import { type ReactNode, useEffect, useState } from "react";

import { Tabs } from "@/components/ui/tabs";

const STORAGE_KEY = "projects-tab";
const TAB_VALUES = ["development", "design", "uiux"];

// Remembers the chosen tab for the browser session, so coming back from a project page keeps it open.
export default function ProjectTabs({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState("development");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && TAB_VALUES.includes(saved)) setTab(saved);
    } catch {
      // sessionStorage can throw when site data is blocked; the default tab is fine then.
    }
  }, []);

  function handleChange(value: string) {
    setTab(value);
    try {
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Not saved; the tab still switches.
    }
  }

  return (
    <Tabs value={tab} onValueChange={handleChange}>
      {children}
    </Tabs>
  );
}
