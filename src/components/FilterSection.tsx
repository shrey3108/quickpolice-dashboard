
import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  onFilterChange: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold tracking-tight">Case Overview</h2>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="all" onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px] h-9 focus-ring">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="1">Priority 1 (Urgent)</SelectItem>
            <SelectItem value="2">Priority 2</SelectItem>
            <SelectItem value="3">Priority 3</SelectItem>
            <SelectItem value="4">Priority 4</SelectItem>
            <SelectItem value="5">Priority 5 (Normal)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSection;
