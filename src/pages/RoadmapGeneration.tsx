import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Circle, Clock, Star, ArrowRight, Calendar, BarChart3, TrendingUp, BookOpen, Zap, RefreshCw, Settings, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  completed: boolean;
  progress: number;
  level: "foundation" | "intermediate" | "advanced" | "certification";
  prerequisites?: string[];
}

interface SkillData {
  name: string;
  beginner: number;
  intermediate: number;
  expert: number;
}

interface Resource {
  id: number;
  title: string;
  provider: string;
  type: "course" | "tutorial" | "article";
  price: "free" | "paid";
  rating: number;
  duration: string;
  image: string;
  category: string;
}

const RoadmapGeneration = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState("web-dev");
  const [selectedPlan, setSelectedPlan] = useState<"intensive" | "extended">("intensive");

  const roadmaps = {
    "web-dev": {
      title: "Full Stack Web Development",
      subtitle: "Master modern web technologies from frontend to backend",
      totalDuration: "4 months",
      milestones: [
        {
          id: 1,
          title: "Web Development Fundamentals",
          description: "Learn the core technologies that power the modern web",
          duration: "4-6 weeks",
          skills: ["HTML5", "CSS3", "JavaScript ES6+", "Git & GitHub", "Responsive Design"],
          completed: false,
          progress: 85,
          level: "foundation" as const,
          prerequisites: []
        },
        {
          id: 2,
          title: "Frontend Framework Mastery",
          description: "Build dynamic user interfaces with modern frameworks",
          duration: "6-8 weeks",
          skills: ["React.js", "State Management", "Component Architecture", "API Integration", "Testing"],
          completed: false,
          progress: 60,
          level: "intermediate" as const,
          prerequisites: ["Web Development Fundamentals"]
        },
        {
          id: 3,
          title: "Backend Development",
          description: "Create robust server-side applications and APIs",
          duration: "8-10 weeks",
          skills: ["Node.js", "Express.js", "Database Design", "Authentication", "API Development"],
          completed: false,
          progress: 30,
          level: "advanced" as const,
          prerequisites: ["Frontend Framework Mastery"]
        },
        {
          id: 4,
          title: "Professional Portfolio & Deployment",
          description: "Showcase your skills and deploy production applications",
          duration: "4-6 weeks",
          skills: ["Portfolio Development", "Cloud Deployment", "DevOps Basics", "Performance Optimization"],
          completed: false,
          progress: 0,
          level: "certification" as const,
          prerequisites: ["Backend Development"]
        }
      ]
    },
    "ai-ml": {
      title: "AI & Machine Learning Engineer",
      subtitle: "Master artificial intelligence and machine learning technologies",
      totalDuration: "8-10 months",
      milestones: [
        {
          id: 1,
          title: "Foundation Phase",
          description: "Master programming fundamentals and mathematical concepts",
          duration: "2 months",
          skills: ["Python", "Statistics", "Linear Algebra", "Git"],
          completed: true,
          progress: 100,
          level: "foundation" as const
        },
        {
          id: 2,
          title: "Intermediate Phase",
          description: "Dive into machine learning algorithms and data manipulation",
          duration: "3 months",
          skills: ["Pandas", "NumPy", "Scikit-learn", "Data Visualization"],
          completed: false,
          progress: 65,
          level: "intermediate" as const
        },
        {
          id: 3,
          title: "Advanced Phase",
          description: "Deep learning, neural networks, and advanced techniques",
          duration: "2-3 months",
          skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision"],
          completed: false,
          progress: 20,
          level: "advanced" as const
        },
        {
          id: 4,
          title: "Specialization & Certification",
          description: "Choose specialization and complete certification projects",
          duration: "1-2 months",
          skills: ["MLOps", "Cloud Deployment", "Portfolio Projects", "Certification"],
          completed: false,
          progress: 0,
          level: "certification" as const
        }
      ]
    }
  };

  const skillsData: SkillData[] = [
    { name: "HTML/CSS", beginner: 0, intermediate: 0, expert: 85 },
    { name: "JavaScript", beginner: 0, intermediate: 15, expert: 75 },
    { name: "React", beginner: 40, intermediate: 55, expert: 0 },
    { name: "Node.js", beginner: 70, intermediate: 25, expert: 0 },
    { name: "Database", beginner: 75, intermediate: 20, expert: 0 },
    { name: "DevOps", beginner: 85, intermediate: 15, expert: 0 }
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "JavaScript Fundamentals Course",
      provider: "YouTube",
      type: "course",
      price: "free",
      rating: 4.8,
      duration: "8 hours",
      image: "/api/placeholder/300/200",
      category: "Programming"
    },
    {
      id: 2,
      title: "React Complete Developer Course",
      provider: "Udemy",
      type: "course",
      price: "paid",
      rating: 4.9,
      duration: "40 hours",
      image: "/api/placeholder/300/200",
      category: "Frontend"
    },
    {
      id: 3,
      title: "AWS Cloud Practitioner",
      provider: "Coursera",
      type: "course",
      price: "paid",
      rating: 4.7,
      duration: "25 hours",
      image: "/api/placeholder/300/200",
      category: "Cloud"
    }
  ];

  const currentRoadmap = roadmaps[selectedPath as keyof typeof roadmaps];
  
  // Calculate overall progress
  let totalProgress = 0;
  currentRoadmap.milestones.forEach(milestone => {
    totalProgress += milestone.progress;
  });
  const overallProgress = totalProgress / currentRoadmap.milestones.length;
  
  const completedMilestones = currentRoadmap.milestones.filter(m => m.completed).length;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "foundation": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "intermediate": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "advanced": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "certification": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getPlanInfo = (plan: "intensive" | "extended") => {
    if (plan === "intensive") {
      return {
        title: "2-Week Intensive",
        subtitle: "Fast-track learning with intensive daily sessions",
        duration: "14 days",
        hours: "4-6 hours",
        features: ["Accelerated timeline", "Daily 4-6 hours", "Quick certification", "High intensity"],
        color: "text-orange-500"
      };
    }
    return {
      title: "3-6 Month Extended",
      subtitle: "Balanced learning with sustainable pace",
      duration: "3-6 months",
      hours: "1-2 hours",
      features: ["Flexible schedule", "Daily 1-2 hours", "Deep understanding", "Moderate intensity"],
      color: "text-blue-500"
    };
  };

  // Simple skill mastery chart component
  const SkillMasteryChart = ({ data }: { data: SkillData[] }) => (
    <div className="space-y-4">
      {data.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">
              {skill.expert + skill.intermediate + skill.beginner}%
            </span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden bg-muted/30">
            <div 
              className="bg-green-500" 
              style={{ width: `${skill.expert}%` }}
            />
            <div 
              className="bg-orange-500" 
              style={{ width: `${skill.intermediate}%` }}
            />
            <div 
              className="bg-gray-500" 
              style={{ width: `${skill.beginner}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-glass backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Roadmap Generation
              </h1>
              <p className="text-muted-foreground mt-1">Create your personalized learning roadmap</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
              <Button 
                onClick={() => navigate("/schedule")}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Integrate Schedule
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-500">AI Consultation</span>
            </div>
            <div className="w-8 h-0.5 bg-primary"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <span className="text-primary font-medium">Roadmap Generation</span>
            </div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Schedule Integration</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Roadmap Header */}
        <Card className="mb-8 bg-gradient-glass border-border/50 shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{currentRoadmap.title}</CardTitle>
                <p className="text-muted-foreground">{currentRoadmap.subtitle}</p>
              </div>
              <Badge className="text-lg px-4 py-2 bg-gradient-primary">
                {Math.round(overallProgress)}% Complete
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Study Plan Configuration */}
        <Card className="mb-8 bg-gradient-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Study Plan Configuration
            </CardTitle>
            <p className="text-muted-foreground">Choose your learning pace and timeline</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">0/4 Milestones</span>
              <span className="text-sm text-muted-foreground">12 weeks remaining</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Intensive Plan */}
              <div 
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPlan === "intensive" 
                    ? "border-orange-500/50 bg-orange-500/5" 
                    : "border-border/50 hover:border-border"
                }`}
                onClick={() => setSelectedPlan("intensive")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Intensive Plan</h3>
                      <p className="text-sm text-muted-foreground">2 Weeks</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === "intensive" 
                      ? "border-orange-500 bg-orange-500" 
                      : "border-muted-foreground"
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Fast-track learning with 4-6 hours daily commitment
                </p>
                <div className="space-y-2">
                  {getPlanInfo("intensive").features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Badge variant="outline" className="mt-4 text-orange-500 border-orange-500/30">
                  High intensity
                </Badge>
              </div>

              {/* Extended Plan */}
              <div 
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPlan === "extended" 
                    ? "border-blue-500/50 bg-blue-500/5" 
                    : "border-border/50 hover:border-border"
                }`}
                onClick={() => setSelectedPlan("extended")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Extended Plan</h3>
                      <p className="text-sm text-muted-foreground">3-6 Months</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === "extended" 
                      ? "border-blue-500 bg-blue-500" 
                      : "border-muted-foreground"
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Balanced learning with 1-2 hours daily commitment
                </p>
                <div className="space-y-2">
                  {getPlanInfo("extended").features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Badge variant="outline" className="mt-4 text-blue-500 border-blue-500/30">
                  Moderate intensity
                </Badge>
              </div>
            </div>

            {/* Plan Comparison */}
            <div className="mt-8 p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Plan Comparison
              </h4>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Daily Time</p>
                  <p className="font-semibold">1-2 hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completion</p>
                  <p className="font-semibold">3-6 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Flexibility</p>
                  <p className="font-semibold">High</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline">Switch Plan</Button>
              <Button 
                onClick={() => navigate("/schedule")}
                className="bg-gradient-primary hover:opacity-90"
              >
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Timeline */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-glass border-border/50 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Learning Timeline
                </CardTitle>
                <Button variant="outline" size="sm" className="w-fit">
                  Show Timetable
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentRoadmap.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative">
                      {/* Timeline connector */}
                      {index < currentRoadmap.milestones.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-16 bg-border/30" />
                      )}
                      
                      <div className={`border rounded-lg p-6 transition-all duration-300 hover:shadow-soft ${
                        milestone.completed ? 'bg-primary/5 border-primary/20' : 'bg-card/50 border-border/50'
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${milestone.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                            {milestone.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <Circle className="h-6 w-6" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <Badge className={getLevelColor(milestone.level)}>
                                  {milestone.level}
                                </Badge>
                                <h3 className="text-lg font-semibold mt-2">{milestone.title}</h3>
                              </div>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {milestone.duration}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">{milestone.description}</p>
                            
                            {/* Skills to Learn */}
                            <div className="mb-4">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Star className="h-4 w-4 text-accent" />
                                Skills to Learn
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {milestone.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="bg-muted/50">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-2" />
                            </div>
                            
                            {/* Prerequisites */}
                            {milestone.prerequisites && milestone.prerequisites.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm text-muted-foreground">
                                  <strong>1 prereq</strong>
                                </p>
                              </div>
                            )}

                            {/* Action button */}
                            <div className="flex gap-2">
                              {!milestone.completed && milestone.progress > 0 && (
                                <Button variant="outline" size="sm">
                                  Continue Learning
                                </Button>
                              )}
                              {!milestone.completed && milestone.progress === 0 && (
                                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                                  Start Learning
                                  <ExternalLink className="ml-2 h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Mastery Overview */}
          <div className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Skill Mastery Overview
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track your progress across different skill areas
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Expert (80%+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span>Intermediate (60%+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded"></div>
                      <span>Beginner (40%+)</span>
                    </div>
                  </div>
                  
                  <SkillMasteryChart data={skillsData} />
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources Preview */}
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Curated resources to support your learning journey
                </p>
                <Badge variant="outline" className="w-fit">
                  6 resources
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{resource.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{resource.provider}</span>
                          <span>•</span>
                          <span>{resource.duration}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${resource.price === 'free' ? 'text-green-500 border-green-500/30' : 'text-orange-500 border-orange-500/30'}`}
                          >
                            {resource.price}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/resources")}
                >
                  View All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg"
            onClick={() => navigate("/schedule")} 
            className="bg-gradient-primary hover:opacity-90 flex-1"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Integrate with Schedule
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate("/resources")}
            className="flex-1"
          >
            Export Roadmap
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate("/ai-tutor")}
            className="flex-1"
          >
            Get AI Tutor Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGeneration;