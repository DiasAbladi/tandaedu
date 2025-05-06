
import React from 'react';
import { Button } from "@/components/ui/button";

interface UniversityPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const UniversityPagination: React.FC<UniversityPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center gap-2">
      <Button 
        variant="outline" 
        className="w-10 h-10 p-0" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button 
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          className="w-10 h-10 p-0"
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      
      <Button 
        variant="outline" 
        className="w-10 h-10 p-0"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </div>
  );
};

export default UniversityPagination;
