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

const initialPositions = [
  {
    id: "advance-syndicate",
    title: "Advance Syndicate",
    chips: [
      { amount: "$182.32", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
    ],
    deposits: [
      { date: "Jan 20", amount: "$2,000" },
      { date: "Mar 20", amount: "$3,400" },
    ],
  },
  {
    id: "ebf-holdings",
    title: "EBF Holdings",
    chips: [
      { amount: "$182.32", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
    ],
    deposits: [
      { date: "Jan 20", amount: "$2,000" },
      { date: "Mar 20", amount: "$3,400" },
    ],
  },
  {
    id: "cfg-merchant-solutions",
    title: "CFG Merchant Solutions",
    chips: [
      { amount: "$182.32", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
      { amount: "$102.00", meta: "weekly" },
    ],
    deposits: [
      { date: "Jan 20", amount: "$2,000" },
      { date: "Mar 20", amount: "$3,400" },
    ],
  },
]

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
const COLOR_THEMES = [
  { value: "light", label: "Light" },
  { value: "teal", label: "Teal" },
  { value: "tealDark", label: "Teal Dark" },
  { value: "dark", label: "Dark" },
  { value: "gruvboxLight", label: "Gruvbox Light" },
  { value: "gruvbox", label: "Gruvbox Dark" },
  { value: "ayuLight", label: "Ayu Light" },
  { value: "ayuMirage", label: "Ayu Mirage" },
  { value: "ayuDark", label: "Ayu Dark" },
]
const underwritingSteps = [
  "Submitted",
  "Review",
  "Contract Sent",
  "Signed",
  "Final Underwriting",
  "Funded",
]
const monthlyBreakdownRows = [
  {
    month: "December 2025",
    revenue: "$52,410",
    leverage: "31%",
    mcaPayout: "$10,650",
    note: "Seasonal equipment demand drove higher card deposits.",
  },
  {
    month: "January 2026",
    revenue: "$61,780",
    leverage: "28%",
    mcaPayout: "$11,240",
    note: "Collections improved while payouts stayed stable.",
  },
  {
    month: "February 2026",
    revenue: "$60,040",
    leverage: "23%",
    mcaPayout: "$10,035",
    note: "Short month with consistent paydown and fewer reversal days.",
  },
]
const flagDetailPanels = {
  unicourt: {
    title: "UniCourt Detail",
    subtitle: "Litigation docket and case-tracking signal",
    status: "3 open dockets identified",
    points: [
      "Cross-court search returned three active civil matters tied to owner/entity identifiers.",
      "Latest docket activity is within the last 30 days, so legal exposure is still current.",
      "One case remains in discovery and another has a pending hearing date on calendar.",
      "Recommendation: obtain disposition details before final approval decision.",
    ],
  },
  datamerch: {
    title: "DataMerch Detail",
    subtitle: "MCA peer-funder repayment and fraud reporting check",
    status: "No adverse DataMerch hits",
    points: [
      "No reported defaults, manipulated statements, or negative funder comments on file.",
      "Entity lookup matched FEIN/business profile without conflicting merchant records.",
      "Search count indicates this merchant has been screened repeatedly by market participants.",
      "Recommendation: continue normal underwriting checks; no DataMerch-only decline trigger.",
    ],
  },
  fraud: {
    title: "MoneyThumb Fraud Detail",
    subtitle: "Thumbprint-style PDF authenticity and reconciliation signals",
    status: "1 high-risk statement integrity flag",
    points: [
      "Document structure and metadata pattern do not fully match expected bank template fingerprints.",
      "Font/position consistency checks indicate probable post-download edits on key transaction lines.",
      "Arithmetic reconciliation variance found between line activity and reported statement summary totals.",
      "Recommendation: request direct bank-origin export or login-based verification prior to funding.",
    ],
  },
}

function App() {
  const appRef = useRef(null)
  const [colorMode, setColorMode] = useState("light")
  const [isContractOpen, setIsContractOpen] = useState(false)
  const [isMonthlyBreakdownOpen, setIsMonthlyBreakdownOpen] = useState(false)
  const [isPositionEditorOpen, setIsPositionEditorOpen] = useState(false)
  const [activeFlagPanel, setActiveFlagPanel] = useState(null)
  const [activeMetricTitle, setActiveMetricTitle] = useState("MONTHLY REVENUE")
  const [positionsData, setPositionsData] = useState(initialPositions)
  const [editingPositionId, setEditingPositionId] = useState(null)
  const [positionToggles, setPositionToggles] = useState(() =>
    Object.fromEntries(initialPositions.map((position) => [position.id, true])),
  )
  const [activePositionChips, setActivePositionChips] = useState({})
  const [draftPosition, setDraftPosition] = useState({
    title: "",
    paymentAmount: "",
    paymentCadence: "Weekly",
    depositAmount: "",
    depositDate: "",
    chips: [],
    deposits: [],
  })
  const [editingPaymentIndex, setEditingPaymentIndex] = useState(null)
  const [editingDepositIndex, setEditingDepositIndex] = useState(null)
  const [calculator, setCalculator] = useState({
    leverageDelta: 11,
    termDays: 15,
    factor: 1.35,
    frequency: "Daily",
  })
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
  const activeUnderwritingStep = 1

  const resetDraftPosition = () => {
    setDraftPosition({
      title: "",
      paymentAmount: "",
      paymentCadence: "Weekly",
      depositAmount: "",
      depositDate: "",
      chips: [],
      deposits: [],
    })
    setEditingPositionId(null)
    setEditingPaymentIndex(null)
    setEditingDepositIndex(null)
  }

  const openCreatePositionEditor = () => {
    resetDraftPosition()
    setIsPositionEditorOpen(true)
  }

  const openEditPositionEditor = (position) => {
    setDraftPosition({
      title: position.title,
      paymentAmount: "",
      paymentCadence: "Weekly",
      depositAmount: "",
      depositDate: "",
      chips: position.chips,
      deposits: position.deposits,
    })
    setEditingPositionId(position.id)
    setEditingPaymentIndex(null)
    setEditingDepositIndex(null)
    setIsPositionEditorOpen(true)
  }

  const addOrUpdateDraftPayment = () => {
    if (!draftPosition.paymentAmount.trim()) return
    const nextPayment = {
      amount: draftPosition.paymentAmount.trim(),
      meta: draftPosition.paymentCadence,
    }
    setDraftPosition((prev) => {
      if (editingPaymentIndex === null) {
        return { ...prev, chips: [...prev.chips, nextPayment], paymentAmount: "" }
      }
      return {
        ...prev,
        chips: prev.chips.map((chip, index) => (index === editingPaymentIndex ? nextPayment : chip)),
        paymentAmount: "",
      }
    })
    setEditingPaymentIndex(null)
  }

  const editDraftPayment = (index) => {
    const payment = draftPosition.chips[index]
    if (!payment) return
    setDraftPosition((prev) => ({
      ...prev,
      paymentAmount: payment.amount,
      paymentCadence: payment.meta,
    }))
    setEditingPaymentIndex(index)
  }

  const removeDraftPayment = (index) => {
    setDraftPosition((prev) => ({
      ...prev,
      chips: prev.chips.filter((_, chipIndex) => chipIndex !== index),
    }))
    if (editingPaymentIndex === index) {
      setEditingPaymentIndex(null)
      setDraftPosition((prev) => ({ ...prev, paymentAmount: "", paymentCadence: "Weekly" }))
    }
  }

  const addOrUpdateDraftDeposit = () => {
    if (!draftPosition.depositAmount.trim() || !draftPosition.depositDate.trim()) return
    const nextDeposit = {
      amount: draftPosition.depositAmount.trim(),
      date: draftPosition.depositDate.trim(),
    }
    setDraftPosition((prev) => {
      if (editingDepositIndex === null) {
        return {
          ...prev,
          deposits: [...prev.deposits, nextDeposit],
          depositAmount: "",
          depositDate: "",
        }
      }
      return {
        ...prev,
        deposits: prev.deposits.map((deposit, index) =>
          index === editingDepositIndex ? nextDeposit : deposit,
        ),
        depositAmount: "",
        depositDate: "",
      }
    })
    setEditingDepositIndex(null)
  }

  const editDraftDeposit = (index) => {
    const deposit = draftPosition.deposits[index]
    if (!deposit) return
    setDraftPosition((prev) => ({
      ...prev,
      depositAmount: deposit.amount,
      depositDate: deposit.date,
    }))
    setEditingDepositIndex(index)
  }

  const removeDraftDeposit = (index) => {
    setDraftPosition((prev) => ({
      ...prev,
      deposits: prev.deposits.filter((_, depositIndex) => depositIndex !== index),
    }))
    if (editingDepositIndex === index) {
      setEditingDepositIndex(null)
      setDraftPosition((prev) => ({ ...prev, depositAmount: "", depositDate: "" }))
    }
  }

  const savePosition = () => {
    if (!draftPosition.title.trim()) return
    const positionPayload = {
      title: draftPosition.title.trim(),
      chips: draftPosition.chips,
      deposits: draftPosition.deposits,
    }
    if (editingPositionId) {
      setPositionsData((prev) =>
        prev.map((position) =>
          position.id === editingPositionId ? { ...position, ...positionPayload } : position,
        ),
      )
    } else {
      const newId = `position-${Date.now()}`
      const createdPosition = { id: newId, ...positionPayload }
      setPositionsData((prev) => [...prev, createdPosition])
      setPositionToggles((prev) => ({ ...prev, [newId]: true }))
    }
    resetDraftPosition()
    setIsPositionEditorOpen(false)
  }

  const removePosition = (positionId) => {
    setPositionsData((prev) => prev.filter((position) => position.id !== positionId))
    setPositionToggles((prev) => {
      const next = { ...prev }
      delete next[positionId]
      return next
    })
    if (editingPositionId === positionId) {
      resetDraftPosition()
      setIsPositionEditorOpen(false)
    }
  }

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
      className={`h-screen w-full overflow-hidden bg-[#fafafa] text-[#1c1b1f] [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif] ${
        colorMode === "dark" ? "theme-dark" : ""
      } ${colorMode === "teal" ? "theme-teal" : ""} ${colorMode === "gruvbox" ? "theme-gruvbox" : ""} ${
        colorMode === "tealDark" ? "theme-dark theme-teal theme-teal-dark" : ""
      } ${
        colorMode === "gruvboxLight" ? "theme-gruvbox-light" : ""
      } ${colorMode === "ayuLight" ? "theme-ayu-light" : ""} ${
        colorMode === "ayuMirage" ? "theme-ayu-mirage" : ""
      } ${colorMode === "ayuDark" ? "theme-ayu-dark" : ""
      }`}
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

        <div className="hidden items-center xl:flex">
          {underwritingSteps.map((step, index) => {
            const isCompleted = index < activeUnderwritingStep
            const isActive = index === activeUnderwritingStep
            return (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`grid size-3.5 place-items-center rounded-full border text-[9px] leading-none ${
                      isCompleted
                        ? "border-[#3277FF] bg-[#3277FF] text-[#fafafa]"
                        : isActive
                          ? "border-[#3277FF] bg-[#fafafa] text-transparent"
                          : "border-[#c8ced9] bg-[#fafafa] text-transparent"
                    }`}
                  >
                    {isCompleted ? "✓" : ""}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isCompleted || isActive
                        ? "font-medium text-[#3277FF]"
                        : "underwriting-step-inactive text-[rgba(76,79,105,0.55)]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < underwritingSteps.length - 1 ? (
                  <span
                    className={`mx-2 h-[1px] w-6 ${
                      index < activeUnderwritingStep ? "bg-[#0f9f9a]" : "bg-[#d9d9d9]"
                    }`}
                  />
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={colorMode}
              onChange={(event) => setColorMode(event.target.value)}
              aria-label="Choose color theme"
              className="h-8 min-w-[170px] appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-7 text-xs font-medium text-[#4c4f69]"
            >
              {COLOR_THEMES.map((themeOption) => (
                <option key={themeOption.value} value={themeOption.value}>
                  {themeOption.label}
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
              <div className="ai-decision-card rounded-md border border-[#d9d9d9] bg-[#e9f0ff]/45 p-3">
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
              onClick={() => setIsContractOpen(true)}
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
              <div className="section-label-row mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/a3793c52-6f95-494a-9ba9-f57990eecf62"
                    alt=""
                    className="section-icon size-5"
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
                    onClick={() => {
                      setActiveMetricTitle(metric.title)
                      setIsMonthlyBreakdownOpen(true)
                    }}
                    className="interactive-pop card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-5"
                  >
                    <p className="text-xs font-normal tracking-wide text-[#4c4f69]">
                      {metric.title}
                    </p>
                    <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">
                      {metric.value}
                    </p>
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
                <img
                  src="https://www.figma.com/api/mcp/asset/03690ed8-b334-458e-958c-cf99d6584b21"
                  alt=""
                  className="section-icon size-5"
                />
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
                      <p className="text-sm font-semibold leading-none text-[#1c1b1f]">
                        UniCourt
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Litigation search returned 3 open dockets
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Recent filing activity detected in the last 30 days.
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Validate dispositions before final approval.
                      </p>
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
                      <p className="text-sm font-semibold leading-none text-[#1c1b1f]">
                        DataMerch
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        No negative peer-funder repayment or fraud postings
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        FEIN/profile check returned a clean DataMerch file.
                      </p>
                      <p className="mt-1 text-xs text-[#4c4f69]">
                        Continue standard monitoring cadence.
                      </p>
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
                  <p className="text-xs font-light tracking-wide text-[#4c4f69]">
                    POTENTIAL FRAUD ALERTS
                  </p>
                  <p className="mt-2 text-4xl font-bold leading-none text-[#1c1b1f]">
                    1 Alert
                  </p>
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

            <section>
              <div className="section-label-row mb-3 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/cf13024f-3e71-4f25-9938-768089b93a1d"
                    alt=""
                    className="section-icon size-5 shrink-0"
                  />
                  <h3 className="text-base font-bold leading-none">Positions</h3>
                  <button
                    type="button"
                    onClick={openCreatePositionEditor}
                    className="interactive-pop rounded border border-[#4c4f69] px-2 py-0.5 text-[10px] font-medium text-[#4c4f69] transition hover:bg-[#efefef]"
                  >
                    Add a Position
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
                <div className="card-shadow pointer-events-none absolute inset-0 rounded border border-[#d9d9d9] bg-[#e9f0ff]/50"></div>
                <div className="relative z-10 grid gap-4 xl:grid-cols-3">
                  <div className="card-shadow flex min-h-[485px] max-h-[485px] flex-col overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa]">
                    <p className="bg-[#e9f0ff] px-4 py-2 text-[11px] text-[#4c4f69]">
                      Currently active positions: {positionsData.length}
                    </p>
                    <div className="min-h-0 flex-1 overflow-y-auto">
                    {positionsData.map((position) => {
                      const on = positionToggles[position.id]
                      return (
                      <div key={position.id} className="border-b border-[#d9d9d9] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={on}
                            aria-label={`${position.title} position active`}
                            onClick={() =>
                              setPositionToggles((prev) => ({
                                ...prev,
                                [position.id]: !prev[position.id],
                              }))
                            }
                            className={`interactive-pop relative h-4 w-7 shrink-0 rounded-full p-[2px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3277FF] ${
                              on ? "bg-[#3277FF]" : "bg-[#3277FF]/40"
                            }`}
                          >
                            <span
                              className={`block size-3 rounded-full bg-[#fafafa] shadow-sm transition-transform ${
                                on ? "translate-x-3" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <p className={`flex-1 text-sm font-medium ${on ? "text-[#1c1b1f]" : "text-[#8b8ba0]"}`}>
                            {position.title}
                          </p>
                          <button
                            type="button"
                            aria-label={`Edit ${position.title}`}
                            className="interactive-pop rounded p-1 text-[#4c4f69] transition hover:bg-[#efefef] hover:text-[#3277FF]"
                            onClick={() => openEditPositionEditor(position)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-3.5"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 20H8L18 10C18.6 9.4 18.6 8.4 18 7.8L16.2 6C15.6 5.4 14.6 5.4 14 6L4 16V20Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${position.title}`}
                            className="interactive-pop rounded p-1 text-[#4c4f69] transition hover:bg-[#efefef] hover:text-[#d20f39]"
                            onClick={() => removePosition(position.id)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-3.5"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 7H19M10 11V17M14 11V17M7 7L8 19C8.05 19.55 8.5 20 9.06 20H14.94C15.5 20 15.95 19.55 16 19L17 7M9.5 7V5.5C9.5 4.67 10.17 4 11 4H13C13.83 4 14.5 4.67 14.5 5.5V7"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className={`mb-2 flex gap-1 text-[10px] transition-opacity ${on ? "opacity-100" : "opacity-45"}`}>
                          {position.chips.map((chip, chipIndex) => {
                            const chipKey = `${position.id}-${chipIndex}`
                            const isActive = Boolean(activePositionChips[chipKey])
                            return (
                              <button
                                key={chipKey}
                                type="button"
                                onClick={() =>
                                  setActivePositionChips((prev) => ({
                                    ...prev,
                                    [chipKey]: !prev[chipKey],
                                  }))
                                }
                                className={`rounded-full border px-2 py-1 transition-colors ${
                                  isActive
                                    ? "border-[#3277FF] bg-[#3277FF] text-[#fafafa]"
                                    : "border-[#d9d9d9] bg-[#efefef] text-[#1c1b1f]"
                                }`}
                              >
                                {chip.amount}{" "}
                                <span className={isActive ? "text-[#dbe6ff]" : "text-[rgba(76,79,105,0.5)]"}>
                                  {chip.meta}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <p className={`text-[11px] font-medium ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>Deposits</p>
                        {position.deposits.length ? (
                          position.deposits.map((deposit) => (
                            <p
                              key={`${position.id}-${deposit.date}-${deposit.amount}`}
                              className={`text-[10px] ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}
                            >
                              {deposit.date} | {deposit.amount}
                            </p>
                          ))
                        ) : (
                          <p className={`text-[10px] ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>No deposits added</p>
                        )}
                      </div>
                    )})}
                    </div>
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
                                className={`whitespace-nowrap px-4 py-2.5 text-right text-xs font-normal tabular-nums ${
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
              <div className="section-label-row mb-3 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-[#4c4f69]"
                  aria-hidden="true"
                >
                  <path
                    d="M4 19.5V5.5M4 19.5H20M4 19.5L9.5 13L13.5 16.5L20 9"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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

      <div
        className={`fixed inset-0 z-[43] transition-opacity duration-300 ${
          isPositionEditorOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close position editor panel"
          className="absolute inset-0 bg-[rgba(28,27,31,0.2)]"
          onClick={() => setIsPositionEditorOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] border-l border-[#d9d9d9] bg-[#fafafa] shadow-[-8px_0_20px_rgba(28,27,31,0.14)] transition-transform duration-300 ease-out ${
            isPositionEditorOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] px-5 py-4">
              <h3 className="text-base font-semibold text-[#1c1b1f]">
                {editingPositionId ? "Edit Position" : "Create Position"}
              </h3>
              <button
                type="button"
                aria-label="Close position editor panel"
                className="interactive-pop text-lg leading-none text-[#4c4f69]"
                onClick={() => setIsPositionEditorOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[11px] font-medium text-[#4c4f69]">TITLE</p>
                  <input
                    type="text"
                    value={draftPosition.title}
                    onChange={(event) =>
                      setDraftPosition((prev) => ({ ...prev, title: event.target.value }))
                    }
                    placeholder="Enter position title"
                    className="h-10 w-full rounded-md border border-[#d9d9d9] bg-[#fafafa] px-3 text-[12px] text-[#1c1b1f]"
                  />
                </div>

                <div className="rounded-md border border-[#d9d9d9] bg-[#fafafa] p-3">
                  <p className="mb-2 text-[11px] font-medium text-[#4c4f69]">ADD PAYMENT</p>
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
                    <input
                      type="text"
                      value={draftPosition.paymentAmount}
                      onChange={(event) =>
                        setDraftPosition((prev) => ({ ...prev, paymentAmount: event.target.value }))
                      }
                      placeholder="$120.00"
                      className="h-9 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2 text-[12px]"
                    />
                    <select
                      value={draftPosition.paymentCadence}
                      onChange={(event) =>
                        setDraftPosition((prev) => ({ ...prev, paymentCadence: event.target.value }))
                      }
                      className="h-9 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2 text-[12px]"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                    <button
                      type="button"
                      onClick={addOrUpdateDraftPayment}
                      className="interactive-pop rounded-md border border-[#d9d9d9] px-3 text-[12px] font-medium text-[#1c1b1f]"
                    >
                      {editingPaymentIndex === null ? "Add" : "Save"}
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {draftPosition.chips.map((chip, index) => (
                      <span
                        key={`${chip.amount}-${chip.meta}-${index}`}
                        className="inline-flex items-center gap-1 rounded-full border border-[#d9d9d9] bg-[#efefef] px-2 py-1 text-[#1c1b1f]"
                      >
                        {chip.amount} <span className="text-[rgba(76,79,105,0.6)]">{chip.meta}</span>
                        <button
                          type="button"
                          className="text-[#4c4f69] hover:text-[#3277FF]"
                          onClick={() => editDraftPayment(index)}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          className="text-[#4c4f69] hover:text-[#d20f39]"
                          onClick={() => removeDraftPayment(index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-[#d9d9d9] bg-[#fafafa] p-3">
                  <p className="mb-2 text-[11px] font-medium text-[#4c4f69]">ADD DEPOSIT</p>
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
                    <input
                      type="text"
                      value={draftPosition.depositDate}
                      onChange={(event) =>
                        setDraftPosition((prev) => ({ ...prev, depositDate: event.target.value }))
                      }
                      placeholder="Feb 26"
                      className="h-9 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2 text-[12px]"
                    />
                    <input
                      type="text"
                      value={draftPosition.depositAmount}
                      onChange={(event) =>
                        setDraftPosition((prev) => ({ ...prev, depositAmount: event.target.value }))
                      }
                      placeholder="$2,400"
                      className="h-9 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2 text-[12px]"
                    />
                    <button
                      type="button"
                      onClick={addOrUpdateDraftDeposit}
                      className="interactive-pop rounded-md border border-[#d9d9d9] px-3 text-[12px] font-medium text-[#1c1b1f]"
                    >
                      {editingDepositIndex === null ? "Add" : "Save"}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {draftPosition.deposits.map((deposit, index) => (
                      <p
                        key={`${deposit.date}-${deposit.amount}-${index}`}
                        className="flex items-center justify-between text-[11px] text-[#4c4f69]"
                      >
                        <span>
                          {deposit.date} | {deposit.amount}
                        </span>
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            className="text-[#4c4f69] hover:text-[#3277FF]"
                            onClick={() => editDraftDeposit(index)}
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            className="text-[#4c4f69] hover:text-[#d20f39]"
                            onClick={() => removeDraftDeposit(index)}
                          >
                            ×
                          </button>
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#d9d9d9] p-4">
              <button
                type="button"
                onClick={savePosition}
                className="interactive-pop w-full rounded-md bg-[#3277FF] py-2.5 text-[12px] font-semibold text-[#fafafa]"
              >
                {editingPositionId ? "Save Position" : "Create Position"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMonthlyBreakdownOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close monthly breakdown panel"
          className="absolute inset-0 bg-[rgba(28,27,31,0.2)]"
          onClick={() => setIsMonthlyBreakdownOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[390px] border-l border-[#d9d9d9] bg-[#fafafa] shadow-[-8px_0_20px_rgba(28,27,31,0.14)] transition-transform duration-300 ease-out ${
            isMonthlyBreakdownOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-[#1c1b1f]">Monthly Breakdown</h3>
                <p className="mt-1 text-[11px] text-[#4c4f69]">{activeMetricTitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close monthly breakdown panel"
                className="interactive-pop text-lg leading-none text-[#4c4f69]"
                onClick={() => setIsMonthlyBreakdownOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <p className="text-[11px] text-[#4c4f69]">
                Breakdown of monthly revenue, leverage, and MCA payout from the last three
                statement periods.
              </p>

              <div className="mt-4 space-y-3">
                {monthlyBreakdownRows.map((row) => (
                  <article
                    key={row.month}
                    className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3"
                  >
                    <h4 className="text-xs font-semibold tracking-wide text-[#1c1b1f]">{row.month}</h4>
                    <div className="mt-2 space-y-1 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#4c4f69]">Revenue</span>
                        <span className="font-medium text-[#1c1b1f]">{row.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#4c4f69]">Leverage</span>
                        <span className="font-medium text-[#1c1b1f]">{row.leverage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#4c4f69]">MCA Payout</span>
                        <span className="font-medium text-[#1c1b1f]">{row.mcaPayout}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#4c4f69]">{row.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`fixed inset-0 z-[45] transition-opacity duration-300 ${
          activeFlagPanel ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close flag detail panel"
          className="absolute inset-0 bg-[rgba(28,27,31,0.2)]"
          onClick={() => setActiveFlagPanel(null)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[380px] border-l border-[#d9d9d9] bg-[#fafafa] shadow-[-8px_0_20px_rgba(28,27,31,0.14)] transition-transform duration-300 ease-out ${
            activeFlagPanel ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-[#1c1b1f]">
                  {activeFlagPanel ? flagDetailPanels[activeFlagPanel].title : "Flag Detail"}
                </h3>
                <p className="mt-1 text-[11px] text-[#4c4f69]">
                  {activeFlagPanel ? flagDetailPanels[activeFlagPanel].subtitle : ""}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close flag detail panel"
                className="interactive-pop text-lg leading-none text-[#4c4f69]"
                onClick={() => setActiveFlagPanel(null)}
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3">
                <p className="text-[10px] font-semibold tracking-wide text-[#4c4f69]">STATUS</p>
                <p className="mt-1 text-[13px] font-medium text-[#1c1b1f]">
                  {activeFlagPanel ? flagDetailPanels[activeFlagPanel].status : ""}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {(activeFlagPanel ? flagDetailPanels[activeFlagPanel].points : []).map((point) => (
                  <div key={point} className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3">
                    <p className="text-[12px] leading-relaxed text-[#4c4f69]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isContractOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close contract panel"
          className="absolute inset-0 bg-[rgba(28,27,31,0.24)]"
          onClick={() => setIsContractOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[360px] border-l border-[#d9d9d9] bg-[#fafafa] shadow-[-8px_0_20px_rgba(28,27,31,0.14)] transition-transform duration-300 ease-out ${
            isContractOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] px-5 py-4">
              <h3 className="text-base font-semibold text-[#1c1b1f]">Contract</h3>
              <button
                type="button"
                aria-label="Close contract panel"
                className="interactive-pop text-lg leading-none text-[#4c4f69]"
                onClick={() => setIsContractOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <p className="text-[11px] text-[#4c4f69]">
                Status of the funding contract for this application.
              </p>

              <div className="mt-4 rounded-md border border-[#d9d9d9] bg-[#fafafa]">
                <div className="border-b border-[#d9d9d9] px-4 py-2 text-[10px] font-semibold tracking-wide text-[#4c4f69]">
                  CONTRACT TERMS
                </div>
                <div className="space-y-2 px-4 py-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4c4f69]">Funding Amount</span>
                    <span className="font-medium text-[#1c1b1f]">${formatCurrency(FUNDING_AMOUNT)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4c4f69]">Payback Amount</span>
                    <span className="font-medium text-[#1c1b1f]">${formatCurrency(paybackTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4c4f69]">Factor Rate</span>
                    <span className="font-medium text-[#1c1b1f]">{calculator.factor.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4c4f69]">Payment</span>
                    <span className="font-medium text-[#1c1b1f]">
                      ${formatCurrency(paymentAmount)} / {calculator.frequency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4c4f69]">Term</span>
                    <span className="font-medium text-[#1c1b1f]">{calculator.termDays} days</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-[#4c4f69]">
                Terms reflect the current values from the offer calculator. Return to the
                calculator to adjust the offer before sending.
              </p>

              <div className="mt-5">
                <p className="mb-2 text-[10px] font-semibold tracking-wide text-[#4c4f69]">ACTIONS</p>
                <button
                  type="button"
                  className="interactive-pop w-full rounded-md bg-[#3277FF] px-4 py-2.5 text-[12px] font-semibold text-[#fafafa]"
                >
                  Send Contract via DocuSign
                </button>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="interactive-pop rounded-md border border-[#d9d9d9] bg-[#fafafa] py-2 text-[11px] font-medium text-[#1c1b1f]"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="interactive-pop rounded-md border border-[#d9d9d9] bg-[#fafafa] py-2 text-[11px] font-medium text-[#1c1b1f]"
                  >
                    Download Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
