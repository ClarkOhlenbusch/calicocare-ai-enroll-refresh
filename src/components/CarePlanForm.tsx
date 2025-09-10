import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const CarePlanForm = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-foreground">Care Plan Information</CardTitle>
          <CardDescription className="text-muted-foreground">
            Help us customize your care experience with the right plan and caregiver details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="carePlan" className="text-sm font-medium text-foreground">
              Preferred Care Plan *
            </Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a care plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Care Plan</SelectItem>
                <SelectItem value="comprehensive">Comprehensive Care Plan</SelectItem>
                <SelectItem value="premium">Premium Care Plan</SelectItem>
                <SelectItem value="custom">Custom Care Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caregiverName" className="text-sm font-medium text-foreground">
              Primary Caregiver Name
            </Label>
            <Input 
              id="caregiverName" 
              placeholder="Enter caregiver's full name"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact" className="text-sm font-medium text-foreground">
              Emergency Contact
            </Label>
            <Input 
              id="emergencyContact" 
              placeholder="Emergency contact name and phone"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNotes" className="text-sm font-medium text-foreground">
              Medical Notes & Special Requirements
            </Label>
            <Textarea 
              id="medicalNotes" 
              placeholder="Please share any important medical information, allergies, or special care requirements..."
              rows={4}
              className="text-base"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Care Preferences</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox id="mobileHealth" />
                <Label htmlFor="mobileHealth" className="text-sm text-foreground cursor-pointer">
                  Import mobile health data for comprehensive monitoring
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="pushNotifications" />
                <Label htmlFor="pushNotifications" className="text-sm text-foreground cursor-pointer">
                  Enable push notifications for important updates
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="aiInsights" />
                <Label htmlFor="aiInsights" className="text-sm text-foreground cursor-pointer">
                  Enable AI-powered health insights and recommendations
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-medium">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-foreground">Device Setup</CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure your biometric devices and smart home integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="deviceId" className="text-sm font-medium text-foreground">
              Device ID
            </Label>
            <Input 
              id="deviceId" 
              placeholder="Enter your device identifier"
              className="h-12 text-base"
            />
            <p className="text-xs text-muted-foreground">
              Find this on your CalicoCare device or in the setup guide
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hubName" className="text-sm font-medium text-foreground">
              Smart Hub Name
            </Label>
            <Input 
              id="hubName" 
              placeholder="e.g., Living Room Hub"
              className="h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarePlanForm;