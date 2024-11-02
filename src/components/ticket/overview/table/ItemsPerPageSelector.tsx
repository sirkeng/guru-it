import React from 'react';

type ItemsPerPageSelectorProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
};

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">Items per page:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
