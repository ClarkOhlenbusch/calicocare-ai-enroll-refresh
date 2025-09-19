import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  UserMinus, 
  FileText, 
  Settings2, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

// Mock data for seniors
const mockSeniors = [
  { id: 1, name: "Accardi, Ken", dob: "11/11/1999", status: "Active" },
  { id: 2, name: "Johnson, Mary", dob: "03/15/1945", status: "Active" },
  { id: 3, name: "Smith, Robert", dob: "07/22/1938", status: "Inactive" },
  { id: 4, name: "Williams, Patricia", dob: "12/05/1942", status: "Active" },
];

// Mock data for care plans
const mockCarePlans = [
  {
    id: 1,
    plan: "KOOS",
    type: "Standardized Survey",
    history: "David Lebudzinski MD has assigned the plan on 5/24/2021 12:33:46 AM",
    addedOn: "May 24, 2021",
    endedOn: "May 25, 2021",
    status: "completed"
  },
  {
    id: 2,
    plan: "TKR Week 1 Post Surgery Exercise Program",
    type: "Workout Routine",
    history: "David Lebudzinski MD has assigned the plan on 5/24/2021 1:36:11 AM",
    addedOn: "May 24, 2021",
    endedOn: "May 31, 2021",
    status: "completed"
  },
  {
    id: 3,
    plan: "[for CCH] SF-12v2™ Health Survey",
    type: "Classic Survey",
    history: "David Lebudzinski MD has assigned the plan on 5/18/2021 7:06:24 AM",
    addedOn: "May 18, 2021",
    endedOn: "May 31, 2021",
    status: "active"
  },
  {
    id: 4,
    plan: "TKR Three Week Post Op",
    type: "Care Plan",
    history: "David Lebudzinski MD has assigned the plan on 5/14/2021 5:28:05 AM",
    addedOn: "May 14, 2021",
    endedOn: "Jun 4, 2021",
    status: "active"
  }
];

const CarePlansPage = () => {
  const [selectedSenior, setSelectedSenior] = useState(mockSeniors[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><Clock className="w-3 h-3 mr-1" />Completed</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200"><AlertCircle className="w-3 h-3 mr-1" />Unknown</Badge>;
    }
  };

  const filteredPlans = mockCarePlans.filter(plan => {
    const matchesSearch = plan.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || plan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Care Plans Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage care plans and surveys for enrolled seniors
            </p>
          </div>
        </div>

        {/* Senior Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Select Senior</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="senior-select" className="text-sm font-medium whitespace-nowrap">
                Care Plans For:
              </Label>
              <Select value={selectedSenior.id.toString()} onValueChange={(value) => {
                const senior = mockSeniors.find(s => s.id === parseInt(value));
                if (senior) setSelectedSenior(senior);
              }}>
                <SelectTrigger className="w-80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockSeniors.map((senior) => (
                    <SelectItem key={senior.id} value={senior.id.toString()}>
                      {senior.name} ({senior.dob})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant={selectedSenior.status === "Active" ? "default" : "secondary"}>
                {selectedSenior.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Assign Care Plans/Surveys</span>
          </Button>
          <Button variant="destructive" className="flex items-center space-x-2">
            <UserMinus className="w-4 h-4" />
            <span>Unenroll Senior</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Resources</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings2 className="w-4 h-4" />
            <span>Manage Plan Templates</span>
          </Button>
        </div>

        {/* Care Plans Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Care Plans & Surveys</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search plans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Plans</TabsTrigger>
                <TabsTrigger value="expired">Expired Plans</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Plan</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">History</TableHead>
                      <TableHead className="font-semibold">Added On</TableHead>
                      <TableHead className="font-semibold">Ended On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlans.map((plan) => (
                      <TableRow key={plan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{plan.plan}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{plan.type}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(plan.status)}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="text-sm text-muted-foreground truncate" title={plan.history}>
                            {plan.history}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{plan.addedOn}</TableCell>
                        <TableCell className="text-sm">{plan.endedOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="expired" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Plan</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">History</TableHead>
                      <TableHead className="font-semibold">Added On</TableHead>
                      <TableHead className="font-semibold">Ended On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlans.filter(plan => plan.status === "completed").map((plan) => (
                      <TableRow key={plan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{plan.plan}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{plan.type}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(plan.status)}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="text-sm text-muted-foreground truncate" title={plan.history}>
                            {plan.history}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{plan.addedOn}</TableCell>
                        <TableCell className="text-sm">{plan.endedOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Plans</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Plans</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">12d</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarePlansPage;