import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";
import PersonalInfoForm from "./PersonalInfoForm";
import AccountSettingsForm from "./AccountSettingsForm";
import CarePlanForm from "./CarePlanForm";
import { useToast } from "@/hooks/use-toast";

const steps = ["Personal Info", "Account Setup", "Care Plan", "Review"];

const EnrollmentContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Enrollment Complete!",
        description: "Welcome to CalicoCare. Your account has been successfully created.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <AccountSettingsForm />;
      case 3:
        return <CarePlanForm />;
      case 4:
        return (
          <div className="bg-gradient-primary rounded-xl p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-semibold mb-4">Review Your Information</h3>
            <p className="text-lg opacity-90 mb-6">
              Please review all the information you've provided before completing your enrollment.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleNext}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Complete Enrollment
            </Button>
          </div>
        );
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Join CalicoCare
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your journey with personalized elder care powered by AI technology. 
            Complete your enrollment to access comprehensive care management.
          </p>
        </div>

        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          steps={steps} 
        />

        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-primary hover:bg-primary-hover"
          >
            <span>{currentStep === steps.length ? "Complete" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentContainer;