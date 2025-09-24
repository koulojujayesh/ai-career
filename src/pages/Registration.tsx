import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    education: "",
    careerGoals: "",
    studyHours: ""
  });
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Registration complete, navigate to career consultation
      navigate("/career-consultation");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-glow-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome to CareerPath AI
              </h2>
              <p className="text-muted-foreground mt-2">Let's personalize your learning journey</p>
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter your full name"
                className="mt-2"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <div>
              <Label htmlFor="age">Age Range</Label>
              <Select onValueChange={(value) => updateFormData("age", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45+">45+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Education Background</h2>
            <div>
              <Label htmlFor="education">Highest Education Level</Label>
              <Select onValueChange={(value) => updateFormData("education", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="associates">Associate's Degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Career Aspirations</h2>
            <div>
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Select onValueChange={(value) => updateFormData("careerGoals", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="What field interests you most?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Study Commitment</h2>
            <div>
              <Label htmlFor="studyHours">Available Study Hours per Week</Label>
              <Select onValueChange={(value) => updateFormData("studyHours", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="How many hours can you commit?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">5-10 hours</SelectItem>
                  <SelectItem value="10-20">10-20 hours</SelectItem>
                  <SelectItem value="20-40">20-40 hours</SelectItem>
                  <SelectItem value="40+">40+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gradient-glass border-border/50 shadow-medium backdrop-blur-xl">
          <CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <CardTitle className="text-center">Profile Setup</CardTitle>
            <CardDescription className="text-center">
              Help us create your personalized learning path
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-primary hover:opacity-90"
              >
                {currentStep === totalSteps ? "Complete" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registration;