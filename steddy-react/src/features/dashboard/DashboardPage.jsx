import { useEffect, useMemo, useRef, useState } from "react"
import DashboardShell from "./components/DashboardShell"
import DashboardListCard from "./components/DashboardListCard"
import usePagination from "./hooks/usePagination"
import {
  allApplicationRows,
  brokersRows,
  CARD_VARIANTS,
  ROWS_PER_PAGE,
  underwriterRows,
} from "./data/dashboardData"

export default function DashboardPage({ onOpenApplication, colorMode, setColorMode, colorThemes }) {
  const [activeCard, setActiveCard] = useState("applications")
  const tableViewportRef = useRef(null)

  const activeRows = useMemo(() => {
    if (activeCard === "brokers") return brokersRows
    if (activeCard === "underwriters") return underwriterRows
    return allApplicationRows
  }, [activeCard])

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    pagedRows,
    rangeStart,
    rangeEnd,
    canGoPrev,
    canGoNext,
  } = usePagination(activeRows, ROWS_PER_PAGE)

  useEffect(() => {
    if (tableViewportRef.current) {
      tableViewportRef.current.scrollTo({ top: 0 })
    }
  }, [currentPage, activeCard])

  const cardVariant = CARD_VARIANTS[activeCard]

  return (
    <div className="h-full min-h-0 flex flex-col">
      <DashboardShell
        colorMode={colorMode}
        setColorMode={setColorMode}
        colorThemes={colorThemes}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        cardVariants={CARD_VARIANTS}
      >
        <div className="mx-auto flex h-full w-full max-w-[1120px]">
          <DashboardListCard
            cardVariant={cardVariant}
            activeRows={activeRows}
            pagedRows={pagedRows}
            tableViewportRef={tableViewportRef}
            onOpenApplication={onOpenApplication}
            currentPage={currentPage}
            totalPages={totalPages}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrevPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNextPage={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          />
        </div>
      </DashboardShell>
    </div>
  )
}
