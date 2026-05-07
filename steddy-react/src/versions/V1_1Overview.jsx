export default function V1_1Overview({
  metrics,
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
          <div className="grid gap-3">
            <article
              onClick={() => setActiveFlagPanel("unicourt")}
              className="interactive-pop card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4"
            >
              <span className="mt-1 size-[9px] rounded-full bg-[#d20f39]"></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none text-[#1c1b1f]">UniCourt</p>
                <p className="mt-1 text-xs text-[#4c4f69]">Litigation search returned 3 open dockets</p>
                <p className="mt-1 text-xs text-[#4c4f69]">
                  Recent filing activity detected in the last 30 days.
                </p>
                <p className="mt-1 text-xs text-[#4c4f69]">Validate dispositions before final approval.</p>
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
                <p className="mt-1 text-xs text-[#4c4f69]">
                  No negative peer-funder repayment or fraud postings
                </p>
                <p className="mt-1 text-xs text-[#4c4f69]">
                  FEIN/profile check returned a clean DataMerch file.
                </p>
                <p className="mt-1 text-xs text-[#4c4f69]">Continue standard monitoring cadence.</p>
              </div>
              <span className="flag-chip-clean rounded-full border border-[#b8d4ff] bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-medium text-[#3277FF]">
                clean
              </span>
            </article>
          </div>

          <article
            onClick={() => setActiveFlagPanel("fraud")}
            className="interactive-pop card-shadow min-h-[270px] rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
          >
            <p className="text-xs font-light tracking-wide text-[#4c4f69]">POTENTIAL FRAUD ALERTS</p>
            <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">1 Alert</p>
            <p className="mt-3 flex items-center gap-1 text-xs text-[#d20f39]">
              <span className="inline-block size-2.5 rounded-full bg-current" />
              MoneyThumb-style statement authenticity alert
            </p>
            <p className="mt-1.5 text-xs text-[#4c4f69]">
              PDF fingerprint and metadata checks suggest potential document tampering.
            </p>
            <p className="mt-1 text-xs text-[#4c4f69]">
              Reconciliation variance detected between transaction detail and statement totals.
            </p>
            <p className="mt-1 text-xs text-[#4c4f69]">
              Request direct bank export or login verification before approval.
            </p>
            <p className="mt-1 text-xs text-[#4c4f69]">
              Compare against prior months for continuity in balances and transaction cadence.
            </p>
            <p className="mt-1 text-xs text-[#4c4f69]">
              Escalate to manual review if discrepancy persists after source verification.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
