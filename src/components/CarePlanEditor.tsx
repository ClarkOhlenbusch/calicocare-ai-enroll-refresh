import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Archive, 
  RotateCcw,
  Calendar,
  BarChart3,
  Layers3,
  ArrowLeft,
  Plus,
  X,
  Activity,
  Heart,
  Weight,
  Clock,
  Zap,
  Target,
  Brain
} from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CarePlanTimeline from "./CarePlanTimeline";
import CardConfigModal from "./CardConfigModal";

// Mock data for seniors
const mockSeniors = [
  { id: 1, name: "Accardi, Ken", dob: "11/11/1999", status: "Active" },
  { id: 2, name: "Johnson, Mary", dob: "03/15/1945", status: "Active" },
  { id: 3, name: "Smith, Robert", dob: "07/22/1938", status: "Inactive" },
  { id: 4, name: "Williams, Patricia", dob: "12/05/1942", status: "Active" },
];

// Mock card library data
const cardLibrary = {
  measurement: [
    { id: "bp", name: "Blood Pressure", icon: Heart, color: "bg-purple-500", category: "measurement" },
    { id: "copd1", name: "Daily COPD Question #1", icon: Brain, color: "bg-purple-500", category: "measurement" },
    { id: "copd2", name: "Daily COPD Question #2", icon: Brain, color: "bg-purple-500", category: "measurement" },
    { id: "copd3", name: "Daily COPD Question #3", icon: Brain, color: "bg-purple-500", category: "measurement" },
    { id: "copd4", name: "Daily COPD Question #4", icon: Brain, color: "bg-purple-500", category: "measurement" },
    { id: "copd5", name: "Daily COPD Question #5", icon: Brain, color: "bg-purple-500", category: "measurement" },
  ],
  automatic: [
    { id: "weight", name: "Weight", icon: Weight, color: "bg-purple-600", category: "automatic" },
    { id: "steps", name: "Steps", icon: Activity, color: "bg-purple-600", category: "automatic" },
    { id: "distance", name: "Distance", icon: Target, color: "bg-purple-600", category: "automatic" },
    { id: "sleep", name: "Total Sleep [hours]", icon: Clock, color: "bg-purple-600", category: "automatic" },
    { id: "calories-burned", name: "Total Calories Burned (BMR + Activity)", icon: Zap, color: "bg-purple-600", category: "automatic" },
    { id: "activity-calories", name: "Activity Calories", icon: Activity, color: "bg-purple-600", category: "automatic" },
  ],
  activity: [
    { id: "sit-hour", name: "Sit up for an hour", icon: Activity, color: "bg-yellow-600", category: "activity" },
    { id: "standing-march", name: "Standing March", icon: Activity, color: "bg-yellow-600", category: "activity" },
    { id: "therapeutic-massage", name: "Therapeutic massage for part of the session", icon: Activity, color: "bg-yellow-600", category: "activity" },
    { id: "therapy-ball-knees", name: "Therapy ball between knees", icon: Activity, color: "bg-yellow-600", category: "activity" },
    { id: "video-inhaler", name: "Video Proper Inhaler Use", icon: Activity, color: "bg-yellow-600", category: "activity" },
  ],
  workout: [
    { id: "brief-workout", name: "Brief Full-Body Workout #1", icon: Activity, color: "bg-orange-600", category: "workout" },
    { id: "full-body", name: "Workout, Full-Body", icon: Activity, color: "bg-orange-600", category: "workout" },
    { id: "leg-workout", name: "Leg Workout", icon: Activity, color: "bg-orange-600", category: "workout" },
    { id: "chest-workout", name: "Chest Workout", icon: Activity, color: "bg-orange-600", category: "workout" },
    { id: "post-mastectomy", name: "Post-Mastectomy Exercise Routine", icon: Activity, color: "bg-orange-600", category: "workout" },
  ]
};

interface SortableCardProps {
  card: any;
  onEdit: (card: any) => void;
  onRemove?: (cardId: string) => void;
  isActive?: boolean;
}

function SortableCard({ card, onEdit, onRemove, isActive = false }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const IconComponent = card.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-md cursor-pointer transition-all hover:shadow-md ${card.color} text-white relative group`}
      onClick={() => onEdit(card)}
    >
      <div className="flex items-center space-x-2">
        <IconComponent className="w-4 h-4" />
        <span className="text-sm font-medium">{card.name}</span>
      </div>
      {isActive && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(card.id);
          }}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

const CarePlanEditor = () => {
  const [selectedSenior, setSelectedSenior] = useState(mockSeniors[0]);
  const [viewMode, setViewMode] = useState("stack");
  const [filterType, setFilterType] = useState<"all" | "reminder" | "activity" | "measure" | "survey">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [activeCards, setActiveCards] = useState([
    cardLibrary.automatic.find(c => c.id === "weight"),
    cardLibrary.automatic.find(c => c.id === "steps"),
    cardLibrary.automatic.find(c => c.id === "distance"),
    cardLibrary.automatic.find(c => c.id === "sleep"),
    cardLibrary.automatic.find(c => c.id === "calories-burned"),
    cardLibrary.automatic.find(c => c.id === "activity-calories"),
  ].filter(Boolean));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardEdit = (card: any) => {
    setSelectedCard(card);
    setIsConfigModalOpen(true);
  };

  const handleAddCard = (card: any) => {
    if (!activeCards.find(c => c.id === card.id)) {
      setActiveCards([...activeCards, card]);
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setActiveCards(activeCards.filter(c => c.id !== cardId));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setActiveCards((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getFilteredLibrary = () => {
    let allCards = [...cardLibrary.measurement, ...cardLibrary.automatic, ...cardLibrary.activity, ...cardLibrary.workout];
    
    if (searchTerm) {
      allCards = allCards.filter(card => 
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      // Filter by type - you can expand this logic based on your needs
      allCards = allCards.filter(card => {
        switch (filterType) {
          case "measure":
            return card.category === "measurement" || card.category === "automatic";
          case "activity":
            return card.category === "activity" || card.category === "workout";
          default:
            return true;
        }
      });
    }

    return allCards;
  };

  if (viewMode === "timeline") {
    return <CarePlanTimeline selectedSenior={selectedSenior} onBack={() => setViewMode("stack")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Care Plan Editor</h1>
              <p className="text-muted-foreground">Build and customize individual care plans</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("timeline")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={viewMode === "stack" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("stack")}
            >
              <Layers3 className="w-4 h-4 mr-2" />
              Stack
            </Button>
          </div>
        </div>

        {/* Senior Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Care Plan(s) For:</span>
              <Select value={selectedSenior.id.toString()} onValueChange={(value) => {
                const senior = mockSeniors.find(s => s.id === parseInt(value));
                if (senior) setSelectedSenior(senior);
              }}>
                <SelectTrigger className="w-80 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  {mockSeniors.map((senior) => (
                    <SelectItem key={senior.id} value={senior.id.toString()}>
                      {senior.name} ({senior.dob})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Editor Menu */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-teal-500 text-white hover:bg-teal-600">
                  <span className="mr-2">Reminder</span>
                  <button className="ml-1">▼</button>
                </Badge>
                <Badge className="bg-yellow-600 text-white hover:bg-yellow-700">
                  <span className="mr-2">Activity</span>
                  <button className="ml-1">▼</button>
                </Badge>
                <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                  <span className="mr-2">Measure</span>
                  <button className="ml-1">▼</button>
                </Badge>
                <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                  <span className="mr-2">Survey</span>
                  <button className="ml-1">▼</button>
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <Button variant="outline" className="bg-red-100 text-red-700 hover:bg-red-200">
                Extend all cards
              </Button>
              <Input placeholder="0" className="w-16 text-center" />
              <span className="text-sm text-muted-foreground">day(s)</span>
              <Button variant="outline" className="bg-red-100 text-red-700 hover:bg-red-200">
                Archive All
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Edit Thresholds
              </Button>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Active Cards Panel */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/20">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-lg">Active Cards // Senior Care Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 p-4">
                {/* Measurement Cards Section */}
                <div>
                  <div className="bg-purple-500 text-white px-4 py-2 font-medium">
                    Measurement Cards
                  </div>
                  <ScrollArea className="h-32 border border-gray-200 bg-gray-50 p-2">
                    <div className="text-sm text-gray-500 text-center py-8">
                      Drag measurement cards here
                    </div>
                  </ScrollArea>
                </div>

                {/* Automatic Cards Section */}
                <div>
                  <div className="bg-purple-500 text-white px-4 py-2 font-medium">
                    Automatic Cards (Cards marked with asterisk)
                  </div>
                  <ScrollArea className="h-48 border border-gray-200 bg-gray-50 p-2">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext items={activeCards} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          {activeCards.map((card) => (
                            <SortableCard
                              key={card.id}
                              card={card}
                              onEdit={handleCardEdit}
                              onRemove={handleRemoveCard}
                              isActive={true}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </ScrollArea>
                </div>

                {/* Activity Cards Section */}
                <div>
                  <div className="bg-yellow-600 text-white px-4 py-2 font-medium">
                    Activity Cards
                  </div>
                  <ScrollArea className="h-32 border border-gray-200 bg-gray-50 p-2">
                    <div className="text-sm text-gray-500 text-center py-8">
                      Drag activity cards here
                    </div>
                  </ScrollArea>
                </div>

                {/* Workout Routines Section */}
                <div>
                  <div className="bg-orange-600 text-white px-4 py-2 font-medium">
                    Workout Routines
                  </div>
                  <ScrollArea className="h-32 border border-gray-200 bg-gray-50 p-2">
                    <div className="text-sm text-gray-500 text-center py-8">
                      Drag workout routines here
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Library Panel */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/20">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-lg">Your Card Library</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="measurement" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="measurement">Measurement</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="workout">Workout</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>

                <TabsContent value="measurement" className="p-4">
                  <div className="bg-purple-500 text-white px-4 py-2 font-medium mb-2">
                    Measurement Cards
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {cardLibrary.measurement.map((card) => (
                        <div key={card.id} className="flex items-center justify-between">
                          <SortableCard card={card} onEdit={handleCardEdit} />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAddCard(card)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="activity" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="bg-yellow-600 text-white px-4 py-2 font-medium mb-2">
                        Activity Cards
                      </div>
                      <ScrollArea className="h-32">
                        <div className="space-y-2">
                          {cardLibrary.activity.map((card) => (
                            <div key={card.id} className="flex items-center justify-between">
                              <SortableCard card={card} onEdit={handleCardEdit} />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAddCard(card)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="workout" className="p-4">
                  <div className="bg-orange-600 text-white px-4 py-2 font-medium mb-2">
                    Workout Routines
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {cardLibrary.workout.map((card) => (
                        <div key={card.id} className="flex items-center justify-between">
                          <SortableCard card={card} onEdit={handleCardEdit} />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAddCard(card)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="all" className="p-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {Object.entries(cardLibrary).map(([category, cards]) => (
                        <div key={category}>
                          <div className={`px-4 py-2 font-medium mb-2 text-white ${
                            category === 'measurement' ? 'bg-purple-500' :
                            category === 'automatic' ? 'bg-purple-600' :
                            category === 'activity' ? 'bg-yellow-600' :
                            'bg-orange-600'
                          }`}>
                            {category.charAt(0).toUpperCase() + category.slice(1)} Cards
                          </div>
                          <div className="space-y-2 pl-2">
                            {cards.map((card) => (
                              <div key={card.id} className="flex items-center justify-between">
                                <SortableCard card={card} onEdit={handleCardEdit} />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddCard(card)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Card Configuration Modal */}
        <CardConfigModal
          card={selectedCard}
          isOpen={isConfigModalOpen}
          onClose={() => {
            setIsConfigModalOpen(false);
            setSelectedCard(null);
          }}
        />
      </div>
    </div>
  );
};

export default CarePlanEditor;