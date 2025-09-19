import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Layers3 } from "lucide-react";

interface CarePlanTimelineProps {
  selectedSenior: any;
  onBack: () => void;
}

const timelineData = [
  { label: "Weight", color: "bg-purple-600", hasData: true },
  { label: "Steps", color: "bg-purple-600", hasData: true },
  { label: "Distance", color: "bg-purple-600", hasData: true },
  { label: "Total Sleep [Hours]", color: "bg-purple-600", hasData: true },
  { label: "Total Calories Burned (BMR + Activity)", color: "bg-purple-600", hasData: true },
  { label: "Activity Calories", color: "bg-purple-600", hasData: true },
  { label: "Base Metabolic Rate (BMR)", color: "bg-purple-600", hasData: true },
  { label: "Calorie Intake", color: "bg-purple-600", hasData: true },
  { label: "Activity Minutes/Fitness Activity", color: "bg-purple-600", hasData: true },
  { label: "Dangers Of Tobacco Smoking", hasData: false },
  { label: "Level Of Leg Discomfort", hasData: false },
  { label: "Blood Pressure", hasData: false },
  { label: "Heart Rate", hasData: false },
  { label: "Level Of Chest Pain", hasData: false },
];

const CarePlanTimeline = ({ selectedSenior, onBack }: CarePlanTimelineProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Care Plan Timeline</h1>
              <p className="text-muted-foreground">Visual timeline view of patient metrics</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="default" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button variant="outline" size="sm" onClick={onBack}>
              <Layers3 className="w-4 h-4 mr-2" />
              Stack
            </Button>
          </div>
        </div>

        {/* Senior Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Care Plan(s) For:</span>
              <Select value={selectedSenior.id.toString()}>
                <SelectTrigger className="w-80 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value={selectedSenior.id.toString()}>
                    {selectedSenior.name} ({selectedSenior.dob})
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" className="text-primary">
                Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jump To Date */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Jump To
              </Button>
              <input 
                type="date" 
                defaultValue="2025-09-19"
                className="px-3 py-2 border rounded-md bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[1200px]">
                {/* Timeline Header */}
                <div className="grid grid-cols-12 border-b bg-gray-50">
                  <div className="col-span-3 p-4 font-semibold border-r">Metric</div>
                  <div className="col-span-9 grid grid-cols-30 text-xs text-center">
                    {/* Date headers - simplified for display */}
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="p-2 border-r text-gray-600">
                        {19 + i}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Rows */}
                {timelineData.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 border-b hover:bg-gray-50/50">
                    <div className="col-span-3 p-4 border-r flex items-center">
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="col-span-9 grid grid-cols-30 items-center">
                      {/* Data visualization bars */}
                      {Array.from({ length: 30 }, (_, i) => (
                        <div key={i} className="h-8 border-r border-gray-100 flex items-center justify-center">
                          {item.hasData && i < 9 && (
                            <div 
                              className={`h-4 w-3 rounded-sm ${item.color}`}
                              style={{ opacity: 0.7 + (Math.random() * 0.3) }}
                            />
                          )}
                        </div>
                      ))}
                      {/* Red line marker */}
                      <div className="absolute h-full w-0.5 bg-red-500" style={{ left: '25%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarePlanTimeline;