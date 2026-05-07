import { useEffect, useMemo, useRef } from "react"
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

export default function DashboardPage({
  onOpenApplication,
  onNewApplication,
  activeCard,
  setActiveCard,
  colorMode,
  setColorMode,
  colorThemes,
  uiFont,
  setUiFont,
  uiFontOptions,
}) {
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
        uiFont={uiFont}
        setUiFont={setUiFont}
        uiFontOptions={uiFontOptions}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        cardVariants={CARD_VARIANTS}
      >
        <div className="flex h-full min-h-0 w-full max-w-[1260px] flex-1 flex-col min-w-0 self-center">
          <DashboardListCard
            cardVariant={cardVariant}
            activeRows={activeRows}
            pagedRows={pagedRows}
            tableViewportRef={tableViewportRef}
            onOpenApplication={onOpenApplication}
            onNewApplication={onNewApplication}
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
