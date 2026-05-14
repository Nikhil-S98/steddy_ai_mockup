import { useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"
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
}) {
  const tableViewportRef = useRef(null)
  const listCardContainerRef = useRef(null)
  const isCardTransitioningRef = useRef(false)

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

  const handleSidebarCardChange = (nextCard) => {
    if (!nextCard || nextCard === activeCard || isCardTransitioningRef.current) return

    const container = listCardContainerRef.current
    if (!container) {
      setActiveCard(nextCard)
      return
    }

    isCardTransitioningRef.current = true
    gsap.killTweensOf(container)
    gsap.to(container, {
      opacity: 0,
      duration: 0.14,
      ease: "power1.out",
      onComplete: () => {
        setActiveCard(nextCard)
        requestAnimationFrame(() => {
          const nextContainer = listCardContainerRef.current
          if (!nextContainer) {
            isCardTransitioningRef.current = false
            return
          }

          gsap.killTweensOf(nextContainer)
          gsap.fromTo(
            nextContainer,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              ease: "power1.inOut",
              clearProps: "opacity",
              onComplete: () => {
                isCardTransitioningRef.current = false
              },
              onInterrupt: () => {
                isCardTransitioningRef.current = false
              },
            },
          )
        })
      },
      onInterrupt: () => {
        isCardTransitioningRef.current = false
      },
    })
  }

  return (
    <div className="h-full min-h-0 flex flex-col">
      <DashboardShell
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        onCardSelect={handleSidebarCardChange}
        cardVariants={CARD_VARIANTS}
      >
        <div ref={listCardContainerRef} className="flex h-full min-h-0 w-full max-w-[1260px] flex-1 flex-col min-w-0 self-center">
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
