import { Settings, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card shadow-soft border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">calicocare</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <User className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="text-primary font-medium">
              <User className="w-4 h-4 mr-2" />
              Enroll
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <User className="w-4 h-4 mr-2" />
              Care Plans
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <User className="w-4 h-4 mr-2" />
              Alexa
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;