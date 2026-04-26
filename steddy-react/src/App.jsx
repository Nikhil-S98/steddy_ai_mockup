const metrics = [
  {
    title: "MONTHLY REVENUE",
    value: "$14,586",
    note: "Low Revenue",
    tone: "text-amber-500",
    icon: "https://www.figma.com/api/mcp/asset/7ae86bdb-10b7-4c23-9f15-9bf21da238b0",
  },
  {
    title: "CURRENT LEVERAGE",
    value: "23%",
    note: "Within Acceptable Range",
    tone: "text-[#1e66f5]",
    icon: "https://www.figma.com/api/mcp/asset/713d8352-e35a-4f6e-93c8-c944bf041395",
  },
  {
    title: "MONTHLY MCA PAYOUT",
    value: "$3,345",
    note: "Paying $167.25 daily",
    tone: "text-[#4c4f69]",
  },
]

const positions = ["Advance Syndicate", "EBF Holdings", "CFG Merchant Sol."]

const transactions = [
  { date: "Mar 29", description: "Customer Payment — Inv #4521", credit: true, value: "$8,450" },
  { date: "Mar 28", description: "Rapid Capital ACH", credit: false, value: "$890" },
  { date: "Mar 28", description: "Payroll — 12 employees", credit: false, value: "$12,400" },
  { date: "Mar 27", description: "Wire Transfer — Vendor", credit: false, value: "$4,200" },
  { date: "Mar 27", description: "Deposit — Stripe Payout", credit: true, value: "$3,120" },
  { date: "Mar 26", description: "Equipment Lease", credit: false, value: "$1,050" },
  { date: "Mar 26", description: "ACH Return — NSF", credit: false, value: "$275" },
  { date: "Mar 25", description: "Merchant Cash Advance", credit: false, value: "$2,652" },
  { date: "Mar 25", description: "Sales Deposit", credit: true, value: "$6,890" },
  { date: "Mar 24", description: "Utilities — Electric", credit: false, value: "$412" },
  { date: "Mar 24", description: "Refund — Overpayment", credit: true, value: "$180" },
  { date: "Mar 23", description: "Insurance Premium", credit: false, value: "$928" },
]

function App() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#fafafa] text-[#1c1b1f] [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]">
      <header className="flex h-16 items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <img
            src="https://www.figma.com/api/mcp/asset/4cfaa8ca-2e26-4a98-ac59-b9f36f00b6e0"
            alt=""
            className="size-5 opacity-70"
          />
          <h1 className="text-base font-semibold tracking-tight text-[#1c1b1f] sm:text-lg">
            Application #777
          </h1>
        </div>

        <div className="hidden items-center gap-1 text-[11px] text-[rgba(76,79,105,0.4)] xl:flex">
          <span>Submitted</span>
          <span>•</span>
          <span className="font-medium text-[#1e66f5]">Review</span>
          <span>•</span>
          <span>Contract Sent</span>
          <span>•</span>
          <span>Signed</span>
          <span>•</span>
          <span>Funded</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded border border-[#4c4f69] px-3 py-1.5 text-xs font-medium text-[#4c4f69] transition hover:bg-[#efefef]">
            Edit
          </button>
          <button className="rounded border border-[#4c4f69] px-3 py-1.5 text-xs font-medium text-[#4c4f69] transition hover:bg-[#efefef]">
            Export
          </button>
        </div>
      </header>

      <main className="grid h-[calc(100vh-64px)] gap-0 lg:grid-cols-[370px_1fr]">
        <aside className="flex h-[calc(100vh-64px)] flex-col border-r border-[#d9d9d9] bg-[#fafafa]">
          <div className="border-b border-[#d9d9d9] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-xl border border-[#1e66f5] bg-[#e2e8f4]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-[#1e66f5]"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20V6.5C4 5.67157 4.67157 5 5.5 5H10.5C11.3284 5 12 5.67157 12 6.5V20M12 20V4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V20M3 20H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 8H9M7 11H9M15 7H17M15 10H17M15 13H17M8 20V16H10V20M14 20V17H18V20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-bold leading-none text-[#1c1b1f]">
                  Green Farm Equipment LLC
                </h2>
                <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                  <span className="rounded bg-[#e2e8f4] px-2 py-0.5 font-medium text-[#1e66f5]">
                    • Review
                  </span>
                  <span className="text-[#4c4f69]">Judy Green</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="border-b border-[#d9d9d9] pb-4">
              <div className="mb-2 flex items-center justify-between text-xs font-light tracking-[0.06em] text-[#4c4f69]">
                <span>AI DECISION</span>
                <span className="tracking-normal">Confidence 94%</span>
              </div>
              <div className="rounded-md border border-[#d9d9d9] bg-[#e2e8f4]/45 p-3">
                <div className="mb-2 flex items-center gap-2 text-[#1e66f5]">
                  <span className="grid size-5 place-items-center rounded-full bg-[#1e66f5] text-[11px] text-[#fafafa]">
                    ✓
                  </span>
                  <span className="text-base font-bold leading-none">Approved</span>
                </div>
                <p className="text-[12px] leading-snug text-[#1c1b1f]">
                  Revenue trend positive, leverage within range, 2 negative
                  days flagged for review.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="rounded-md bg-[#1e66f5] py-2 text-[13px] font-semibold text-[#fafafa]">
                    Confirm
                  </button>
                  <button className="rounded-md border border-[#d9d9d9] bg-[#fafafa] py-2 text-[13px] font-semibold text-[#1c1b1f]">
                    Override
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="mb-2">
                <h3 className="text-xs font-light tracking-[0.06em] text-[#4c4f69]">
                  OFFER CALCULATOR
                </h3>
              </div>

              <div className="space-y-2.5">
                <div>
                  <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">FUNDING AMOUNT</p>
                  <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                    <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[12px] text-[#4c4f69]">$</span>
                    <span className="px-2 text-[12px] font-semibold text-[#1c1b1f]">29,472</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">PAYMENT</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[12px] text-[#4c4f69]">$</span>
                      <span className="px-2 text-[12px] font-semibold text-[#1c1b1f]">2,652</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">FREQUENCY</p>
                    <div className="flex h-10 items-center justify-between rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2">
                      <span className="text-[12px] font-semibold text-[#1c1b1f]">Daily</span>
                      <span className="text-[12px] text-[#4c4f69]">⌄</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">TERM (MO)</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">−</span>
                      <span className="flex-1 text-center text-[12px] font-semibold text-[#1c1b1f]">15</span>
                      <span className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">+</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">FACTOR</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">−</span>
                      <span className="flex-1 text-center text-[12px] font-semibold text-[#1c1b1f]">1.35</span>
                      <span className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">ADDITIONAL LEVERAGE</p>
                  <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                    <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">−</span>
                    <span className="flex-1 text-center text-[12px] font-semibold text-[#1c1b1f]">11</span>
                    <span className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[12px] text-[#4c4f69]">%</span>
                    <span className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]">+</span>
                  </div>
                </div>

                <div className="rounded-md border border-[#d9d9d9] bg-[#efefef] px-3 py-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">Payback Total</span>
                    <span className="text-[12px] font-semibold text-[#1c1b1f]">$39,787</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">Current Leverage</span>
                    <span className="text-[12px] font-semibold text-[#1c1b1f]">23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d9d9d9] bg-[#fafafa] p-4">
            <div className="mb-3 rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-2.5 text-center text-[12px] font-medium text-[#4c4f69]">
              View Contract &nbsp; <span className="rounded bg-[#efefef] px-1.5 py-0.5 text-[10px]">NOT SENT</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-lg bg-[#1e66f5] px-4 py-2.5 text-[14px] font-semibold text-[#fafafa]">
                ✓ Approve
              </button>
              <button className="rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-2.5 text-[14px] font-semibold text-[#d20f39]">
                ✕ Decline
              </button>
            </div>
          </div>
        </aside>

        <section className="h-[calc(100vh-64px)] overflow-y-auto bg-[#e2e8f4] p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">
            <section>
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/a3793c52-6f95-494a-9ba9-f57990eecf62"
                    alt=""
                    className="size-5"
                  />
                  <h3 className="text-base font-bold leading-none">Key Metrics</h3>
                </div>
                <p className="text-xs text-[#4c4f69]">
                  AI Analysis - 3 months of bank data
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {metrics.map((metric) => (
                  <article
                    key={metric.title}
                    className="card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
                  >
                    <p className="text-xs font-normal tracking-wide text-[#4c4f69]">
                      {metric.title}
                    </p>
                    <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">
                      {metric.value}
                    </p>
                    <p className={`mt-3 flex items-center gap-1 text-xs ${metric.tone}`}>
                      {metric.icon ? (
                        <img src={metric.icon} alt="" className="size-2.5" />
                      ) : null}
                      {metric.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <img
                  src="https://www.figma.com/api/mcp/asset/03690ed8-b334-458e-958c-cf99d6584b21"
                  alt=""
                  className="size-5"
                />
                <h3 className="text-base font-bold leading-none">Flags</h3>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <div className="grid gap-3">
                  <article className="card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4">
                    <span className="mt-1 size-[9px] rounded-full bg-[#d20f39] shadow-[0_0_0_2px_#e2e8f4]"></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-none text-[#1c1b1f]">
                        UniCourt
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Multiple cases found - 3 are still open
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Most recent activity was filed within the last 30 days.
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Review recommended before final approval.
                      </p>
                    </div>
                    <span className="rounded-full border border-[#f5c2cb] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-medium text-[#b42318]">
                      3 open
                    </span>
                  </article>
                  <article className="card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4">
                    <span className="mt-1 size-[9px] rounded-full bg-[#1e66f5] shadow-[0_0_0_2px_#e2e8f4]"></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-none text-[#1c1b1f]">
                        Datamerch
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Clean history - Merchant has been searched 23 times
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        No adverse records returned across recent monitoring windows.
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        No action required unless new filings appear.
                      </p>
                    </div>
                    <span className="rounded-full border border-[#c7d7fe] bg-[#eaf1ff] px-2 py-0.5 text-[10px] font-medium text-[#1e66f5]">
                      clean
                    </span>
                  </article>
                </div>

                <article className="card-shadow min-h-[270px] rounded border border-[#d9d9d9] bg-[#fafafa] p-5">
                  <p className="text-xs font-light tracking-wide text-[#4c4f69]">
                    POTENTIAL FRAUD ALERTS
                  </p>
                  <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">
                    1 Alert
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-[#d20f39]">
                    <img
                      src="https://www.figma.com/api/mcp/asset/51f4a201-10df-4902-8e18-bde6be59991d"
                      alt=""
                      className="size-2.5"
                    />
                    Potential bank statement alteration
                  </p>
                  <p className="mt-1.5 text-xs text-[#4c4f69]">
                    Document metadata and value patterns indicate the statement may have been modified.
                  </p>
                  <p className="mt-1 text-xs text-[#4c4f69]">
                    Recommend requesting an original export directly from the issuing bank.
                  </p>
                  <p className="mt-1 text-xs text-[#4c4f69]">
                    Compare against prior months for consistent balances and transaction ordering.
                  </p>
                  <p className="mt-1 text-xs text-[#4c4f69]">
                    PDF creation timestamps do not align with the stated statement period end date.
                  </p>
                  <p className="mt-1 text-xs text-[#4c4f69]">
                    Embedded fonts and vector paths differ from typical issuer templates for this bank.
                  </p>
                </article>
              </div>
            </section>

            <section>
              <div className="mb-3 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/cf13024f-3e71-4f25-9938-768089b93a1d"
                    alt=""
                    className="size-5 shrink-0"
                  />
                  <h3 className="text-base font-bold leading-none">Positions</h3>
                  <button
                    type="button"
                    className="rounded border border-[#4c4f69] px-2 py-0.5 text-[10px] font-medium text-[#4c4f69] transition hover:bg-[#efefef]"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-3 xl:col-span-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <svg
                      className="size-5 shrink-0 text-[#4c4f69]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4-4-4"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="shrink-0 text-base font-bold leading-none text-[#1c1b1f]">
                      Transactions
                    </span>
                    <input
                      type="search"
                      placeholder="Search..."
                      className="box-border h-5 w-full max-w-[132px] shrink-0 rounded border border-[#d9d9d9] bg-[#fafafa] px-2 py-0 text-sm font-normal leading-none text-[#1c1b1f] placeholder:text-[rgba(76,79,105,0.45)] sm:max-w-[148px]"
                      aria-label="Search transactions"
                    />
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-sm font-normal text-[#1e66f5] transition hover:text-[#1854c7]"
                  >
                    View all transactions
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="card-shadow pointer-events-none absolute inset-0 rounded border border-[#d9d9d9] bg-[#fafafa]/50"></div>
                <div className="relative z-10 grid gap-4 xl:grid-cols-3">
                  <div className="card-shadow overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa]">
                    <p className="bg-[#e2e8f4] px-4 py-2 text-[11px] text-[#4c4f69]">
                      currently active positions: 3
                    </p>
                    {positions.map((position) => (
                      <div key={position} className="border-b border-[#d9d9d9] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="h-4 w-7 rounded-full bg-[#1e66f5] p-[2px]">
                            <span className="block size-3 translate-x-3 rounded-full bg-[#fafafa]"></span>
                          </span>
                          <p className="text-sm font-medium text-[#1c1b1f]">{position}</p>
                        </div>
                        <div className="mb-2 flex gap-1 text-[10px]">
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-1.5 py-0.5">
                            $182.32 <span className="text-[rgba(76,79,105,0.4)]">weekly x20</span>
                          </span>
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-1.5 py-0.5">
                            $102.00 <span className="text-[rgba(76,79,105,0.4)]">weekly x20</span>
                          </span>
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-1.5 py-0.5">
                            $102.00 <span className="text-[rgba(76,79,105,0.4)]">weekly x20</span>
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-[#4c4f69]">Deposits</p>
                        <p className="text-[10px] text-[#4c4f69]">Jan 20 | $2,000</p>
                        <p className="text-[10px] text-[#4c4f69]">Mar 20 | $3,400</p>
                      </div>
                    ))}
                  </div>
                  <div className="card-shadow flex min-h-[405px] flex-col overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa] xl:col-span-2">
                    <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1fr)] items-center gap-2 bg-[#e2e8f4] px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-[#4c4f69]">
                      <span>Date</span>
                      <span>Description</span>
                      <span className="text-right">Amount</span>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <tbody>
                          {transactions.map((row, i) => (
                            <tr
                              key={`${row.date}-${row.description}-${i}`}
                              className="border-b border-[#efefef] last:border-b-0"
                            >
                              <td className="whitespace-nowrap px-4 py-2.5 text-xs text-[#4c4f69]">
                                {row.date}
                              </td>
                              <td className="px-4 py-2.5 text-xs text-[#1c1b1f]">{row.description}</td>
                              <td
                                className={`whitespace-nowrap px-4 py-2.5 text-right text-xs font-light tabular-nums ${
                                  row.credit ? "text-[#1e66f5]" : "text-[#d20f39]"
                                }`}
                              >
                                {row.credit ? "+" : "−"}
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
