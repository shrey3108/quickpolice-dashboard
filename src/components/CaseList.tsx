
import React, { useState } from "react";
import CaseCard from "./CaseCard";
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

interface CaseListProps {
  cases: CaseData[];
  onStatusChange: () => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onStatusChange }) => {
  const [mapLocation, setMapLocation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLocationClick = (location: string) => {
    setMapLocation(location);
    toast({
      title: "Location Selected",
      description: "Map has been updated with the selected location.",
      variant: "default",
    });
  };

  const handleResolve = (id: number) => {
    // This function is handled by the Index component and passed as a prop
    onStatusChange();
  };

  const handleRedirect = (id: number) => {
    // This function is handled by the Index component and passed as a prop
    onStatusChange();
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {cases.length > 0 ? (
          cases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseData={caseItem}
              onResolve={handleResolve}
              onRedirect={handleRedirect}
              onLocationClick={handleLocationClick}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">No cases match the current filter.</p>
          </div>
        )}
      </div>

      {mapLocation && (
        <div className="mt-8 animate-slide-up">
          <h3 className="text-lg font-semibold mb-3">Location Map</h3>
          <div className="rounded-xl overflow-hidden border border-border h-[350px]">
            <iframe
              title="Case Location"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBzXq3R0-UwlUu5ogTQzgTIF29r2Enh5dc&q=${mapLocation}&zoom=15`}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
