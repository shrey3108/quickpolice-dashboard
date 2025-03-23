
import React from "react";
import { Shield, CheckCircle, Share2, AlertCircle } from "lucide-react";

interface SummaryData {
  totalCases: number;
  resolvedCases: number;
  redirectedCases: number;
  urgentCases: number;
}

interface CaseSummaryProps {
  data: SummaryData;
}

const CaseSummary: React.FC<CaseSummaryProps> = ({ data }) => {
  const summaryItems = [
    {
      title: "Total Cases",
      value: data.totalCases,
      icon: Shield,
      color: "text-police-blue",
      bgColor: "bg-blue-50",
    },
    {
      title: "Resolved",
      value: data.resolvedCases,
      icon: CheckCircle,
      color: "text-police-rank4",
      bgColor: "bg-green-50",
    },
    {
      title: "Redirected",
      value: data.redirectedCases,
      icon: Share2,
      color: "text-police-rank2",
      bgColor: "bg-orange-50",
    },
    {
      title: "Urgent",
      value: data.urgentCases,
      icon: AlertCircle,
      color: "text-police-rank1",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {summaryItems.map((item, index) => (
        <div 
          key={item.title}
          className={`animate-staggered rounded-xl p-4 flex items-start space-x-4 border border-border/50 ${item.bgColor} case-card-shadow`}
        >
          <div className={`p-3 rounded-lg ${item.bgColor} ${item.color}`}>
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
            <h3 className={`text-2xl font-semibold mt-1 ${item.color}`}>
              {item.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseSummary;
