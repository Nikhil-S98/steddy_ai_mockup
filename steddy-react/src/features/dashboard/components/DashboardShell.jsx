const SIDEBAR_ICON_COL_CLASS = "flex w-7 shrink-0 items-center justify-center"

function HeaderBrand() {
  return (
    <div className="flex items-center gap-3 pl-3">
      <span className={`${SIDEBAR_ICON_COL_CLASS} text-[#3277FF]`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="block size-7 shrink-0 translate-y-0.5" fill="none">
          <path
            d="M12 3.5L13.8 9.2L19.5 11L13.8 12.8L12 18.5L10.2 12.8L4.5 11L10.2 9.2L12 3.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <div className="flex min-h-0 min-w-0 flex-1 items-center">
        <span className="text-xl font-semibold leading-tight tracking-tight text-[#1c1b1f] sm:text-2xl">
          Steddy AI
        </span>
      </div>
    </div>
  )
}

const navIcon = {
  applications: "domain_verification",
  brokers: "group",
  underwriters: "person",
}

const SIDEBAR_WIDTH_CLASS = "w-[248px] sm:w-[260px]"

const sidebarSelectClass =
  "box-border h-9 w-full min-w-0 appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-7 text-xs font-medium text-[#4c4f69]"

export default function DashboardShell({
  colorMode,
  setColorMode,
  colorThemes,
  uiFont,
  setUiFont,
  uiFontOptions,
  activeCard,
  setActiveCard,
  cardVariants,
  children,
}) {
  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-[#fafafa] text-[#1c1b1f]">
      <aside
        className={`flex min-h-0 shrink-0 flex-col border-r border-[#d9d9d9] bg-[#fafafa] ${SIDEBAR_WIDTH_CLASS}`}
      >
        <div className="shrink-0 border-b border-[#d9d9d9] px-3 py-4 sm:px-4">
          <HeaderBrand />
        </div>
        <nav className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto px-3 pb-4 pt-2 sm:px-4">
          <ul className="w-full space-y-1">
            {Object.entries(cardVariants).map(([key, value]) => {
              const isActive = activeCard === key
              const iconName = navIcon[key] ?? "folder"

              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setActiveCard(key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition ${
                      isActive
                        ? "bg-[#e9f0ff] text-[#3277FF]"
                        : "text-[#4c4f69] hover:bg-[#efefef]"
                    }`}
                  >
                    <span className={SIDEBAR_ICON_COL_CLASS} aria-hidden="true">
                      <span className="dashboard-shell-nav-icon material-symbols-rounded">
                        {iconName}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium leading-none tracking-tight">
                      {value.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="shrink-0 space-y-2 border-t border-[#d9d9d9] px-2 py-3 sm:px-2.5">
          <div className="relative">
            <select
              value={uiFont}
              onChange={(event) => setUiFont(event.target.value)}
              aria-label="Choose UI font"
              className={sidebarSelectClass}
            >
              {uiFontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#4c4f69]"
            >
              ⌄
            </span>
          </div>
          <div className="relative">
            <select
              value={colorMode}
              onChange={(event) => setColorMode(event.target.value)}
              aria-label="Choose color theme"
              className={sidebarSelectClass}
            >
              {colorThemes.map((themeOption) => (
                <option key={themeOption.value} value={themeOption.value}>
                  {themeOption.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#4c4f69]"
            >
              ⌄
            </span>
          </div>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-[#e9f0ff] px-4 pb-6 pt-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        {children}
      </main>
    </div>
  )
}
