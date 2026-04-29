export default function V2Overview({
  monthlyBreakdownRows,
  keyMetricCompanyRows,
  setActiveMetricTitle,
  setIsMonthlyBreakdownOpen,
  setActiveFlagPanel,
}) {
  return (
    <section>
      <div className="section-label-row mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://www.figma.com/api/mcp/asset/a3793c52-6f95-494a-9ba9-f57990eecf62"
            alt=""
            className="section-icon size-5"
          />
          <h3 className="text-base font-bold leading-none">Key Metrics</h3>
        </div>
        <p className="text-xs text-[#4c4f69]">AI Analysis - 3 months of bank data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article
          onClick={() => {
            setActiveMetricTitle("MONTHLY REVENUE")
            setIsMonthlyBreakdownOpen(true)
          }}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <p className="text-xs font-normal tracking-wide text-[#4c4f69]">MONTHLY REVENUE</p>
          <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">$174,230</p>
          <div className="mt-4 space-y-2">
            {monthlyBreakdownRows.map((row) => (
              <div key={`revenue-${row.month}`} className="flex items-center justify-between text-xs">
                <span className="text-[#4c4f69]">{row.month}</span>
                <span className="font-semibold text-[#1c1b1f]">{row.revenue}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-1.5 text-xs text-amber-500">
            <span className="inline-block size-2 rounded-full bg-current" />
            Low Revenue
          </p>
        </article>

        <article
          onClick={() => {
            setActiveMetricTitle("CURRENT LEVERAGE")
            setIsMonthlyBreakdownOpen(true)
          }}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <p className="text-xs font-normal tracking-wide text-[#4c4f69]">CURRENT LEVERAGE</p>
          <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">23%</p>
          <div className="mt-4 space-y-2">
            {keyMetricCompanyRows.map((row) => (
              <div key={`leverage-${row.company}`} className="flex items-center justify-between text-xs">
                <span className="text-[#4c4f69]">{row.company}</span>
                <span className="font-semibold text-[#1c1b1f]">{row.leverage}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-1.5 text-xs text-[#3277FF]">
            <span className="inline-block size-2 rounded-full bg-current" />
            Within Acceptable Range
          </p>
        </article>

        <article
          onClick={() => {
            setActiveMetricTitle("MONTHLY MCA PAYOUT")
            setIsMonthlyBreakdownOpen(true)
          }}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <p className="text-xs font-normal tracking-wide text-[#4c4f69]">MONTHLY MCA PAYOUT</p>
          <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">$3,345</p>
          <div className="mt-4 space-y-2">
            {keyMetricCompanyRows.map((row) => (
              <div key={`payout-${row.company}`} className="flex items-center justify-between text-xs">
                <span className="text-[#4c4f69]">{row.company}</span>
                <span className="font-semibold text-[#1c1b1f]">{row.payout}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-[#4c4f69]">Paying $167.25 daily</p>
        </article>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <article
          onClick={() => setActiveFlagPanel("unicourt")}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
            <span className="flag-chip-open rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
              3 open
            </span>
          </div>
          <p className="mt-2 text-xs text-[#4c4f69]">
            Litigation search returned active dockets with recent filing activity.
          </p>
          <p className="mt-1 text-xs text-[#4c4f69]">Review disposition details before funding.</p>
        </article>
        <article
          onClick={() => setActiveFlagPanel("datamerch")}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold leading-none text-[#1c1b1f]">DataMerch</p>
            <span className="flag-chip-clean rounded-full border border-[#b8d4ff] bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-medium text-[#3277FF]">
              clean
            </span>
          </div>
          <p className="mt-2 text-xs text-[#4c4f69]">
            No adverse peer-funder repayment or fraud postings were returned.
          </p>
          <p className="mt-1 text-xs text-[#4c4f69]">Continue normal underwriting checks.</p>
        </article>
        <article
          onClick={() => setActiveFlagPanel("fraud")}
          className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Potential Fraud Alerts</p>
            <span className="rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
              1 alert
            </span>
          </div>
          <p className="mt-2 text-xs text-[#d20f39]">
            MoneyThumb-style statement authenticity mismatch detected.
          </p>
          <p className="mt-1 text-xs text-[#4c4f69]">
            Request source-bank export or login verification before approval.
          </p>
        </article>
      </div>
    </section>
  )
}
