import { Settings, User, Bell, Home, UserPlus, Calendar, Mic, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentPage: "home" | "enroll" | "careplans";
  onPageChange: (page: "home" | "enroll" | "careplans") => void;
  onLogout: () => void;
}

const Header = ({ currentPage, onPageChange, onLogout }: HeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      {/* Top Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                calico<span className="text-primary">care</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-medium">🐱</span>
                </div>
                <span className="text-sm text-muted-foreground">Ask Cali</span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center space-x-8 py-4">
            <Button 
              variant={currentPage === "home" ? "default" : "ghost"} 
              className={`flex items-center space-x-2 ${currentPage === "home" ? "bg-blue-600 text-white" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onPageChange("home")}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button 
              variant="ghost"
              className={`flex items-center space-x-2 ${currentPage === "enroll" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onPageChange("enroll")}
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll</span>
            </Button>
            <Button 
              variant="ghost"
              className={`flex items-center space-x-2 ${currentPage === "careplans" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onPageChange("careplans")}
            >
              <Calendar className="w-4 h-4" />
              <span>Care Plans</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Mic className="w-4 h-4" />
              <span>Alexa</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;