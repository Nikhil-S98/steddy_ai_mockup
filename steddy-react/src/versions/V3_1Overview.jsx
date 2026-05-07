export default function V3_1Overview({
  monthlyBreakdownRows,
  keyMetricCompanyRows,
  netCashFlowRows,
  netCashFlowTotalLabel,
  netCashFlowIsPositive,
  setActiveMetricTitle,
  setIsMonthlyBreakdownOpen,
  setActiveFlagPanel,
  formatCurrency,
}) {
  return (
    <section>
      <div className="grid items-stretch gap-4 xl:grid-cols-2">
        <div data-v3-card="key-metrics" className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
                query_stats
              </span>
              <h3 className="text-base font-bold leading-none">Key Metrics</h3>
            </div>
          </div>
          <div data-v3-key-grid="true" className="grid flex-1 items-stretch gap-3 md:grid-cols-3">
            <article
              data-v3-mini-card="true"
              onClick={() => {
                setActiveMetricTitle("MONTHLY REVENUE")
                setIsMonthlyBreakdownOpen(true)
              }}
              className="interactive-pop flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4"
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">MONTHLY REVENUE</p>
              <p className="mt-2 text-3xl font-bold leading-none text-[#1c1b1f]">$174,230</p>
              <div className="mt-3 space-y-2.5">
                {monthlyBreakdownRows.map((row) => (
                  <div key={`v3-revenue-${row.month}`} className="flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">{row.month}</span>
                    <span className="font-semibold text-[#1c1b1f]">{row.revenue}</span>
                  </div>
                ))}
              </div>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-amber-500">
                <span className="inline-block size-2 rounded-full bg-current" />
                Low Revenue
              </p>
            </article>
            <article
              data-v3-mini-card="true"
              onClick={() => {
                setActiveMetricTitle("CURRENT LEVERAGE")
                setIsMonthlyBreakdownOpen(true)
              }}
              className="interactive-pop md:order-2 flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4"
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">CURRENT LEVERAGE</p>
              <div className="mt-2 flex flex-1 flex-col">
                <div className="border-b border-[#d9d9d9] pb-3">
                  <p className="text-3xl font-bold leading-none text-[#1c1b1f]">23%</p>
                </div>
                <div className="pt-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#4c4f69]">MCA Payout</p>
                  <p className="mt-1 text-3xl font-bold leading-none text-[#1c1b1f]">$3,345</p>
                </div>
              </div>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#3277FF]">
                <span className="inline-block size-2 rounded-full bg-current" />
                Acceptable Range
              </p>
            </article>
            <article
              data-v3-mini-card="true"
              onClick={() => {
                setActiveMetricTitle("NET CASH FLOW (3 MONTHS)")
                setIsMonthlyBreakdownOpen(true)
              }}
              className="interactive-pop md:order-3 flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4"
            >
              <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">NET CASH FLOW</p>
              <p
                className={`mt-2 text-3xl font-bold leading-none ${
                  netCashFlowIsPositive ? "text-[#3277FF]" : "text-[#d20f39]"
                }`}
              >
                {netCashFlowTotalLabel}
              </p>
              <div className="mt-3 space-y-2.5">
                {netCashFlowRows.map((row) => (
                  <div key={`v3p1-net-${row.month}`} className="flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">{row.month}</span>
                    <span className={`font-semibold ${row.net >= 0 ? "text-[#3277FF]" : "text-[#d20f39]"}`}>
                      {`${row.net >= 0 ? "+" : "-"}$${formatCurrency(Math.abs(row.net))}`}
                    </span>
                  </div>
                ))}
              </div>
              <p className={`mt-auto flex items-center gap-1.5 pt-4 text-xs ${netCashFlowIsPositive ? "text-[#3277FF]" : "text-[#d20f39]"}`}>
                <span className="inline-block size-2 rounded-full bg-current" />
                {`${netCashFlowIsPositive ? "Net gain" : "Net loss"} over the past 3 months`}
              </p>
            </article>
          </div>
        </div>

        <div data-v3-card="flags" className="h-full">
          <div className="mb-4 flex items-center gap-2 pl-4">
            <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
              flag
            </span>
            <h3 className="text-base font-bold leading-none">Flags</h3>
          </div>
          <div className="grid flex-1 items-stretch gap-3 border-l border-[#d9d9d9] pl-4 lg:grid-cols-2">
            <div className="grid gap-3 lg:grid-rows-2">
              <article
                onClick={() => setActiveFlagPanel("fraud")}
                className="interactive-pop h-full rounded border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Potential Fraud Alerts</p>
                  <span className="rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                    1 alert
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#d20f39]">Bank statement authenticity mismatch detected.</p>
              </article>
              <article
                onClick={() => setActiveFlagPanel("datamerch")}
                className="interactive-pop h-full rounded border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
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
              className="interactive-pop h-full rounded border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
                <span className="flag-chip-open rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                  3 open
                </span>
              </div>
              <p className="mt-2 text-xs text-[#4c4f69]">
                Litigation search returned three active dockets.
              </p>
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
