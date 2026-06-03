const MINI_CARD_CLASS = "interactive-pop flex h-full flex-col rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-4"
const COMPACT_CARD_CLASS = "interactive-pop h-full min-h-0 rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
const SECTION_HEADING_CLASS = "mb-4 flex items-center gap-2"

export default function V3_5Overview({
  monthlyBreakdownRows,
  keyMetricCompanyRows,
  currentLeverageLabel,
  mcaPayoutLabel,
  setActiveMetricTitle,
  setIsMonthlyBreakdownOpen,
  setActiveFlagPanel,
}) {
  return (
    <section>
      <div className="grid items-stretch gap-4 xl:grid-cols-3">
        <div data-v3-card="key-metrics" className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
                bar_chart_4_bars
              </span>
              <h3 className="text-base font-bold leading-none">Key Financial Metrics</h3>
            </div>
          </div>
          <div data-v3-key-grid="true" className="grid flex-1 items-stretch gap-3 md:grid-cols-2">
            <article
              data-v3-mini-card="true"
              onClick={() => {
                setActiveMetricTitle("MONTHLY REVENUE")
                setIsMonthlyBreakdownOpen(true)
              }}
              className={MINI_CARD_CLASS}
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">AVERAGE MONTHLY REVENUE</p>
              <p className="mt-2 text-3xl font-bold leading-none text-[#1c1b1f]">$14,586</p>
              <div className="mt-3 space-y-2.5">
                {monthlyBreakdownRows.map((row) => (
                  <div key={`v3p4-revenue-${row.month}`} className="flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">{row.month}</span>
                    <span className="font-semibold text-[#1c1b1f]">{row.revenue}</span>
                  </div>
                ))}
              </div>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-amber-500">
                <span className="inline-block size-2 rounded-full bg-current" />
                Dipping Revenue
              </p>
            </article>
            <article
              data-v3-mini-card="true"
              onClick={() => {
                setActiveMetricTitle("CURRENT LEVERAGE")
                setIsMonthlyBreakdownOpen(true)
              }}
              className={`${MINI_CARD_CLASS} group relative z-10 md:order-2 hover:z-[120]`}
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">CURRENT LEVERAGE</p>
              <div className="mt-2 flex flex-1 flex-col">
                <div className="border-b border-[#d9d9d9] pb-3">
                  <p className="text-3xl font-bold leading-none text-[#1c1b1f]">{currentLeverageLabel}</p>
                </div>
                <div className="pt-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#4c4f69]">MCA Payout</p>
                  <p className="mt-1 text-3xl font-bold leading-none text-[#1c1b1f]">{mcaPayoutLabel}</p>
                </div>
                <div className="pointer-events-none absolute left-0 top-full z-[130] mt-2 w-full rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-3 text-[11px] text-[#1c1b1f] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <div className="space-y-1.5">
                    {keyMetricCompanyRows.length ? keyMetricCompanyRows.map((row) => (
                      <div key={`v3p4-leverage-tooltip-${row.company}`} className="flex items-center justify-between gap-2">
                        <span className="text-[#4c4f69]">{row.company}</span>
                        <span className="font-semibold text-[#1c1b1f]">{`${row.payout}/mo`}</span>
                      </div>
                    )) : (
                      <p className="text-[#4c4f69]">No active withdrawals selected.</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#039e94]">
                <span className="inline-block size-2 rounded-full bg-current" />
                Acceptable Range
              </p>
            </article>
          </div>
        </div>

        <div data-v3-card="flags" className="flex h-full flex-col xl:col-span-2">
          <div className={SECTION_HEADING_CLASS}>
            <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
              flag
            </span>
            <h3 className="text-base font-bold leading-none">Flags</h3>
          </div>
          <div className="grid min-h-0 flex-1 items-stretch gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {/* Returned Items */}
            <article
              onClick={() => setActiveFlagPanel("irregularities")}
              className="flex h-full flex-col rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-4 cursor-pointer transition hover:border-[#a3d9d7]"
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">RETURNED ITEMS</p>
              <div className="mt-2 flex flex-1 flex-col">
                <div className="border-b border-[#d9d9d9] pb-3">
                  <p className="text-3xl font-bold leading-none text-[#1c1b1f]">23</p>
                </div>
                <div className="pt-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#4c4f69]">Bounced Payments</p>
                  <p className="mt-1 text-3xl font-bold leading-none text-[#1c1b1f]">8</p>
                </div>
              </div>
              <p
                className="mt-auto flex items-center gap-1.5 pt-4 text-xs"
                style={{ color: "#d20f39" }}
              >
                <span className="inline-block size-2 rounded-full bg-current" />
                Returned items present
              </p>
            </article>

            {/* Fraud + DataMerch stacked */}
            <div className="grid gap-3 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
              <article
                onClick={() => setActiveFlagPanel("fraud")}
                className="h-full min-h-0 rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-3 cursor-pointer transition hover:border-[#a3d9d7]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Potential Fraud Alerts</p>
                  <span
                    className="flag-chip-open rounded-full border px-2 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: "#fee2e2", borderColor: "#f5c2cb", color: "#b42318" }}
                  >
                    1 alert
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#4c4f69]">Bank statement authenticity mismatch detected.</p>
              </article>
              <article
                onClick={() => setActiveFlagPanel("datamerch")}
                className="h-full min-h-0 rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-3 cursor-pointer transition hover:border-[#a3d9d7]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-none text-[#1c1b1f]">DataMerch</p>
                  <span
                    className="flag-chip-clean rounded-full border px-2 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: "#e6f7f6", borderColor: "#a3d9d7", color: "#039e94" }}
                  >
                    clean
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#4c4f69]">No postings were returned.</p>
              </article>
            </div>

            {/* UniCourt */}
            <article
              onClick={() => setActiveFlagPanel("unicourt")}
              className="h-full min-h-0 rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-3 cursor-pointer transition hover:border-[#a3d9d7]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
                <span
                  className="flag-chip-open rounded-full border px-2 py-0.5 text-[10px] font-medium"
                  style={{ backgroundColor: "#fee2e2", borderColor: "#f5c2cb", color: "#b42318" }}
                >
                  3 open
                </span>
              </div>
              <p className="mt-2 text-xs text-[#4c4f69]">Litigation search returned 3 active dockets.</p>
              <ul className="mt-3 flex-1 space-y-1.5">
                <li>
                  <p className="text-[11px] font-semibold leading-4 text-[#1c1b1f]">Atlas Funding v. Riverstone Auto Group</p>
                  <p className="text-[10px] leading-4 text-[#4c4f69]">Supreme Court, New York County</p>
                </li>
                <li>
                  <p className="text-[11px] font-semibold leading-4 text-[#1c1b1f]">Merchant Capital Partners v. Horizon Plumbing</p>
                  <p className="text-[10px] leading-4 text-[#4c4f69]">Civil Court, Kings County</p>
                </li>
                <li className="text-[10px] text-[#4c4f69]">+1 more</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
