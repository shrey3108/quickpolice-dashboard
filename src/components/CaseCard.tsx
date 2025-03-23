
import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Clock, User, AlertCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseData {
  id: number;
  title: string;
  description: string;
  location: string;
  time: string;
  rank: number;
  officer: string;
  resolved: boolean;
  redirected: boolean;
  mobileLocation: string;
}

interface CaseCardProps {
  caseData: CaseData;
  onResolve: (id: number) => void;
  onRedirect: (id: number) => void;
  onLocationClick: (location: string) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({
  caseData,
  onResolve,
  onRedirect,
  onLocationClick,
}) => {
  const { toast } = useToast();

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-police-rank1 text-police-rank1 bg-red-50";
      case 2:
        return "border-police-rank2 text-police-rank2 bg-orange-50";
      case 3:
        return "border-police-rank3 text-police-rank3 bg-yellow-50";
      case 4:
        return "border-police-rank4 text-police-rank4 bg-green-50";
      case 5:
        return "border-police-rank5 text-police-rank5 bg-blue-50";
      default:
        return "border-muted-foreground text-muted-foreground bg-muted";
    }
  };

  const getCardClass = () => {
    let baseClass = "rounded-xl border p-5 case-card-shadow case-card-hover animate-staggered";
    if (caseData.resolved) {
      return cn(baseClass, "bg-police-resolved border-police-rank4");
    }
    if (caseData.redirected) {
      return cn(baseClass, "bg-police-redirected border-police-rank2");
    }
    return baseClass;
  };

  const handleResolve = () => {
    onResolve(caseData.id);
    toast({
      title: "Case Resolved",
      description: `Case #${caseData.id} has been marked as complete.`,
      variant: "default",
    });
  };

  const handleRedirect = () => {
    onRedirect(caseData.id);
    toast({
      title: "Case Redirected",
      description: `Case #${caseData.id} has been redirected to volunteers.`,
      variant: "default",
    });
  };

  return (
    <div className={getCardClass()}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-1.5 mb-2">
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                getRankColor(caseData.rank)
              )}
            >
              Priority {caseData.rank}
            </span>
            {caseData.resolved && (
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-police-rank4">
                Resolved
              </span>
            )}
            {caseData.redirected && (
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-orange-100 text-police-rank2">
                Redirected
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold">{caseData.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {caseData.description}
          </p>
        </div>
        <span className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          {caseData.time}
        </span>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
          <span
            onClick={() => onLocationClick(caseData.mobileLocation)}
            className="text-police-blue hover:text-police-blue/70 cursor-pointer transition-colors"
          >
            {caseData.location}
          </span>
        </div>
        <div className="flex items-start">
          <User className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
          <span>{caseData.officer}</span>
        </div>
      </div>

      {!caseData.resolved && (
        <div className="flex space-x-3 mt-4">
          <button
            onClick={handleRedirect}
            className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-md border border-police-rank2 text-police-rank2 hover:bg-orange-50 focus-ring transition-colors text-sm"
          >
            <ArrowRight className="h-4 w-4" />
            <span>Redirect</span>
          </button>
          <button
            onClick={handleResolve}
            className="flex-1 py-2 px-3 rounded-md bg-police-blue text-white hover:bg-police-blue/90 focus-ring transition-colors text-sm"
          >
            Mark as Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default CaseCard;
