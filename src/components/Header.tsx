
import React from "react";
import { Shield, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All Cases", icon: Shield },
    { id: "resolved", label: "Resolved", icon: CheckCircle },
    { id: "pending", label: "Pending", icon: Clock },
    { id: "urgent", label: "Urgent", icon: AlertCircle }
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-10 px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-border/50">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <Shield className="h-7 w-7 text-police-blue animate-pulse-subtle" />
        <h1 className="text-xl md:text-2xl font-medium tracking-tight">
          <span className="font-semibold text-police-blue">Quick</span>Police
        </h1>
      </div>

      <nav className="flex items-center space-x-1 md:space-x-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "nav-link flex items-center space-x-1.5 focus-ring",
              activeTab === tab.id ? "active" : ""
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
