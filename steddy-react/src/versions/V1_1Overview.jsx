export default function V1_1Overview({
  metrics,
  keyMetricCompanyRows,
  currentLeverageLabel,
  setActiveMetricTitle,
  setIsMonthlyBreakdownOpen,
  setActiveFlagPanel,
}) {
  return (
    <>
      <section>
        <div className="section-label-row mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
              query_stats
            </span>
            <h3 className="text-base font-bold leading-none">Key Metrics</h3>
          </div>
          <p className="text-xs text-[#4c4f69]">AI Analysis - 3 months of bank data</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            metric.title === "MONTHLY REVENUE" ? (
              <article
                key={metric.title}
                onClick={() => {
                  setActiveMetricTitle("MONTHLY REVENUE")
                  setIsMonthlyBreakdownOpen(true)
                }}
                className="interactive-pop card-shadow flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4"
              >
                <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">AVERAGE MONTHLY REVENUE</p>
                <p className="mt-2 text-3xl font-bold leading-none text-[#1c1b1f]">{metric.value}</p>
                <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-amber-500">
                  <span className="inline-block size-2 rounded-full bg-current" />
                  Dipping Revenue
                </p>
              </article>
            ) : metric.title === "CURRENT LEVERAGE" ? (
              <article
                key={metric.title}
                onClick={() => {
                  setActiveMetricTitle("CURRENT LEVERAGE")
                  setIsMonthlyBreakdownOpen(true)
                }}
                className="interactive-pop card-shadow group relative z-10 flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4 hover:z-[120]"
              >
                <div className="mt-1 flex flex-1 flex-col">
                  <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">CURRENT LEVERAGE</p>
                  <p className="mt-2 text-3xl font-bold leading-none text-[#1c1b1f]">{currentLeverageLabel}</p>
                </div>
                <div className="pointer-events-none absolute left-0 top-full z-[130] mt-2 w-full rounded border border-[#d9d9d9] bg-[#fafafa] p-3 text-[11px] text-[#1c1b1f] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <div className="space-y-1.5">
                    {keyMetricCompanyRows.length ? (
                      keyMetricCompanyRows.map((row) => (
                        <div key={`v1p1-leverage-tooltip-${row.company}`} className="flex items-center justify-between gap-2">
                          <span className="text-[#4c4f69]">{row.company}</span>
                          <span className="font-semibold text-[#1c1b1f]">{`${row.payout}/mo`}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#4c4f69]">No active withdrawals selected.</p>
                    )}
                  </div>
                </div>
                <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#3277FF]">
                  <span className="inline-block size-2 rounded-full bg-current" />
                  Acceptable Range
                </p>
              </article>
            ) : metric.title === "MONTHLY MCA PAYOUT" ? (
              <article
                key={metric.title}
                onClick={() => setActiveFlagPanel("irregularities")}
                className="interactive-pop card-shadow group relative z-10 flex h-full flex-col rounded border border-[#d9d9d9] bg-[#fafafa] p-4 hover:z-[120]"
              >
                <p className="text-[11px] font-normal tracking-wide text-[#4c4f69]">IRREGULARITIES</p>
                <p className="mt-2 text-3xl font-bold leading-none text-[#1c1b1f]">27</p>
                <div className="pointer-events-none absolute left-0 top-full z-[130] mt-2 w-full rounded border border-[#d9d9d9] bg-[#fafafa] p-3 text-[11px] text-[#1c1b1f] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4c4f69]">Missed Payments</span>
                      <span className="font-semibold text-[#1c1b1f]">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4c4f69]">NSFs</span>
                      <span className="font-semibold text-[#1c1b1f]">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4c4f69]">Negative Days</span>
                      <span className="font-semibold text-[#d20f39]">21</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4c4f69]">Number of Overdrafts</span>
                      <span className="font-semibold text-[#d20f39]">24</span>
                    </div>
                  </div>
                </div>
                <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#d20f39]">
                  <span className="inline-block size-2 rounded-full bg-current" />
                  High amount of negative days
                </p>
              </article>
            ) : (
              <article
                key={metric.title}
                onClick={() => {
                  setActiveMetricTitle(metric.title)
                  setIsMonthlyBreakdownOpen(true)
                }}
                className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
              >
                <p className="text-xs font-normal tracking-wide text-[#4c4f69]">{metric.title}</p>
                <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">{metric.value}</p>
                <p className={`mt-3 flex items-center gap-1 text-xs ${metric.tone}`}>
                  {metric.icon ? <span className="inline-block size-2.5 rounded-full bg-current" /> : null}
                  {metric.note}
                </p>
              </article>
            )
          ))}
        </div>
      </section>

      <section>
        <div className="section-label-row mb-3 flex items-center gap-2">
          <span aria-hidden="true" className="material-symbols-rounded text-[#4c4f69]">
            flag
          </span>
          <h3 className="text-base font-bold leading-none">Flags</h3>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="grid gap-3 md:grid-cols-2">
            <article
              onClick={() => setActiveFlagPanel("unicourt")}
              className="interactive-pop card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4"
            >
              <span className="mt-1 size-[9px] rounded-full bg-[#d20f39]"></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
                <p className="mt-1 text-xs text-[#4c4f69]">3 open dockets with filing activity in the last 30 days.</p>
              </div>
              <span className="flag-chip-open rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                3 open
              </span>
            </article>
            <article
              onClick={() => setActiveFlagPanel("datamerch")}
              className="interactive-pop card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4"
            >
              <span className="mt-1 size-[9px] rounded-full bg-[#3277FF]"></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">DataMerch</p>
                <p className="mt-1 text-xs text-[#4c4f69]">The merchant was searched for 89 times.</p>
              </div>
              <span className="flag-chip-clean rounded-full border border-[#b8d4ff] bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-medium text-[#3277FF]">
                clean
              </span>
            </article>

            <article
              onClick={() => setActiveFlagPanel("fraud")}
              className="interactive-pop card-shadow min-h-[108px] rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4 md:col-span-2"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Potential Fraud Alerts</p>
                <span className="rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                  1 alert
                </span>
              </div>
              <p className="mt-2 text-xs text-[#d20f39]">Statement authenticity mismatch detected.</p>
              <p className="mt-1 text-xs text-[#4c4f69]">Escalate to manual underwriting review.</p>
              <p className="mt-1 text-xs text-[#4c4f69]">Cross-check PDF metadata and transaction continuity before approval.</p>
            </article>
          </div>

          <article
            onClick={() => setActiveFlagPanel("datamerch")}
            className="interactive-pop card-shadow min-h-[270px] rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
          >
            <p className="text-sm font-semibold leading-none text-[#1c1b1f]">Deep Search Results</p>
            <ul className="mt-3 space-y-2 text-[11px] text-[#4c4f69]">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-[#4c4f69]" />
                <span>3 legal mentions across county and civil records in the last 18 months.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-[#4c4f69]" />
                <span>2 related entities share ownership ties and overlapping payment processors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-[#4c4f69]" />
                <span>Online sentiment mixed; recurring complaints around seasonal cash volatility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-[#4c4f69]" />
                <span>Recommendation: verify ownership docs and latest 90-day bank continuity.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}
