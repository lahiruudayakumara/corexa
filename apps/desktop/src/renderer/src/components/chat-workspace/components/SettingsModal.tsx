import type { RuntimeHealth } from "@corexa/shared";
import { BRAND_LOGO_SRC, settingsNavigationItems } from "../constants.js";
import { IconClose, IconDesktop, IconMoon, IconSun } from "../icons.js";
import type { DesktopSettings, ResolvedTheme, SettingsSection, ThemePreference } from "../types.js";

type SettingsModalProps = {
  activeSection: SettingsSection;
  isOpen: boolean;
  resolvedTheme: ResolvedTheme;
  runtime: RuntimeHealth | null;
  settings: DesktopSettings;
  onClose: () => void;
  onSectionChange: (section: SettingsSection) => void;
  onUpdateSetting: <Key extends keyof DesktopSettings>(
    key: Key,
    value: DesktopSettings[Key],
  ) => void;
};

export function SettingsModal({
  activeSection,
  isOpen,
  resolvedTheme,
  runtime,
  settings,
  onClose,
  onSectionChange,
  onUpdateSetting,
}: SettingsModalProps) {
  if (!isOpen) {
    return null;
  }

  const renderSettingsContent = () => {
    if (activeSection === "appearance") {
      const themeOptions: Array<{
        description: string;
        icon: JSX.Element;
        title: string;
        value: ThemePreference;
      }> = [
        {
          description: "Use a bright workspace optimized for daytime editing.",
          icon: <IconSun className="h-5 w-5" />,
          title: "Light theme",
          value: "light",
        },
        {
          description: "Use deeper surfaces with reduced glare for focused work.",
          icon: <IconMoon className="h-5 w-5" />,
          title: "Dark theme",
          value: "dark",
        },
        {
          description: "Follow the current macOS or Windows system appearance.",
          icon: <IconDesktop className="h-5 w-5" />,
          title: "System theme",
          value: "system",
        },
      ];

      return (
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-(--corexa-text-primary)">Appearance</h3>
            <p className="max-w-180 text-xs leading-6 text-(--corexa-text-muted)">
              Control how Corexa looks across the desktop shell. Theme changes are applied
              immediately and saved for future sessions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {themeOptions.map((option) => {
              const isSelected = settings.themePreference === option.value;

              return (
                <button
                  className={`rounded-[22px] border px-5 py-5 text-left transition ${
                    isSelected
                      ? "border-(--corexa-text-primary) bg-(--corexa-muted-bg) shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                      : "border-(--corexa-border-subtle) bg-(--corexa-muted-bg-strong) hover:bg-(--corexa-muted-bg)"
                  }`}
                  key={option.value}
                  onClick={() => {
                    onUpdateSetting("themePreference", option.value);
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-3 text-(--corexa-text-primary)">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-(--corexa-main-bg)">
                      {option.icon}
                    </span>
                    <span className="text-xs font-medium">{option.title}</span>
                  </div>
                  <p className="mt-4 text-xs leading-6 text-[var(--corexa-text-muted)]">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="rounded-[22px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
            <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
              Active appearance
            </p>
            <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
              Corexa is currently using{" "}
              <span className="font-medium capitalize text-[var(--corexa-text-primary)]">
                {resolvedTheme}
              </span>{" "}
              mode.
            </p>
          </div>
        </div>
      );
    }

    if (activeSection === "git") {
      return (
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[var(--corexa-text-primary)]">Git</h3>
            <p className="max-w-[720px] text-xs leading-6 text-[var(--corexa-text-muted)]">
              Configure the defaults Corexa will use when it prepares commits, branch plans, and
              repository automation locally.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-medium text-[var(--corexa-text-primary)]">
                Author name
              </span>
              <input
                className="w-full rounded-[16px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-main-bg)] px-4 py-3 text-xs text-[var(--corexa-text-primary)] outline-none placeholder:text-[var(--corexa-text-soft)]"
                onChange={(event) => {
                  onUpdateSetting("gitAuthorName", event.target.value);
                }}
                placeholder="Corexa Developer"
                type="text"
                value={settings.gitAuthorName}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-medium text-[var(--corexa-text-primary)]">
                Author email
              </span>
              <input
                className="w-full rounded-[16px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-main-bg)] px-4 py-3 text-xs text-[var(--corexa-text-primary)] outline-none placeholder:text-[var(--corexa-text-soft)]"
                onChange={(event) => {
                  onUpdateSetting("gitAuthorEmail", event.target.value);
                }}
                placeholder="corexa@example.dev"
                type="email"
                value={settings.gitAuthorEmail}
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-xs font-medium text-[var(--corexa-text-primary)]">
              Default branch
            </span>
            <input
              className="w-full rounded-[16px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-main-bg)] px-4 py-3 text-xs text-[var(--corexa-text-primary)] outline-none placeholder:text-[var(--corexa-text-soft)]"
              onChange={(event) => {
                onUpdateSetting("gitDefaultBranch", event.target.value);
              }}
              placeholder="main"
              type="text"
              value={settings.gitDefaultBranch}
            />
          </label>

          <div className="space-y-3">
            <label className="flex items-start justify-between gap-6 rounded-[20px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
              <div>
                <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                  Auto fetch before planning
                </p>
                <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
                  Refresh remote branch information before Git-aware tasks begin.
                </p>
              </div>
              <input
                checked={settings.gitAutoFetch}
                className="mt-1 h-4 w-4 accent-[#6e6a64]"
                onChange={(event) => {
                  onUpdateSetting("gitAutoFetch", event.target.checked);
                }}
                type="checkbox"
              />
            </label>

            <label className="flex items-start justify-between gap-6 rounded-[20px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
              <div>
                <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                  Sign commits by default
                </p>
                <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
                  Prefer signed commits when Corexa prepares local commit actions.
                </p>
              </div>
              <input
                checked={settings.gitSignCommits}
                className="mt-1 h-4 w-4 accent-[#6e6a64]"
                onChange={(event) => {
                  onUpdateSetting("gitSignCommits", event.target.checked);
                }}
                type="checkbox"
              />
            </label>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--corexa-text-primary)]">General</h3>
          <p className="max-w-[720px] text-xs leading-6 text-[var(--corexa-text-muted)]">
            Tune how Corexa restores your local workspace, keeps context fresh, and manages the
            overall desktop shell.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-start justify-between gap-6 rounded-[20px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                Reopen the last active project
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
                Restore the most recent project automatically when the desktop app starts.
              </p>
            </div>
            <input
              checked={settings.launchToLastProject}
              className="mt-1 h-4 w-4 accent-[#6e6a64]"
              onChange={(event) => {
                onUpdateSetting("launchToLastProject", event.target.checked);
              }}
              type="checkbox"
            />
          </label>

          <label className="flex items-start justify-between gap-6 rounded-[20px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                Auto refresh workspace context
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
                Poll the local runtime periodically so branch, files, and repository status stay in
                sync.
              </p>
            </div>
            <input
              checked={settings.autoRefreshWorkspace}
              className="mt-1 h-4 w-4 accent-[#6e6a64]"
              onChange={(event) => {
                onUpdateSetting("autoRefreshWorkspace", event.target.checked);
              }}
              type="checkbox"
            />
          </label>

          <label className="flex items-start justify-between gap-6 rounded-[20px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                Compact sidebar density
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
                Tighten project and chat spacing to fit more context in the left panel.
              </p>
            </div>
            <input
              checked={settings.compactSidebar}
              className="mt-1 h-4 w-4 accent-[#6e6a64]"
              onChange={(event) => {
                onUpdateSetting("compactSidebar", event.target.checked);
              }}
              type="checkbox"
            />
          </label>
        </div>

        <div className="rounded-[22px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-4">
          <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
            Current desktop runtime
          </p>
          <p className="mt-1 text-xs leading-6 text-[var(--corexa-text-muted)]">
            Provider: {runtime?.provider ?? "corexa-runtime"} · Model:{" "}
            {runtime?.activeModel ?? "corexa-local"} · Status: {runtime?.status ?? "ready"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-[var(--corexa-overlay-bg)] px-8 py-8 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-[1040px] overflow-hidden rounded-[30px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-modal-bg)] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="grid min-h-[640px] grid-cols-[240px_minmax(0,1fr)]">
          <aside className="border-r border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-5 py-6">
            <div className="mb-8">
              <h2 className="mt-4 text-xs font-semibold text-[var(--corexa-text-primary)]">
                Settings
              </h2>
              <p className="mt-2 text-xs leading-6 text-[var(--corexa-text-muted)]">
                Desktop preferences for local-first development.
              </p>
            </div>

            <div className="space-y-2">
              {settingsNavigationItems.map((section) => (
                <button
                  className={`w-full rounded-[18px] px-4 py-3 text-left transition ${
                    activeSection === section.id
                      ? "bg-[var(--corexa-main-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                      : "hover:bg-white/40"
                  }`}
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                  }}
                  type="button"
                >
                  <p className="text-xs font-medium text-[var(--corexa-text-primary)]">
                    {section.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--corexa-text-muted)]">
                    {section.description}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-h-0 flex-col bg-[var(--corexa-modal-bg)]">
            <div className="flex items-center justify-between border-b border-[color:var(--corexa-border-subtle)] px-7 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--corexa-text-soft)]">
                  Preferences
                </p>
                <p className="mt-2 text-xs font-semibold text-[var(--corexa-text-primary)]">
                  {activeSection === "general"
                    ? "General settings"
                    : activeSection === "appearance"
                      ? "Appearance settings"
                      : "Git settings"}
                </p>
              </div>

              <button
                className="rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
                onClick={onClose}
                type="button"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
