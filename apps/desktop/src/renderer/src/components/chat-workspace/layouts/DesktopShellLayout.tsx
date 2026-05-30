import type { ReactNode } from "react";

type DesktopShellLayoutProps = {
  isCompactSidebar: boolean;
  panel: ReactNode;
  sidebar: ReactNode;
};

export function DesktopShellLayout({ isCompactSidebar, panel, sidebar }: DesktopShellLayoutProps) {
  return (
    <div
      className={`grid h-full min-h-0 ${
        isCompactSidebar ? "grid-cols-[288px_minmax(0,1fr)]" : "grid-cols-[320px_minmax(0,1fr)]"
      }`}
    >
      {sidebar}
      {panel}
    </div>
  );
}
