import { useState } from "react"
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

export default function BalancesSection({ balanceData, monthlyBalanceSeries, balanceChart }) {
  const [balanceDesignVersion, setBalanceDesignVersion] = useState("v1")

  const renderMonthlyBalanceLists = (useSplitColumns) => (
    <div className="grid gap-3 lg:grid-cols-3">
      {monthlyBalanceSeries.map((series) => {
        const [monthName, year] = series.month.split(" ")
        const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1
        const weekdayRows = series.data.filter((entry) => {
          const date = new Date(`${series.month} ${entry.day}`)
          const dayOfWeek = date.getDay()
          return dayOfWeek !== 0 && dayOfWeek !== 6
        })
        const chunkSize = Math.ceil(weekdayRows.length / 3)
        const ledgerColumns = useSplitColumns
          ? Array.from({ length: 3 }, (_, columnIndex) =>
              weekdayRows.slice(columnIndex * chunkSize, (columnIndex + 1) * chunkSize),
            )
          : [weekdayRows]

        return (
          <article
            key={`balance-list-${series.month}`}
            className="card-shadow overflow-hidden rounded border border-[#d9d9d9] bg-[#fafafa]"
          >
            <div className="border-b border-[#d9d9d9] px-3 py-2">
              <h4 className="text-xs font-semibold text-[#1c1b1f]">{series.month}</h4>
            </div>
            <div className={useSplitColumns ? "grid gap-10 px-3 py-2 lg:grid-cols-3" : "px-3 py-2"}>
              {ledgerColumns.map((columnRows, columnIndex) => (
                <div key={`${series.month}-column-${columnIndex}`} className="min-w-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#d9d9d9] pb-1 text-[8px] font-semibold uppercase tracking-wide text-[#4c4f69]">
                    <span>Date</span>
                    <span className="text-right whitespace-nowrap">Balance ($)</span>
                  </div>
                  <div>
                    {columnRows.map((entry, idx) => (
                      (() => {
                        const isNegative = entry.balance < 0
                        const rowTone = isNegative ? "text-[#c2410c]" : "text-[#4c4f69]"
                        const valueTone = isNegative ? "text-[#b91c1c]" : "text-[#1c1b1f]"
                        return (
                      <div
                        key={`list-${series.month}-${columnIndex}-${entry.day}-${idx}`}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#efefef] py-1 text-[10px] last:border-b-0"
                      >
                        <span className={rowTone}>
                          {String(monthNumber).padStart(2, "0")}/{String(Number(entry.day)).padStart(2, "0")}
                        </span>
                        <span className={`text-right font-medium tabular-nums ${valueTone}`}>
                          ${entry.balance.toLocaleString()}
                        </span>
                      </div>
                        )
                      })()
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )

  return (
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
        <h3 className="text-base font-bold leading-none text-[#1c1b1f]">Daily Balances</h3>
        <div className="relative ml-1">
          <select
            value={balanceDesignVersion}
            onChange={(event) => setBalanceDesignVersion(event.target.value)}
            aria-label="Choose balances design version"
            className="h-7 min-w-[74px] appearance-none rounded border border-[#4c4f69] bg-[#fafafa] px-2 pr-5 text-[10px] font-medium text-[#4c4f69]"
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#4c4f69]"
          >
            ⌄
          </span>
        </div>
      </div>

      {balanceDesignVersion === "v1" ? (
        <div className="space-y-4">
          <div className="card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-4">
            <div className="mb-3 flex items-center gap-5 text-sm font-medium text-[#4c4f69]">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-4 rounded-full" style={{ backgroundColor: balanceChart.primary }} />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 border-t-2 border-dashed"
                  style={{ borderTopColor: balanceChart.secondary }}
                />
                <span>With Offer</span>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <CartesianGrid stroke={balanceChart.grid} vertical={false} />
                  <XAxis
                    dataKey="date"
                    interval={2}
                    minTickGap={28}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fill: balanceChart.axisTick, fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: balanceChart.axisTick, fontSize: 12 }}
                    tickFormatter={(value) => (value === 0 ? "$0" : `${value < 0 ? "-" : ""}$${Math.abs(value)}k`)}
                  />
                  <ReferenceLine y={0} stroke="#dc2626" strokeDasharray="4 3" />
                  <Tooltip
                    formatter={(value) => `$${value}k`}
                    labelStyle={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}
                    itemStyle={{ fontSize: 10, padding: 0 }}
                    contentStyle={{
                      border: "1px solid #d9d9d9",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(76, 79, 105, 0.1)",
                      padding: "4px 6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke={balanceChart.primary}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="withOffer"
                    stroke={balanceChart.secondary}
                    strokeWidth={1.75}
                    strokeDasharray="4 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {renderMonthlyBalanceLists(true)}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card-shadow rounded border border-[#d9d9d9] bg-[#fafafa] p-4">
            <div className="mb-3 flex items-center gap-5 text-sm font-medium text-[#4c4f69]">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-4 rounded-full" style={{ backgroundColor: balanceChart.primary }} />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 border-t-2 border-dashed"
                  style={{ borderTopColor: balanceChart.secondary }}
                />
                <span>With Offer</span>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <CartesianGrid stroke={balanceChart.grid} vertical={false} />
                  <XAxis
                    dataKey="date"
                    interval={2}
                    minTickGap={28}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fill: balanceChart.axisTick, fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: balanceChart.axisTick, fontSize: 12 }}
                    tickFormatter={(value) => (value === 0 ? "$0" : `${value < 0 ? "-" : ""}$${Math.abs(value)}k`)}
                  />
                  <ReferenceLine y={0} stroke="#dc2626" strokeDasharray="4 3" />
                  <Tooltip
                    formatter={(value) => `$${value}k`}
                    labelStyle={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}
                    itemStyle={{ fontSize: 10, padding: 0 }}
                    contentStyle={{
                      border: "1px solid #d9d9d9",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(76, 79, 105, 0.1)",
                      padding: "4px 6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke={balanceChart.primary}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="withOffer"
                    stroke={balanceChart.secondary}
                    strokeWidth={1.75}
                    strokeDasharray="4 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {renderMonthlyBalanceLists(false)}
        </div>
      )}
    </section>
  )
}
