import React from "react";
import { AdminSidebarLayout } from "./AdminSidebarLayout";

export const metadata = {
  title: "Admin Operations Cockpit — Purti Creations",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
