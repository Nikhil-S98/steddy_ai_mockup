import {
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function BalancesSection({ balanceData, monthlyBalanceSeries, balanceChart }) {
  const renderMonthlyBalanceLists = (useSplitColumns) => (
    <div className="grid gap-5 lg:grid-cols-3">
      {monthlyBalanceSeries.map((series) => {
        const [monthName, year] = series.month.split(" ")
        const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1
        const weekdayRows = series.data.filter((entry) => {
          const date = new Date(`${series.month} ${entry.day}`)
          const dayOfWeek = date.getDay()
          return dayOfWeek !== 0 && dayOfWeek !== 6
        })
        const chunkSize = Math.ceil(weekdayRows.length / 3)
        const negativeDaysCount = weekdayRows.filter((entry) => entry.balance < 0).length
        const ledgerColumns = useSplitColumns
          ? Array.from({ length: 3 }, (_, columnIndex) =>
              weekdayRows.slice(columnIndex * chunkSize, (columnIndex + 1) * chunkSize),
            )
          : [weekdayRows]

        return (
          <article
            key={`balance-list-${series.month}`}
            className="card-shadow overflow-hidden rounded-lg border border-[#d9d9d9] bg-[#fafafa]"
          >
            <div className="border-b border-[#d9d9d9] px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-[#1c1b1f]">{series.month}</h4>
                {negativeDaysCount > 0 ? (
                  <span className="text-[10px] font-semibold text-[#d20f39]">
                    {negativeDaysCount} negative days
                  </span>
                ) : null}
              </div>
            </div>
            <div className={useSplitColumns ? "grid gap-12 px-4 py-3 lg:grid-cols-3" : "px-4 py-3"}>
              {ledgerColumns.map((columnRows, columnIndex) => (
                <div key={`${series.month}-column-${columnIndex}`} className="min-w-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#d9d9d9] pb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#4c4f69]">
                    <span>Date</span>
                    <span className="text-right whitespace-nowrap">Balance ($)</span>
                  </div>
                  <div>
                    {columnRows.map((entry, idx) => (
                      (() => {
                        const isNegative = entry.balance < 0
                        const rowTone = isNegative ? "text-[#b91c1c]" : "text-[#4c4f69]"
                        const valueTone = isNegative ? "text-[#b91c1c]" : "text-[#1c1b1f]"
                        return (
                      <div
                        key={`list-${series.month}-${columnIndex}-${entry.day}-${idx}`}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#efefef] py-1.5 text-[10px] last:border-b-0"
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
      <div className="mb-4 flex items-center gap-2">
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
        <h3 className="text-base font-bold leading-none text-[#1c1b1f]">Balances</h3>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#039e94]" />
            <span className="text-xs text-[#4c4f69]">Current Balance</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v) => v}
                  interval="preserveStartEnd"
                  minTickGap={30}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  domain={[-30, "auto"]}
                  allowDataOverflow
                  tickFormatter={(value) => (value === 0 ? "$0" : `${value < 0 ? "-" : ""}$${Math.abs(value)}k`)}
                  tick={{ fontSize: 10 }}
                  width={50}
                />
                <ReferenceLine y={0} stroke="#d20f39" strokeDasharray="4 3" strokeWidth={1.5} />
                <Tooltip
                  formatter={(value) => `$${value}k`}
                  labelStyle={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}
                  itemStyle={{ fontSize: 10, padding: 0 }}
                  contentStyle={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    boxShadow: "none",
                    backgroundColor: "#fafafa",
                    padding: "6px 8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#039e94"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#039e94" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {renderMonthlyBalanceLists(true)}
      </div>
    </section>
  )
}
