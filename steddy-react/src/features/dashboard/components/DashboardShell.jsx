function HeaderBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-[#3277FF]" aria-hidden="true" fill="none">
        <path
          d="M12 3.5L13.8 9.2L19.5 11L13.8 12.8L12 18.5L10.2 12.8L4.5 11L10.2 9.2L12 3.5Z"
          fill="currentColor"
        />
      </svg>
      <div className="leading-none">
        <p className="text-base font-semibold tracking-tight text-[#1c1b1f] sm:text-lg">Steddy AI</p>
      </div>
    </div>
  )
}

function SidebarFooter() {
  return (
    <div className="border-t border-[#d9d9d9] bg-[#fafafa]">
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#d9d9d9] text-xs font-semibold text-[#3277FF]">
            S
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#1c1b1f]">Funder Portal</p>
            <p className="truncate text-[11px] text-[#4c4f69]">steddyadmin@steddy.com</p>
            <p className="truncate text-[10px] text-[rgba(76,79,105,0.7)]">Administrator</p>
          </div>
          <span aria-hidden="true" className="material-symbols-rounded shrink-0 text-[18px] text-[#4c4f69]">
            expand_less
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#d9d9d9] px-3 py-2">
        <p className="text-[10px] tracking-[0.12em] text-[rgba(76,79,105,0.65)]">© 2024 STEDDY</p>
        <span aria-hidden="true" className="material-symbols-rounded text-[16px] text-[#4c4f69]">
          chevron_left
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

export default function DashboardShell({
  colorMode,
  setColorMode,
  colorThemes,
  activeCard,
  setActiveCard,
  cardVariants,
  children,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#fafafa] text-[#1c1b1f]">
      <header
        className="flex h-16 shrink-0 items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-4 sm:px-6 lg:px-10"
      >
        <HeaderBrand />
        <div className="relative">
          <select
            value={colorMode}
            onChange={(event) => setColorMode(event.target.value)}
            aria-label="Choose color theme"
            className="h-8 min-w-[170px] appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-7 text-xs font-medium text-[#4c4f69]"
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
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#d9d9d9] bg-[#fafafa]">
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            <ul className="space-y-1 text-sm">
              {Object.entries(cardVariants).map(([key, value]) => {
                const isActive = activeCard === key
                const iconName = navIcon[key] ?? "folder"
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActiveCard(key)}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[11px] transition ${
                        isActive
                          ? "bg-[#e9f0ff] font-semibold text-[#3277FF]"
                          : "font-medium text-[#4c4f69] hover:bg-[#efefef]"
                      }`}
                    >
                      <span aria-hidden="true" className="material-symbols-rounded text-[16px]">
                        {iconName}
                      </span>
                      {value.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
          <SidebarFooter />
        </aside>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#e9f0ff] p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
