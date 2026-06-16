import {
  ACCOUNT_STATUS_OPTIONS,
  APPLICATION_STATUS_OPTIONS,
  defaultHistoryClasses,
} from "../data/dashboardData"

function statusPillStyle(color) {
  return {
    backgroundColor: `${color}18`,
    color,
    border: `1px solid ${color}38`,
  }
}

const STATUS_COLOR = {
  review: "#039e94",
  declined: "#C62828",
  active: "#039e94",
  inactive: "#C62828",
}

const SORT_OPTIONS = ["Latest Updated", "Newest Created", "Oldest Created"]

const STATUS_CHIP_ICON_CLASS =
  "material-symbols-rounded shrink-0 !text-[11px] !leading-none [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_20]"

function StatusGlyph({ name }) {
  return (
    <span aria-hidden="true" className={STATUS_CHIP_ICON_CLASS}>
      {name}
    </span>
  )
}

function ApplicationStatusChip({ status }) {
  const color = STATUS_COLOR[status.tone] ?? "#64748b"
  const icon =
    status.tone === "review" ? <StatusGlyph name="rate_review" /> : status.tone === "declined" ? <StatusGlyph name="cancel" /> : null

  return (
    <span
      className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-medium"
      style={statusPillStyle(color)}
    >
      {icon}
      {status.label}
    </span>
  )
}

function ApplicantSelect({ children, className = "" }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
      >
        ⌄
      </span>
    </div>
  )
}

const ROW_HEIGHT_CLASS = "h-16"
const CELL_PAD_CLASS = "align-middle px-2 py-1.5"

function AccountRow({ row, isLast }) {
  const color = STATUS_COLOR[row.status] ?? "#64748b"

  return (
    <tr className={`${ROW_HEIGHT_CLASS} ${!isLast ? "border-b border-[#d9d9d9]" : ""}`}>
      <td className="w-[1%] px-0 py-0 align-middle" />
      <td className={`min-w-0 ${CELL_PAD_CLASS} text-[11px] font-medium text-[#1c1b1f]`}>
        <span className="block truncate">{row.email}</span>
      </td>
      <td className={`min-w-0 ${CELL_PAD_CLASS} text-[11px] text-[#1c1b1f]`}>
        <span className="block truncate">{row.companyName}</span>
      </td>
      <td className={`${CELL_PAD_CLASS} text-center`}>
        <span
          className="inline-flex whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-medium"
          style={statusPillStyle(color)}
        >
          {row.status}
        </span>
      </td>
      <td className={`pl-2 pr-0 ${CELL_PAD_CLASS} text-[11px] text-[#4c4f69]`}>{row.created}</td>
    </tr>
  )
}

function ApplicationRow({ row, rowIndex, isLast, onOpenApplication }) {
  const hasUnreadHighlight = rowIndex < 3
  const isoDisplayName = row.isoEmail?.split("@")[0] || "—"
  const underwriterDisplayName =
    row.underwriterEmail && row.underwriterEmail !== "—" ? row.underwriterEmail.split("@")[0] : "—"
  const createdDateLabel = row.createdDate.replace(/,?\s*\d{4}$/, "")
  const updatedDateLabel = row.updatedDate.replace(/,?\s*\d{4}$/, "")

  const rowBg = hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"

  return (
    <tr className={`${!isLast ? "border-b border-[#d9d9d9]" : ""}`}>
      <td className={`min-w-0 align-middle border-l-2 border-l-transparent pl-4 pr-2 py-3.5 text-[13px] ${rowBg}`}>
        <div className="flex min-h-0 flex-col justify-center gap-0.5">
          <button
            type="button"
            onClick={() => onOpenApplication("111123", row)}
            className="block max-w-full cursor-pointer truncate text-left font-medium text-[#1c1b1f] underline-offset-2 transition hover:underline"
          >
            {row.company}
          </button>
          <p className="truncate text-[10px] leading-tight text-[#4c4f69]">{row.owner}</p>
        </div>
      </td>
      <td className={`align-middle px-2 py-3.5 ${rowBg} text-center`}>
        <ApplicationStatusChip status={row.status} />
      </td>
      <td className={`align-middle px-2 py-3.5 text-[13px] ${rowBg} text-center`}>
        {row.isoEmail && row.isoEmail !== "—" ? (
          <a
            href={`mailto:${row.isoEmail}`}
            className="font-medium text-[#039e94] underline-offset-2 transition hover:text-[#027a71] hover:underline"
          >
            {isoDisplayName}
          </a>
        ) : (
          "—"
        )}
      </td>
      <td className={`align-middle px-2 py-3.5 text-[13px] ${rowBg} text-center`}>
        {row.underwriterEmail && row.underwriterEmail !== "—" ? (
          <a
            href={`mailto:${row.underwriterEmail}`}
            className="font-medium text-[#039e94] underline-offset-2 transition hover:text-[#027a71] hover:underline"
          >
            {underwriterDisplayName}
          </a>
        ) : (
          "—"
        )}
      </td>
      <td className={`align-middle px-2 py-3.5 ${rowBg} text-center`}>
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${
            row.defaultCount > 0 ? defaultHistoryClasses : "border-transparent bg-transparent text-[rgba(76,79,105,0.65)]"
          }`}
        >
          {row.defaultHistory}
        </span>
      </td>
      <td className={`align-middle px-2 py-3.5 text-[12px] tabular-nums ${rowBg} text-center text-[#4c4f69]`}>
        <span className="whitespace-nowrap">
          {row.createdTime}
          <span className="mx-1 text-[rgba(76,79,105,0.45)]">·</span>
          {createdDateLabel}
        </span>
      </td>
      <td className={`align-middle pl-2 pr-4 py-3.5 text-[12px] tabular-nums ${rowBg} text-center text-[#4c4f69]`}>
        <span className="whitespace-nowrap">
          {row.updatedTime}
          <span className="mx-1 text-[rgba(76,79,105,0.45)]">·</span>
          {updatedDateLabel}
        </span>
      </td>
    </tr>
  )
}

export default function DashboardListCard({
  cardVariant,
  activeRows,
  pagedRows,
  tableViewportRef,
  onOpenApplication,
  onNewApplication,
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  canGoPrev,
  canGoNext,
  onPrevPage,
  onNextPage,
  pageSize,
  onPageSizeChange,
}) {
  const isAccountListView = cardVariant.key !== "applications"
  const statusOptions = isAccountListView ? ACCOUNT_STATUS_OPTIONS : APPLICATION_STATUS_OPTIONS
  const tableHeaderCellClasses = "px-2 py-2 text-[8.5px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]"

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <h2 className="text-xl font-semibold leading-tight tracking-tight text-[#1c1b1f] sm:text-4xl">
              {cardVariant.title}
            </h2>
            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-[#a3d9d7] bg-[#e6f7f6] px-1.5 py-0.5 text-[9px] font-semibold text-[#039e94]">
              {activeRows.length}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#4c4f69]">{cardVariant.description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (cardVariant.key === "applications") {
              onNewApplication?.()
            }
          }}
          className="interactive-pop shrink-0 rounded-md bg-[#039e94] px-5 py-2.5 text-sm font-semibold text-[#fafafa] transition hover:bg-[#027a71] sm:px-6 sm:py-3 sm:text-base"
        >
          <span className="flex w-full items-center justify-center gap-1.5">
            <span aria-hidden="true" className="material-symbols-rounded text-[18px] leading-none">
              add
            </span>
            <span>{cardVariant.createLabel}</span>
          </span>
        </button>
      </header>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={cardVariant.searchPlaceholder}
            className="box-border h-8 min-w-0 flex-1 rounded border border-[#d3d7de] bg-[#fafafa] px-2 text-[11px] font-medium leading-none text-[#1c1b1f] placeholder:text-[rgba(76,79,105,0.6)] focus:border-[#039e94] focus:outline-none"
          />
          <div className="flex shrink-0 items-center gap-2">
            <ApplicantSelect>
              <select className="h-8 min-w-[120px] appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-7 text-[11px] font-medium text-[#4c4f69]">
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </ApplicantSelect>
            <ApplicantSelect>
              <select className="h-8 min-w-[130px] appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-7 text-[11px] font-medium text-[#4c4f69]">
                {SORT_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </ApplicantSelect>
          </div>
        </div>
      </div>

      <div className="card-shadow mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#d9d9d9] bg-[#fafafa] shadow-sm">
        <div ref={tableViewportRef} className="min-h-0 flex-1 overflow-auto bg-[#fafafa]">
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 z-10 border-b border-[#d9d9d9] bg-[#efefef]">
              {isAccountListView ? (
                <tr className="text-left">
                  <th className="w-[1%] px-0 py-2 text-[9px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]" />
                  <th className={`w-[24.75%] ${tableHeaderCellClasses}`}>{cardVariant.primaryColumnLabel}</th>
                  <th className={`w-[24.75%] ${tableHeaderCellClasses}`}>Company Name</th>
                  <th className={`w-[24.75%] ${tableHeaderCellClasses} text-center`}>Status</th>
                  <th className={`w-[24.75%] py-2 pl-2 pr-0 text-[8.5px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]`}>
                    Created
                  </th>
                </tr>
              ) : (
                <tr className="text-left">
                  <th className={`w-[18%] pl-5 pr-2 py-2 text-[8.5px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]`}>{cardVariant.primaryColumnLabel}</th>
                  <th className={`w-[13%] ${tableHeaderCellClasses} text-center`}>Status</th>
                  <th className={`w-[9%] ${tableHeaderCellClasses} text-center`}>ISO</th>
                  <th className={`w-[9%] ${tableHeaderCellClasses} text-center`}>U/W</th>
                  <th className={`w-[14%] ${tableHeaderCellClasses} text-center`}>Flags</th>
                  <th className={`w-[11%] ${tableHeaderCellClasses} text-center`}>Created</th>
                  <th className={`w-[11%] py-2 pl-2 pr-4 text-[8.5px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)] text-center`}>
                    Updated
                  </th>
                </tr>
              )}
            </thead>
            <tbody>
              {pagedRows.map((row, index) => {
                const isLast = index === pagedRows.length - 1
                if (isAccountListView) {
                  return <AccountRow key={`${row.email}-${index}`} row={row} isLast={isLast} />
                }

                return (
                  <ApplicationRow
                    key={`${row.company}-${index}`}
                    row={row}
                    rowIndex={index}
                    isLast={isLast}
                    onOpenApplication={onOpenApplication}
                  />
                )
              })}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d9d9d9] bg-[#fafafa] px-4 py-2.5 sm:px-5">
          <p className="text-[11px] text-[#4c4f69]">
            {isAccountListView ? (
              <>
                Showing {rangeStart}-{rangeEnd} of <span className="font-semibold text-[#1c1b1f]">{activeRows.length}</span>{" "}
                {cardVariant.listLabel}
              </>
            ) : (
              <>
                <span className="font-semibold text-[#1c1b1f]">{activeRows.length}</span> applications
              </>
            )}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#4c4f69]">
            <div className="flex items-center gap-1.5">
              <span>Rows per page</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="h-6 appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-1.5 pr-5 text-[11px] font-medium text-[#1c1b1f] focus:border-[#039e94] focus:outline-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%234c4f69' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center" }}
              >
                {[20, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onPrevPage}
                disabled={!canGoPrev}
                className="inline-flex items-center rounded p-0.5 text-[#4c4f69] transition hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <span aria-hidden="true" className="material-symbols-rounded text-[18px]">
                  chevron_left
                </span>
              </button>
              <span>
                Page <span className="font-semibold text-[#1c1b1f]">{currentPage}</span> of{" "}
                <span className="font-semibold text-[#1c1b1f]">{totalPages}</span>
              </span>
              <button
                type="button"
                onClick={onNextPage}
                disabled={!canGoNext}
                className="inline-flex items-center rounded p-0.5 text-[#4c4f69] transition hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <span aria-hidden="true" className="material-symbols-rounded text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
