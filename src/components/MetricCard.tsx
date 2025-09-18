import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: "green" | "yellow" | "blue" | "red" | "gray";
  trend?: {
    current: number;
    target: number;
  };
  tooltip: string;
  onClick?: () => void;
}

const MetricCard = ({ title, value, icon: Icon, color, trend, tooltip, onClick }: MetricCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-100",
          border: "border-green-200",
          text: "text-green-800",
          icon: "text-green-600"
        };
      case "yellow":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-200", 
          text: "text-yellow-800",
          icon: "text-yellow-600"
        };
      case "blue":
        return {
          bg: "bg-blue-100",
          border: "border-blue-200",
          text: "text-blue-800", 
          icon: "text-blue-600"
        };
      case "red":
        return {
          bg: "bg-red-100",
          border: "border-red-200",
          text: "text-red-800",
          icon: "text-red-600"
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-200",
          text: "text-gray-800",
          icon: "text-gray-600"
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`p-6 ${colorClasses.bg} ${colorClasses.border} border-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
            onClick={onClick}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium ${colorClasses.text}`}>{title}</h3>
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${colorClasses.icon}`} />
                  <Info className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${colorClasses.text}`}>
                  {value}
                </div>
                
                {trend && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{trend.current}</span>
                      <span>{trend.target}</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min((trend.current / trend.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MetricCard;