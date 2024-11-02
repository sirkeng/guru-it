import React from 'react';

import ItemsPerPageSelector from './ItemsPerPageSelector';
import PageSelector from './PageSelector';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between my-4">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />

      <div className="flex items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
