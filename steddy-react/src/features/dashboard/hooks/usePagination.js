import { useEffect, useMemo, useState } from "react"

export default function usePagination(rows, pageSize) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return rows.slice(start, start + pageSize)
  }, [rows, currentPage, pageSize])

  const rangeStart = rows.length ? (currentPage - 1) * pageSize + 1 : 0
  const rangeEnd = Math.min(currentPage * pageSize, rows.length)
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setCurrentPage(1))
    return () => window.cancelAnimationFrame(frameId)
  }, [rows])

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pagedRows,
    rangeStart,
    rangeEnd,
    canGoPrev,
    canGoNext,
  }
}
