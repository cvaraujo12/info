import React from "react"
import { Button } from "./Button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)
  const showEllipsis = totalPages > 7

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const getVisiblePages = () => {
    if (!showEllipsis) return pages

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), -1, totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, -1, ...pages.slice(totalPages - 5)]
    }

    return [
      1,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      -1,
      totalPages
    ]
  }

  if (totalPages <= 1) return null

  return (
    <nav
      role="navigation"
      aria-label="Navegação de página"
      className={`flex items-center justify-center space-x-2 ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        Anterior
      </Button>

      {getVisiblePages().map((page, i) =>
        page === -1 ? (
          <span key={`ellipsis-${i}`} className="px-2" aria-hidden="true">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        Próxima
      </Button>
    </nav>
  )
}
