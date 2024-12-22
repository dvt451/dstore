import React from 'react';
import { useFilter } from '../../../shared/hooks/FilterProvider';

export default function Pagination() {
  const {
    setPageLoading,
    currentPage,
    totalPages,
    handlePageChange,
  } = useFilter()
  // Function to handle clicks on specific page numbers
  const handlePageClick = (page) => {
    setPageLoading(true)
      handlePageChange(page);
      setTimeout(() => {
        setPageLoading(false)
      }, 500);
  };

  // Create an array of page numbers for rendering
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    totalPages > 1 &&
    <div className="pagination">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
