import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import V1Overview from "./versions/V1Overview"
import V2Overview from "./versions/V2Overview"
import V3Overview from "./versions/V3Overview"
import V4Overview from "./versions/V4Overview"
import V5Overview from "./versions/V5Overview"
import V6Overview from "./versions/V6Overview"
import V7Overview from "./versions/V7Overview"
import BalancesSection from "./components/BalancesSection"
import DashboardPage from "./features/dashboard/DashboardPage"

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
    note: "Acceptable Range",
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
const weeklyDeductionTransactions = [
  {
    date: "Mar 01",
    positionId: "advance-syndicate",
    amount: "$182.32",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 22",
    positionId: "advance-syndicate",
    amount: "$182.32",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 15",
    positionId: "advance-syndicate",
    amount: "$182.32",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Mar 01",
    positionId: "advance-syndicate",
    amount: "$102.00",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 22",
    positionId: "advance-syndicate",
    amount: "$102.00",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 15",
    positionId: "advance-syndicate",
    amount: "$102.00",
    cadence: "weekly",
    description: "Advance Syndicate",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Mar 01",
    positionId: "ebf-holdings",
    amount: "$182.32",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 22",
    positionId: "ebf-holdings",
    amount: "$182.32",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 15",
    positionId: "ebf-holdings",
    amount: "$182.32",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Mar 01",
    positionId: "ebf-holdings",
    amount: "$102.00",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 22",
    positionId: "ebf-holdings",
    amount: "$102.00",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 15",
    positionId: "ebf-holdings",
    amount: "$102.00",
    cadence: "weekly",
    description: "EBF Holdings",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Mar 01",
    positionId: "cfg-merchant-solutions",
    amount: "$182.32",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 22",
    positionId: "cfg-merchant-solutions",
    amount: "$182.32",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Feb 15",
    positionId: "cfg-merchant-solutions",
    amount: "$182.32",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$182.32",
  },
  {
    date: "Mar 01",
    positionId: "cfg-merchant-solutions",
    amount: "$102.00",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 22",
    positionId: "cfg-merchant-solutions",
    amount: "$102.00",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$102.00",
  },
  {
    date: "Feb 15",
    positionId: "cfg-merchant-solutions",
    amount: "$102.00",
    cadence: "weekly",
    description: "CFG Merchant Solutions",
    credit: false,
    value: "$102.00",
  },
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
      { day: "7", balance: 57410 }, { day: "8", balance: 54820 }, { day: "9", balance: -1200 },
      { day: "10", balance: -2100 }, { day: "11", balance: -2900 }, { day: "12", balance: -3600 },
      { day: "13", balance: -4400 }, { day: "14", balance: -5200 }, { day: "15", balance: -6100 },
      { day: "16", balance: -4700 }, { day: "17", balance: -3900 }, { day: "18", balance: -3200 },
      { day: "19", balance: -2400 }, { day: "20", balance: 600 }, { day: "21", balance: 1400 },
      { day: "22", balance: 400 }, { day: "23", balance: 2100 }, { day: "24", balance: 3900 },
      { day: "25", balance: 5200 }, { day: "26", balance: 7300 }, { day: "27", balance: 9800 },
      { day: "28", balance: 12800 }, { day: "29", balance: 16100 }, { day: "30", balance: 19800 },
      { day: "31", balance: 22900 },
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
const UI_FONT_OPTIONS = [
  { value: "grotesk", label: "Schibsted Grotesk" },
  { value: "helvetica", label: "Helvetica" },
  { value: "helvetica-neue", label: "Helvetica Neue" },
  { value: "inter", label: "Inter" },
]

const COLOR_THEMES = [
  { value: "light", label: "Light" },
  { value: "teal", label: "Teal" },
  { value: "green", label: "Green" },
  { value: "indigo", label: "Indigo" },
  { value: "tealDark", label: "Teal Dark" },
  { value: "dark", label: "Dark" },
  { value: "gruvboxLight", label: "Gruvbox Light" },
  { value: "gruvbox", label: "Gruvbox Dark" },
  { value: "ayuLight", label: "Ayu Light" },
  { value: "ayuMirage", label: "Ayu Mirage" },
  { value: "ayuDark", label: "Ayu Dark" },
]

/** Daily balance chart — keyed by nav theme */
const CHART_PALETTE_BY_MODE = {
  light: {
    primary: "#3277FF",
    secondary: "#94a3b8",
    grid: "#eef2f7",
    tooltipCursor: "#dbe6ff",
    refLine: "#fca5a5",
    axisTick: "#94a3b8",
  },
  teal: {
    primary: "#1a8f88",
    secondary: "#64748b",
    grid: "#e2e8f0",
    tooltipCursor: "rgba(26, 143, 136, 0.28)",
    refLine: "#fca5a5",
    axisTick: "#64748b",
  },
  green: {
    primary: "#16a34a",
    secondary: "#64748b",
    grid: "#f1f5f9",
    tooltipCursor: "rgba(22, 163, 74, 0.28)",
    refLine: "#ef4444",
    axisTick: "#64748b",
  },
  indigo: {
    primary: "#4f46e5",
    secondary: "#64748b",
    grid: "#f1f5f9",
    tooltipCursor: "rgba(79, 70, 229, 0.22)",
    refLine: "#ef4444",
    axisTick: "#64748b",
  },
  tealDark: {
    primary: "#2dd4bf",
    secondary: "#94a3b8",
    grid: "#1e293b",
    tooltipCursor: "rgba(45, 212, 191, 0.35)",
    refLine: "#fb7185",
    axisTick: "#94a3b8",
  },
  dark: {
    primary: "#6ea8ff",
    secondary: "#94a3b8",
    grid: "#2a3f5c",
    tooltipCursor: "rgba(110, 168, 255, 0.35)",
    refLine: "#fb7185",
    axisTick: "#94a3b8",
  },
  gruvboxLight: {
    primary: "#458588",
    secondary: "#665c54",
    grid: "#ebdbb2",
    tooltipCursor: "rgba(69, 133, 136, 0.28)",
    refLine: "#cc241d",
    axisTick: "#665c54",
  },
  gruvbox: {
    primary: "#83a598",
    secondary: "#a89984",
    grid: "#3c3836",
    tooltipCursor: "rgba(131, 165, 152, 0.35)",
    refLine: "#fb4934",
    axisTick: "#a89984",
  },
  ayuLight: {
    primary: "#399ee6",
    secondary: "#8a9199",
    grid: "#e8ecf0",
    tooltipCursor: "rgba(57, 158, 230, 0.28)",
    refLine: "#e5474f",
    axisTick: "#8a9199",
  },
  ayuMirage: {
    primary: "#73d0ff",
    secondary: "#9ea6b7",
    grid: "#2a3142",
    tooltipCursor: "rgba(115, 208, 255, 0.35)",
    refLine: "#f28779",
    axisTick: "#9ea6b7",
  },
  ayuDark: {
    primary: "#59c2ff",
    secondary: "#8791a3",
    grid: "#1b2230",
    tooltipCursor: "rgba(89, 194, 255, 0.35)",
    refLine: "#f26d78",
    axisTick: "#8791a3",
  },
}
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
    leverage: "5%",
    mcaPayout: "$10,650",
    note: "Seasonal equipment demand drove higher card deposits.",
  },
  {
    month: "January 2026",
    revenue: "$61,780",
    leverage: "10%",
    mcaPayout: "$11,240",
    note: "Collections improved while payouts stayed stable.",
  },
  {
    month: "February 2026",
    revenue: "$60,040",
    leverage: "8%",
    mcaPayout: "$10,035",
    note: "Short month with consistent paydown and fewer reversal days.",
  },
]
const keyMetricCompanyRows = [
  { company: "Advance Syndicate", leverage: "10%", payout: "$1,125" },
  { company: "EBF Holdings", leverage: "8%", payout: "$1,050" },
  { company: "CFG Merchant Solutions", leverage: "5%", payout: "$1,170" },
]
const VERSION_OPTIONS = [
  { value: "v1", label: "v1" },
  { value: "v2", label: "v2" },
  { value: "v3", label: "v3" },
  { value: "v4", label: "v4" },
  { value: "v5", label: "v5" },
  { value: "v6", label: "v6" },
  { value: "v7", label: "v7" },
]

const getVersionFromPath = (pathname) => {
  if (pathname === "/v2") return "v2"
  if (pathname === "/v3") return "v3"
  if (pathname === "/v4") return "v4"
  if (pathname === "/v5") return "v5"
  if (pathname === "/v6") return "v6"
  if (pathname === "/v7") return "v7"
  return "v1"
}
const getPathFromVersion = (version) => {
  if (version === "v2") return "/v2"
  if (version === "v3") return "/v3"
  if (version === "v4") return "/v4"
  if (version === "v5") return "/v5"
  if (version === "v6") return "/v6"
  if (version === "v7") return "/v7"
  return "/"
}
const getViewFromPath = (pathname) => (pathname.endsWith("/dashboard") ? "dashboard" : "application")
const TYPOGRAPHY_NORMALIZATION_CSS = `
  .steddy-app,
  .steddy-app *:not(.material-symbols-rounded):not(.material-symbols-sharp) {
    font-family: var(--steddy-font-ui);
  }

  /* Typography normalization: keep only a small shared scale */
  .steddy-app .text-\\[9px\\],
  .steddy-app .text-\\[10px\\],
  .steddy-app .text-\\[11px\\] {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .steddy-app .text-\\[12px\\],
  .steddy-app .text-\\[13px\\],
  .steddy-app .text-\\[14px\\] {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`
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
  const [activeVersion, setActiveVersion] = useState(() => getVersionFromPath(window.location.pathname))
  const [activeView, setActiveView] = useState(() => getViewFromPath(window.location.pathname))
  const [activeApplicationId, setActiveApplicationId] = useState("777")
  const [colorMode, setColorMode] = useState("light")
  const [uiFont, setUiFont] = useState(() => {
    try {
      const stored = window.localStorage.getItem("steddy-ui-font")
      if (
        stored === "grotesk" ||
        stored === "helvetica" ||
        stored === "helvetica-neue" ||
        stored === "inter"
      )
        return stored
    } catch {
      /* ignore */
    }
    return "grotesk"
  })
  const [isContractOpen, setIsContractOpen] = useState(false)
  const [isApplicationInfoOpen, setIsApplicationInfoOpen] = useState(false)
  const [isAiDecisionOpen, setIsAiDecisionOpen] = useState(false)
  const [isMonthlyBreakdownOpen, setIsMonthlyBreakdownOpen] = useState(false)
  const [isPositionEditorOpen, setIsPositionEditorOpen] = useState(false)
  const [activeFlagPanel, setActiveFlagPanel] = useState(null)
  const [activeMetricTitle, setActiveMetricTitle] = useState("MONTHLY REVENUE")
  const [applicationInfo, setApplicationInfo] = useState({
    companyName: "Green Farm Equipment",
    ownerName: "Judy Green",
    ein: "20-2573652",
    email: "",
    phoneCountryCode: "+1",
    phoneNumber: "(XXX) XXX-XXXX",
    addressLine1: "1110 4th street",
    city: "Rancho Cucamonga",
    stateCode: "CA",
    postalCode: "91730",
  })
  const isEditingApplicationInfo = true
  const [positionsData, setPositionsData] = useState(initialPositions)
  const [editingPositionId, setEditingPositionId] = useState(null)
  const [positionToggles, setPositionToggles] = useState(() =>
    Object.fromEntries(initialPositions.map((position) => [position.id, true])),
  )
  const [activePositionChips, setActivePositionChips] = useState({})
  const [selectedPositionChip, setSelectedPositionChip] = useState(null)
  const [transactionsSearchQuery, setTransactionsSearchQuery] = useState("")
  const [transactionsAccountFilter, setTransactionsAccountFilter] = useState("all")
  const [transactionsMonthFilter, setTransactionsMonthFilter] = useState("all")
  const [transactionsDirectionFilter, setTransactionsDirectionFilter] = useState("all")
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
  const netCashFlowRows = [
    { month: "December 2025", net: -420 },
    { month: "January 2026", net: 120 },
    { month: "February 2026", net: -860 },
  ]
  const totalNetCashFlow = netCashFlowRows.reduce((sum, row) => sum + row.net, 0)
  const netCashFlowIsPositive = totalNetCashFlow >= 0
  const netCashFlowTotalLabel = `${netCashFlowIsPositive ? "+" : "-"}$${formatCurrency(Math.abs(totalNetCashFlow))}`
  const supportsChipFilters =
    activeVersion === "v4" || activeVersion === "v5" || activeVersion === "v6" || activeVersion === "v7"
  const selectedPosition = selectedPositionChip
    ? positionsData.find((position) => position.id === selectedPositionChip.positionId) ?? null
    : null
  const filteredTransactions =
    supportsChipFilters && selectedPositionChip
      ? weeklyDeductionTransactions.filter(
          (row) =>
            row.positionId === selectedPositionChip.positionId &&
            row.amount === selectedPositionChip.amount &&
            row.cadence.toLowerCase() === selectedPositionChip.meta.toLowerCase(),
        )
      : transactions
  const ACCOUNT_FILTER_OPTIONS = ["x4085", "x6045", "x0237"]
  const getTransactionMonth = (dateLabel) => dateLabel.split(" ")[0]?.toLowerCase() ?? ""
  const getTransactionAccountId = (row) => {
    const key = `${row.date}|${row.description}|${row.value}`
    const hash = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return ACCOUNT_FILTER_OPTIONS[hash % ACCOUNT_FILTER_OPTIONS.length]
  }
  const visibleTransactions = filteredTransactions.filter((row) => {
    if (transactionsAccountFilter !== "all" && getTransactionAccountId(row) !== transactionsAccountFilter) return false
    if (transactionsMonthFilter !== "all" && getTransactionMonth(row.date) !== transactionsMonthFilter) return false
    if (transactionsDirectionFilter === "credit" && !row.credit) return false
    if (transactionsDirectionFilter === "debit" && row.credit) return false
    const normalizedQuery = transactionsSearchQuery.trim().toLowerCase()
    if (!normalizedQuery) return true
    return (
      row.description.toLowerCase().includes(normalizedQuery) ||
      row.date.toLowerCase().includes(normalizedQuery) ||
      row.value.toLowerCase().includes(normalizedQuery)
    )
  })
  const parseMoney = (value) => Number(value.replace(/[^0-9.-]/g, "")) || 0
  const monthlyMultiplierByCadence = {
    daily: 30,
    weekly: 4.33,
    "bi-weekly": 2.17,
    monthly: 1,
  }
  const activeWithdrawals = positionsData.flatMap((position) =>
    position.chips.flatMap((chip, chipIndex) => {
      const chipKey = `${position.id}-${chipIndex}`
      if (!activePositionChips[chipKey]) return []
      const cadenceKey = chip.meta.toLowerCase()
      const multiplier = monthlyMultiplierByCadence[cadenceKey] ?? 1
      const monthlyPayout = parseMoney(chip.amount) * multiplier
      return [
        {
          positionId: position.id,
          company: position.title,
          monthlyPayout,
        },
      ]
    }),
  )
  const v7PayoutByPosition = activeWithdrawals.reduce((acc, withdrawal) => {
    acc[withdrawal.positionId] = (acc[withdrawal.positionId] ?? 0) + withdrawal.monthlyPayout
    return acc
  }, {})
  const v7KeyMetricCompanyRows = positionsData
    .map((position) => {
      const monthlyPayout = v7PayoutByPosition[position.id] ?? 0
      return {
        company: position.title,
        payout: `$${formatCurrency(monthlyPayout)}`,
      }
    })
    .filter((row) => parseMoney(row.payout) > 0)
  const v7McaPayoutValue = activeWithdrawals.reduce((sum, row) => sum + row.monthlyPayout, 0)
  const v7CurrentLeverageValue = FUNDING_AMOUNT > 0 ? (v7McaPayoutValue / FUNDING_AMOUNT) * 100 : 0
  const v7McaPayoutLabel = `$${formatCurrency(v7McaPayoutValue)}`
  const v7CurrentLeverageLabel = `${Math.round(v7CurrentLeverageValue)}%`
  const balanceChart = CHART_PALETTE_BY_MODE[colorMode] ?? CHART_PALETTE_BY_MODE.light
  const activeUnderwritingStep = 1
  const isDarkLikeMode =
    colorMode === "dark" ||
    colorMode === "tealDark" ||
    colorMode === "gruvbox" ||
    colorMode === "ayuMirage" ||
    colorMode === "ayuDark"

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

  useEffect(() => {
    const handlePopState = () => {
      const parsedVersion = getVersionFromPath(window.location.pathname)
      setActiveVersion(parsedVersion)
      setActiveView(getViewFromPath(window.location.pathname))
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if ((activeVersion !== "v6" && activeVersion !== "v7") || selectedPositionChip) return
    const firstPositionWithWithdrawal = positionsData.find((position) => position.chips.length > 0)
    if (!firstPositionWithWithdrawal) return
    const firstWithdrawal = firstPositionWithWithdrawal.chips[0]
    setSelectedPositionChip({
      positionId: firstPositionWithWithdrawal.id,
      chipIndex: 0,
      amount: firstWithdrawal.amount,
      meta: firstWithdrawal.meta,
    })
  }, [activeVersion, positionsData, selectedPositionChip])

  useEffect(() => {
    try {
      window.localStorage.setItem("steddy-ui-font", uiFont)
    } catch {
      /* ignore */
    }
  }, [uiFont])

  const uiFontClass =
    uiFont === "helvetica"
      ? "font-ui-helvetica"
      : uiFont === "helvetica-neue"
        ? "font-ui-helvetica-neue"
        : uiFont === "inter"
          ? "font-ui-inter"
          : ""

  const handleVersionChange = (event) => {
    const nextVersion = event.target.value
    const nextPath = getPathFromVersion(nextVersion)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath)
    }
    setActiveView("application")
    setActiveVersion(nextVersion)
  }

  const handleBackToDashboard = () => {
    if (window.location.pathname !== "/dashboard") {
      window.history.pushState({}, "", "/dashboard")
    }
    setActiveView("dashboard")
  }

  const handleOpenApplication = (applicationId = "777") => {
    const nextPath = getPathFromVersion(activeVersion)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath)
    }
    setActiveApplicationId(String(applicationId))
    setActiveView("application")
  }

  if (activeView === "dashboard") {
    return (
      <div
        ref={appRef}
        className={`steddy-app flex h-screen w-full flex-col overflow-hidden bg-[#fafafa] text-[#1c1b1f] ${uiFontClass} ${
          colorMode === "dark" ? "theme-dark" : ""
        } ${colorMode === "teal" ? "theme-teal" : ""} ${colorMode === "green" ? "theme-green" : ""} ${
          colorMode === "indigo" ? "theme-indigo" : ""
        } ${colorMode === "gruvbox" ? "theme-gruvbox" : ""} ${
          colorMode === "tealDark" ? "theme-dark theme-teal theme-teal-dark" : ""
        } ${
          colorMode === "gruvboxLight" ? "theme-gruvbox-light" : ""
        } ${colorMode === "ayuLight" ? "theme-ayu-light" : ""} ${
          colorMode === "ayuMirage" ? "theme-ayu-mirage" : ""
        } ${colorMode === "ayuDark" ? "theme-ayu-dark" : ""
        }`}
      >
        <style>{TYPOGRAPHY_NORMALIZATION_CSS}</style>
        <div className="min-h-0 flex-1">
          <DashboardPage
            onOpenApplication={handleOpenApplication}
            colorMode={colorMode}
            setColorMode={setColorMode}
            colorThemes={COLOR_THEMES}
            uiFont={uiFont}
            setUiFont={setUiFont}
            uiFontOptions={UI_FONT_OPTIONS}
          />
        </div>
      </div>
    )
  }

  const renderVersionOverview = () => {
    if (activeVersion === "v1") {
      return (
        <V1Overview
          metrics={metrics}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
        />
      )
    }

    if (activeVersion === "v2") {
      return (
        <V2Overview
          monthlyBreakdownRows={monthlyBreakdownRows}
          keyMetricCompanyRows={keyMetricCompanyRows}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
        />
      )
    }

    if (activeVersion === "v3") {
      return (
        <V3Overview
          monthlyBreakdownRows={monthlyBreakdownRows}
          keyMetricCompanyRows={keyMetricCompanyRows}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
        />
      )
    }

    if (activeVersion === "v4") {
      return (
        <V4Overview
          monthlyBreakdownRows={monthlyBreakdownRows}
          keyMetricCompanyRows={keyMetricCompanyRows}
          netCashFlowRows={netCashFlowRows}
          netCashFlowTotalLabel={netCashFlowTotalLabel}
          netCashFlowIsPositive={netCashFlowIsPositive}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
          formatCurrency={formatCurrency}
        />
      )
    }

    if (activeVersion === "v5") {
      return (
        <V5Overview
          monthlyBreakdownRows={monthlyBreakdownRows}
          keyMetricCompanyRows={keyMetricCompanyRows}
          netCashFlowRows={netCashFlowRows}
          netCashFlowTotalLabel={netCashFlowTotalLabel}
          netCashFlowIsPositive={netCashFlowIsPositive}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
          formatCurrency={formatCurrency}
        />
      )
    }

    if (activeVersion === "v6") {
      return (
        <V6Overview
          monthlyBreakdownRows={monthlyBreakdownRows}
          keyMetricCompanyRows={keyMetricCompanyRows}
          netCashFlowRows={netCashFlowRows}
          netCashFlowTotalLabel={netCashFlowTotalLabel}
          netCashFlowIsPositive={netCashFlowIsPositive}
          setActiveMetricTitle={setActiveMetricTitle}
          setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
          setActiveFlagPanel={setActiveFlagPanel}
          formatCurrency={formatCurrency}
        />
      )
    }

    return (
      <V7Overview
        monthlyBreakdownRows={monthlyBreakdownRows}
        keyMetricCompanyRows={v7KeyMetricCompanyRows}
        currentLeverageLabel={v7CurrentLeverageLabel}
        mcaPayoutLabel={v7McaPayoutLabel}
        netCashFlowRows={netCashFlowRows}
        netCashFlowTotalLabel={netCashFlowTotalLabel}
        netCashFlowIsPositive={netCashFlowIsPositive}
        setActiveMetricTitle={setActiveMetricTitle}
        setIsMonthlyBreakdownOpen={setIsMonthlyBreakdownOpen}
        setActiveFlagPanel={setActiveFlagPanel}
        formatCurrency={formatCurrency}
      />
    )
  }

  return (
    <div
      ref={appRef}
      className={`steddy-app h-screen w-full overflow-hidden bg-[#fafafa] text-[#1c1b1f] ${uiFontClass} ${
        colorMode === "dark" ? "theme-dark" : ""
      } ${colorMode === "teal" ? "theme-teal" : ""} ${colorMode === "green" ? "theme-green" : ""} ${
        colorMode === "indigo" ? "theme-indigo" : ""
      } ${colorMode === "gruvbox" ? "theme-gruvbox" : ""} ${
        colorMode === "tealDark" ? "theme-dark theme-teal theme-teal-dark" : ""
      } ${
        colorMode === "gruvboxLight" ? "theme-gruvbox-light" : ""
      } ${colorMode === "ayuLight" ? "theme-ayu-light" : ""} ${
        colorMode === "ayuMirage" ? "theme-ayu-mirage" : ""
      } ${colorMode === "ayuDark" ? "theme-ayu-dark" : ""
      }`}
    >
      <style>{TYPOGRAPHY_NORMALIZATION_CSS}</style>
      <header
        data-animate
        className="flex h-16 items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-4 sm:px-6 lg:px-10"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#4c4f69] opacity-70 transition hover:bg-[#efefef] hover:opacity-100"
          >
            <span aria-hidden="true" className="material-symbols-rounded text-[20px] leading-none">
              arrow_back
            </span>
          </button>
          <h1 className="text-base font-semibold tracking-tight text-[#1c1b1f] sm:text-lg">
            Application #{activeApplicationId}
          </h1>
          <div className="relative">
            <select
              value={activeVersion}
              onChange={handleVersionChange}
              aria-label="Choose page version"
              className="h-7 min-w-[56px] appearance-none rounded border border-[#d9d9d9] bg-[#fafafa] px-2 pr-5 text-[11px] font-medium text-[#4c4f69]"
            >
              {VERSION_OPTIONS.map((version) => (
                <option key={version.value} value={version.value}>
                  {version.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
            >
              ⌄
            </span>
          </div>
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
                  />
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
            <div className="flex items-center gap-3">
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
                <div className="flex items-center justify-between gap-1.5">
                  <h2 className="truncate text-base font-bold leading-none text-[#1c1b1f]">{applicationInfo.companyName}</h2>
                  <button
                    type="button"
                    aria-label="Open application info panel"
                    onClick={() => setIsApplicationInfoOpen(true)}
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#4c4f69] transition-colors hover:bg-[#efefef]"
                  >
                    <span aria-hidden="true" className="material-symbols-rounded text-[17px] leading-none">
                      more_vert
                    </span>
                  </button>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span className="rounded bg-[#e9f0ff] px-2 py-0.5 font-medium text-[#3277FF]">
                    • Review
                  </span>
                  <span className="text-[#4c4f69]">{applicationInfo.ownerName}</span>
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
                <button
                  type="button"
                  onClick={() => setIsAiDecisionOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-2 text-left text-[#3277FF]"
                  aria-expanded={isAiDecisionOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-[#3277FF] text-[#fafafa]">
                      <span aria-hidden="true" className="material-symbols-sharp text-[12px] leading-none">
                        done
                      </span>
                    </span>
                    <span className="text-base font-bold leading-none">Approved</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-xs text-[#4c4f69] transition-transform ${isAiDecisionOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                <div className={`${isAiDecisionOpen ? "mt-3 block" : "hidden"}`}>
                  <p className="text-[12px] leading-snug text-[#1c1b1f]">
                    Revenue trend positive, leverage within range, 2 negative
                    days flagged for review.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button className="interactive-pop rounded-md bg-[#3277FF] py-2 text-[13px] font-semibold text-[#fafafa]">
                      Confirm
                    </button>
                    <button className="interactive-pop rounded-md border border-[#d9d9d9] bg-[#fafafa] py-2 text-[13px] font-semibold text-[#1c1b1f]">
                      Ignore
                    </button>
                  </div>
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
            <div className="grid grid-cols-2 gap-2">
              <button className="interactive-pop rounded-lg bg-[#3277FF] px-4 py-2.5 text-[14px] font-semibold text-[#fafafa]">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="material-symbols-sharp text-[16px] leading-none">
                    done
                  </span>
                  <span>Approve</span>
                </span>
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
          <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
            {renderVersionOverview()}

            <section>
              <div className="section-label-row mb-3 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="material-symbols-rounded shrink-0 text-[#4c4f69]">
                    work_outline
                  </span>
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
                  <div className="flex min-w-0 flex-1 items-center gap-1.5">
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
                      value={transactionsSearchQuery}
                      onChange={(event) => setTransactionsSearchQuery(event.target.value)}
                      className="box-border h-7 w-full max-w-[152px] shrink-0 rounded border border-[#4c4f69] bg-[#fafafa] px-2 text-[10px] font-medium leading-none text-[#1c1b1f] placeholder:text-[rgba(76,79,105,0.6)]"
                      aria-label="Search transactions"
                    />
                    <div className="relative shrink-0">
                      <select
                        value={transactionsAccountFilter}
                        onChange={(event) => setTransactionsAccountFilter(event.target.value)}
                        aria-label="Filter transactions by account"
                        className="h-7 min-w-[84px] appearance-none rounded border border-[#4c4f69] bg-[#fafafa] px-2 pr-5 text-[10px] font-medium text-[#4c4f69]"
                      >
                        <option value="all">Account</option>
                        <option value="x4085">x4085</option>
                        <option value="x6045">x6045</option>
                        <option value="x0237">x0237</option>
                      </select>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
                      >
                        ⌄
                      </span>
                    </div>
                    <div className="relative shrink-0">
                      <select
                        value={transactionsMonthFilter}
                        onChange={(event) => setTransactionsMonthFilter(event.target.value)}
                        aria-label="Filter transactions by month"
                        className="h-7 min-w-[72px] appearance-none rounded border border-[#4c4f69] bg-[#fafafa] px-2 pr-5 text-[10px] font-medium text-[#4c4f69]"
                      >
                        <option value="all">Month</option>
                        <option value="jan">Jan</option>
                        <option value="feb">Feb</option>
                        <option value="mar">Mar</option>
                      </select>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
                      >
                        ⌄
                      </span>
                    </div>
                    <div className="relative shrink-0">
                      <select
                        value={transactionsDirectionFilter}
                        onChange={(event) => setTransactionsDirectionFilter(event.target.value)}
                        aria-label="Filter transactions by direction"
                        className="h-7 min-w-[90px] appearance-none rounded border border-[#4c4f69] bg-[#fafafa] px-2 pr-5 text-[10px] font-medium text-[#4c4f69]"
                      >
                        <option value="all">Credit/Debit</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </select>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
                      >
                        ⌄
                      </span>
                    </div>
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
                        {activeVersion === "v6" ? (
                          <div className="mb-4">
                            <p className={`text-[11px] font-medium ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>
                              Withdrawals
                            </p>
                            {position.chips.length ? (
                              position.chips.map((chip, chipIndex) => (
                                <button
                                  key={`${position.id}-withdrawal-${chipIndex}`}
                                  type="button"
                                  onClick={() =>
                                    setSelectedPositionChip({
                                      positionId: position.id,
                                      chipIndex,
                                      amount: chip.amount,
                                      meta: chip.meta,
                                    })
                                  }
                                  className={`block rounded px-1 py-0.5 text-[10px] transition-colors ${
                                    selectedPositionChip?.positionId === position.id &&
                                    selectedPositionChip?.chipIndex === chipIndex
                                      ? "bg-[#3277FF] text-[#fafafa]"
                                      : on
                                        ? "text-[#4c4f69] hover:bg-[#efefef]"
                                        : "text-[#9b9bb0]"
                                  }`}
                                >
                                  {chip.amount} | {chip.meta.toLowerCase()}
                                </button>
                              ))
                            ) : (
                              <p className={`text-[10px] ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>
                                No withdrawals added
                              </p>
                            )}
                          </div>
                        ) : (
                          <div
                            className={`mb-4 flex flex-col items-start gap-1.5 text-[10px] transition-opacity ${
                              on ? "opacity-100" : "opacity-45"
                            }`}
                          >
                            {activeVersion === "v7" ? (
                              <p className={`w-full text-[11px] font-medium ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>
                                Withdrawals
                              </p>
                            ) : null}
                            {position.chips.map((chip, chipIndex) => {
                              const chipKey = `${position.id}-${chipIndex}`
                              const isActive = Boolean(activePositionChips[chipKey])
                              const pulledAmount = ((position.id.length * 7 + (chipIndex + 1) * 13) % 60) + 1
                              return (
                                <div key={chipKey} className="flex w-full items-center justify-start gap-1 text-left">
                                  <span
                                    className={
                                      activeVersion === "v7"
                                        ? `m-0 flex items-center gap-1 rounded-none border-0 bg-transparent text-[9px] transition-colors ${
                                            isActive ? "text-[#3277FF]" : "text-[#1c1b1f]"
                                          }`
                                        : `m-0 flex items-center gap-1 rounded-full border px-1.5 py-1 text-[9px] transition-colors ${
                                            isActive
                                              ? "border-[#3277FF] bg-[#3277FF] text-[#fafafa]"
                                              : "border-[#d9d9d9] bg-[#efefef] text-[#1c1b1f]"
                                          }`
                                    }
                                  >
                                    <button
                                      type="button"
                                      aria-label={`Toggle ${position.title} ${chip.amount} ${chip.meta}`}
                                      onClick={() =>
                                        setActivePositionChips((prev) => ({
                                          ...prev,
                                          [chipKey]: !prev[chipKey],
                                        }))
                                      }
                                      className="rounded-sm p-0"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={`relative block h-3.5 w-5.5 rounded-full p-[1px] transition-colors ${
                                          activeVersion === "v7"
                                            ? isActive
                                              ? "bg-[#cbd5e1]"
                                              : "bg-[#d9d9d9]"
                                            : isActive
                                              ? "bg-[#fafafa]/50"
                                              : "bg-[#3277FF]/40"
                                        }`}
                                      >
                                        <span
                                          className={`block size-3 rounded-full transition-transform ${
                                            activeVersion === "v7"
                                              ? `${isDarkLikeMode ? "bg-[#4c4f69]" : "bg-[#fafafa]"} ${
                                                  isActive ? "translate-x-2.5" : "translate-x-0"
                                                }`
                                              : `bg-[#fafafa] ${isActive ? "translate-x-2.5" : "translate-x-0"}`
                                          }`}
                                        />
                                      </span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedPositionChip((prev) => {
                                          const isSameChip =
                                            prev?.positionId === position.id && prev?.chipIndex === chipIndex
                                          if (isSameChip) return null
                                          return {
                                            positionId: position.id,
                                            chipIndex,
                                            amount: chip.amount,
                                            meta: chip.meta,
                                          }
                                        })
                                      }
                                      className="rounded-sm p-0 text-left"
                                    >
                                      {chip.amount}{" "}
                                      <span
                                        className={
                                          activeVersion === "v7"
                                            ? isActive
                                              ? "text-[rgba(15,23,42,0.72)]"
                                              : "text-[rgba(76,79,105,0.5)]"
                                            : isActive
                                              ? "text-[#dbe6ff]"
                                              : "text-[rgba(76,79,105,0.5)]"
                                        }
                                      >
                                        {chip.meta}
                                      </span>
                                    </button>
                                  </span>
                                  <span className={`text-[10px] ${on ? "text-[#4c4f69]" : "text-[#9b9bb0]"}`}>
                                    | pulled {pulledAmount} times
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        )}
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
                    <div className="min-h-0 flex-1 overflow-y-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="text-[11px] font-medium uppercase tracking-wide text-[#4c4f69]">
                            <th className="sticky top-0 z-10 whitespace-nowrap bg-[#e9f0ff] px-4 py-2.5 font-medium">
                              Date
                            </th>
                            <th className="sticky top-0 z-10 bg-[#e9f0ff] px-4 py-2.5 font-medium">
                              Description
                            </th>
                            <th className="sticky top-0 z-10 whitespace-nowrap bg-[#e9f0ff] px-4 py-2.5 text-right font-medium">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleTransactions.map((row, i) => (
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
                          {visibleTransactions.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="px-4 py-3 text-xs text-[#4c4f69]">
                                {supportsChipFilters && selectedPositionChip && filteredTransactions.length === 0
                                  ? "No matching weekly deductions for this chip."
                                  : "No transactions match the current search/filter."}
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <BalancesSection
              balanceData={balanceData}
              monthlyBalanceSeries={monthlyBalanceSeries}
              balanceChart={balanceChart}
            />
            <footer className="border-t border-[#d9d9d9] pt-3 text-center text-[11px] text-[#4c4f69]">
              <p>Steddy AI Mockup • Internal Preview</p>
            </footer>
          </div>
        </section>
      </main>

      <div
        className={`fixed inset-0 z-[44] transition-opacity duration-300 ${
          isApplicationInfoOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close application info panel"
          className="absolute inset-0 bg-[rgba(28,27,31,0.2)]"
          onClick={() => setIsApplicationInfoOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[390px] border-l border-[#d9d9d9] bg-[#fafafa] transition-transform duration-300 ease-out ${
            isApplicationInfoOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] px-5 py-4">
              <h3 className="text-base font-semibold text-[#1c1b1f]">Application Info</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Close application info panel"
                  className="interactive-pop text-lg leading-none text-[#4c4f69]"
                  onClick={() => setIsApplicationInfoOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3">
                <h4 className="text-base font-semibold text-[#1c1b1f]">Business Information</h4>
                <div className="mt-3 space-y-2.5 text-[12px]">
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">Company Name</p>
                    <input
                      type="text"
                      value={applicationInfo.companyName}
                      disabled={!isEditingApplicationInfo}
                      onChange={(event) =>
                        setApplicationInfo((prev) => ({
                          ...prev,
                          companyName: event.target.value,
                        }))
                      }
                      className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                        isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">Owner Name</p>
                    <input
                      type="text"
                      value={applicationInfo.ownerName}
                      disabled={!isEditingApplicationInfo}
                      onChange={(event) =>
                        setApplicationInfo((prev) => ({
                          ...prev,
                          ownerName: event.target.value,
                        }))
                      }
                      className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                        isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">EIN</p>
                    <input
                      type="text"
                      value={applicationInfo.ein}
                      disabled={!isEditingApplicationInfo}
                      onChange={(event) =>
                        setApplicationInfo((prev) => ({
                          ...prev,
                          ein: event.target.value,
                        }))
                      }
                      className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                        isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">Email</p>
                    <input
                      type="email"
                      value={applicationInfo.email}
                      disabled={!isEditingApplicationInfo}
                      onChange={(event) =>
                        setApplicationInfo((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                        isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">Phone</p>
                    <div className="grid grid-cols-[auto_1fr] gap-2">
                      <input
                        type="text"
                        value={applicationInfo.phoneCountryCode}
                        disabled={!isEditingApplicationInfo}
                        onChange={(event) =>
                          setApplicationInfo((prev) => ({
                            ...prev,
                            phoneCountryCode: event.target.value,
                          }))
                        }
                        className={`h-9 w-[68px] rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                          isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                        }`}
                      />
                      <input
                        type="text"
                        value={applicationInfo.phoneNumber}
                        disabled={!isEditingApplicationInfo}
                        onChange={(event) =>
                          setApplicationInfo((prev) => ({
                            ...prev,
                            phoneNumber: event.target.value,
                          }))
                        }
                        className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                          isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3">
                <h4 className="text-base font-semibold text-[#1c1b1f]">Business Address</h4>
                <div className="mt-3 space-y-2.5 text-[12px]">
                  <div>
                    <p className="mb-1 text-[11px] text-[#4c4f69]">Address Line 1</p>
                    <input
                      type="text"
                      value={applicationInfo.addressLine1}
                      disabled={!isEditingApplicationInfo}
                      onChange={(event) =>
                        setApplicationInfo((prev) => ({
                          ...prev,
                          addressLine1: event.target.value,
                        }))
                      }
                      className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                        isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="mb-1 text-[11px] text-[#4c4f69]">City</p>
                      <input
                        type="text"
                        value={applicationInfo.city}
                        disabled={!isEditingApplicationInfo}
                        onChange={(event) =>
                          setApplicationInfo((prev) => ({
                            ...prev,
                            city: event.target.value,
                          }))
                        }
                        className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                          isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-[11px] text-[#4c4f69]">State Code</p>
                      <input
                        type="text"
                        value={applicationInfo.stateCode}
                        disabled={!isEditingApplicationInfo}
                        onChange={(event) =>
                          setApplicationInfo((prev) => ({
                            ...prev,
                            stateCode: event.target.value,
                          }))
                        }
                        className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                          isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-[11px] text-[#4c4f69]">Postal Code</p>
                      <input
                        type="text"
                        value={applicationInfo.postalCode}
                        disabled={!isEditingApplicationInfo}
                        onChange={(event) =>
                          setApplicationInfo((prev) => ({
                            ...prev,
                            postalCode: event.target.value,
                          }))
                        }
                        className={`h-9 w-full rounded border border-[#d9d9d9] px-2 text-[#1c1b1f] ${
                          isEditingApplicationInfo ? "bg-[#fafafa]" : "bg-[#efefef]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-md border border-[#d9d9d9] bg-[#fafafa] px-4 py-3">
                <p className="text-[10px] font-semibold tracking-wide text-[#4c4f69]">FILES UPLOADED</p>
                <ul className="mt-2 space-y-2 text-[12px] text-[#1c1b1f]">
                  <li className="flex items-center justify-between rounded border border-[#d9d9d9] bg-[#efefef] px-2.5 py-2">
                    <span>Bank Statement - Dec 2025.pdf</span>
                    <span className="text-[10px] text-[#4c4f69]">Verified</span>
                  </li>
                  <li className="flex items-center justify-between rounded border border-[#d9d9d9] bg-[#efefef] px-2.5 py-2">
                    <span>Bank Statement - Jan 2026.pdf</span>
                    <span className="text-[10px] text-[#4c4f69]">Uploaded</span>
                  </li>
                  <li className="flex items-center justify-between rounded border border-[#d9d9d9] bg-[#efefef] px-2.5 py-2">
                    <span>Bank Statement - Feb 2026.pdf</span>
                    <span className="text-[10px] text-[#4c4f69]">Uploaded</span>
                  </li>
                  <li className="flex items-center justify-between rounded border border-[#d9d9d9] bg-[#efefef] px-2.5 py-2">
                    <span>Application Form.pdf</span>
                    <span className="text-[10px] text-[#4c4f69]">Verified</span>
                  </li>
                </ul>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsApplicationInfoOpen(false)
                  }}
                  disabled={!isEditingApplicationInfo}
                  className={`rounded px-4 py-2 text-[12px] font-semibold ${
                    isEditingApplicationInfo
                      ? "bg-[#3277FF] text-[#fafafa]"
                      : "bg-[#e3e5eb] text-[#9b9bb0]"
                  }`}
                >
                  Update Application
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

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
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] border-l border-[#d9d9d9] bg-[#fafafa] transition-transform duration-300 ease-out ${
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
          className={`absolute right-0 top-0 h-full w-full max-w-[390px] border-l border-[#d9d9d9] bg-[#fafafa] transition-transform duration-300 ease-out ${
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
          className={`absolute right-0 top-0 h-full w-full max-w-[380px] border-l border-[#d9d9d9] bg-[#fafafa] transition-transform duration-300 ease-out ${
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
          className={`absolute right-0 top-0 h-full w-full max-w-[360px] border-l border-[#d9d9d9] bg-[#fafafa] transition-transform duration-300 ease-out ${
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
