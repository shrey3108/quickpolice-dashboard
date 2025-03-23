
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CaseSummary from "@/components/CaseSummary";
import FilterSection from "@/components/FilterSection";
import CaseList from "@/components/CaseList";
import { Shield } from "lucide-react";

// Sample data
const initialCases = [
  { 
    id: 1, 
    title: "Robbery",
    description: "Armed robbery reported at convenience store",
    location: "A/26 Trishul Society", 
    time: "2 mins ago", 
    rank: 1, 
    officer: "Officer John Doe", 
    resolved: false, 
    redirected: false, 
    mobileLocation: "40.7128,-74.0060" 
  },
  { 
    id: 2, 
    title: "Noise Complaint",
    description: "Loud music disturbing neighbors",
    location: "456 Elm St", 
    time: "10 mins ago", 
    rank: 3, 
    officer: "Officer Jane Smith",
    resolved: false, 
    redirected: false, 
    mobileLocation: "34.0522,-118.2437" 
  },
  { 
    id: 3, 
    title: "Suspicious Activity",
    description: "Suspicious person loitering in the area",
    location: "789 Oak St", 
    time: "30 mins ago", 
    rank: 5, 
    officer: "Officer Mike Brown", 
    resolved: true, 
    redirected: false, 
    mobileLocation: "51.5074,-0.1278" 
  },
  { 
    id: 4, 
    title: "Traffic Accident",
    description: "Two-vehicle collision, no injuries reported",
    location: "101 Pine Ave", 
    time: "45 mins ago", 
    rank: 4, 
    officer: "Officer Sarah Johnson", 
    resolved: false, 
    redirected: true, 
    mobileLocation: "37.7749,-122.4194" 
  },
  { 
    id: 5, 
    title: "Domestic Dispute",
    description: "Verbal altercation between family members",
    location: "222 Maple Dr", 
    time: "1 hour ago", 
    rank: 2, 
    officer: "Officer Robert Wilson", 
    resolved: false, 
    redirected: false, 
    mobileLocation: "41.8781,-87.6298" 
  }
];

const Index = () => {
  const [cases, setCases] = useState(initialCases);
  const [filteredCases, setFilteredCases] = useState(initialCases);
  const [activeTab, setActiveTab] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");

  // Apply filters when tabs or rank filter changes
  useEffect(() => {
    let result = [...cases];
    
    // Filter by tab first
    if (activeTab === "resolved") {
      result = result.filter(caseItem => caseItem.resolved);
    } else if (activeTab === "pending") {
      result = result.filter(caseItem => !caseItem.resolved);
    } else if (activeTab === "urgent") {
      result = result.filter(caseItem => caseItem.rank <= 2);
    }
    
    // Then filter by rank if needed
    if (rankFilter !== "all") {
      result = result.filter(caseItem => caseItem.rank === parseInt(rankFilter));
    }
    
    setFilteredCases(result);
  }, [cases, activeTab, rankFilter]);

  // Handle resolving a case
  const handleResolveCase = (id: number) => {
    setCases(cases.map(caseItem => 
      caseItem.id === id ? { ...caseItem, resolved: true } : caseItem
    ));
  };

  // Handle redirecting a case
  const handleRedirectCase = (id: number) => {
    setCases(cases.map(caseItem => 
      caseItem.id === id ? { ...caseItem, redirected: true } : caseItem
    ));
  };

  // Calculate summary data
  const summaryData = {
    totalCases: cases.length,
    resolvedCases: cases.filter(c => c.resolved).length,
    redirectedCases: cases.filter(c => c.redirected).length,
    urgentCases: cases.filter(c => c.rank <= 2).length
  };

  // Handle case status change (resolve or redirect)
  const handleStatusChange = (id: number, status: 'resolved' | 'redirected') => {
    if (status === 'resolved') {
      handleResolveCase(id);
    } else {
      handleRedirectCase(id);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 container py-6 px-4 md:px-6">
        <CaseSummary data={summaryData} />
        
        <FilterSection 
          onFilterChange={(value) => setRankFilter(value)} 
        />
        
        <CaseList 
          cases={filteredCases}
          onStatusChange={(id, status) => handleStatusChange(id, status)}
        />
      </main>
      
      <footer className="py-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        <div className="container flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-4 w-4 text-police-blue" />
            <span>QuickPolice Dashboard</span>
          </div>
          <div>
            <p>© {new Date().getFullYear()} QuickPolice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
