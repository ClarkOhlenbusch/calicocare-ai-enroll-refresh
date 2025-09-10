import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PersonalInfoForm = () => {
  return (
    <Card className="shadow-medium">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl text-foreground">Personal Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Please provide your basic information to get started with CalicoCare.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name *
            </Label>
            <Input 
              id="firstName" 
              placeholder="Enter your first name"
              className="h-12 text-base"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Last Name *
            </Label>
            <Input 
              id="lastName" 
              placeholder="Enter your last name"
              className="h-12 text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address *
          </Label>
          <Input 
            id="email" 
            type="email"
            placeholder="Enter your email address"
            className="h-12 text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Birth Month *</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Birth Day *</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Birth Year *</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 100 }, (_, i) => (
                  <SelectItem key={2024 - i} value={(2024 - i).toString()}>
                    {2024 - i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="(555) 123-4567"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Time Zone</Label>
          <Select>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="est">Eastern Time (EST)</SelectItem>
              <SelectItem value="cst">Central Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Time (PST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;