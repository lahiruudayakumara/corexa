import type { ReactNode } from "react";
import type { IconProps } from "./types.js";

type BaseIconProps = IconProps & {
  children: ReactNode;
  title: string;
};

function BaseIcon({ children, className, title }: BaseIconProps) {
  return (
    <svg className={className} fill="none" focusable="false" role="img" viewBox="0 0 24 24">
      <title>{title}</title>
      {children}
    </svg>
  );
}

export function IconCompose({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Compose">
      <path
        d="M12 20H21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M16.5 3.5A2.12 2.12 0 1 1 19.5 6.5L7 19l-4 1 1-4 12.5-12.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Clock">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconCube({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Cube">
      <path
        d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12 12 4 7.5M12 12l8-4.5M12 12v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconFolder({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Folder">
      <path
        d="M3 8.5A2.5 2.5 0 0 1 5.5 6H10l2 2h6.5A2.5 2.5 0 0 1 21 10.5V17a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconAdd({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Add">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconFilter({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Filter">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconDots({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="More options">
      <circle cx="5.5" cy="12" fill="currentColor" r="1.4" />
      <circle cx="12" cy="12" fill="currentColor" r="1.4" />
      <circle cx="18.5" cy="12" fill="currentColor" r="1.4" />
    </BaseIcon>
  );
}

export function IconPlay({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Play">
      <path
        d="M8 6.5v11l9-5.5-9-5.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Expand">
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconTerminal({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Terminal">
      <rect height="16" rx="3" stroke="currentColor" strokeWidth="1.7" width="18" x="3" y="4" />
      <path
        d="m7 10 2.5 2.5L7 15M12.5 15H17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconBranch({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Branch">
      <path
        d="M7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 9v4a4 4 0 0 0 4 4h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="1.7" />
    </BaseIcon>
  );
}

export function IconSpark({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Spark">
      <path
        d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconMic({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Microphone">
      <rect height="10" rx="3.5" stroke="currentColor" strokeWidth="1.7" width="7" x="8.5" y="4" />
      <path
        d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconSend({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Send">
      <path
        d="M4 20 20 12 4 4l2.8 8L4 20Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.8 12H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Search">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconPin({
  className,
  filled = false,
}: IconProps & {
  filled?: boolean;
}) {
  return (
    <BaseIcon className={className} title="Pin">
      <path
        d="M9 4h6l-1 5 3 3v1H7v-1l3-3-1-5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12 13v7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconSettings({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Settings">
      <path
        d="M10.4 4.3h3.2l.6 2.1a6.7 6.7 0 0 1 1.5.9l2-.8 1.6 2.8-1.6 1.4c.1.3.1.8.1 1.3s0 1-.1 1.3l1.6 1.4-1.6 2.8-2-.8c-.4.4-.9.7-1.5.9l-.6 2.1h-3.2l-.6-2.1a6.7 6.7 0 0 1-1.5-.9l-2 .8-1.6-2.8 1.6-1.4a6.8 6.8 0 0 1 0-2.6L4.7 9.3l1.6-2.8 2 .8c.4-.4.9-.7 1.5-.9l.6-2.1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </BaseIcon>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Close">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Sun">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Moon">
      <path
        d="M18.2 14.7A7.8 7.8 0 0 1 9.3 5.8a8.2 8.2 0 1 0 8.9 8.9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}

export function IconDesktop({ className }: IconProps) {
  return (
    <BaseIcon className={className} title="Desktop">
      <rect height="12" rx="2.8" stroke="currentColor" strokeWidth="1.7" width="18" x="3" y="4" />
      <path
        d="M9 20h6M12 16v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </BaseIcon>
  );
}
