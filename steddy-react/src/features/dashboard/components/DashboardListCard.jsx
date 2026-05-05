import {
  ACCOUNT_STATUS_OPTIONS,
  APPLICATION_STATUS_OPTIONS,
  defaultHistoryClasses,
  getStatusClasses,
} from "../data/dashboardData"

const SORT_OPTIONS = ["Latest Updated", "Newest Created", "Oldest Created"]

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

function AccountRow({ row, isLast }) {
  const statusClasses =
    row.status === "active"
      ? "border-[#b8ead1] bg-[#e9fbf2] text-[#167a4f]"
      : "border-[#f5c2cb] bg-[#fde8ea] text-[#b42318]"

  return (
    <tr className={!isLast ? "border-b border-[#d9d9d9]" : ""}>
      <td className="px-2 py-2 text-[11px] text-[#1c1b1f]">{row.email}</td>
      <td className="px-2 py-2 text-[11px] text-[#1c1b1f]">{row.companyName}</td>
      <td className="px-2 py-2">
        <span className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-medium ${statusClasses}`}>
          {row.status}
        </span>
      </td>
      <td className="px-2 py-2 text-[11px] text-[#4c4f69]">{row.created}</td>
    </tr>
  )
}

function ApplicationRow({ row, rowIndex, isLast, onOpenApplication }) {
  const hasUnreadHighlight = rowIndex < 3

  return (
    <tr className={!isLast ? "border-b border-[#d9d9d9]" : ""}>
      <td className={`w-1 px-0 py-0 ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"}`}>
        {hasUnreadHighlight ? (
          <div className="h-full min-h-[56px] w-[3px] rounded-r bg-[#3277FF]" />
        ) : null}
      </td>
      <td
        className={[
          "px-2 py-2 text-[11px] font-medium",
          hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => onOpenApplication("111123")}
          className="text-left text-[#3277FF] underline-offset-2 transition hover:text-[#2462d8] hover:underline"
        >
          {row.company}
        </button>
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#1c1b1f]`}>
        {row.owner}
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#1c1b1f]`}>
        {row.isoEmail}
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#4c4f69]`}>
        {row.isoName || "—"}
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#1c1b1f]`}>
        {row.underwriterEmail}
      </td>
      <td className={`px-2 py-2 ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"}`}>
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-medium ${getStatusClasses(row.status.tone)}`}
        >
          {row.status.label}
        </span>
      </td>
      <td className={`px-2 py-2 ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"}`}>
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-medium ${
            row.defaultCount > 0 ? defaultHistoryClasses : "border-transparent bg-transparent text-[rgba(76,79,105,0.65)]"
          }`}
        >
          {row.defaultHistory}
        </span>
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#4c4f69]`}>
        <div>{row.createdDate}</div>
        <div className="text-[10px] text-[rgba(76,79,105,0.85)]">{row.createdTime}</div>
      </td>
      <td className={`px-2 py-2 text-[11px] ${hasUnreadHighlight ? "bg-[#fafafa]" : "bg-[#f5f5f7]"} text-[#4c4f69]`}>
        <div>{row.updatedDate}</div>
        <div className="text-[10px] text-[rgba(76,79,105,0.85)]">{row.updatedTime}</div>
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
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  canGoPrev,
  canGoNext,
  onPrevPage,
  onNextPage,
}) {
  const isAccountListView = cardVariant.key !== "applications"
  const statusOptions = isAccountListView ? ACCOUNT_STATUS_OPTIONS : APPLICATION_STATUS_OPTIONS
  const tableHeaderCellClasses = "px-2 py-2 text-[8.5px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]"

  return (
    <section className="card-shadow flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#d9d9d9] bg-[#fafafa]">
      <header className="border-b border-[#d9d9d9] bg-[#fafafa] py-3 pl-6 pr-4 sm:pl-7 sm:pr-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[14px] font-medium leading-none text-[#1c1b1f]">{cardVariant.title}</h2>
            <p className="mt-1 text-[11px] text-[#4c4f69]">{cardVariant.description}</p>
          </div>
          <button
            type="button"
            className="interactive-pop rounded-md bg-[#3277FF] px-4 py-2 text-xs font-semibold text-[#fafafa] transition hover:opacity-95"
          >
            {cardVariant.createLabel}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col border-b border-[#d9d9d9] bg-[#fafafa] pt-3">
        <div className="flex flex-wrap items-center gap-2 pl-6 pr-4 sm:pl-7 sm:pr-5">
          <input
            type="text"
            placeholder={cardVariant.searchPlaceholder}
            className="box-border h-8 min-w-[200px] flex-1 rounded border border-[#4c4f69] bg-[#fafafa] px-2 text-[11px] font-medium leading-none text-[#1c1b1f] placeholder:text-[rgba(76,79,105,0.6)] focus:border-[#3277FF] focus:outline-none"
          />
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

        <div
          ref={tableViewportRef}
          className="mt-3 min-h-0 flex-1 overflow-auto bg-[#fafafa]"
        >
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 z-10 border-b border-[#d9d9d9] bg-[#fafafa]">
              {isAccountListView ? (
                <tr className="text-left">
                  <th className={`w-[36%] ${tableHeaderCellClasses}`}>{cardVariant.primaryColumnLabel}</th>
                  <th className={`w-[30%] ${tableHeaderCellClasses}`}>Company Name</th>
                  <th className={`w-[17%] ${tableHeaderCellClasses}`}>Status</th>
                  <th className={`w-[17%] ${tableHeaderCellClasses}`}>Created</th>
                </tr>
              ) : (
                <tr className="text-left">
                  <th className="w-[1%] px-0 py-2 text-[9px] font-bold uppercase tracking-wide text-[rgba(76,79,105,0.7)]" />
                  <th className={`w-[14%] ${tableHeaderCellClasses}`}>{cardVariant.primaryColumnLabel}</th>
                  <th className={`w-[11%] ${tableHeaderCellClasses}`}>Owner</th>
                  <th className={`w-[14%] ${tableHeaderCellClasses}`}>ISO Email</th>
                  <th className={`w-[8%] ${tableHeaderCellClasses}`}>ISO Name</th>
                  <th className={`w-[14%] ${tableHeaderCellClasses}`}>Underwriter</th>
                  <th className={`w-[9%] ${tableHeaderCellClasses}`}>Status</th>
                  <th className={`w-[10%] ${tableHeaderCellClasses}`}>Default History</th>
                  <th className={`w-[9%] ${tableHeaderCellClasses}`}>Created</th>
                  <th className={`w-[10%] ${tableHeaderCellClasses}`}>Updated</th>
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
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#fafafa] px-4 py-2.5 sm:px-5">
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
        <div className="flex items-center gap-3 text-[11px] text-[#4c4f69]">
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
      </footer>
    </section>
  )
}
