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
  Brain,
  User,
  Settings,
  Save,
  Eye,
  Filter,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CarePlanTimeline from "./CarePlanTimeline";
import CardConfigModal from "./CardConfigModal";

// Mock data for seniors
const mockSeniors = [
  { id: 1, name: "Accardi, Ken", dob: "11/11/1999", status: "Active", avatar: "👨‍💼", activeCards: 6, completionRate: 92 },
  { id: 2, name: "Johnson, Mary", dob: "03/15/1945", status: "Active", avatar: "👩‍🦳", activeCards: 4, completionRate: 88 },
  { id: 3, name: "Smith, Robert", dob: "07/22/1938", status: "Inactive", avatar: "👨‍🦲", activeCards: 2, completionRate: 45 },
  { id: 4, name: "Williams, Patricia", dob: "12/05/1942", status: "Active", avatar: "👵", activeCards: 5, completionRate: 95 },
];

// Mock card library data
const cardLibrary = {
  measurement: [
    { id: "bp", name: "Blood Pressure", icon: Heart, gradient: "from-rose-400 to-pink-500", category: "measurement", description: "Monitor blood pressure readings" },
    { id: "copd1", name: "Daily COPD Question #1", icon: Brain, gradient: "from-violet-400 to-purple-500", category: "measurement", description: "Assess breathing comfort" },
    { id: "copd2", name: "Daily COPD Question #2", icon: Brain, gradient: "from-violet-400 to-purple-500", category: "measurement", description: "Track medication effectiveness" },
    { id: "copd3", name: "Daily COPD Question #3", icon: Brain, gradient: "from-violet-400 to-purple-500", category: "measurement", description: "Monitor symptom progression" },
    { id: "copd4", name: "Daily COPD Question #4", icon: Brain, gradient: "from-violet-400 to-purple-500", category: "measurement", description: "Check activity tolerance" },
    { id: "copd5", name: "Daily COPD Question #5", icon: Brain, gradient: "from-violet-400 to-purple-500", category: "measurement", description: "Overall wellness check" },
  ],
  automatic: [
    { id: "weight", name: "Weight Tracking", icon: Weight, gradient: "from-blue-400 to-cyan-500", category: "automatic", description: "Automatic weight measurements" },
    { id: "steps", name: "Daily Steps", icon: Activity, gradient: "from-green-400 to-emerald-500", category: "automatic", description: "Track daily step count" },
    { id: "distance", name: "Distance Walked", icon: Target, gradient: "from-orange-400 to-amber-500", category: "automatic", description: "Monitor walking distance" },
    { id: "sleep", name: "Sleep Duration", icon: Clock, gradient: "from-indigo-400 to-purple-500", category: "automatic", description: "Track sleep patterns" },
    { id: "calories-burned", name: "Total Calories", icon: Zap, gradient: "from-red-400 to-rose-500", category: "automatic", description: "Monitor energy expenditure" },
    { id: "activity-calories", name: "Activity Calories", icon: Activity, gradient: "from-yellow-400 to-orange-500", category: "automatic", description: "Track active calories burned" },
  ],
  activity: [
    { id: "sit-hour", name: "Hourly Sitting", icon: Activity, gradient: "from-teal-400 to-cyan-500", category: "activity", description: "Guided sitting exercises" },
    { id: "standing-march", name: "Standing March", icon: Activity, gradient: "from-emerald-400 to-green-500", category: "activity", description: "Low-impact marching exercise" },
    { id: "therapeutic-massage", name: "Therapeutic Massage", icon: Activity, gradient: "from-pink-400 to-rose-500", category: "activity", description: "Self-massage techniques" },
    { id: "therapy-ball-knees", name: "Therapy Ball Exercise", icon: Activity, gradient: "from-cyan-400 to-blue-500", category: "activity", description: "Knee strengthening with therapy ball" },
    { id: "video-inhaler", name: "Inhaler Technique", icon: Activity, gradient: "from-purple-400 to-indigo-500", category: "activity", description: "Proper inhaler usage training" },
  ],
  workout: [
    { id: "brief-workout", name: "Quick Full-Body", icon: Activity, gradient: "from-orange-400 to-red-500", category: "workout", description: "15-minute full body routine" },
    { id: "full-body", name: "Complete Workout", icon: Activity, gradient: "from-red-400 to-pink-500", category: "workout", description: "Comprehensive exercise session" },
    { id: "leg-workout", name: "Leg Strengthening", icon: Activity, gradient: "from-amber-400 to-orange-500", category: "workout", description: "Lower body focused exercises" },
    { id: "chest-workout", name: "Upper Body", icon: Activity, gradient: "from-lime-400 to-green-500", category: "workout", description: "Chest and arm exercises" },
    { id: "post-mastectomy", name: "Recovery Routine", icon: Activity, gradient: "from-violet-400 to-purple-500", category: "workout", description: "Post-surgery rehabilitation" },
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
      className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br ${card.gradient} text-white p-4 min-h-[100px]`}
      onClick={() => onEdit(card)}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <IconComponent className="w-5 h-5" />
          </div>
          {isActive && onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(card.id);
              }}
              className="p-1 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{card.name}</h3>
        {card.description && (
          <p className="text-xs opacity-80 line-clamp-2">{card.description}</p>
        )}
      </div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 rounded-full" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-white/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Care Plan Studio
                </h1>
                <p className="text-muted-foreground">Design personalized care experiences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <div className="flex bg-white/80 rounded-lg p-1">
                <Button
                  variant={viewMode === "stack" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("stack")}
                  className="rounded-md"
                >
                  <Layers3 className="w-4 h-4 mr-2" />
                  Designer
                </Button>
                <Button
                  variant={viewMode === "timeline" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                  className="rounded-md"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Selection Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Designing care plan for</p>
                    <Select value={selectedSenior.id.toString()} onValueChange={(value) => {
                      const senior = mockSeniors.find(s => s.id === parseInt(value));
                      if (senior) setSelectedSenior(senior);
                    }}>
                      <SelectTrigger className="w-80 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{selectedSenior.avatar}</span>
                          <div className="text-left">
                            <div className="font-semibold">{selectedSenior.name}</div>
                            <div className="text-sm text-muted-foreground">DOB: {selectedSenior.dob}</div>
                          </div>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-white border-0 shadow-xl z-50">
                        {mockSeniors.map((senior) => (
                          <SelectItem key={senior.id} value={senior.id.toString()}>
                            <div className="flex items-center space-x-3 py-1">
                              <span className="text-xl">{senior.avatar}</span>
                              <div>
                                <div className="font-medium">{senior.name}</div>
                                <div className="text-sm text-muted-foreground">{senior.dob}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedSenior.activeCards}</div>
                  <div className="text-sm text-muted-foreground">Active Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedSenior.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion</div>
                </div>
                <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-0 shadow-sm hover:shadow-md transition-shadow"
              />
            </div>
            <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
              <Settings className="w-4 h-4 mr-2" />
              Thresholds
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Suggest
            </Button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Care Plan */}
          <div className="xl:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Active Care Plan</CardTitle>
                  <Badge className="bg-white/20 text-white">
                    {activeCards.length} Cards Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={activeCards} strategy={verticalListSortingStrategy}>
                    {activeCards.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <Plus className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Start Building</h3>
                        <p className="text-gray-500 mb-4">Drag cards from the library to create a personalized care plan</p>
                        <Button variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100">
                          Browse Card Library
                        </Button>
                      </div>
                    )}
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>
          </div>

          {/* Card Library */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">Card Library</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-100">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="measurement" className="text-xs">Measure</TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                  <TabsTrigger value="workout" className="text-xs">Workout</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  <ScrollArea className="h-[600px] pr-4">
                    {Object.entries(cardLibrary).map(([category, cards]) => (
                      <div key={category} className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-600">
                            {category} Cards
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {cards.length}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {cards.map((card) => (
                            <div key={card.id} className="group relative">
                              <div className="flex items-center gap-3">
                                <div className="flex-1">
                                  <SortableCard card={card} onEdit={handleCardEdit} />
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddCard(card)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-50 shadow-sm"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>

                {["measurement", "activity", "workout"].map((category) => (
                  <TabsContent key={category} value={category}>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid grid-cols-1 gap-3">
                        {cardLibrary[category as keyof typeof cardLibrary].map((card) => (
                          <div key={card.id} className="group relative">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <SortableCard card={card} onEdit={handleCardEdit} />
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAddCard(card)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-50 shadow-sm"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
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