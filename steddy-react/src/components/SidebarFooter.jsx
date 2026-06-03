export default function SidebarFooter({ collapsed = false, onToggleCollapse }) {

  return (
    <footer className="mt-auto bg-[#fafafa] px-3 pb-3 pt-0">
      <div
        className={`${collapsed ? "justify-center" : "justify-between border-t border-[#d9d9d9] pt-3"} flex items-center gap-2 px-2 py-1.5`}
      >
        {collapsed ? null : (
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-medium text-[#4c4f69]">© 2024 Steddy</p>
            <a
              href="design-system.html"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-medium"
              style={{ color: '#9b9bb0' }}
              onMouseEnter={e => e.currentTarget.style.color = '#039e94'}
              onMouseLeave={e => e.currentTarget.style.color = '#9b9bb0'}
            >
              Design System
            </a>
          </div>
        )}
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
