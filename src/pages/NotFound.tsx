
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="max-w-md w-full animate-scale-in">
        <div className="text-center mb-8">
          <div className="bg-red-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <AlertOctagon className="h-8 w-8 text-police-rank1" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p className="text-lg text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-police-blue text-white px-5 py-2 rounded-md hover:bg-police-blue/90 transition-colors focus-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
