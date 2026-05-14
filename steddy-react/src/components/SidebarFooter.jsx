import { useState } from "react"

const FOOTER_LINKS = [
  { icon: "person", label: "Profile", tone: "text-[#4c4f69]" },
  { icon: "settings", label: "Settings", tone: "text-[#4c4f69]" },
  { icon: "help", label: "Help", tone: "text-[#4c4f69]" },
  { icon: "logout", label: "Logout", tone: "text-[#d20f39]" },
]

export default function SidebarFooter({ collapsed = false, onToggleCollapse }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <footer className="mt-auto bg-[#fafafa] px-3 py-3">
      <div className="mb-3 border-t border-[#d9d9d9]" />
      {collapsed ? null : (
        <div>
          <nav className={`${isMenuOpen ? "mb-1 block" : "hidden"} space-y-0.5`}>
            {FOOTER_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium ${item.tone}`}
              >
                <span aria-hidden="true" className="material-symbols-rounded text-[16px] leading-none">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs font-medium text-[#4c4f69]"
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid size-5 place-items-center rounded-full bg-[#e9f0ff] text-[10px] font-semibold text-[#3277FF]"
              >
                S
              </span>
              <span>Account</span>
            </span>
            <span aria-hidden="true" className="material-symbols-rounded text-[16px] leading-none">
              {isMenuOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </span>
          </button>
        </div>
      )}

      <div
        className={`${collapsed ? "mt-0 justify-center" : "mt-3 justify-between border-t border-[#d9d9d9] pt-3"} flex items-center gap-2 px-2 py-1.5`}
      >
        {collapsed ? null : <p className="text-[11px] font-medium text-[#4c4f69]">© 2024 Steddy</p>}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="inline-flex size-6 items-center justify-center text-[#4c4f69]"
        >
          <span aria-hidden="true" className="material-symbols-rounded text-[18px] leading-none">
            {collapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>
    </footer>
  )
}
