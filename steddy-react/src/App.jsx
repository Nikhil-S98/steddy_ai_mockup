import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

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
    tone: "text-[#3277FF]",
    icon: "https://www.figma.com/api/mcp/asset/713d8352-e35a-4f6e-93c8-c944bf041395",
  },
  {
    title: "MONTHLY MCA PAYOUT",
    value: "$3,345",
    note: "Paying $167.25 daily",
    tone: "text-[#4c4f69]",
  },
]

const positions = ["Advance Syndicate", "EBF Holdings", "CFG Merchant Solutions"]

const transactions = [
  { date: "Feb 28", description: "Customer Payment — Inv #4521", credit: true, value: "$8,450" },
  { date: "Feb 28", description: "Rapid Capital ACH", credit: false, value: "$890" },
  { date: "Feb 28", description: "Payroll — 12 employees", credit: false, value: "$12,400" },
  { date: "Feb 27", description: "Wire Transfer — Vendor", credit: false, value: "$4,200" },
  { date: "Feb 27", description: "Deposit — Stripe Payout", credit: true, value: "$3,120" },
  { date: "Feb 26", description: "Equipment Lease", credit: false, value: "$1,050" },
  { date: "Feb 26", description: "ACH Return — NSF", credit: false, value: "$275" },
  { date: "Feb 25", description: "Merchant Cash Advance", credit: false, value: "$2,652" },
  { date: "Feb 25", description: "Sales Deposit", credit: true, value: "$6,890" },
  { date: "Feb 24", description: "Utilities — Electric", credit: false, value: "$412" },
  { date: "Feb 24", description: "Refund — Overpayment", credit: true, value: "$180" },
  { date: "Feb 23", description: "Insurance Premium", credit: false, value: "$928" },
  { date: "Feb 22", description: "POS Batch Deposit", credit: true, value: "$2,780" },
  { date: "Feb 22", description: "Fuel Expense", credit: false, value: "$265" },
  { date: "Feb 21", description: "Card Settlement", credit: true, value: "$1,940" },
  { date: "Feb 21", description: "Loan Servicing Fee", credit: false, value: "$520" },
  { date: "Feb 20", description: "ACH Deposit — Retail Sales", credit: true, value: "$4,160" },
  { date: "Feb 20", description: "Equipment Repair", credit: false, value: "$1,120" },
  { date: "Feb 19", description: "Online Sales Transfer", credit: true, value: "$2,305" },
  { date: "Feb 19", description: "Office Supplies", credit: false, value: "$148" },
  { date: "Feb 18", description: "Customer Wire", credit: true, value: "$5,400" },
  { date: "Feb 18", description: "Insurance Adjustment", credit: false, value: "$342" },
  { date: "Feb 17", description: "Marketplace Payout", credit: true, value: "$1,685" },
  { date: "Feb 17", description: "Vehicle Maintenance", credit: false, value: "$690" },
  { date: "Feb 16", description: "Weekend Deposit", credit: true, value: "$2,110" },
  { date: "Feb 16", description: "Tax Withholding Transfer", credit: false, value: "$1,470" },
]

const balanceData = [
  { date: "Dec 02", current: 72, withOffer: 64 },
  { date: "Dec 05", current: 38, withOffer: 30 },
  { date: "Dec 08", current: 4, withOffer: -6 },
  { date: "Dec 11", current: 56, withOffer: 48 },
  { date: "Dec 14", current: 70, withOffer: 61 },
  { date: "Dec 17", current: 31, withOffer: 22 },
  { date: "Dec 20", current: 8, withOffer: -2 },
  { date: "Dec 23", current: 94, withOffer: 86 },
  { date: "Dec 26", current: 101, withOffer: 91 },
  { date: "Dec 29", current: 78, withOffer: 69 },
  { date: "Jan 01", current: 83, withOffer: 73 },
  { date: "Jan 04", current: 62, withOffer: 54 },
  { date: "Jan 07", current: 68, withOffer: 59 },
  { date: "Jan 10", current: 73, withOffer: 64 },
  { date: "Jan 13", current: 49, withOffer: 42 },
  { date: "Jan 16", current: 61, withOffer: 53 },
  { date: "Jan 19", current: 66, withOffer: 58 },
  { date: "Jan 22", current: 74, withOffer: 66 },
  { date: "Jan 25", current: 70, withOffer: 62 },
  { date: "Jan 28", current: 56, withOffer: 47 },
  { date: "Jan 31", current: 40, withOffer: 30 },
  { date: "Feb 03", current: 48, withOffer: 39 },
  { date: "Feb 06", current: 66, withOffer: 58 },
  { date: "Feb 09", current: 70, withOffer: 62 },
  { date: "Feb 12", current: 57, withOffer: 49 },
  { date: "Feb 15", current: 59, withOffer: 51 },
  { date: "Feb 18", current: 56, withOffer: 48 },
]

const monthlyBalanceSeries = [
  {
    month: "December 2025",
    data: [
      { day: "1", balance: 68420 }, { day: "2", balance: 72110 }, { day: "3", balance: 69530 },
      { day: "4", balance: 66200 }, { day: "5", balance: 61980 }, { day: "6", balance: 57840 },
      { day: "7", balance: 53420 }, { day: "8", balance: 49880 }, { day: "9", balance: 56330 },
      { day: "10", balance: 60540 }, { day: "11", balance: 64920 }, { day: "12", balance: 67350 },
      { day: "13", balance: 64410 }, { day: "14", balance: 60120 }, { day: "15", balance: 55670 },
      { day: "16", balance: 51730 }, { day: "17", balance: 48590 }, { day: "18", balance: 45220 },
      { day: "19", balance: 43180 }, { day: "20", balance: 40810 }, { day: "21", balance: 72940 },
      { day: "22", balance: 80120 }, { day: "23", balance: 83570 }, { day: "24", balance: 86140 },
      { day: "25", balance: 82410 }, { day: "26", balance: 76390 }, { day: "27", balance: 70550 },
      { day: "28", balance: 66820 }, { day: "29", balance: 64130 }, { day: "30", balance: 60490 },
      { day: "31", balance: 57660 },
    ],
  },
  {
    month: "January 2026",
    data: [
      { day: "1", balance: 61240 }, { day: "2", balance: 64890 }, { day: "3", balance: 67220 },
      { day: "4", balance: 65130 }, { day: "5", balance: 62840 }, { day: "6", balance: 60330 },
      { day: "7", balance: 57410 }, { day: "8", balance: 54820 }, { day: "9", balance: 52660 },
      { day: "10", balance: 55420 }, { day: "11", balance: 58310 }, { day: "12", balance: 61280 },
      { day: "13", balance: 59440 }, { day: "14", balance: 57130 }, { day: "15", balance: 55320 },
      { day: "16", balance: 53210 }, { day: "17", balance: 50980 }, { day: "18", balance: 48650 },
      { day: "19", balance: 51420 }, { day: "20", balance: 54410 }, { day: "21", balance: 56300 },
      { day: "22", balance: 58120 }, { day: "23", balance: 59890 }, { day: "24", balance: 61750 },
      { day: "25", balance: 60340 }, { day: "26", balance: 58420 }, { day: "27", balance: 56210 },
      { day: "28", balance: 54460 }, { day: "29", balance: 52890 }, { day: "30", balance: 50970 },
      { day: "31", balance: 49220 },
    ],
  },
  {
    month: "February 2026",
    data: [
      { day: "1", balance: 48110 }, { day: "2", balance: 49980 }, { day: "3", balance: 52140 },
      { day: "4", balance: 54630 }, { day: "5", balance: 57120 }, { day: "6", balance: 59310 },
      { day: "7", balance: 61780 }, { day: "8", balance: 63840 }, { day: "9", balance: 65490 },
      { day: "10", balance: 64720 }, { day: "11", balance: 62450 }, { day: "12", balance: 59810 },
      { day: "13", balance: 57300 }, { day: "14", balance: 54910 }, { day: "15", balance: 52180 },
      { day: "16", balance: 49460 }, { day: "17", balance: 47340 }, { day: "18", balance: 45720 },
      { day: "19", balance: 48210 }, { day: "20", balance: 50940 }, { day: "21", balance: 53320 },
      { day: "22", balance: 55410 }, { day: "23", balance: 57920 }, { day: "24", balance: 60140 },
      { day: "25", balance: 61890 }, { day: "26", balance: 60310 }, { day: "27", balance: 58740 },
      { day: "28", balance: 56820 },
    ],
  },
]

const BASE_LEVERAGE = 23
const FUNDING_AMOUNT = 29472
const FREQUENCIES = ["Daily", "Weekly", "Bi-Weekly", "Monthly"]

function App() {
  const appRef = useRef(null)
  const [positionToggles, setPositionToggles] = useState(() =>
    Object.fromEntries(positions.map((name) => [name, true])),
  )
  const [calculator, setCalculator] = useState({
    leverageDelta: 11,
    termDays: 15,
    factor: 1.35,
    frequency: "Daily",
  })
  const handleCardClick = () => null

  const frequencyDivisor = {
    Daily: calculator.termDays,
    Weekly: calculator.termDays / 7,
    "Bi-Weekly": calculator.termDays / 14,
    Monthly: calculator.termDays / 30,
  }[calculator.frequency]

  const paymentAmount = (FUNDING_AMOUNT * calculator.factor) / Math.max(frequencyDivisor, 1)
  const paybackTotal = FUNDING_AMOUNT * calculator.factor
  const totalLeverage = BASE_LEVERAGE + calculator.leverageDelta

  const formatCurrency = (value) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-animate], .card-shadow", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.03,
        clearProps: "opacity,transform",
      })
    }, appRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={appRef}
      className="h-screen w-full overflow-hidden bg-[#fafafa] text-[#1c1b1f] [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]"
    >
      <header
        data-animate
        className="flex h-16 items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-4 sm:px-6 lg:px-10"
      >
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
          <span className="font-medium text-[#3277FF]">Review</span>
          <span>•</span>
          <span>Contract Sent</span>
          <span>•</span>
          <span>Signed</span>
          <span>•</span>
          <span>Funded</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="interactive-pop rounded border border-[#4c4f69] px-3 py-1.5 text-xs font-medium text-[#4c4f69] transition hover:bg-[#efefef]">
            Edit
          </button>
          <button className="interactive-pop rounded border border-[#4c4f69] px-3 py-1.5 text-xs font-medium text-[#4c4f69] transition hover:bg-[#efefef]">
            Export
          </button>
        </div>
      </header>

      <main className="grid h-[calc(100vh-64px)] gap-0 lg:grid-cols-[370px_1fr]">
        <aside
          data-animate
          className="flex h-[calc(100vh-64px)] flex-col border-r border-[#d9d9d9] bg-[#fafafa]"
        >
          <div className="border-b border-[#d9d9d9] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-xl border border-[#3277FF] bg-[#e9f0ff]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-[#3277FF]"
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
                  <span className="rounded bg-[#e9f0ff] px-2 py-0.5 font-medium text-[#3277FF]">
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
              <div className="rounded-md border border-[#d9d9d9] bg-[#e9f0ff]/45 p-3">
                <div className="mb-2 flex items-center gap-2 text-[#3277FF]">
                  <span className="grid size-5 place-items-center rounded-full bg-[#3277FF] text-[11px] text-[#fafafa]">
                    ✓
                  </span>
                  <span className="text-base font-bold leading-none">Approved</span>
                </div>
                <p className="text-[12px] leading-snug text-[#1c1b1f]">
                  Revenue trend positive, leverage within range, 2 negative
                  days flagged for review.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="interactive-pop rounded-md bg-[#3277FF] py-2 text-[13px] font-semibold text-[#fafafa]">
                    Confirm
                  </button>
                  <button className="interactive-pop rounded-md border border-[#d9d9d9] bg-[#fafafa] py-2 text-[13px] font-semibold text-[#1c1b1f]">
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
                    <span className="px-2 text-[12px] font-medium text-[#1c1b1f]">
                      {formatCurrency(FUNDING_AMOUNT)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">LEVERAGE</p>
                  <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                    <button
                      type="button"
                      className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                      onClick={() =>
                        setCalculator((prev) => ({
                          ...prev,
                          leverageDelta: Math.max(prev.leverageDelta - 1, 0),
                        }))
                      }
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-[12px] font-medium text-[#1c1b1f]">
                      {BASE_LEVERAGE} + <span className="text-[#3277FF]">{calculator.leverageDelta}</span>
                    </span>
                    <button
                      type="button"
                      className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                      onClick={() =>
                        setCalculator((prev) => ({
                          ...prev,
                          leverageDelta: Math.min(prev.leverageDelta + 1, 50),
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">TERM (DAYS)</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <button
                        type="button"
                        className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                        onClick={() =>
                          setCalculator((prev) => ({ ...prev, termDays: Math.max(prev.termDays - 1, 1) }))
                        }
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-[12px] font-medium text-[#1c1b1f]">
                        {calculator.termDays}
                      </span>
                      <button
                        type="button"
                        className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                        onClick={() =>
                          setCalculator((prev) => ({ ...prev, termDays: Math.min(prev.termDays + 1, 120) }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">FACTOR</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <button
                        type="button"
                        className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                        onClick={() =>
                          setCalculator((prev) => ({
                            ...prev,
                            factor: Math.max(Number((prev.factor - 0.01).toFixed(2)), 1),
                          }))
                        }
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-[12px] font-medium text-[#1c1b1f]">
                        {calculator.factor.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="grid h-full w-7 place-items-center border-l border-[#d9d9d9] bg-[#efefef] text-[13px] text-[#4c4f69]"
                        onClick={() =>
                          setCalculator((prev) => ({
                            ...prev,
                            factor: Math.min(Number((prev.factor + 0.01).toFixed(2)), 2),
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">PAYMENT</p>
                    <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                      <span className="grid h-full w-7 place-items-center border-r border-[#d9d9d9] bg-[#efefef] text-[12px] text-[#4c4f69]">$</span>
                      <span className="px-2 text-[12px] font-medium text-[#1c1b1f]">
                        {formatCurrency(paymentAmount)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">FREQUENCY</p>
                    <div className="relative">
                      <select
                        value={calculator.frequency}
                        onChange={(event) =>
                          setCalculator((prev) => ({ ...prev, frequency: event.target.value }))
                        }
                        className="h-10 w-full appearance-none rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2 pr-6 text-[12px] font-medium text-[#1c1b1f]"
                      >
                        {FREQUENCIES.map((frequency) => (
                          <option key={frequency} value={frequency}>
                            {frequency}
                          </option>
                        ))}
                      </select>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#4c4f69]"
                      >
                        ⌄
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-[#d9d9d9] bg-[#efefef] px-3 py-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">Payback Total</span>
                    <span className="text-[12px] font-semibold text-[#1c1b1f]">
                      ${formatCurrency(paybackTotal)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-[#4c4f69]">Total Leverage</span>
                    <span className="text-[12px] font-semibold text-[#1c1b1f]">{totalLeverage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d9d9d9] bg-[#fafafa] p-4">
            <button
              type="button"
              className="interactive-pop mb-3 w-full rounded-lg border border-[#d9d9d9] bg-[#fafafa] px-4 py-2.5 text-center text-[12px] font-medium text-[#4c4f69]"
            >
              View Contract &nbsp; <span className="rounded bg-[#efefef] px-1.5 py-0.5 text-[10px]">NOT SENT</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="interactive-pop rounded-lg bg-[#3277FF] px-4 py-2.5 text-[14px] font-semibold text-[#fafafa]">
                ✓ Approve
              </button>
              <button className="interactive-pop rounded-lg border border-[#d20f39] bg-[#d20f39] px-4 py-2.5 text-[14px] font-semibold text-[#fafafa]">
                ✕ Decline
              </button>
            </div>
          </div>
        </aside>

        <section
          data-animate
          className="h-[calc(100vh-64px)] overflow-y-auto bg-[#e9f0ff] p-4 sm:p-6 lg:p-8"
        >
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
                    onClick={handleCardClick}
                    className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
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
                  <article
                    onClick={handleCardClick}
                    className="interactive-pop card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4"
                  >
                    <span className="mt-1 size-[9px] rounded-full bg-[#d20f39] shadow-[0_0_0_2px_#e9f0ff]"></span>
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
                  <article
                    onClick={handleCardClick}
                    className="interactive-pop card-shadow flex min-h-[108px] items-start gap-3 rounded border border-[#d9d9d9] bg-[#fafafa] px-5 py-4"
                  >
                    <span className="mt-1 size-[9px] rounded-full bg-[#3277FF] shadow-[0_0_0_2px_#e9f0ff]"></span>
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
                    <span className="rounded-full border border-[#b8d4ff] bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-medium text-[#3277FF]">
                      clean
                    </span>
                  </article>
                </div>

                <article
                  onClick={handleCardClick}
                  className="interactive-pop card-shadow min-h-[270px] rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
                >
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
                    className="interactive-pop rounded border border-[#4c4f69] px-2 py-0.5 text-[10px] font-medium text-[#4c4f69] transition hover:bg-[#efefef]"
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
                    className="interactive-pop shrink-0 text-sm font-normal text-[#3277FF] transition hover:text-[#2566d9]"
                  >
                    View all transactions
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="card-shadow pointer-events-none absolute inset-0 rounded border border-[#d9d9d9] bg-[#fafafa]/50"></div>
                <div className="relative z-10 grid gap-4 xl:grid-cols-3">
                  <div className="card-shadow overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa]">
                    <p className="bg-[#e9f0ff] px-4 py-2 text-[11px] text-[#4c4f69]">
                      Currently active positions: 3
                    </p>
                    {positions.map((position) => {
                      const on = positionToggles[position]
                      return (
                      <div key={position} className="border-b border-[#d9d9d9] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={on}
                            aria-label={`${position} position active`}
                            onClick={() =>
                              setPositionToggles((prev) => ({
                                ...prev,
                                [position]: !prev[position],
                              }))
                            }
                            className={`interactive-pop relative h-4 w-7 shrink-0 rounded-full p-[2px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3277FF] ${
                              on ? "bg-[#3277FF]" : "bg-[#4c4f69]/30"
                            }`}
                          >
                            <span
                              className={`block size-3 rounded-full bg-[#fafafa] shadow-sm transition-transform ${
                                on ? "translate-x-3" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <p className="text-sm font-medium text-[#1c1b1f]">{position}</p>
                        </div>
                        <div className="mb-2 flex gap-1 text-[11px]">
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-2 py-1">
                            $182.32 <span className="text-[rgba(76,79,105,0.5)]">weekly x20</span>
                          </span>
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-2 py-1">
                            $102.00 <span className="text-[rgba(76,79,105,0.5)]">weekly x20</span>
                          </span>
                          <span className="rounded-full border border-[#d9d9d9] bg-[#efefef] px-2 py-1">
                            $102.00 <span className="text-[rgba(76,79,105,0.5)]">weekly x20</span>
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-[#4c4f69]">Deposits</p>
                        <p className="text-[10px] text-[#4c4f69]">Jan 20 | $2,000</p>
                        <p className="text-[10px] text-[#4c4f69]">Mar 20 | $3,400</p>
                      </div>
                    )})}
                  </div>
                  <div className="card-shadow flex min-h-[485px] max-h-[485px] flex-col overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa] xl:col-span-2">
                    <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1fr)] items-center gap-2 bg-[#e9f0ff] px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-[#4c4f69]">
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
                                  row.credit ? "text-[#3277FF]" : "text-[#d20f39]"
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
            <section data-animate>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-base font-bold leading-none text-[#1c1b1f]">
                  Daily Balances
                </h3>
              </div>

              <div className="card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-4">
                <div className="mb-3 flex items-center gap-5 text-sm font-medium text-[#4c4f69]">
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-4 rounded-full bg-[#3277FF]" />
                    <span>Current Balance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-4 rounded-full border-t-2 border-dashed border-[#94a3b8]" />
                    <span>With Offer</span>
                  </div>
                </div>

                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={balanceData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                      <CartesianGrid stroke="#eef2f7" strokeDasharray="0" vertical={false} />
                      <ReferenceLine y={0} stroke="#fca5a5" strokeDasharray="5 5" />
                      <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        minTickGap={28}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[-30, 120]}
                        ticks={[-30, 0, 30, 60, 90, 120]}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => (value === 0 ? "$0" : `${value < 0 ? "-" : ""}$${Math.abs(value)}k`)}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ stroke: "#dbe6ff", strokeWidth: 1 }}
                        formatter={(value) => `$${value}k`}
                        labelStyle={{ color: "#4c4f69", fontWeight: 600 }}
                        contentStyle={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(76, 79, 105, 0.15)",
                          color: "#1c1b1f",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#3277FF"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="withOffer"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="6 6"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {monthlyBalanceSeries.map((series) => (
                  <article
                    key={series.month}
                    className="card-shadow overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa]"
                  >
                    <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#e9f0ff] px-3 py-2">
                      <h4 className="text-sm font-semibold text-[#1c1b1f]">{series.month}</h4>
                      <span className="text-xs text-[#4c4f69]">Daily closing balance</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#d9d9d9] bg-[#fafafa] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#4c4f69]">
                      <span>Date</span>
                      <span className="text-right">Balance</span>
                    </div>
                    <div>
                      {series.data
                        .filter((entry) => {
                          const date = new Date(`${series.month} ${entry.day}`)
                          const dayOfWeek = date.getDay()
                          return dayOfWeek !== 0 && dayOfWeek !== 6
                        })
                        .map((entry, idx) => (
                        <div
                          key={`${series.month}-${entry.day}-${idx}`}
                          className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#efefef] px-3 py-1.5 text-xs last:border-b-0"
                        >
                          <span className="text-[#4c4f69]">{series.month.slice(0, 3)} {entry.day}</span>
                          <span className="text-right tabular-nums text-[#1c1b1f]">
                            ${entry.balance.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
