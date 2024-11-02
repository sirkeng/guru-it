import React from 'react';

type PageSelectorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PageSelector: React.FC<PageSelectorProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="flex items-center">
            <span className="mx-2">Page</span>
            <select
                value={currentPage}
                onChange={(e) => onPageChange(Number(e.target.value))}
                className="border p-2 rounded"
            >
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <option key={page} value={page}>
                        {page}
                    </option>
                ))}
            </select>
            <span className="ml-2">of {totalPages}</span>
        </div>
    );
};

export default PageSelector;
