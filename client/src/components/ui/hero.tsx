import { MoveRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero1() {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-2xl text-gray-900">
            Report Issues. Improve Your Community.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md">
            Report public complaints in seconds and stay updated as they’re resolved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-green-700 hover:bg-green-800 text-white"
            >
              Report Issue <MoveRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 border-green-700 text-green-700 hover:bg-green-50"
            >
              Track Complaint 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero1 };
