const MINI_CARD_CLASS = "interactive-pop flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4"
const COMPACT_CARD_CLASS = "interactive-pop h-full min-h-0 rounded border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
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
                query_stats
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
                <div className="pointer-events-none absolute left-0 top-full z-[130] mt-2 w-full rounded border border-[#d9d9d9] bg-[#fafafa] p-3 text-[11px] text-[#1c1b1f] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
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
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#3277FF]">
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
          <div className="grid flex-1 items-stretch gap-3 lg:grid-cols-3">
            <article
              data-v3-mini-card="true"
              onClick={() => setActiveFlagPanel("irregularities")}
              className={MINI_CARD_CLASS}
            >
              <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Irregularities</p>
              <div className="mt-2 border-t border-[#d9d9d9]" />
              <div className="mt-2 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#4c4f69]">Missed Payments</span>
                  <span className="font-semibold text-[#1c1b1f]">3</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#4c4f69]">NSFs</span>
                  <span className="font-semibold text-[#1c1b1f]">5</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#4c4f69]">Negative Days</span>
                  <span className="font-semibold text-[#d20f39]">21</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#4c4f69]">Number of Overdrafts</span>
                  <span className="font-semibold text-[#d20f39]">24</span>
                </div>
              </div>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#d20f39]">
                <span className="inline-block size-2 rounded-full bg-current" />
                High amount of negative days
              </p>
            </article>
            <div className="grid h-full gap-3 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
              <article
                onClick={() => setActiveFlagPanel("fraud")}
                className={COMPACT_CARD_CLASS}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Potential Fraud Alerts</p>
                  <span className="flag-chip-open rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                    1 alert
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#d20f39]">Bank statement authenticity mismatch detected.</p>
              </article>
              <article
                onClick={() => setActiveFlagPanel("datamerch")}
                className={COMPACT_CARD_CLASS}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-none text-[#1c1b1f]">DataMerch</p>
                  <span className="flag-chip-clean rounded-full border border-[#b8d4ff] bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-medium text-[#3277FF]">
                    clean
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#4c4f69]">
                  No postings were returned. The merchant was searched 23 times.
                </p>
              </article>
            </div>

            <article
              onClick={() => setActiveFlagPanel("unicourt")}
              className={`${COMPACT_CARD_CLASS} min-h-full`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
                <span className="flag-chip-open rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                  3 open
                </span>
              </div>
              <p className="mt-2 text-xs text-[#4c4f69]">Litigation search returned three active dockets.</p>
              <ul className="mt-3 space-y-1.5 text-[11px] leading-4 text-[#4c4f69]">
                <li>
                  <p className="font-semibold text-[#1c1b1f]">Atlas Funding v. Riverstone Auto Group</p>
                  <p className="mt-0.5">Breach of contract</p>
                </li>
                <li>
                  <p className="font-semibold text-[#1c1b1f]">Merchant Capital Partners v. Horizon Plumbing</p>
                  <p className="mt-0.5">Judgment filing</p>
                </li>
                <li>
                  <p className="font-semibold text-[#1c1b1f]">Summit Advance Group v. Blue Harbor Services</p>
                  <p className="mt-0.5">UCC enforcement</p>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
